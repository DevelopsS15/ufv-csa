import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import groq from "groq";
import { getEventType, getLatestAnnouncement } from "~/app/sanity/lib/query";
import {
  SanityImageWithAltType,
  getURLForSanityImage,
} from "~/app/(site)/utils";
const toMarkdown = require("@sanity/block-content-to-markdown");
import { EventLocationDisplay } from "~/app/(site)/events/EventLocationDisplay";
import axios, { AxiosHeaders } from "axios";
import { SanityAnnouncementType } from "~/app/types";
import { writeServerClient } from "~/app/(site)/serverClient";
import { revalidatePath } from "next/cache";
import { SendDiscordAPIRequest } from "../../../utils";

const secret = process.env.SANITY_WEBHOOK_MESSAGE_SECRET!;
const discordChannelIdEvent = process.env.DISCORD_EVENT_CHANNEL_ID!;
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

const discordServerId = process.env.DISCORD_SERVER_ID;
const discordServerInvite = process.env.DISCORD_SERVER_INVITE_LINK;

const discordChannelIdsAnnouncement: Record<SanityAnnouncementType, string> = {
  CSA: process.env.DISCORD_ANNOUNCEMENT_CHANNEL_ID_CSA!,
  IEEE: process.env.DISCORD_ANNOUNCEMENT_CHANNEL_ID_IEEE!,
};
const validAnnouncementCategories: SanityAnnouncementType[] = [
  SanityAnnouncementType.CSA,
  SanityAnnouncementType.IEEE,
];

const eventDirectLinkDomain =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : `https://ufv-csa.vercel.app`;

export const dynamic = "force-dynamic";
export async function POST(req: NextRequest, res: NextResponse) {
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
    if (typeof documentType !== `string`) {
      console.log(`No document type or event/announcement`);
      const message = "Bad Request";
      return NextResponse.json({ message, body });
    }

    let parentStaleRoute = "";
    const documentSlug = (body.after?.slug ?? body.before?.slug) as unknown as {
      current?: string;
    };

    const staleRouteSlug = documentSlug?.current ?? documentSlug?.current ?? "";

    switch (documentType) {
      case "event":
        parentStaleRoute = "events";
        revalidatePath("/", "page");
        revalidatePath(`/${parentStaleRoute}/${staleRouteSlug}`, "page");
        break;
      case "meetingMinutes":
        parentStaleRoute = "minutes";
        revalidatePath(`/${parentStaleRoute}/${staleRouteSlug}`, "page");
        break;
      case "announcement":
        parentStaleRoute = "announcements";
        revalidatePath("/api/announcements/latest", "page");
        revalidatePath(`/${parentStaleRoute}/${staleRouteSlug}`, "page");
        break;
      case "executives":
        parentStaleRoute = "executives";
        break;
    }

    if (parentStaleRoute.length > 0) {
      console.log(`Revalidated parent route: ${parentStaleRoute}`);
      revalidatePath(`/${parentStaleRoute}`, "page");
    }

    if (documentType !== "event" && documentType !== "announcement") {
      console.log(`No document type or event/announcement`);
      const message = "Bad Request";
      return NextResponse.json({ message, body });
    }

    const revisionId = body.after?._rev;

    const decimalColorCode = 5414976;
    const maxDiscordTextLength = 3000;

    console.log(`Received potential event/announcement from Sanity`);

    const embeds = [];
    const eventDirectLink = `${eventDirectLinkDomain}/${documentType}s/${
      documentSlug?.current ?? ""
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
            marks: {
              link: (props: { mark: { href: string; title: unknown } }) =>
                props.mark.href,
            },
          },
          imageOptions: { w: 320, h: 240, fit: "max" },
          projectId: projectId,
          dataset: dataset,
        })}`
      : "";

    switch (documentType) {
      case "event":
        const previousEventDiscordMessage = (await writeServerClient.fetch(
          groq`*[_type == "discordMessages" && type == "event" && eventDocumentId._ref == $documentId][0]`,
          {
            documentId: documentId,
          }
        )) as Record<string, any> | null;

        const eventDiscordMessageId =
          previousEventDiscordMessage?.discordMessageId ?? undefined;
        const discordEventMessageDocumentId = previousEventDiscordMessage?._id;
        console.log(
          `Handling ${body.after ? "CREATE/UPDATE" : "DELETE"} event.`,
          previousEventDiscordMessage
        );

        const previousDiscordEvent = (await writeServerClient.fetch(
          groq`*[_type == "discordEvents" && eventDocumentId._ref == $documentId][0]`,
          {
            documentId: documentId,
          }
        )) as Record<string, any> | null;
        const prevDiscordEventId = previousDiscordEvent?.discordEventId;

        if (body.after) {
          // Discord Message
          const startDateSeconds = Math.round(
            new Date(body.after.startDate).getTime() / 1000
          );

          const eventLocationString = EventLocationDisplay({
            event: body.after,
            type: "string",
          });

          let mainEmbedDescription = `:calendar_spiral: **Start:** <t:${startDateSeconds}> (<t:${startDateSeconds}:R>)\n`;
          mainEmbedDescription += `:calendar_spiral: **End:** <t:${Math.round(
            new Date(body.after.endDate).getTime() / 1000
          )}>\n`;
          mainEmbedDescription += `:round_pushpin: **Location:** ${eventLocationString}\n`;

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
                textDescription.length > maxDiscordTextLength
                  ? `${textDescription.substring(0, maxDiscordTextLength)}...`
                  : textDescription,
            });
          }

          const eventTitle = body?.after.title ?? "No Title";
          const discordMessageBody = {
            content: `@everyone\n# [${eventTitle}](${eventDirectLink})`,
            embeds: embeds,
          };

          let discordEventId = "";
          try {
            const discordEventBody = {
              name: eventTitle,
              channel_id: null,
              privacy_level: 2,
              scheduled_start_time: body.after.startDate,
              scheduled_end_time: body.after.endDate,
              description:
                textDescription.length > 975
                  ? `${textDescription.substring(0, 975)}...`
                  : textDescription,
              entity_type: 3,
              entity_metadata: {
                location: eventLocationString ?? "Unknown",
              },
            };

            if (previousDiscordEvent) {
              console.log(`Updating Discord Event ${prevDiscordEventId}`);
              discordMessageBody.content += `\n${discordServerInvite}?event=${prevDiscordEventId}`;
              await SendDiscordAPIRequest({
                method: "patch",
                path: `guilds/${discordServerId}/scheduled-events/${prevDiscordEventId}`,
                body: discordEventBody,
              });
            } else {
              const apiEvent = await SendDiscordAPIRequest({
                method: "post",
                path: `guilds/${discordServerId}/scheduled-events`,
                body: discordEventBody,
              });
              discordEventId = apiEvent.data.id;
              console.log(`Created Discord Event ${discordEventId}`);

              const newDiscordEvent = await writeServerClient.create({
                _type: "discordEvents",
                discordEventId: discordEventId,
                revisionId: revisionId,
                eventDocumentId: {
                  _type: "reference",
                  _ref: documentId,
                  _weak: true,
                },
              });
              console.log(newDiscordEvent);
              discordMessageBody.content += `\n${discordServerInvite}?event=${discordEventId}`;
            }
          } catch (e) {
            console.log(`Unable to add discord event`);
          }

          // Create / update the Discord message via Webhook

          if (
            await HandleSendOrUpdateWebhookMessage({
              messageId: eventDiscordMessageId,
              channelId: discordChannelIdEvent,
              type: "event",
              documentId: documentId!,
              revisionId: revisionId!,
              messageDocumentId: discordEventMessageDocumentId,
              body: discordMessageBody,
            })
          ) {
            console.log(
              `Successfully posted ${documentId} event (Revision: ${revisionId}) to discord message.`
            );
          } else {
            console.log(
              `Unable to post message ${documentId} event (Revision: ${revisionId})`
            );
          }
        } else {
          // TODO: Make Discord events also delete
          const resDelete = await DeleteWebhookMessage({
            messageId: eventDiscordMessageId,
            channelId: discordChannelIdEvent,
            discordMessageDocumentId: discordEventMessageDocumentId,
          });
          if (resDelete) {
            console.log(`Successfully deleted message for an event`);
          } else {
            console.log(`Unable to delete message for an event`);
          }

          // Deletes the existing discord event
          if (previousDiscordEvent?._id) {
            await SendDiscordAPIRequest({
              method: "delete",
              path: `guilds/${discordServerId}/scheduled-events/${prevDiscordEventId}`,
            });
            console.log(`Deleting the document for a Discord Event`);
            await writeServerClient.delete(previousDiscordEvent._id);
          }
        }
        break;
      case "announcement":
        const announcementBody = body as {
          before: getLatestAnnouncement | null;
          after: getLatestAnnouncement | null;
        };
        // Parse for a valid announcement category
        const announcementCategory = (announcementBody.before?.category ??
          announcementBody.after?.category) as
          | SanityAnnouncementType
          | undefined;

        if (
          !announcementCategory ||
          !validAnnouncementCategories.includes(announcementCategory)
        ) {
          console.log(`Unable to parse valid announcement category`);
          return NextResponse.json({
            success: false,
            data: `Unable to parse valid announcement category`,
          });
        }

        const previousAnnounceDiscordMessage = await writeServerClient.fetch(
          groq`*[_type == "discordMessages" && type == "announcement" && announcementDocumentId._ref == $documentId][0]`,
          {
            documentId: documentId,
          }
        );

        const discordChannelIdsAnnouncementForType =
          discordChannelIdsAnnouncement[announcementCategory];

        const discordMessageDocumentMessageId =
          previousAnnounceDiscordMessage?.discordMessageId ?? undefined;

        const discordAnnouncementMessageDocumentId =
          previousAnnounceDiscordMessage?._id;

        console.log(
          `Handling ${
            announcementBody.after ? "CREATE/UPDATE" : "DELETE"
          } announcement.`,
          previousAnnounceDiscordMessage
        );
        if (announcementBody.after) {
          // Discord Message
          const mainEmbed: { color: number; image?: { url: string } } = {
            color: decimalColorCode,
          };
          if (announcementBody.after.image) {
            mainEmbed.image = {
              url: getURLForSanityImage(announcementBody.after.image)
                .quality(75)
                .url(),
            };
            embeds.push(mainEmbed);
          }

          if (textDescription.length > 0) {
            embeds.push({
              color: decimalColorCode,
              description:
                textDescription.length > maxDiscordTextLength
                  ? `${textDescription.substring(0, maxDiscordTextLength)}...`
                  : textDescription,
            });
          }

          const pingEveryone = announcementBody.after.pingEveryone;

          const discordMessageBody = {
            content: `${pingEveryone ? `@everyone\n` : ""}# [${
              announcementBody?.after.title ?? "No Title"
            }](${eventDirectLink})`,
            embeds: embeds,
          };

          //
          if (
            await HandleSendOrUpdateWebhookMessage({
              messageId: discordMessageDocumentMessageId,
              channelId: discordChannelIdsAnnouncementForType,
              type: "announcement",
              documentId: documentId!,
              revisionId: revisionId!,
              messageDocumentId: discordAnnouncementMessageDocumentId,
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
            channelId: discordChannelIdsAnnouncementForType,
            discordMessageDocumentId: discordAnnouncementMessageDocumentId,
          });
          if (resDelete) {
            console.log(`Successfully deleted message for an announcement`);
          } else {
            console.log(`Unable to delete message for an announcement`);
          }
        }
        break;
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false });
  }
}

async function HandleSendOrUpdateWebhookMessage({
  messageId,
  channelId,
  type,
  documentId,
  messageDocumentId,
  revisionId,
  body,
}: {
  messageId?: string;
  channelId: string;
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
    const updatedMessage = await SendDiscordAPIRequest({
      method: "patch",
      path: `/channels/${channelId}/messages/${messageId}`,
      body: body,
    });
    await writeServerClient
      .patch(messageDocumentId)
      .set({ revisionId: revisionId })
      .commit();
    console.log(
      `Updated ${documentId} event (Revision: ${revisionId}) to discord message: ${updatedMessage.data.id}`
    );
    return true;
  } else {
    const sentMessage = await SendDiscordAPIRequest({
      method: "post",
      path: `/channels/${channelId}/messages`,
      body,
    });
    const sentMessageId = sentMessage.data?.id;
    if (sentMessageId) {
      await writeServerClient.create({
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

async function DeleteWebhookMessage({
  discordMessageDocumentId,
  channelId,
  messageId,
}: {
  messageId?: string;
  channelId: string;
  discordMessageDocumentId?: string;
}): Promise<boolean> {
  if (discordMessageDocumentId)
    await writeServerClient.delete(discordMessageDocumentId);
  if (typeof messageId !== `string`) return true;
  const deleteMessage = await SendDiscordAPIRequest({
    method: "delete",
    path: `/channels/${channelId}/messages/${messageId}`,
  });
  return deleteMessage.status >= 200 && deleteMessage.status < 300;
}
