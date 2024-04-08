import groq from "groq";
import { NextResponse } from "next/server";
import { writeServerClient } from "~/app/(site)/serverClient";
import { getUpcomingEvents } from "~/app/sanity/lib/query";
import { NotifyInterestedDiscordMembersAboutEvent } from "../../utils";
import { isXDaysAhead } from "~/app/(site)/utils";
import { headers } from "next/headers";

export async function GET() {
  const reqHeaders = headers();
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
      const eventDocumentIdRef = discordEvent.eventDocumentId?._ref;
      const discordEventId = discordEvent?.discordEventId;
      const eventData = currentEvents.find(
        (event) => event._id === eventDocumentIdRef
      );
      if (!eventData) continue;
      try {
        type typeOfReminderEnum = "month" | "week" | "day";
        let periodReminder: typeOfReminderEnum | null = "month";

        const currentDateISO = new Date().toISOString();
        const CheckReminder = (
          typeOfReminder: typeOfReminderEnum,
          daysAhead: number
        ) => {
          console.log(
            `Checking ${daysAhead} days reminder for: ${eventDocumentIdRef}`
          );
          if (!isXDaysAhead(currentDateISO, eventData?.startDate!, daysAhead))
            console.log(
              `Preparing ${daysAhead} days reminder for: ${eventDocumentIdRef}`
            );
          periodReminder = typeOfReminder;
        };

        if (!discordEvent.reminders?.month) {
          CheckReminder("month", 30);
        }

        if (!periodReminder && !discordEvent.reminders?.week) {
          CheckReminder("week", 7);
        }

        if (!periodReminder && !discordEvent.reminders?.day) {
          CheckReminder("day", 1);
        }

        if (periodReminder === null) {
          console.log(`No reminder for ${eventDocumentIdRef}`);
          continue;
        }

        const statusOfNotification =
          await NotifyInterestedDiscordMembersAboutEvent({
            eventDocumentId: eventDocumentIdRef!,
            discordEventId: discordEventId!,
            eventReminder: {
              discordEventDocumentId: discordEvent._id,
              reminderInterval: periodReminder,
            },
            eventData,
            typeOfNotification: "reminder",
          });

        if (statusOfNotification)
          successfulEventReminders.push(eventDocumentIdRef!);
      } catch (e) {
        console.log(`Unable to send reminders for ${eventDocumentIdRef}`);
      }
    }
    const successMessage = `Successful event reminders: ${
      successfulEventReminders.length > 0
        ? successfulEventReminders.join(", ")
        : "No reminders"
    }`;
    console.log(successMessage);
    return NextResponse.json({
      success: true,
      data: successMessage,
    });
  } catch (e) {
    console.log(`Unable to process reminders for `);
    return NextResponse.json(
      { success: false, data: `Internal Server Error` },
      { status: 500 }
    );
  }
}
