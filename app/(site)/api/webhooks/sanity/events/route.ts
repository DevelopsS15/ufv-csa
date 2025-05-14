import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import groq from "groq";
import { getEventType, getLatestAnnouncement } from "~/app/sanity/lib/query";
import {
  CapitalizeFirstLetter,
  SanityImageWithAltType,
  getURLForSanityImage,
} from "~/app/(site)/utils";
const toMarkdown = require("@sanity/block-content-to-markdown");
import { EventLocationDisplay } from "~/app/(site)/events/EventLocationDisplay";
import { SanityAnnouncementType } from "~/app/types";
import { logger, writeServerClient } from "~/app/(site)/serverClient";
import { revalidatePath, revalidateTag } from "next/cache";
import {
  GetDiscordTimestampString,
  NotifyInterestedDiscordMembersAboutEvent,
  discordAPIRest,
} from "../../../utils";
import { allCampusOptions } from "~/app/sanity/schemas/event";
import { headers } from "next/headers";
import { Routes } from "discord-api-types/v10";
import { caching } from "cache-manager";
import { v4 as uuidv4 } from "uuid";

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

const eventDirectLinkDomain = `http${process.env.NODE_ENV === "development" ? "" : "s"
  }://${process.env.SITE_DOMAIN}`;

const memoryCache = caching("memory", {
  max: 100,
  ttl: 30 * 60 * 1000, // 30 minutes
});

export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  let loggerForRoute = logger.child({ script: "\\webhooks\\sanity\\events" });
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
      loggerForRoute.error(`Invalid signature`);
      return NextResponse.json(
        { message, isValidSignature, body },
        {
          status: 401,
        }
      );
    }

    if (!body) {
      return NextResponse.json({ success: false });
    }

    const reqHeaders = headers();
    const idempotencyKey = reqHeaders.get("idempotency-key");
    if (typeof idempotencyKey !== `string`) {
      loggerForRoute.error(`No idempotency-key provided`);
      return NextResponse.json({ success: false });
    }

    const getIdempotencyKey = await (await memoryCache).get(idempotencyKey);
    if (getIdempotencyKey) {
      loggerForRoute.warn(
        `Already handled idempotency-key provided ${idempotencyKey}`
      );
      return NextResponse.json({ success: false });
    } else {
      await (await memoryCache).set(idempotencyKey!, true);
    }

    const documentType = body.before?._type ?? body.after?._type;
    const documentId = body.before?._id ?? body.after?._id;
    if (typeof documentId !== `string`) {
      loggerForRoute.warn(`No document id`);
      return NextResponse.json({ message: "Bad Request", body });
    }
    loggerForRoute = logger.child({
      sanityIdempotencyKey: idempotencyKey,
      sanityDocumentId: documentId,
      script: "\\webhooks\\sanity\\events",
    });
    if (typeof documentType !== `string`) {
      loggerForRoute.warn(`No document type`);
      return NextResponse.json({ message: "Bad Request", body });
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
        revalidateTag("events");
        revalidatePath(`/${parentStaleRoute}/${staleRouteSlug}`, "page");
        break;
      case "meetingMinutes":
        parentStaleRoute = "minutes";
        revalidateTag("meetingMinutes");
        revalidatePath(`/${parentStaleRoute}/${staleRouteSlug}`, "page");
        break;
      case "announcement":
        parentStaleRoute = "announcements";
        revalidateTag("announcements");
        revalidatePath("/api/announcements/latest", "page");
        revalidatePath(`/${parentStaleRoute}/${staleRouteSlug}`, "page");
        break;
      case "executives":
        revalidateTag("executives");
        parentStaleRoute = "executives";
        break;
      case "roomStatus":
        revalidateTag("roomStatus");
        revalidatePath("/", "page");
        revalidatePath("/scc", "page");
        revalidatePath("/api/room-status", "page");
        break;
    }

    if (parentStaleRoute.length > 0) {
      loggerForRoute.info(`Revalidated parent route: ${parentStaleRoute}`);
      revalidatePath(`/${parentStaleRoute}`, "page");
    }

    if (documentType !== "event" && documentType !== "announcement") {
      loggerForRoute.info(`Not an event/announcement so ignoring`);
      const message = "Bad Request";
      return NextResponse.json({ message, body });
    }

    const revisionId = body.after?._rev;

    const decimalColorCode = 5414976;
    const maxDiscordTextLength = 3000;

    loggerForRoute.info(`Received potential event/announcement from Sanity`);

    const embeds = [];
    const eventDirectLink = `${eventDirectLinkDomain}/${documentType}s/${documentSlug?.current ?? ""
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
            link: (props: { children: string[], mark: { href: string; } }) => {
              if (props.children.length === 0) return props.mark.href;
              return `[${props.children[0]}](${props.mark.href})`;
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
        const previousEventDiscordMessage = (await writeServerClient.fetch(
          groq`*[_type == "discordMessages" && type == "event" && eventDocumentId._ref == $documentId][0]`,
          {
            documentId: documentId,
          }
        )) as Record<string, any> | null;

        const eventDiscordMessageId =
          previousEventDiscordMessage?.discordMessageId ?? undefined;
        const discordEventMessageDocumentId = previousEventDiscordMessage?._id;
        loggerForRoute.info(
          `Handling ${body.after ? "CREATE/UPDATE" : "DELETE"} event.`,
          previousEventDiscordMessage
        );

        const previousDiscordEvent = (await writeServerClient.fetch(
          groq`*[_type == "discordEvents" && eventDocumentId._ref == $documentId][0]`,
          {
            documentId: documentId,
          }
        )) as Record<string, any> | null;
        const previousDiscordEventId = previousDiscordEvent?.discordEventId;

        if (body.after) {
          // Discord Message
          const afterStartDate = new Date(body.after.startDate);

          const eventLocationStringMarkdown = EventLocationDisplay({
            event: body.after,
            type: "string",
            withMarkdown: true,
          });

          const eventLocationString = EventLocationDisplay({
            event: body.after,
            type: "string",
            withMarkdown: false,
          });

          let mainEmbedDescription = `:calendar_spiral: **Start:** ${GetDiscordTimestampString(
            afterStartDate
          )} (${GetDiscordTimestampString(afterStartDate, "R")})\n`;
          mainEmbedDescription += `:calendar_spiral: **End:** ${GetDiscordTimestampString(
            new Date(body.after.endDate)
          )}\n`;
          mainEmbedDescription += `:round_pushpin: **Location:** ${eventLocationStringMarkdown}\n`;
          mainEmbedDescription += `:dollar: **Price:** ${CapitalizeFirstLetter(
            body.after.price
          )}\n`;

          const bookTicket = body.after.bookTicket;
          if (bookTicket) {
            mainEmbedDescription += `:tickets: **Register:** ${bookTicket}\n`;
          }

          const relevantLinks = body.after.relevantLinks;
          if (relevantLinks && relevantLinks.length > 0) {
            mainEmbedDescription += `:globe_with_meridians: **Relevant Links:** ${relevantLinks
              .join(", ")}`;
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
            enforce_nonce: true,
          };

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

          // Event already has Discord Event
          if (previousDiscordEvent) {
            try {
              loggerForRoute.info(
                `Updating Discord Event ${previousDiscordEventId}`
              );
              discordMessageBody.content += `\n${discordServerInvite}?event=${previousDiscordEventId}`;
              await discordAPIRest.patch(
                Routes.guildScheduledEvent(
                  discordServerId!,
                  previousDiscordEventId
                ),
                {
                  body: discordEventBody
                }
              );

              // Only send Event Notification if one of the below values have changed.
              const detectedChanges: {
                variableName: string;
                beforeValue: string;
                afterValue: string;
              }[] = [];
              const { before, after } = body;

              const pushIfHasChanged = (
                beforeValue: string,
                afterValue: string,
                variableName: string
              ) => {
                if (beforeValue === afterValue) return;
                detectedChanges.push({ variableName, beforeValue, afterValue });
              };

              // If start date changed, output dates as Discord timestamp format
              if (before?.startDate !== after.startDate) {
                const beforeStartDate = new Date(body.before?.startDate!);
                detectedChanges.push({
                  variableName: "Start of Event",
                  beforeValue: GetDiscordTimestampString(beforeStartDate),
                  afterValue: GetDiscordTimestampString(afterStartDate),
                });
              }

              // If end date changed, output dates as Discord timestamp format
              if (before?.endDate !== after.endDate) {
                const beforeEndDate = new Date(body.before?.endDate!);
                const afterEndDate = new Date(body.after?.endDate!);
                detectedChanges.push({
                  variableName: "End of Event",
                  beforeValue: GetDiscordTimestampString(beforeEndDate),
                  afterValue: GetDiscordTimestampString(afterEndDate),
                });
              }

              // If campus changed, get campus name instead of abbreviation
              if (before?.campus !== after.campus) {
                const beforeCampusData = allCampusOptions.find(
                  (campus) => campus.value === before?.campus
                );
                const afterCampusData = allCampusOptions.find(
                  (campus) => campus.value === after?.campus
                );
                detectedChanges.push({
                  variableName: "Campus",
                  beforeValue: beforeCampusData?.title ?? before?.campus!,
                  afterValue: afterCampusData?.title ?? after?.campus!,
                });
              }

              pushIfHasChanged(
                before?.building ?? "TBD",
                after.building ?? "TBD",
                "Building"
              );
              pushIfHasChanged(
                before?.room ?? "TBD",
                after.room ?? "TBD",
                "Room"
              );

              if (detectedChanges.length > 0) {
                const statusOfNotification =
                  await NotifyInterestedDiscordMembersAboutEvent({
                    eventDocumentId: documentId!,
                    discordEventId: previousDiscordEventId,
                    customMessageContents: `\n${detectedChanges
                      .map(
                        (change) =>
                          `**${change.variableName}**: ${change.beforeValue} **==>** ${change.afterValue}`
                      )
                      .join("\n")}\n`,
                    typeOfNotification: "update",
                    eventData: body.after,
                  });
                loggerForRoute.info(
                  `Updating Discord Event notification: ${statusOfNotification}`
                );
              } else {
                loggerForRoute.info(
                  `No Discord Event notification as no relevant variables changed.`
                );
              }
            } catch (e) {
              loggerForRoute.error(
                `Unable to edit discord event and send update notification`
              );
              console.error(e);
            }
          } else {
            try {
              const apiEvent = (await discordAPIRest.post(
                Routes.guildScheduledEvents(discordServerId!),
                {
                  body: discordEventBody
                }
              )) as { id: string };
              const discordEventId = apiEvent?.id;
              loggerForRoute.info(`Created Discord Event ${discordEventId}`);

              await writeServerClient.create({
                _type: "discordEvents",
                discordEventId: discordEventId,
                revisionId: revisionId,
                eventDocumentId: {
                  _type: "reference",
                  _ref: documentId,
                  _weak: true,
                },
              });
              discordMessageBody.content += `\n${discordServerInvite}?event=${discordEventId}`;
            } catch (e) {
              loggerForRoute.error(`Unable to create discord event`);
              console.error(e);
            }
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
            loggerForRoute.info(
              `Successfully posted/edited ${documentId} event (Revision: ${revisionId}) to discord message.`
            );
          } else {
            loggerForRoute.error(
              `Unable to post/edit message ${documentId} event (Revision: ${revisionId})`
            );
          }
        } else {
          // Deletes the corresponding Discord Message
          const resDelete = await DeleteDiscordMessageViaAPI({
            messageId: eventDiscordMessageId,
            channelId: discordChannelIdEvent,
            discordMessageDocumentId: discordEventMessageDocumentId,
          });
          if (resDelete) {
            loggerForRoute.info(`Successfully deleted message for an event`);
          } else {
            loggerForRoute.error(`Unable to delete message for an event`);
          }

          // Deletes the existing discord event
          if (previousDiscordEvent?._id) {
            await discordAPIRest.delete(
              Routes.guildScheduledEvent(
                discordServerId!,
                previousDiscordEventId
              )
            );
            loggerForRoute.info(`Deleting the document for a Discord Event`);
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
          loggerForRoute.error(`Unable to parse valid announcement category`);
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

        loggerForRoute.info(
          `Handling ${announcementBody.after ? "CREATE/UPDATE" : "DELETE"
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
            content: `${pingEveryone ? `@everyone\n` : ""}# [${announcementBody?.after.title ?? "No Title"
              }](${eventDirectLink})`,
            embeds: embeds,
            enforce_nonce: true,
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
            loggerForRoute.info(
              `Successfully posted ${documentId} announcement (Revision: ${revisionId}) to discord message.`
            );
          } else {
            loggerForRoute.error(
              `Unable to post/update discord message ${documentId} announcement (Revision: ${revisionId})`
            );
          }
        } else {
          const resDelete = await DeleteDiscordMessageViaAPI({
            messageId: discordMessageDocumentMessageId,
            channelId: discordChannelIdsAnnouncementForType,
            discordMessageDocumentId: discordAnnouncementMessageDocumentId,
          });
          if (resDelete) {
            loggerForRoute.info(
              `Successfully deleted message for an announcement`
            );
          } else {
            loggerForRoute.error(
              `Unable to delete message for an announcement`
            );
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
  try {
    if (messageId) {
      logger.debug(
        `Trying to update webhook message for ${bodyType} ${documentId}`
      );
      const updatedMessage = (await discordAPIRest.patch(
        Routes.channelMessage(channelId, messageId),
        {
          body,
          headers: {
            "X-Nonce": uuidv4(),
          },
        }
      )) as { id: string };
      await writeServerClient
        .patch(messageDocumentId)
        .set({ revisionId: revisionId })
        .commit();
      logger.info(
        `Updated ${documentId} event (Revision: ${revisionId}) to discord message: ${updatedMessage?.id}`
      );
      return true;
    } else {
      logger.debug(
        `Trying to send webhook message for ${bodyType} ${documentId}`
      );
      const sentMessage = (await discordAPIRest.post(
        Routes.channelMessages(channelId),
        {
          body,
          headers: {
            "X-Nonce": uuidv4(),
          },
        }
      )) as { id: string };
      const sentMessageId = sentMessage?.id;
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
  } catch (e) {
    logger.error(
      `Unexpected error for sending/updating webhook message for ${bodyType} ${documentId}`
    );
    console.error(e);
  }
  return false;
}

async function DeleteDiscordMessageViaAPI({
  discordMessageDocumentId,
  channelId,
  messageId,
}: {
  messageId?: string;
  channelId: string;
  discordMessageDocumentId?: string;
}): Promise<boolean> {
  try {
    if (typeof messageId !== `string`) return true;
    await discordAPIRest.delete(Routes.channelMessage(channelId, messageId));
    if (discordMessageDocumentId)
      await writeServerClient.delete(discordMessageDocumentId);
    return true;
  } catch (e) {
    logger.error(
      `Unable to delete the discord message ${messageId} for documentId: ${discordMessageDocumentId}`
    );
    console.error(e);
    return false;
  }
}
