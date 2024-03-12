import Image from "next/image";
import { getUpcomingEventType } from "~/app/sanity/lib/query";
import {
  AreDatesTheSame,
  GetTimeStringFromDate,
  getURLForSanityImage,
} from "../utils";
import {
  LucideCalendarDays,
  LucideClock,
  LucideImageOff,
  LucideMapPin,
} from "lucide-react";
import InternalLinkButton from "../components/General/InternalLinkButton";
import { EventLocationDisplay } from "./EventLocationDisplay";

export function BasicEventDisplay({ event }: { event: getUpcomingEventType }) {
  const todayDate = new Date();
  const startDate = new Date(event.startDate);
  const isEventOccuring =
    todayDate > startDate && todayDate < new Date(event.endDate);

  const isStartingSoon =
    todayDate >
    new Date(new Date(startDate).setHours(startDate.getHours() - 1));

  const isEventToday = AreDatesTheSame(todayDate, startDate);

  return (
    <div
      className="bg-slate-200 dark:bg-slate-900 rounded-md block w-full h-full"
      key={event._id}
    >
      <div className="w-full bg-slate-300 dark:bg-slate-950/50 rounded-t-md h-32 md:h-48 flex items-center justify-center">
        {event.image ? (
          <Image
            className="max-h-32 md:max-h-48 rounded-t-md w-auto"
            src={getURLForSanityImage(event.image).width(512).url()}
            alt={"Author image"}
            width={512}
            height={128}
          />
        ) : (
          <LucideImageOff className="size-12" />
        )}
      </div>
      <div className="p-3">
        <div className="text-xl font-bold">{event.title}</div>
        <div className="flex items-center gap-1 text-sm">
          <LucideCalendarDays className="size-4" />
          <div>{startDate.toDateString()}</div>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <LucideClock className="size-4" />
          <div>
            {GetTimeStringFromDate(startDate)} to{" "}
            {GetTimeStringFromDate(new Date(event.endDate))}
            {(isEventOccuring || isStartingSoon || isEventToday) && (
              <span className="ml-2 bg-green-500 px-2 py-0.5 rounded-full">
                {isEventOccuring
                  ? "NOW"
                  : isStartingSoon
                    ? "SOON"
                    : isEventToday
                      ? "TODAY"
                      : ""}
              </span>
            )}
          </div>
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
