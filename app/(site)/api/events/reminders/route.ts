import groq from "groq";
import { NextResponse } from "next/server";
import { writeServerClient } from "~/app/(site)/serverClient";
import { getUpcomingEvents } from "~/app/sanity/lib/query";
import { SendDiscordAPIRequest } from "../../utils";
import { isXDaysAhead } from "~/app/(site)/utils";

const discordServerId = process.env.DISCORD_SERVER_ID;
const discordChannelIdEventReminder =
  process.env.DISCORD_EVENT_REMINDER_CHANNEL_ID!;

const discordServerInvite = process.env.DISCORD_SERVER_INVITE_LINK;

// TODO March 18, 2024: Look into parsing headers for Discord Rate Limits.
// https://discord.com/developers/docs/topics/rate-limits#rate-limits

export async function GET() {
  //   const reqHeaders = headers();
  //   if (reqHeaders.get("authorization") !== process.env.AUTH_TOKEN_EVENT_REMINDERS) {
  //     return NextResponse.json(
  //       {
  //         success: false,
  //         data: null,
  //       },
  //       {
  //         status: 401,
  //       }
  //     );
  //   }
  try {
    const currentEvents = await getUpcomingEvents(1000);
    const getAllDiscordEvents = await writeServerClient.fetch<
      {
        _id: string;
        discordEventId?: string;
        eventDocumentId?: {
          _ref: string;
        };
        reminders?: {
          month?: string;
          week?: string;
          day?: string;
        };
      }[]
    >(
      groq`*[_type == "discordEvents" && eventDocumentId._ref in $eventDocuments]`,
      {
        eventDocuments: currentEvents.map((event) => event._id),
      }
    );

    const successfulEventReminders: string[] = [];
    const totalDiscordEvents = getAllDiscordEvents.length;
    for (let index = 0; index < totalDiscordEvents; index++) {
      const discordEvent = getAllDiscordEvents[index];
      if (!discordEvent) continue;
      const discordEventDocumentId = discordEvent._id;
      const eventDocumentIdRef = discordEvent.eventDocumentId?._ref;
      const discordEventId = discordEvent?.discordEventId;
      const eventData = currentEvents.find(
        (event) => event._id === eventDocumentIdRef
      );
      if (!eventData) continue;
      try {
        let periodReminder: "month" | "week" | "day" | null = null;

        const currentDateISO = new Date().toISOString();
        if (!discordEvent.reminders?.month) {
          console.log(`Checking 30 days reminder for: ${eventDocumentIdRef}`);
          if (isXDaysAhead(currentDateISO, eventData.startDate, 30)) {
            console.log(
              `Preparing 30 days reminder for: ${eventDocumentIdRef}`
            );
            periodReminder = "month";
          }
        }

        if (!periodReminder && !discordEvent.reminders?.week) {
          console.log(`Checking 7 days reminder for: ${eventDocumentIdRef}`);
          if (isXDaysAhead(currentDateISO, eventData.startDate, 7)) {
            console.log(`Preparing 7 days reminder for: ${eventDocumentIdRef}`);
            periodReminder = "week";
          }
        }

        if (!periodReminder && !discordEvent.reminders?.day) {
          console.log(`Checking 1 day reminder for: ${eventDocumentIdRef}`);
          if (isXDaysAhead(currentDateISO, eventData.startDate, 1)) {
            console.log(`Preparing 1 day reminder for: ${eventDocumentIdRef}`);
            periodReminder = "day";
          }
        }

        if (periodReminder === null) {
          console.log(`No reminder for ${eventDocumentIdRef}`);
          continue;
        }

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
            `No reminder for ${eventDocumentIdRef} due to no interested users.`
          );
          continue;
        }

        console.log(`Notifying members for event Id: ${eventDocumentIdRef}`);

        const namePrefix = `EventPing_`;
        const roleName = eventData?.title.substring(0, 100 - namePrefix.length);
        const createNotifyRoleRequest = await SendDiscordAPIRequest({
          method: "post",
          path: `guilds/${discordServerId}/roles`,
          body: {
            name:
              typeof roleName === `string`
                ? `${namePrefix}${roleName}`
                : eventDocumentIdRef,
          },
        });
        if (createNotifyRoleRequest.status !== 200) {
          console.log(
            `Unable to create notification role for ${eventDocumentIdRef}: `,
            createNotifyRoleRequest.data
          );
          continue;
        }

        const eventReminderRoleId = createNotifyRoleRequest.data.id;

        // Add Discord notification role to all interested members
        for (let index = 0; index < totalInterestedUsers; index++) {
          const userId = allInterestedUserIds[index];
          await SendDiscordAPIRequest({
            method: "put",
            headers: {
              "X-Audit-Log-Reason": `Reminder for: ${eventDocumentIdRef}`,
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
            eventDocument: eventDocumentIdRef,
          }
        );
        console.log(eventDiscordMessage);

        // Send reminder Discord message
        const startDateSeconds = Math.round(
          new Date(eventData.startDate).getTime() / 1000
        );
        let discordMessageBody: {
          content: string;
          message_reference?: {
            message_id: string;
            fail_if_not_exists: false;
          };
        } = {
          content: `## Reminder\n\n**${
            eventData?.title ?? "Unknown event"
          }** is on <t:${startDateSeconds}> (<t:${startDateSeconds}:R>)\n|| <@&${eventReminderRoleId}> ||\n${discordServerInvite}?event=${discordEventId}`,
        };

        if (eventDiscordMessage?.discordMessageId) {
          discordMessageBody.message_reference = {
            message_id: eventDiscordMessage?.discordMessageId,
            fail_if_not_exists: false,
          };
        }

        const newReminderMessageRequest = await SendDiscordAPIRequest({
          method: "post",
          path: `/channels/${discordChannelIdEventReminder}/messages`,
          headers: {
            "X-Audit-Log-Reason": `Reminder for: ${eventDocumentIdRef}`,
          },
          body: discordMessageBody,
        });

        if (newReminderMessageRequest.status === 200) {
          //   Store the date and time of the reminder
          await writeServerClient
            .patch(discordEventDocumentId)
            .set({ reminders: { [periodReminder]: new Date() } })
            .commit();
        }

        // Delete the role right after sending message
        await SendDiscordAPIRequest({
          method: "delete",
          path: `guilds/${discordServerId}/roles/${eventReminderRoleId}`,
          headers: {
            "X-Audit-Log-Reason": `Reminder for: ${eventDocumentIdRef}`,
          },
          body: {
            name:
              typeof roleName === `string`
                ? `${namePrefix}${roleName}`
                : eventDocumentIdRef,
          },
        });
        successfulEventReminders.push(eventDocumentIdRef!);
      } catch (e) {
        console.log(`Unable to send reminders for ${eventDocumentIdRef}`);
      }
    }
    return NextResponse.json({
      success: true,
      data: `Successful event reminders: ${
        successfulEventReminders.length > 0
          ? successfulEventReminders.join(", ")
          : "No reminders"
      }`,
    });
  } catch (e) {
    console.log(`Unable to process reminders for `);
    return NextResponse.json(
      { success: false, data: `Internal Server Error` },
      { status: 500 }
    );
  }
}
