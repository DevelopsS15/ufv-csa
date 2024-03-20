import axios from "axios";
import { writeServerClient } from "../serverClient";
import groq from "groq";
import { getUpcomingEventType } from "~/app/sanity/lib/query";
import { CapitalizeFirstLetter } from "../utils";

const discordServerId = process.env.DISCORD_SERVER_ID;
const discordChannelIdEventReminder =
  process.env.DISCORD_EVENT_REMINDER_CHANNEL_ID!;
const discordChannelIdEvent = process.env.DISCORD_EVENT_CHANNEL_ID!;

const discordServerInvite = process.env.DISCORD_SERVER_INVITE_LINK;

export async function SendDiscordAPIRequest(options: {
  method: "get" | "post" | "patch" | "delete" | "put";
  headers?: Record<string, any>;
  path: string;
  body?: any;
}) {
  return await axios(`https://discord.com/api/v10/${options.path}`, {
    method: options.method,
    headers: {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      ...(options.headers ?? {}),
    },
    validateStatus: () => true,
    data: options.body,
  });
}

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
  };
  typeOfNotification: "reminder" | "update";
  customMessageContents?: string;
}) {
  const typeOfNotificationText = CapitalizeFirstLetter(typeOfNotification);
  const allInterestedUserIds: string[] = [];
  let nextPaginationUserId: string | null = null;
  // Fetch all interested users via pagination (Discord Limitation)
  do {
    const getInterestedUsersRequest = await SendDiscordAPIRequest({
      method: "get",
      path:
        `guilds/${discordServerId}/scheduled-events/${discordEventId}/users?with_member=true` +
        (nextPaginationUserId ? `&after=${nextPaginationUserId}` : ""),
    });

    if (
      getInterestedUsersRequest.status === 200 &&
      Array.isArray(getInterestedUsersRequest.data)
    ) {
      // Get user Ids and roles. If no roles, user left or failed to get member data. Filter out to prevent overriding roles.
      const userIds: string[] = getInterestedUsersRequest.data.map(
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
    console.log(
      `No ${typeOfNotification} notification for ${eventDocumentId} due to no interested users.`
    );
    return false;
  }

  console.log(`Notifying members for event Id: ${eventDocumentId}`);

  const namePrefix = `EventPing_`;
  const roleName = eventData?.title.substring(0, 100 - namePrefix.length);
  const createNotifyRoleRequest = await SendDiscordAPIRequest({
    method: "post",
    path: `guilds/${discordServerId}/roles`,
    body: {
      name:
        typeof roleName === `string`
          ? `${namePrefix}${roleName}`
          : eventDocumentId,
    },
  });
  if (createNotifyRoleRequest.status !== 200) {
    console.log(
      `Unable to create notification role for ${eventDocumentId}: `,
      createNotifyRoleRequest.data
    );
    return false;
  }

  const eventReminderRoleId = createNotifyRoleRequest.data.id;

  // Add Discord notification role to all interested members
  for (let index = 0; index < totalInterestedUsers; index++) {
    const userId = allInterestedUserIds[index];
    await SendDiscordAPIRequest({
      method: "put",
      headers: {
        "X-Audit-Log-Reason": `${typeOfNotificationText} for: ${eventDocumentId}`,
      },
      path: `guilds/${discordServerId}/members/${userId}/roles/${eventReminderRoleId}`,
    });
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
  console.log(eventDiscordMessage);

  // Send notification Discord message
  const startDateSeconds = Math.round(
    new Date(eventData.startDate).getTime() / 1000
  );
  const customMessageContentsWithLineBreak =
    typeof customMessageContents === `string` &&
    customMessageContents.length > 0
      ? `${customMessageContents}\n`
      : "";

  const discordMessageBody = {
    content: `## ${typeOfNotificationText}\n**${
      eventData?.title ?? "Unknown event"
    }** is on <t:${startDateSeconds}> (<t:${startDateSeconds}:R>) https://discord.com/channels/${discordServerId}/${discordChannelIdEvent}/${
      eventDiscordMessage?.discordMessageId ?? ""
    }\n${customMessageContentsWithLineBreak}${discordServerInvite}?event=${discordEventId}\n|| <@&${eventReminderRoleId}> ||`,
  };

  const newReminderMessageRequest = await SendDiscordAPIRequest({
    method: "post",
    path: `/channels/${discordChannelIdEventReminder}/messages`,
    headers: {
      "X-Audit-Log-Reason": `${typeOfNotificationText} for: ${eventDocumentId}`,
    },
    body: discordMessageBody,
  });

  if (eventReminder && newReminderMessageRequest.status === 200) {
    //   Store the date and time of the reminder
    await writeServerClient
      .patch(eventReminder.discordEventDocumentId)
      .set({ reminders: { [eventReminder.reminderInterval]: new Date() } })
      .commit();
  }

  // Delete the role right after sending message
  await SendDiscordAPIRequest({
    method: "delete",
    path: `guilds/${discordServerId}/roles/${eventReminderRoleId}`,
    headers: {
      "X-Audit-Log-Reason": `${typeOfNotificationText} for: ${eventDocumentId}`,
    },
    body: {
      name:
        typeof roleName === `string`
          ? `${namePrefix}${roleName}`
          : eventDocumentId,
    },
  });

  // Return false if the message failed to send.
  if (newReminderMessageRequest.status !== 200) {
    console.log(
      `Unable to send event notification`,
      newReminderMessageRequest.data
    );
    return false;
  }
  return true;
}
