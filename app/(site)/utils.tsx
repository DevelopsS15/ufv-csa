import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import imageUrlBuilder from "@sanity/image-url";
import client from "~/app/(site)/client";
import {
  BlockStyleProps,
  PortableTextBlock,
  PortableTextTextBlock,
  Image as SanityImageType,
} from "sanity";
import { PropsWithChildren } from "react";
import Link from "next/link";
import { MeetingMinutesExecutive } from "../sanity/lib/query";
import { PortableTextComponents } from "@portabletext/react";
import { allCampusOptions } from "../sanity/schemas/event";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface SanityImageWithAltType extends SanityImageType {
  alt?: string;
}

export function getURLForSanityImage(source: SanityImageWithAltType) {
  return imageUrlBuilder(client).image(source);
}

export function AreDatesTheSame(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function CalculateHourAndMinutesBetweenTwoDates(start: Date, end: Date) {
  const timeDiff = end.getTime() - start.getTime();
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  return {
    hours,
    minutes,
  };
}

export function GetMeetingMinutesCreatedBy(
  executives: MeetingMinutesExecutive[],
): string {
  return Array.isArray(executives)
    ? executives
        .map(
          (createdBy, index) =>
            `${
              index === executives.length - 1 && executives.length > 1
                ? "and "
                : ""
            }${createdBy.fullName}`,
        )
        .join(", ")
    : "";
}

const defaults = { nonTextBehavior: "remove" };
export function sanityBlocksToText(blocks: PortableTextBlock[], opts = {}) {
  const options = Object.assign({}, defaults, opts);
  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) {
        return options.nonTextBehavior === "remove"
          ? ""
          : `[${block._type} block]`;
      }
      return (block.children as { text: string }[])
        .map((child) => child.text)
        .join("");
    })
    .join("\n\n");
}

export function GetTimeStringFromDate(date: Date) {
  return date.toLocaleTimeString(undefined, {
    hour: "numeric",
    hour12: true,
    minute: "2-digit",
  });
}

export const isEventOnCampus = (campus: string) =>
  campus !== "I" && campus !== "O";

export const getValidString = (potentialString?: unknown): string =>
  typeof potentialString === `string` ? potentialString : "";

export const getSlugFromDate = (date: Date) =>
  `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

export const longMonthDayYearDateFormatOption: Intl.DateTimeFormatOptions = {
  month: "long",
  day: "numeric",
  year: "numeric",
};

export const sanityBodyPTComponents: PortableTextComponents = {
  types: {
    image: ({
      value,
      isInline,
    }: {
      value: SanityImageWithAltType;
      isInline: boolean;
    }) => {
      if (!value?.asset?._ref) return null;
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="rounded-sm"
          alt={value.alt ?? " "}
          loading="lazy"
          src={getURLForSanityImage(value).url()}
          style={{
            display: isInline ? "inline-block" : "block",
            // aspectRatio: width / height,
          }}
        />
      );
    },
  },
  list: {
    bullet: ({ children }: PropsWithChildren) => (
      <ul className="list-disc ml-8">{children}</ul>
    ),
    number: ({ children }: PropsWithChildren) => (
      <ol className="list-decimal ml-8">{children}</ol>
    ),
  },
  marks: {
    link: ({
      children,
      value,
    }: PropsWithChildren<{ value?: { href: string } }>) => (
      <Link href={value?.href ?? "#"} referrerPolicy={"no-referrer"}>
        {children}
      </Link>
    ),
  },
  block: {
    h1: ({ children }: PropsWithChildren) => (
      <h1 className="text-3xl font-bold">{children}</h1>
    ),
    h2: ({ children }: PropsWithChildren) => (
      <h2 className="text-2xl font-bold">{children}</h2>
    ),
    h3: ({ children }: PropsWithChildren) => (
      <h3 className="text-xl font-bold">{children}</h3>
    ),
    h4: ({ children }: PropsWithChildren) => (
      <h4 className="text-lg font-bold">{children}</h4>
    ),
    h5: ({ children }: PropsWithChildren) => (
      <h5 className="text-base font-bold">{children}</h5>
    ),
    h6: ({ children }: PropsWithChildren) => (
      <h6 className="text-sm font-bold">{children}</h6>
    ),
    blockquote: ({ children }: PropsWithChildren) => (
      <blockquote>{children}</blockquote>
    ),
  },
};

export function getEventCampusName(campus: string): string {
  const campusData = campus
    ? allCampusOptions.find((campusOption) => campusOption.value === campus)
    : undefined;
  return campusData?.title ?? campus;
}

export function getEventBuilding(building?: string): string {
  return typeof building === `string` && building.trim().length > 0
    ? building.trim()
    : "";
}

export function getEventRoom(campus: string, room?: string): string {
  return isEventOnCampus(campus) && typeof room === `string` ? room.trim() : "";
}
