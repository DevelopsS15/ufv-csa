import { logger, writeServerClient } from "../serverClient";
import groq from "groq";
import { getUpcomingEventType } from "~/app/sanity/lib/query";
import { CapitalizeFirstLetter } from "../utils";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import { v4 as uuidv4 } from "uuid";

const discordServerId = process.env.DISCORD_SERVER_ID;
const discordChannelIdEventReminder =
  process.env.DISCORD_EVENT_REMINDER_CHANNEL_ID!;
const discordChannelIdEvent = process.env.DISCORD_EVENT_CHANNEL_ID!;

const discordServerInvite = process.env.DISCORD_SERVER_INVITE_LINK;
export const discordAPIRest = new REST({ version: "10" }).setToken(
  process.env.DISCORD_BOT_TOKEN!
);

export function GetDiscordTimestampString(
  date: string | Date,
  style: "t" | "T" | "d" | "D" | "f" | "F" | "R" | "" = ""
) {
  return `<t:${Math.round(new Date(date).getTime() / 1000)}${
    style.length > 0 ? `:${style}` : ""
  }>`;
}

export async function NotifyInterestedDiscordMembersAboutEvent({
  eventDocumentId,
  discordEventId,
  eventReminder,
  eventData,
  typeOfNotification,
  customMessageContents,
}: {
  discordEventId: string;
  eventDocumentId: string;
  eventData: getUpcomingEventType;
  eventReminder?: {
    discordEventDocumentId: string;
    reminderInterval: string;
    previousReminders:
      | {
          month?: string | undefined;
          week?: string | undefined;
          day?: string | undefined;
        }
      | undefined;
  };
  typeOfNotification: "reminder" | "update";
  customMessageContents?: string;
}) {
  const typeOfNotificationText = CapitalizeFirstLetter(typeOfNotification);
  const allInterestedUserIds: string[] = [];
  let nextPaginationUserId: string | null = null;
  // Fetch all interested users via pagination (Discord Limitation)
  do {
    const getInterestedUsersRequest = await discordAPIRest.get(
      `/${
        Routes.guildScheduledEventUsers(discordServerId!, discordEventId) +
        "?with_member=true" +
        (nextPaginationUserId ? `&after=${nextPaginationUserId}` : "")
      }`,
      {
        headers: {
          "X-Nonce": uuidv4(),
        },
      }
    );

    if (Array.isArray(getInterestedUsersRequest)) {
      // Get user Ids and roles. If no roles, user left or failed to get member data. Filter out to prevent overriding roles.
      const userIds: string[] = getInterestedUsersRequest.map(
        (user: { user_id: string; member?: { roles: string[] } }) =>
          user.user_id
      );

      allInterestedUserIds.push(...userIds);
      if (userIds.length === 100) {
        nextPaginationUserId = userIds[99] ?? null;
        continue;
      }
    }
    nextPaginationUserId = null;
  } while (typeof nextPaginationUserId === `string`);

  // Only notify if there is atleast one interested user
  const totalInterestedUsers = allInterestedUserIds.length;
  if (totalInterestedUsers === 0) {
    logger.info(
      `No ${typeOfNotification} notification for ${eventDocumentId} due to no interested users.`
    );
    return false;
  }

  logger.info(`Notifying members for event Id: ${eventDocumentId}`);

  const namePrefix = `EventPing_`;
  const roleName = eventData?.title.substring(0, 100 - namePrefix.length);
  const createNotifyRoleRequest = (await discordAPIRest.post(
    Routes.guildRoles(discordServerId!),
    {
      body: {
        name:
          typeof roleName === `string`
            ? `${namePrefix}${roleName}`
            : eventDocumentId,
      },
      headers: {
        "X-Nonce": uuidv4(),
      },
    }
  )) as { id: string };

  if (typeof createNotifyRoleRequest !== `object`) {
    logger.error(
      `Unable to create notification role for ${eventDocumentId}: `,
      createNotifyRoleRequest
    );
    return false;
  }

  const eventReminderRoleId = createNotifyRoleRequest.id;

  // Add Discord notification role to all interested members
  for (let index = 0; index < totalInterestedUsers; index++) {
    const userId = allInterestedUserIds[index];
    await discordAPIRest.put(
      Routes.guildMemberRole(discordServerId!, userId, eventReminderRoleId),
      {
        headers: {
          "X-Audit-Log-Reason": `${typeOfNotificationText} for: ${eventDocumentId}`,
          "X-Nonce": uuidv4(),
        },
      }
    );
  }

  const eventDiscordMessage = await writeServerClient.fetch<
    | {
        discordMessageId: string;
      }
    | undefined
  >(
    groq`*[_type == "discordMessages" && eventDocumentId._ref == $eventDocument][0]`,
    {
      eventDocument: eventDocumentId,
    }
  );

  // Send notification Discord message
  const startDateSeconds = Math.round(
    new Date(eventData.startDate).getTime() / 1000
  );
  const customMessageContentsWithLineBreak =
    typeof customMessageContents === `string` &&
    customMessageContents.length > 0
      ? `${customMessageContents}\n`
      : "";

  const ReminderIntervalBeforeText =
    typeof eventReminder?.reminderInterval === `string`
      ? `${CapitalizeFirstLetter(eventReminder?.reminderInterval)} before `
      : "";
  const originalEventMessageLink = `https://discord.com/channels/${discordServerId}/${discordChannelIdEvent}/${
    eventDiscordMessage?.discordMessageId ?? ""
  }`;

  const discordMessageBody = {
    content: `## ${ReminderIntervalBeforeText}${typeOfNotificationText}\n**${
      eventData?.title ?? "Unknown event"
    }** is on <t:${startDateSeconds}> (<t:${startDateSeconds}:R>) ${originalEventMessageLink}\n${customMessageContentsWithLineBreak}${discordServerInvite}?event=${discordEventId}\n|| <@&${eventReminderRoleId}> ||`,
  };

  const newReminderMessageRequest = await discordAPIRest.post(
    Routes.channelMessages(discordChannelIdEventReminder),
    {
      headers: {
        "X-Audit-Log-Reason": `${typeOfNotificationText} for: ${eventDocumentId}`,
        "X-Nonce": uuidv4(),
      },
      body: discordMessageBody,
    }
  );

  if (eventReminder && typeof newReminderMessageRequest === `object`) {
    //   Store the date and time of the reminder
    await writeServerClient
      .patch(eventReminder.discordEventDocumentId)
      .set({
        reminders: {
          ...(eventReminder.previousReminders ?? {}),
          ...{ [eventReminder.reminderInterval]: new Date() },
        },
      })
      .commit();
  }

  // Delete the role right after sending message
  await discordAPIRest.delete(
    Routes.guildRole(discordServerId!, eventReminderRoleId),
    {
      headers: {
        "X-Audit-Log-Reason": `${typeOfNotificationText} for: ${eventDocumentId}`,
        "X-Nonce": uuidv4(),
      },
    }
  );

  // Return false if the message failed to send.
  if (typeof newReminderMessageRequest !== `object`) {
    logger.error(
      `Unable to send event notification`,
      newReminderMessageRequest
    );
    return false;
  }
  return true;
}
