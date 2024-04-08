import Link from "next/link";
import { MeetingMinutes, getMeetingMinutes } from "~/app/sanity/lib/query";
import {
  GetMeetingMinutesCreatedBy,
  GetTimeStringFromDate,
  getSlugFromDate,
  longMonthDayYearDateFormatOption,
} from "../utils";
import { LucideUserCheck, LucideUserMinus } from "lucide-react";
import RootLayout from "./root";
import { Metadata } from "next";
import { AppFullName } from "../config";
import { ExecutiveAvatar } from "./ExecutiveAvatar";
import BasicTooltip from "../components/General/Tooltip";

export const metadata: Metadata = {
  title: "Meeting Minutes",
  description: `View all the meeting minutes posted by the ${AppFullName}.`,
};
// export const revalidate = process.env.NODE_ENV === "development" ? 0 : 86400;
// export const dynamic = 'force-static';
export default async function Page() {
  const minutes = await getMeetingMinutes();
  return (
    <RootLayout>
      {minutes.length > 0 ? (
        <div className="flex flex-col gap-2 max-w-7xl mx-auto">
          {minutes.map((minutes) => (
            <BasicMeetingMinutesDisplay key={minutes._id} minutes={minutes} />
          ))}
        </div>
      ) : (
        <div className="text-center">No meeting minutes</div>
      )}
    </RootLayout>
  );
}

function BasicMeetingMinutesDisplay({ minutes }: { minutes: MeetingMinutes }) {
  const createdAt = new Date(minutes._createdAt);
  const calledAt = new Date(minutes.calledAt);
  const executivesAbsent = Array.isArray(minutes.executivesAbsent)
    ? minutes.executivesAbsent
    : [];

  const executivesPresent = Array.isArray(minutes.executivesPresent)
    ? minutes.executivesPresent
    : [];

  return (
    <Link
      className="bg-slate-200 dark:bg-slate-900 rounded-md p-3 flex flex-col"
      href={`/minutes/${minutes.slug}`}
    >
      <div className="text-lg sm:text-xl font-bold">
        {calledAt.toLocaleDateString(
          undefined,
          longMonthDayYearDateFormatOption
        )}{" "}
        at {GetTimeStringFromDate(calledAt)}
      </div>
      <div className="grid grid-cols-1 gap-1 lg:grid-cols-2 max-w-4xl lg:gap-16 py-1">
        <div className="flex flex-wrap items-center gap-1">
          <BasicTooltip content="Executives Present">
            <LucideUserCheck />
          </BasicTooltip>{" "}
          <span className="hidden sm:inline">Present: </span>
          {executivesPresent.map((executive) => (
            <ExecutiveAvatar key={executive.fullName} executive={executive} />
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-1">
          <BasicTooltip content="Executive Regrets">
            <LucideUserMinus />
          </BasicTooltip>{" "}
          <span className="hidden sm:inline">Regrets: </span>
          {executivesAbsent.length > 0 ? (
            executivesAbsent.map((executive) => (
              <ExecutiveAvatar key={executive.fullName} executive={executive} />
            ))
          ) : (
            <span>None</span>
          )}
        </div>
      </div>
      <div className="text-xs sm:text-sm border-t border-slate-300 dark:border-slate-700 pt-1">
        Created on{" "}
        <strong>
          {createdAt.toLocaleDateString(
            undefined,
            longMonthDayYearDateFormatOption
          )}
        </strong>{" "}
        at <strong>{GetTimeStringFromDate(createdAt)}</strong> by{" "}
        {GetMeetingMinutesCreatedBy(minutes.createdBy)}
      </div>
    </Link>
  );
}
