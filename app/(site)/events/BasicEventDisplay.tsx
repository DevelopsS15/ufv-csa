import Image from "next/image";
import { getUpcomingEventType } from "~/app/sanity/lib/query";
import { CapitalizeFirstLetter, GetTimeStringFromDate, getURLForSanityImage } from "../utils";
import {
  LucideCalendarCheck,
  LucideCalendarX,
  LucideDollarSign,
  LucideImageOff,
  LucideMapPin,
} from "lucide-react";
import InternalLinkButton from "../components/General/InternalLinkButton";
import { EventLocationDisplay } from "./EventLocationDisplay";
import BasicTooltip from "../components/General/Tooltip";
import { StatusOfEventClient } from "./StatusOfEventClient";

export function BasicEventDisplay({ event }: { event: getUpcomingEventType }) {
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);
  return (
    <div className="bg-slate-200 dark:bg-slate-900 rounded-md block w-full h-full">
      <StatusOfEventClient event={event} />
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
            <LucideCalendarCheck className="size-4 min-w-4" />
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
            <LucideCalendarX className="size-4 min-w-4" />
          </BasicTooltip>
          {endDate.toDateString()} at {GetTimeStringFromDate(endDate)}
        </div>
        <div className="flex items-center gap-1 text-sm">
          <LucideMapPin className="size-4 min-w-4" />
          <div>
            <EventLocationDisplay event={event} type="node" />
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm mb-2">
          <LucideDollarSign className="size-4 min-w-4" />
          <div>{CapitalizeFirstLetter(event.price)}</div>
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
