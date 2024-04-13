import axios from "axios";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";
import { Root } from "./types";
import { writeServerClient } from "~/app/(site)/serverClient";
import groq from "groq";
import { discordAPIRest } from "../../utils";
import { Routes } from "discord-api-types/v10";

export const dynamic = "force-dynamic";
export async function GET() {
  const reqHeaders = headers();
  try {
    if (reqHeaders.get("authorization") !== process.env.AUTH_TOKEN_UFV_NEWS) {
      return NextResponse.json(
        {
          success: false,
          data: null,
        },
        {
          status: 401,
        }
      );
    }

    const abbotsfordCentreFeed = await axios.get(
      "https://blogs.ufv.ca/urgent-news/feed/"
    );
    const abbotsfordCentreFeedXML = abbotsfordCentreFeed.data as string;
    const parser = new XMLParser({
      ignoreAttributes: false,
    });
    const parsedXML = parser.parse(abbotsfordCentreFeedXML) as Root;
    const latestNews = parsedXML.rss.channel.item;

    const getLatestUFVNewsDocuments = await writeServerClient.fetch<
      {
        _id: string;
        discordMessageId: string;
        newsUrl: string;
      }[]
    >(groq`*[_type == "ufvUrgentNews" && newsUrl in $newsURLs]`, {
      newsURLs: latestNews.map((news) => news.link),
    });

    const successfulPosts = [];

    for (let index = latestNews.length - 1; index >= 0; index--) {
      const newsData = latestNews[index];
      // Check if already posted
      if (
        getLatestUFVNewsDocuments.find(
          (newsDocument) => newsDocument.newsUrl === newsData.link
        )
      ) {
        continue;
      }

      const publishedDateSeconds = Math.round(
        new Date(newsData.pubDate).getTime() / 1000
      );

      const newsDescription = newsData.description;
      const indexOfTripleDot = newsDescription.indexOf("...");
      const newsDescriptionSubstring = newsDescription.substring(
        0,
        indexOfTripleDot > -1 ? indexOfTripleDot : undefined
      );

      const discordMessageBody = {
        content: `## [${newsData.title}](${newsData.link})\n:calendar_spiral: <t:${publishedDateSeconds}> (<t:${publishedDateSeconds}:R>)\n:writing_hand: ${newsData["dc:creator"]} \n\n${newsDescriptionSubstring}\n@everyone`,
      };

      try {
        const newsMessageRequest = (await discordAPIRest.post(
          Routes.channelMessages(process.env.DISCORD_UFV_NEWS_CHANNEL_ID!),
          {
            body: discordMessageBody,
          }
        )) as { id: string };

        await writeServerClient.create({
          _type: "ufvUrgentNews",
          discordMessageId: newsMessageRequest.id,
          newsTitle: newsData.title,
          newsUrl: newsData.link,
        });
        successfulPosts.push(newsData.title);

        try {
          await discordAPIRest.post(
            Routes.channelMessageCrosspost(
              process.env.DISCORD_UFV_NEWS_CHANNEL_ID!,
              newsMessageRequest.id
            )
          );
        } catch (e) {
          console.log(
            `Cross-posted ${newsData.title} to all following channels`
          );
        }
      } catch (e) {
        console.log(`Unable to post discord message for ${newsData.title}`);
      }
    }

    return NextResponse.json({
      posted: successfulPosts,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({
      success: false,
      data: `Unexpected error occured`,
    });
  }
}
