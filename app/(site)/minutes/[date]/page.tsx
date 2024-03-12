import { PortableText } from "@portabletext/react";
import {
  CalculateHourAndMinutesBetweenTwoDates,
  GetMeetingMinutesCreatedBy,
  GetTimeStringFromDate,
  getSlugFromDate,
  getURLForSanityImage,
  longMonthDayYearDateFormatOption,
  sanityBlocksToText,
  sanityBodyPTComponents,
} from "../../utils";
import { getAnnouncement, getMeetingMinute } from "~/app/sanity/lib/query";
import {
  LucideArrowLeft,
  LucideUserCheck,
  LucideUserMinus,
} from "lucide-react";
import { Separator } from "../../components/UI/separator";
import InternalLinkButton from "../../components/General/InternalLinkButton";
import Link from "next/link";
import BannerImageWithBlurredBackground from "../../components/BannerImageWithBlurredBackground";
import { Metadata, ResolvingMetadata } from "next";
import { AppEmail, AppFullName } from "../../config";
import { ExecutiveAvatar } from "../ExecutiveAvatar";
import { Image as SanityImageType } from "sanity";
import Loading from "./loading";

type Props = {
  params: { date: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const date = params.date;
  const meetingMinute = await getMeetingMinute(date);

  if (!meetingMinute) {
    return {
      title: "Meeting minutes not found",
      description: "",
    };
  }

  const calledAtDate = new Date(meetingMinute.calledAt);
  const limitedTitle = `Meeting Minutes for ${calledAtDate.toDateString()} at ${GetTimeStringFromDate(
    calledAtDate,
  )}`;

  return {
    title: limitedTitle,
    description: "",
    openGraph: {
      emails: [AppEmail],
      title: limitedTitle,
      description: "",
      publishedTime: meetingMinute._createdAt,
      authors: Array.isArray(meetingMinute.createdBy)
        ? meetingMinute.createdBy.map((createdBy) => createdBy.fullName)
        : undefined,
      images: [],
      siteName: AppFullName,
      locale: "en_US",
      type: "article",
    },
  };
}

export const revalidate = process.env.NODE_ENV === "development" ? 0 : 43_200; // 12 hours
export default async function Page({ params }: Props) {
  const { date } = params;
  const meetingMinute = await getMeetingMinute(date);
  if (!meetingMinute) {
    return (
      <div className="w-11/12 sm:w-9/12 md:w-7/12 py-8 mx-auto flex items-center justify-center flex-col gap-2">
        <div className="text-3xl font-bold">Error 404</div>
        <div>Unable to find those meeting minutes.</div>
        <InternalLinkButton variant="success" href="/minutes">
          View Minutes
        </InternalLinkButton>
      </div>
    );
  }
  const meetingItems = meetingMinute.meetingItems ?? [];

  const createdAt = new Date(meetingMinute._createdAt);
  const calledAt = new Date(meetingMinute.calledAt);
  const adjournedAt = new Date(meetingMinute.adjournedAt);
  const meetingDuration = CalculateHourAndMinutesBetweenTwoDates(
    calledAt,
    adjournedAt,
  );
  const nextScheduledMeetingAt = new Date(
    meetingMinute.nextScheduledMeetingAt!,
  );
  const createdBy = Array.isArray(meetingMinute.createdBy)
    ? meetingMinute.createdBy
    : [];

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="text-lg sm:text-xl font-bold">
          {calledAt.toLocaleDateString(
            undefined,
            longMonthDayYearDateFormatOption,
          )}
        </div>
        <div>
          <strong>{meetingMinute.calledBy.fullName}</strong> calls the meeting
          to order at <strong>{GetTimeStringFromDate(calledAt)}</strong> on{" "}
          <strong>
            {calledAt.toLocaleDateString(
              undefined,
              longMonthDayYearDateFormatOption,
            )}
          </strong>
        </div>
        <div>
          <div className="text-lg font-bold">Members Present</div>
          <MembersPresentDisplay
            type="Executives"
            members={meetingMinute.executivesPresent}
          />
          <MembersPresentDisplay
            type="Regrets"
            members={meetingMinute.executivesAbsent}
          />
          {Array.isArray(meetingMinute.membersPresent) && (
            <MembersPresentDisplay
              type="Guests"
              members={meetingMinute.membersPresent.map((member) => ({
                fullName: member.name,
                position: member.position,
              }))}
            />
          )}
        </div>
        <div>
          <strong>{meetingMinute.adjournedBy.fullName}</strong> adjourned the
          meeting at <strong>{GetTimeStringFromDate(adjournedAt)}</strong> on{" "}
          <strong>
            {adjournedAt.toLocaleDateString(
              undefined,
              longMonthDayYearDateFormatOption,
            )}
          </strong>
          .
        </div>
        <div>
          <strong>Meeting Duration:</strong>{" "}
          {meetingDuration.hours > 0 && (
            <>
              {meetingDuration.hours} hour{meetingDuration.hours > 1 ? "s" : ""}{" "}
              and{" "}
            </>
          )}
          {meetingDuration.minutes} minute
          {meetingDuration.minutes > 1 ? "s" : ""}
        </div>
        <div>
          <strong>Next meeting: </strong>
          {meetingMinute.nextScheduledMeetingAt ? (
            <>
              {GetTimeStringFromDate(nextScheduledMeetingAt)} on{" "}
              {nextScheduledMeetingAt.toLocaleDateString(
                undefined,
                longMonthDayYearDateFormatOption,
              )}
            </>
          ) : (
            "TBD"
          )}
        </div>
        <div>
          {createdBy.map((createdByExec, index) => (
            <span key={createdByExec.fullName}>
              {index === createdBy.length - 1 && createdBy.length > 1 && (
                <>and </>
              )}
              <strong>{createdByExec.fullName}</strong>
              {index < createdBy.length - 1 && <>, </>}
            </span>
          ))}{" "}
          created the meeting minutes at{" "}
          <strong>{GetTimeStringFromDate(createdAt)}</strong> on{" "}
          <strong>
            {createdAt.toLocaleDateString(
              undefined,
              longMonthDayYearDateFormatOption,
            )}
          </strong>
          .
        </div>
      </div>
      <Separator className="bg-slate-400 dark:bg-slate-900 my-4" />
      <div className="hyphens-manual break-all">
        {Array.isArray(meetingItems) && meetingItems.length > 0 ? (
          <PortableText
            value={meetingItems}
            components={sanityBodyPTComponents}
          />
        ) : (
          <div>No description provided.</div>
        )}
      </div>
    </>
  );
}

function MembersPresentDisplay({
  type,
  members,
}: {
  type: string;
  members: { position: string; avatar?: SanityImageType; fullName: string }[];
}) {
  const membersArray = Array.isArray(members) ? members : [];
  return (
    <div className="pl-4">
      <div>
        <div className="font-bold">{type}</div>
        <div className="pl-4 flex flex-col gap-1">
          {membersArray.length > 0 ? (
            membersArray.map((member) => (
              <div className="flex items-center gap-2" key={member.fullName}>
                <ExecutiveAvatar executive={member} />
                <span>
                  {member.fullName} ({member.position})
                </span>
              </div>
            ))
          ) : (
            <div>None</div>
          )}
        </div>
      </div>
    </div>
  );
}
