import groq from "groq";
import { NextResponse } from "next/server";
import { logger, writeServerClient } from "~/app/(site)/serverClient";
import { getUpcomingEvents } from "~/app/sanity/lib/query";
import { headers } from "next/headers";
import { isXDaysAhead } from "~/app/(site)/utils";
import { NotifyInterestedDiscordMembersAboutEvent } from "../../utils";

export const dynamic = "force-dynamic";
export async function GET() {
  const reqHeaders = await headers();
  if (
    reqHeaders.get("authorization") !== process.env.AUTH_TOKEN_EVENT_REMINDERS
  ) {
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

  try {
    logger.info(`Looking for event reminders`);
    const currentEvents = await getUpcomingEvents(1000);
    const getAllDiscordEvents =
      Array.isArray(currentEvents) && currentEvents.length > 0
        ? await writeServerClient.fetch<
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
          )
        : [];

    const successfulEventReminders: string[] = [];
    const totalDiscordEvents = getAllDiscordEvents.length;
    for (let index = 0; index < totalDiscordEvents; index++) {
      const discordEvent = getAllDiscordEvents[index];
      if (!discordEvent) continue;
      const eventDocumentIdRef = discordEvent.eventDocumentId?._ref;
      const discordEventId = discordEvent?.discordEventId;
      const eventData = currentEvents.find(
        (event) => event._id === eventDocumentIdRef
      );
      if (!eventData) continue;
      try {
        type typeOfReminderEnum = "month" | "week" | "day";
        let periodReminder: typeOfReminderEnum | null = null;

        const currentDateISO = new Date().toISOString();
        const CheckReminder = (
          typeOfReminder: typeOfReminderEnum,
          daysAhead: number,
          reminderPosted?: string
        ) => {
          if (periodReminder) {
            return;
          }
          logger.info(
            `Checking ${daysAhead} days reminder for: ${eventDocumentIdRef}`
          );
          if (reminderPosted) {
            logger.info(
              `Already posted ${daysAhead} days reminder for: ${eventDocumentIdRef}`
            );
            return;
          }
          if (!isXDaysAhead(currentDateISO, eventData?.startDate!, daysAhead)) {
            logger.info(
              `Too early for ${daysAhead} days reminder for: ${eventDocumentIdRef}`
            );
            return;
          }
          periodReminder = typeOfReminder;
        };

        CheckReminder("month", 30, discordEvent.reminders?.month);
        CheckReminder("week", 7, discordEvent.reminders?.week);
        CheckReminder("day", 1, discordEvent.reminders?.day);

        if (periodReminder === null) {
          logger.warn(`No reminder for: ${eventDocumentIdRef}`);
          continue;
        } else {
          logger.info(
            `Posting ${periodReminder} reminder for: ${eventDocumentIdRef}`
          );
        }

        const statusOfNotification =
          await NotifyInterestedDiscordMembersAboutEvent({
            eventDocumentId: eventDocumentIdRef!,
            discordEventId: discordEventId!,
            eventReminder: {
              discordEventDocumentId: discordEvent._id,
              reminderInterval: periodReminder,
              previousReminders: discordEvent.reminders,
            },
            eventData,
            typeOfNotification: "reminder",
          });

        if (statusOfNotification)
          successfulEventReminders.push(eventDocumentIdRef!);
      } catch (e) {
        logger.error(`Unable to send reminders for: ${eventDocumentIdRef}`);
        console.error(e);
      }
    }
    const successMessage = `Successful event reminders: ${
      successfulEventReminders.length > 0
        ? successfulEventReminders.join(", ")
        : "No reminders"
    }`;
    logger.info(successMessage);
    return NextResponse.json({
      success: true,
      data: successMessage,
    });
  } catch (e) {
    logger.error(`Unable to process reminders for ${new Date().toISOString()}`);
    return NextResponse.json(
      { success: false, data: `Internal Server Error` },
      { status: 500 }
    );
  }
}
