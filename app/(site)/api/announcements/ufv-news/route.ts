import axios from "axios";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";
import { ItemCustom, Root } from "./types";
import { logger, writeServerClient } from "~/app/(site)/serverClient";
import groq from "groq";
import { discordAPIRest } from "../../utils";
import { Routes } from "discord-api-types/v10";
import he from "he";
import { v4 as uuidv4 } from "uuid";

export const dynamic = "force-dynamic";
export async function GET() {
  const reqHeaders = await headers();
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

    const ufvFeedItems: ItemCustom[] = [];

    // UFV Urgent News
    try {
      const ufvUrgentNewsFeed = await axios.get(
        "https://blogs.ufv.ca/urgent-news/feed/"
      );
      const ufvUrgentNewsFeedXML = ufvUrgentNewsFeed.data as string;
      const parser = new XMLParser({
        ignoreAttributes: false,
      });
      const parsedXML = parser.parse(ufvUrgentNewsFeedXML) as Root;
      const latestNews = parsedXML.rss.channel.item.map((item) => ({
        ...item,
        pingEveryone: true,
      }));
      ufvFeedItems.push(...latestNews);
    } catch (e) {
      console.log(`Unable to fetch the UFV urgent news`);
    }

    // UFV IT Services
    try {
      const itServicesFeed = await axios.get(
        "https://blogs.ufv.ca/itservices/feed/"
      );
      const itServicesFeedXML = itServicesFeed.data as string;
      const parser = new XMLParser({
        ignoreAttributes: false,
      });
      const parsedXML = parser.parse(itServicesFeedXML) as Root;
      const latestITS = parsedXML.rss.channel.item.map((item) => ({
        ...item,
        pingEveryone: false,
      }));
      ufvFeedItems.push(...latestITS);
    } catch (e) {
      console.log(`Unable to fetch the UFV IT Services news`);
    }

    const getLatestUFVNewsDocuments = await writeServerClient.fetch<
      {
        _id: string;
        discordMessageId: string;
        newsUrl: string;
      }[]
    >(groq`*[_type == "ufvUrgentNews" && newsUrl in $newsURLs]`, {
      newsURLs: ufvFeedItems.map((feedItem) => feedItem.link),
    });

    const successfulPosts = [];

    for (let index = ufvFeedItems.length - 1; index >= 0; index--) {
      const newsData = ufvFeedItems[index];
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

      const decodedTitle = he.decode(newsData.title);
      const decodedDescription = he.decode(
        newsDescriptionSubstring.trim().replace(/<[^>]*>/g, "")
      );
      const discordMessageBody = {
        enforce_nonce: true,
        content: `## [${decodedTitle}](${
          newsData.link
        })\n:calendar_spiral: <t:${publishedDateSeconds}> (<t:${publishedDateSeconds}:R>)\n:writing_hand: ${
          newsData["dc:creator"]
        } \n\n${decodedDescription}${indexOfTripleDot > -1 ? "..." : ""}${
          newsData.pingEveryone ? "\n@everyone" : ""
        }`,
      };

      try {
        const newsMessageRequest = (await discordAPIRest.post(
          Routes.channelMessages(process.env.DISCORD_UFV_NEWS_CHANNEL_ID!),
          {
            body: discordMessageBody,
            headers: {
              "X-Nonce": uuidv4(),
            },
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
          logger.info(
            `Cross-posted ${newsData.title} to all following channels`
          );
        }
      } catch (e) {
        logger.error(`Unable to post discord message for ${newsData.title}`);
      }
    }

    return NextResponse.json({
      posted: successfulPosts,
    });
  } catch (e) {
    logger.error(`Unable to get the latest UFV news`);
    console.error(e);
    return NextResponse.json({
      success: false,
      data: `Unexpected error occured`,
    });
  }
}
