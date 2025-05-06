import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import imageUrlBuilder from "@sanity/image-url";
import { PortableTextBlock, Image as SanityImageType } from "sanity";
import { PropsWithChildren } from "react";
import { MeetingMinutesExecutive } from "../sanity/lib/query";
import { PortableTextComponents } from "@portabletext/react";
import { allCampusOptions } from "../sanity/schemas/event";
import { readClient } from "./client";
import {
	type APIChatInputApplicationCommandInteraction,
	type APIPingInteraction,
} from "discord-api-types/v10";
import nacl from "tweetnacl";
import InternalLink from "./components/General/InternalLink";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface SanityImageWithAltType extends SanityImageType {
  alt?: string;
}

export function getURLForSanityImage(source: SanityImageWithAltType) {
  return imageUrlBuilder(readClient).image(source);
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
  executives: MeetingMinutesExecutive[]
): string {
  return Array.isArray(executives)
    ? executives
        .map(
          (createdBy, index) =>
            `${
              index === executives.length - 1 && executives.length > 1
                ? "and "
                : ""
            }${createdBy.fullName}`
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

export const CapitalizeFirstLetter = (string: string) =>
  typeof string === `string`
    ? string.substring(0, 1).toUpperCase() + string.substring(1).toLowerCase()
    : "";

export function isXDaysAhead(date1: string, date2: string, daysAhead: number) {
  // Convert date strings to Date objects
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  // Calculate the difference in milliseconds
  const timeDiff = d2.getTime() - d1.getTime();
  // Convert milliseconds to days
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  // Check if the second date is exactly x days ahead of the first date
  return daysDiff === daysAhead;
}

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
      <InternalLink href={value?.href ?? "#"} referrerPolicy="no-referrer">
        {children}
      </InternalLink>
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


type VerifyWithNaclArgs = {
	appPublicKey: string;
	rawBody: string;
	signature: string;
	timestamp: string;
};

const verifyWithNacl = ({ appPublicKey, signature, rawBody, timestamp }: VerifyWithNaclArgs) => {
	return nacl.sign.detached.verify(
		Uint8Array.from(Buffer.from(timestamp + rawBody)),
		Uint8Array.from(Buffer.from(signature, "hex")),
		Uint8Array.from(Buffer.from(appPublicKey, "hex")),
	);
};

type VerifyDiscordRequestResult =
	| { isValid: false }
	| {
			isValid: true;
			interaction: APIPingInteraction | APIChatInputApplicationCommandInteraction;
	  };

/**
 * Verify that the interaction request is from Discord and intended for our bot.
 *
 * @see https://discord.com/developers/docs/interactions/receiving-and-responding#security-and-authorization
 */
export async function verifyInteractionRequest(
	request: Request,
	appPublicKey: string,
): Promise<VerifyDiscordRequestResult> {
	const signature = request.headers.get("x-signature-ed25519");
	const timestamp = request.headers.get("x-signature-timestamp");
	if (typeof signature !== "string" || typeof timestamp !== "string") {
		return { isValid: false };
	}

	const rawBody = await request.text();
	const isValidRequest =
		signature && timestamp && verifyWithNacl({ appPublicKey, rawBody, signature, timestamp });
	if (!isValidRequest) {
		return { isValid: false };
	}

	return {
		interaction: JSON.parse(rawBody) as
			| APIPingInteraction
			| APIChatInputApplicationCommandInteraction,
		isValid: true,
	};
}
