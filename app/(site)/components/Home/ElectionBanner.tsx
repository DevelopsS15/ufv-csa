"use client";

import {
  LucideArchive,
  LucideContact,
  LucidePartyPopper,
  LucideSpeech,
} from "lucide-react";
import { cn } from "../../utils";
import { Progress } from "../UI/progress";
import React from "react";
import { AppDiscordInviteLink, AppFullName } from "../../config";
import InternalLinkButton from "../General/InternalLinkButton";
import BasicTooltip from "../General/Tooltip";

export default function ElectionBanner() {
  return (
    <>
      <div className="text-3xl font-bold text-center">2025 Elections</div>
      <div className="my-6 md:grid md:grid-cols-4">
        <ElectionBannerTimelineSegment
          startDate={new Date("2025-04-07T12:00:00.000-07:00")}
          endDate={new Date("2025-04-19T12:00:00.000-07:00")}
          title="Nominations"
          description="Those who are interested in becoming an executive can self-nominate."
          link="https://forms.gle/aNRjRahQUfUAjTgaA"
          icon={<LucideContact />}
        />
        <ElectionBannerTimelineSegment
          startDate={new Date("2025-04-19T12:00:00.000-07:00")}
          endDate={new Date("2025-04-28T12:00:00.000-07:00")}
          title="Campaign"
          description="Get to know more about each candidate prior to voting"
          icon={<LucideSpeech />}
        />
        <ElectionBannerTimelineSegment
          startDate={new Date("2025-04-28T12:00:00.000-07:00")}
          endDate={new Date("2025-05-16T12:00:00.000-07:00")}
          title="Voting"
          description="Vote for your ideal candidate for each position"
          link="https://forms.cloud.microsoft/r/LaktdDTT6B"
          icon={<LucideArchive />}
        />
        <ElectionBannerTimelineSegment
          startDate={new Date("2025-05-16T12:00:00.000-07:00")}
          endDate={new Date("2025-05-16T12:00:00.000-07:00")}
          title="Results"
          description="The voting results are publicly announced"
          icon={<LucidePartyPopper />}
        />
      </div>
      <div className="flex flex-col gap-1 items-center text-center">
        Want to contribute to the future of the {AppFullName}?
        <InternalLinkButton variant="success" href={AppDiscordInviteLink}>
          Join Discord
        </InternalLinkButton>
      </div>
    </>
  );
}

function ElectionBannerTimelineSegment({
  title,
  link,
  description,
  startDate,
  endDate,
  icon,
}: {
  title: string;
  link?: string;
  description: string;
  startDate: Date;
  endDate: Date;
  icon: JSX.Element;
}) {
  startDate.setHours(0);
  startDate.setMinutes(0);
  startDate.setSeconds(0);
  startDate.setMilliseconds(0);
  //
  endDate.setHours(23);
  endDate.setMinutes(59);
  endDate.setSeconds(59);
  endDate.setMilliseconds(999);
  const [elapsedMs, setElapsedMs] = React.useState<number>(
    new Date().getTime() - startDate.getTime()
  );
  const [leftOverMs, setLeftOverMs] = React.useState<number>(0);
  const elapsedPercent = React.useMemo(() => {
    const totalMs = endDate.getTime() - startDate.getTime();
    return Math.floor((elapsedMs / totalMs) * 100);
  }, [elapsedMs, endDate, startDate]);

  const isDatePriorToSegment = elapsedPercent <= 0;
  const isDateAfterSegment = elapsedPercent >= 100;

  React.useEffect(() => {
    if (isDateAfterSegment) return;
    const interval = setInterval(() => {
      const currentDate = new Date();
      setLeftOverMs(endDate.getTime() - currentDate.getTime());
      setElapsedMs(currentDate.getTime() - startDate.getTime());
    }, 1000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [endDate, isDateAfterSegment, startDate]);

  const timeUntilEndSeconds = Math.abs(Math.round(leftOverMs / 1000));
  const days = Math.floor(timeUntilEndSeconds / (3600 * 24));
  const hours = Math.floor((timeUntilEndSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((timeUntilEndSeconds % 3600) / 60);
  const remainingSeconds = timeUntilEndSeconds % 60;

  return (
    <div>
      <div className="flex items-center mt-4 md:mt-0">
        {!isDateAfterSegment ? (
          <BasicTooltip
            content={`${
              isDatePriorToSegment
                ? `Starts in`
                : isDateAfterSegment
                ? "Ended"
                : "Ends in"
            } ${days} days, ${hours} hours, ${minutes} minutes, ${remainingSeconds} seconds`}
          >
            <ElectionBannerTimelineSegmentIcon
              isDatePriorToSegment={isDatePriorToSegment}
              icon={icon}
            />
          </BasicTooltip>
        ) : (
          <ElectionBannerTimelineSegmentIcon
            isDatePriorToSegment={isDatePriorToSegment}
            icon={icon}
          />
        )}
        <Progress
          className="h-1.5 rounded-l-none md:rounded-none"
          value={isDateAfterSegment ? 100 : elapsedPercent}
          max={100}
        />
      </div>
      <div className="md:mt-2 md:pe-4">
        <a
          className={cn(
            "text-lg font-semibold text-gray-900 dark:text-white",
            link ? "underline" : ""
          )}
          href={link}
          target="_blank"
        >
          {title}
        </a>
        <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-300">
          Start{isDatePriorToSegment ? "s" : "ed"} on{" "}
          {new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            timeZone: "America/Los_Angeles",
          }).format(startDate)}
        </time>
        <p className="text-base font-normal text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
}

function ElectionBannerTimelineSegmentIcon({
  isDatePriorToSegment,
  icon,
}: {
  isDatePriorToSegment: boolean;
  icon: JSX.Element;
}) {
  return (
    <div className="z-10 flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full ring-white dark:bg-gray-900 p-2 dark:ring-gray-900">
      {React.cloneElement(icon, {
        className: isDatePriorToSegment
          ? "stroke-white-500"
          : "stroke-green-500",
      })}
    </div>
  );
}
