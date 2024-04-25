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

export default function ElectionBanner() {
  return (
    <>
      <div className="text-3xl font-bold text-center">2024 Elections</div>
      <div className="my-6 md:grid md:grid-cols-4">
        <ElectionBannerTimelineSegment
          startDate={new Date("2024-03-04T12:00:00.000-07:00")}
          endDate={new Date("2024-04-22T12:00:00.000-07:00")}
          title="Nominations"
          description="Those who are interested in becoming an executive can self-nominate."
          link="https://forms.gle/q33YLi3pB4fquPMU9"
          icon={<LucideContact />}
        />
        <ElectionBannerTimelineSegment
          startDate={new Date("2024-04-23T12:00:00.000-07:00")}
          endDate={new Date("2024-04-30T12:00:00.000-07:00")}
          title="Campaign"
          description="Get to know more about each candidate prior to voting"
          link="https://csa.ufv.ca/announcements/csa-nominee-campaign-begins-now"
          icon={<LucideSpeech />}
        />
        <ElectionBannerTimelineSegment
          startDate={new Date("2024-05-01T12:00:00.000-07:00")}
          endDate={new Date("2024-05-14T12:00:00.000-07:00")}
          title="Voting"
          description="Vote for your ideal candidate for each position"
          icon={<LucideArchive />}
        />
        <ElectionBannerTimelineSegment
          startDate={new Date("2024-05-15T12:00:00.000-07:00")}
          endDate={new Date("2024-05-15T12:00:00.000-07:00")}
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
  const [currentDate, setCurrentDate] = React.useState<Date>(new Date());
  const totalMs = endDate.getTime() - startDate.getTime();
  const elapsedMs = currentDate.getTime() - startDate.getTime();
  const elapsedPercent = Math.floor((elapsedMs / totalMs) * 100);
  const isDatePriorToSegment = elapsedPercent <= 0;
  const isDateAfterSegment = elapsedPercent >= 100;

  React.useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  return (
    <div>
      <div className="flex items-center mt-4 md:mt-0">
        <div className="z-10 flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full ring-white dark:bg-gray-900 p-2 dark:ring-gray-900">
          {React.cloneElement(icon, {
            className: isDatePriorToSegment
              ? "stroke-white-500"
              : "stroke-green-400",
          })}
        </div>
        <div className="flex w-full bg-gray-200 h-0.5 dark:bg-gray-700">
          <Progress
            className="h-1"
            value={isDateAfterSegment ? 100 : elapsedPercent}
            max={100}
          />
        </div>
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
