import Image from "next/image";
import { getUpcomingEventType } from "~/app/sanity/lib/query";
import {
  AreDatesTheSame,
  GetTimeStringFromDate,
  getURLForSanityImage,
} from "../utils";
import {
  LucideCalendarCheck,
  LucideCalendarDays,
  LucideCalendarMinus2,
  LucideCalendarX,
  LucideClock,
  LucideImageOff,
  LucideMapPin,
} from "lucide-react";
import InternalLinkButton from "../components/General/InternalLinkButton";
import { EventLocationDisplay } from "./EventLocationDisplay";
import BasicTooltip from "../components/General/Tooltip";

export function BasicEventDisplay({ event }: { event: getUpcomingEventType }) {
  const todayDate = new Date();
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);
  const isEventOccuring = todayDate > startDate && todayDate < endDate;

  const isStartingSoon =
    todayDate >
    new Date(new Date(startDate).setHours(startDate.getHours() - 1));

  const isEventToday = AreDatesTheSame(todayDate, startDate);

  const statusOfEvent = isEventOccuring
    ? "now"
    : isStartingSoon
    ? "soon"
    : isEventToday
    ? "today"
    : "";

  return (
    <div className="bg-slate-200 dark:bg-slate-900 rounded-md block w-full h-full">
      {(isEventOccuring || isStartingSoon || isEventToday) && (
        <div className="relative">
          <div className="absolute right-0 top-0">
            <span
              className="ml-2 bg-green-500 px-2 py-0.5 rounded-tr-md rounded-bl-md"
              aria-label={`The event is happening ${statusOfEvent}`}
            >
              {statusOfEvent.toUpperCase()}
            </span>
          </div>
        </div>
      )}
      <div className="w-full bg-slate-300 dark:bg-slate-950/50 rounded-t-md h-32 md:h-48 flex items-center justify-center">
        {event.image ? (
          <Image
            className="max-h-32 md:max-h-48 rounded-t-md w-auto"
            src={getURLForSanityImage(event.image).width(512).url()}
            alt={`${event.title} Banner Image`}
            width={512}
            height={128}
          />
        ) : (
          <LucideImageOff className="size-12" />
        )}
      </div>
      <div className="p-3">
        <div className="text-xl font-bold">{event.title}</div>
        <div
          className="flex items-center gap-1 text-sm"
          aria-label={`Start of event on ${startDate.toDateString()} at ${GetTimeStringFromDate(
            startDate
          )}`}
        >
          <BasicTooltip content="Start of event">
            <LucideCalendarCheck className="size-4" />
          </BasicTooltip>
          {startDate.toDateString()} at {GetTimeStringFromDate(startDate)}
        </div>
        <div
          className="flex items-center gap-1 text-sm"
          aria-label={`End of event on ${startDate.toDateString()} at ${GetTimeStringFromDate(
            startDate
          )}`}
        >
          <BasicTooltip content="End of event">
            <LucideCalendarX className="size-4" />
          </BasicTooltip>
          {endDate.toDateString()} at {GetTimeStringFromDate(endDate)}
        </div>
        <div className="flex items-center gap-1 text-sm mb-2">
          <LucideMapPin className="size-4" />
          <div>
            <EventLocationDisplay event={event} type="node" />
          </div>
        </div>
        <InternalLinkButton
          href={`/events/${event.slug}`}
          variant="information"
          size="xs"
        >
          Learn More
        </InternalLinkButton>
      </div>
    </div>
  );
}
