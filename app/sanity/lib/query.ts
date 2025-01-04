import { SanityDocument, groq } from "next-sanity";
import { PortableTextBlock, Image as SanityImageType } from "sanity";
import { readClient } from "~/app/(site)/client";
import { SanityAnnouncementType } from "~/app/types";

export interface getCurrentExecutiveType {
  _id: string;
  fullName: string;
  avatar?: SanityImageType;
  startDate: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  discordUsername?: string;
  discordId?: string;
  latestPosition: {
    _id: string;
    title: string;
    startDate: string;
    endDate: string;
  } | null;
}
const sanityFetchNextOptions_Executives = {
  next: {
    tags: ["executives"],
  },
};
export async function getCurrentExecutives() {
  return readClient.fetch<getCurrentExecutiveType[]>(
    groq`*[_type == "executives" && isCurrent == true]{
    _id,
    fullName,
    avatar,
    "latestPosition": positions[0]{
      startDate,
      endDate,
      "title": position->title,
    },
    startDate,
    twitter,
    instagram,
    linkedin,
    discordUsername,
    discordId
  }`,
    {},
    sanityFetchNextOptions_Executives
  );
}

export async function getExecutivesByName(names: string[]) {
  return readClient.fetch<getCurrentExecutiveType[]>(
    groq`*[_type == "executives" && lower(fullName) in $names]{
    _id,
    fullName,
    avatar,
    "latestPosition": positions[0]{
      startDate,
      endDate,
      "title": position->title,
    },
    startDate,
    twitter,
    instagram,
    linkedin,
    discordUsername,
    discordId
  }`,
    {
      names: Array.isArray(names)
        ? names.map((name) => name.toLowerCase())
        : [],
    },
    sanityFetchNextOptions_Executives
  );
}

const sanityFetchNextOptions_Events = {
  next: {
    tags: ["events"],
  },
};
export async function getEvent(slug: string) {
  return readClient.fetch<getEventType>(
    groq`*[_type == "event" && slug.current == $slug] {
    _id,
    "slug": slug.current,
    "postedBy": postedBy->{
      fullName,
      avatar,
      "title": positions[0].position->title
    },
    image,
    title,
    startDate,
    endDate,
    campus,
    building,
    room,
    relevantLinks,
    body,
    bookTicket,
    additionalDetails
  }[0]`,
    { slug },
    sanityFetchNextOptions_Events
  );
}

export interface getEventType {
  _id: string;
  _createdAt: string;
  slug: string;
  title: string;
  image?: SanityImageType;
  postedBy: {
    fullName: string;
    avatar?: SanityImageType;
    positionName: string;
  };
  startDate: string;
  endDate: string;
  campus: string;
  building?: string;
  room?: string;
  relevantLinks?: string[];
  body?: PortableTextBlock;
  bookTicket?: string;
}

export async function getEventsForStaticParams() {
  return readClient.fetch<{ slug: string }[]>(
    groq`*[_type == "event" && dateTime(now()) <= dateTime(endDate)] | order(startDate) {
    "slug": slug.current,
  }`,
    {},
    sanityFetchNextOptions_Events
  );
}

export async function getEvents(limit = 25) {
  return readClient.fetch<getEventType[]>(
    groq`*[_type == "event" && dateTime(now()) <= dateTime(endDate)] | order(startDate) {
    _id,
    _createdAt,
    "slug": slug.current,
    "postedBy": postedBy->{
      fullName,
      avatar,
      "positionName": positions[0].position->title
    },
    image,
    title,
    startDate,
    endDate,
    campus,
    building,
    room,
    relevantLinks,
    body
  }[0...$limit]`,
    {
      limit,
    },
    sanityFetchNextOptions_Events
  );
}

export interface getUpcomingEventType {
  _id: string;
  slug: string;
  title: string;
  image?: SanityImageType;
  startDate: string;
  endDate: string;
  campus: string;
  building?: string;
  room?: string;
  additionalDetails?: string;
}

export async function getUpcomingEvents(limit = 25) {
  return readClient.fetch<getUpcomingEventType[]>(
    groq`*[_type == "event" && dateTime(now()) <= dateTime(endDate)] | order(startDate) {
    _id,
    "slug": slug.current,
    image,
    title,
    startDate,
    endDate,
    campus,
    building,
    room,
    additionalDetails,
  }[0...$limit]`,
    {
      limit,
    },
    sanityFetchNextOptions_Events
  );
}

//
//
//

export interface getLatestAnnouncement {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  category: SanityAnnouncementType;
  slug: {
    current: string;
  };
  pingEveryone: boolean;
  title: string;
  image?: SanityImageType;
  postedBy?: string;
  body?: PortableTextBlock;
}

const sanityFetchNextOptions_Announcements = {
  next: {
    tags: ["announcements"],
  },
};

export async function getAnnouncementsForStaticParams() {
  return readClient.fetch<{ slug: string }[]>(
    groq`*[_type == "announcement"]{
    "slug": slug.current,
  }`,
    {},
    sanityFetchNextOptions_Announcements
  );
}

export async function getAnnouncement(slug: string) {
  return readClient.fetch<getLatestAnnouncement>(
    groq`*[_type == "announcement" && slug.current == $slug][0]`,
    { slug },
    sanityFetchNextOptions_Announcements
  );
}

export async function getLatestAnnouncements(limit = 25) {
  return readClient.fetch<getLatestAnnouncement[]>(
    groq`*[_type == "announcement"] | order(_createdAt desc)[0...$limit]`,
    {
      limit,
    },
    sanityFetchNextOptions_Announcements
  );
}

//
export interface getLatestRoomStatus {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
}
export async function getLatestRoomStatus() {
  return readClient.fetch<getLatestAnnouncement[]>(
    groq`*[_type == "roomStatus"] | order(_createdAt desc)[0...$limit]`,
    {
      limit: 1,
    },
    {
      next: {
        tags: ["roomStatus"],
      },
    }
  );
}

//
//
//
export interface MeetingMinutesExecutive {
  position?: string;
  fullName: string;
  avatar?: SanityImageType | string;
}

export interface MeetingMinutesExecutiveAttendance {
  fullName: string;
  avatar?: SanityImageType | string;
  positions: {
    position: string;
    startDate?: string;
    endDate?: string;
  }[];
}
export interface MeetingMinutes extends SanityDocument {
  calledBy: MeetingMinutesExecutive;
  calledAt: string;
  slug: string;
  executivesPresent: MeetingMinutesExecutiveAttendance[];
  executivesAbsent: MeetingMinutesExecutiveAttendance[];
  membersPresent: {
    position: string;
    name: string;
  }[];
  meetingItems: PortableTextBlock;
  adjournedBy: MeetingMinutesExecutive;
  adjournedAt: string;
  nextScheduledMeetingAt?: string;
  createdBy: MeetingMinutesExecutive[];
}

const sanityFetchNextOptions_MeetingMinutes = {
  next: {
    tags: ["meetingMinutes"],
  },
};

export async function getMeetingMinutesForStaticParams() {
  return readClient.fetch<{ slug: string }[]>(
    groq`*[_type == "meetingMinutes"]{
    "slug": slug.current,
  }`,
    {},
    sanityFetchNextOptions_MeetingMinutes
  );
}

export async function getMeetingMinutes(limit = 25) {
  return readClient.fetch<MeetingMinutes[]>(
    groq`*[_type == "meetingMinutes"] | order(calledAt desc)[0...$limit]{
      _id,
      _type,
      _rev,
      _createdAt,
      _updatedAt,
      "slug": slug.current,
      "calledBy": calledBy->{
        fullName,
        "position": positions[0].position->title,
        avatar
      },
      calledAt,
      "executivesPresent": executivesPresent[]->{
        fullName,
        "positions": positions[0].position->title,
        avatar
      },
      "executivesAbsent": executivesAbsent[]->{
        fullName,
        "positions": positions[0].position->title,
        avatar
      },
      membersPresent,
      meetingItems,
      "adjournedBy": adjournedBy->{
        fullName,
        "position": positions[0].position->title,
        avatar
      },
      adjournedAt,
      nextScheduledMeetingAt,
      "createdBy": createdBy[]->{
        fullName,
        "position": positions[0].position->title,
        avatar
      }
    }`,
    {
      limit,
    },
    sanityFetchNextOptions_MeetingMinutes
  );
}

export async function getMeetingMinute(slugDate: string) {
  return readClient.fetch<MeetingMinutes>(
    groq`*[_type == "meetingMinutes" && slug.current == $slug][0]{
      _id,
      _type,
      _rev,
      _createdAt,
      _updatedAt,
      "calledBy": calledBy->{
        fullName,
        "position": positions[0].position->title,
        avatar
      },
      calledAt,
      "executivesPresent": executivesPresent[]->{
        fullName,
        "positions": positions[]{
          startDate,
          "position": position->title,
          endDate
        },
        avatar
      },
      "executivesAbsent": executivesAbsent[]->{
        fullName,
        "positions": positions[]{
          startDate,
          "position": position->title,
          endDate
        },
        avatar
      },
      membersPresent,
      meetingItems,
      "adjournedBy": adjournedBy->{
        fullName,
        "position": positions[0].position->title,
        avatar
      },
      adjournedAt,
      nextScheduledMeetingAt,
      "createdBy": createdBy[]->{
        fullName,
        "position": positions[0].position->title,
        avatar
      }
    }`,
    {
      slug: slugDate,
    },
    sanityFetchNextOptions_MeetingMinutes
  );
}
