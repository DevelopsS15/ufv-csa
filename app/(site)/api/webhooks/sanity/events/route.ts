import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import groq from "groq";
import { getEventType } from "~/app/sanity/lib/query";
import {
  SanityImageWithAltType,
  getURLForSanityImage,
} from "~/app/(site)/utils";
const toMarkdown = require("@sanity/block-content-to-markdown");
import { EventLocationDisplay } from "~/app/(site)/events/EventLocationDisplay";
import axios from "axios";
import { token } from "~/app/sanity/lib/token";
import { createClient } from "next-sanity";

const secret = process.env.SANITY_WEBHOOK_MESSAGE_SECRET!;
const discordEventWebhookURL = process.env.DISCORD_EVENT_WEBHOOK!;
const discordAnnouncementWebhookURL = process.env.DISCORD_ANNOUNCEMENT_WEBHOOK!;
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

const client = createClient({
  projectId: projectId,
  dataset: dataset,
  apiVersion: "2024-03-05",
  useCdn: false,
  token: token,
});
export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  try {
    interface getEventTypeWithType extends getEventType {
      _type: string;
      _rev: string;
      _createdAt: string;
    }
    const { isValidSignature, body } = await parseBody<{
      before: getEventTypeWithType | null;
      after: getEventTypeWithType | null;
    }>(req, secret);

    if (!isValidSignature) {
      const message = "Invalid signature";
      console.log(`Invalid signature`);
      return NextResponse.json(
        { message, isValidSignature, body },
        {
          status: 401,
        }
      );
    }

    if (!body) {
      console.log(`No body provided`);
      return NextResponse.json({ success: false });
    }

    const documentType = body.before?._type ?? body.after?._type;
    const documentId = body.before?._id ?? body.after?._id;
    if (
      !documentType ||
      (documentType !== "event" && documentType !== "announcement")
    ) {
      console.log(`No document type or event/announcement`);
      const message = "Bad Request";
      return NextResponse.json({ message, body });
    }

    const revisionId = body.after?._rev;

    const decimalColorCode = 5414976;
    const maxTextLength = 3000;

    console.log(`Received potential event/announcement from Sanity`);

    const embeds = [];
    const slug = body.after?.slug as unknown as { current: string };
    const eventDirectLink = `http://localhost:3000/${documentType}s/${
      slug.current ?? ""
    }`;
    let numberOfEmbedImages = 0;
    const textDescription = Array.isArray(body.after?.body)
      ? `${toMarkdown(body.after.body, {
          serializers: {
            types: {
              image: (props: { node: SanityImageWithAltType }) => {
                const imageFilename = props?.node?.asset?._ref;
                if (typeof imageFilename !== `string`) return ``;
                const url = getURLForSanityImage(props?.node).url();
                numberOfEmbedImages++;
                return `:frame_photo: [Image ${numberOfEmbedImages}](${url})`;
              },
            },
          },
          imageOptions: { w: 320, h: 240, fit: "max" },
          projectId: projectId,
          dataset: dataset,
        })}`
      : "";

    switch (documentType) {
      case "event":
        const previousEventDiscordMessage = await client.fetch(
          groq`*[_type == "discordMessages" && type == "event" && eventDocumentId._ref == $documentId][0]`,
          {
            documentId: documentId,
          }
        );

        const eventDiscordMessageId =
          previousEventDiscordMessage?.discordMessageId ?? undefined;
        const discordEventMessageDocumentId = previousEventDiscordMessage?._id;
        console.log(
          `Handling ${body.after ? "CREATE/UPDATE" : "DELETE"} event.`,
          previousEventDiscordMessage
        );
        if (body.after) {
          // Discord Message
          const startDateSeconds = Math.round(
            new Date(body.after.startDate).getTime() / 1000
          );

          let mainEmbedDescription = `:calendar_spiral: **Start:** <t:${startDateSeconds}> (<t:${startDateSeconds}:R>)\n`;
          mainEmbedDescription += `:calendar_spiral: **End:** <t:${Math.round(
            new Date(body.after.endDate).getTime() / 1000
          )}>\n`;
          mainEmbedDescription += `:round_pushpin: **Location:** ${EventLocationDisplay(
            { event: body.after }
          )}\n`;

          if (body.after.bookTicket) {
            mainEmbedDescription += `:tickets: **Register:** ${body.after.bookTicket}`;
          }

          const mainEmbed: {
            color: number;
            description: string;
            image?: { url: string };
          } = {
            color: decimalColorCode,
            description: mainEmbedDescription,
          };
          if (body.after.image) {
            mainEmbed.image = {
              url: getURLForSanityImage(body.after.image).quality(75).url(),
            };
          }
          embeds.push(mainEmbed);

          if (textDescription.length > 0) {
            embeds.push({
              color: decimalColorCode,
              description:
                textDescription.length > maxTextLength
                  ? `${textDescription.substring(0, maxTextLength)}...`
                  : textDescription,
            });
          }

          const discordMessageBody = {
            content: `@everyone\n# [${
              body?.after.title ?? "No Title"
            }](${eventDirectLink})`,
            embeds: embeds,
          };

          //
          if (
            await HandleSendOrUpdateWebhookMessage({
              messageId: eventDiscordMessageId,
              type: "event",
              documentId: documentId!,
              revisionId: revisionId!,
              messageDocumentId: discordEventMessageDocumentId,
              webhookURL: discordEventWebhookURL,
              body: discordMessageBody,
            })
          ) {
            console.log(
              `Successfully posted ${documentId} event (Revision: ${revisionId}) to discord message.`
            );
          } else {
            console.log(
              `Unable to post message  ${documentId} event (Revision: ${revisionId})`
            );
          }
        } else {
          const resDelete = await DeleteWebhookMessage({
            messageId: eventDiscordMessageId,
            discordMessageDocumentId: discordEventMessageDocumentId,
            webhookURL: discordEventWebhookURL,
          });
          if (resDelete) {
            console.log(`Successfully deleted message`);
          } else {
            console.log(`Unable to delete message`);
          }
        }
        break;
      case "announcement":
        const previousAnnounceDiscordMessage = await client.fetch(
          groq`*[_type == "discordMessages" && type == "announcement" && announcementDocumentId._ref == $documentId][0]`,
          {
            documentId: documentId,
          }
        );

        const discordMessageDocumentMessageId =
          previousAnnounceDiscordMessage?.discordMessageId ?? undefined;
        const discordAnnouncementMessageDocumentId =
          previousAnnounceDiscordMessage?._id;
        console.log(
          `Handling ${body.after ? "CREATE/UPDATE" : "DELETE"} announcement.`,
          previousAnnounceDiscordMessage
        );
        if (body.after) {
          // Discord Message
          const mainEmbed: { color: number; image?: { url: string } } = {
            color: decimalColorCode,
          };
          if (body.after.image) {
            mainEmbed.image = {
              url: getURLForSanityImage(body.after.image).quality(75).url(),
            };
          }
          embeds.push(mainEmbed);

          if (textDescription.length > 0) {
            embeds.push({
              color: decimalColorCode,
              description:
                textDescription.length > maxTextLength
                  ? `${textDescription.substring(0, maxTextLength)}...`
                  : textDescription,
            });
          }

          const discordMessageBody = {
            content: `@everyone\n# [${
              body?.after.title ?? "No Title"
            }](${eventDirectLink})`,
            embeds: embeds,
          };

          //
          if (
            await HandleSendOrUpdateWebhookMessage({
              messageId: discordMessageDocumentMessageId,
              type: "announcement",
              documentId: documentId!,
              revisionId: revisionId!,
              messageDocumentId: discordAnnouncementMessageDocumentId,
              webhookURL: discordAnnouncementWebhookURL,
              body: discordMessageBody,
            })
          ) {
            console.log(
              `Successfully posted ${documentId} announcement (Revision: ${revisionId}) to discord message.`
            );
          } else {
            console.log(
              `Unable to post discord message ${documentId} announcement (Revision: ${revisionId})`
            );
          }
        } else {
          const resDelete = await DeleteWebhookMessage({
            messageId: discordMessageDocumentMessageId,
            discordMessageDocumentId: discordAnnouncementMessageDocumentId,
            webhookURL: discordAnnouncementWebhookURL,
          });
          if (resDelete) {
            console.log(`Successfully deleted message`);
          } else {
            console.log(`Unable to delete message`);
          }
        }
        break;
    }

    // If the `_type` is `testimonial`, then all `client.fetch` calls with
    // `{next: {tags: ['testimonial']}}` will be revalidated
    // await revalidateTag(body._type);
    // console.log(body);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false });
  }
}

async function HandleSendOrUpdateWebhookMessage({
  webhookURL,
  messageId,
  type,
  documentId,
  messageDocumentId,
  revisionId,
  body,
}: {
  messageId?: string;
  webhookURL: string;
  type: "event" | "announcement";
  revisionId: string;
  documentId: string;
  messageDocumentId: string;
  body: object;
}) {
  const bodyType = type;
  console.log(
    `Trying to send/update webhook message for ${bodyType} ${documentId}`
  );
  if (messageId) {
    const updatedMessage = await UpdateWebhookMessage({
      webhookURL,
      messageId,
      body,
    });
    // if (body?.revisionId === body?._rev) {
    //   console.log(`Already updated this message for this revision.`);
    //   return NextResponse.json({ success: true }, { status: 204 });
    // }
    await client
      .patch(messageDocumentId)
      .set({ revisionId: revisionId })
      .commit();
    console.log(
      `Updated ${documentId} event (Revision: ${revisionId}) to discord message: ${updatedMessage.data.id}`
    );
    return true;
  } else {
    const sentMessage = await SendWebhookMessage({
      webhookURL,
      body,
    });
    const sentMessageId = sentMessage.data?.id;
    if (sentMessageId) {
      const info = await client.create({
        _type: "discordMessages",
        discordMessageId: sentMessageId,
        type: bodyType,
        revisionId: revisionId,
        eventDocumentId:
          bodyType === "event"
            ? {
                _type: "reference",
                _ref: documentId,
                _weak: true,
              }
            : undefined,
        announcementDocumentId:
          bodyType === "announcement"
            ? {
                _type: "reference",
                _ref: documentId,
                _weak: true,
              }
            : undefined,
      });
      return true;
    }
  }
  return false;
}

async function SendWebhookMessage({
  webhookURL,
  body,
}: {
  webhookURL: string;
  body: object;
}) {
  return await axios({
    method: "post",
    url: `${webhookURL}?wait=true`,
    data: body,
  });
}

async function UpdateWebhookMessage({
  webhookURL,
  body,
  messageId,
}: {
  body: object;
  webhookURL: string;
  messageId: string;
}) {
  return await axios({
    method: "patch",
    url: `${webhookURL}/messages/${messageId}`,
    data: body,
  });
}

async function DeleteWebhookMessage({
  webhookURL,
  discordMessageDocumentId,
  messageId,
}: {
  messageId?: string;
  discordMessageDocumentId?: string;
  webhookURL: string;
}): Promise<boolean> {
  if (discordMessageDocumentId) await client.delete(discordMessageDocumentId);
  if (typeof messageId !== `string`) return true;
  const deleteMessage = await axios({
    method: "delete",
    url: `${webhookURL}/messages/${messageId}`,
  });
  return deleteMessage.status >= 200 && deleteMessage.status < 300;
}
