import Image from "next/image";
import Link from "next/link";
import {
  getLatestAnnouncement,
  getLatestAnnouncements,
} from "~/app/sanity/lib/query";
import {
  GetTimeStringFromDate,
  getURLForSanityImage,
  sanityBodyPTComponents,
} from "../utils";
import { LucideImageOff } from "lucide-react";
import { PortableText } from "@portabletext/react";
import RootLayout from "./root";
import { Metadata } from "next";
import { AppFullName } from "../config";

export const metadata: Metadata = {
  title: "Announcements",
  description: `View all the announcements posted by the ${AppFullName}.`,
};
// export const revalidate = process.env.NODE_ENV === "development" ? 0 : 1800; // 30 minutes
export default async function Page() {
  const announcements = await getLatestAnnouncements();
  return (
    <RootLayout>
      {announcements.length > 0 ? (
        <div className="flex flex-col gap-2 max-w-7xl mx-auto">
          {announcements.map((announcement) => (
            <BasicAnnouncementDisplay
              key={announcement._id}
              announcement={announcement}
            />
          ))}
        </div>
      ) : (
        <div className="text-center">No announcements</div>
      )}
    </RootLayout>
  );
}

function BasicAnnouncementDisplay({
  announcement,
}: {
  announcement: getLatestAnnouncement;
}) {
  const createdAt = new Date(announcement._createdAt);
  return (
    <Link
      className="bg-slate-200 dark:bg-slate-900 rounded-md flex flex-col sm:flex-row sm:items-center sm:max-h-24 sm:h-24 md:h-32 md:max-h-32"
      href={`/announcements/${announcement.slug.current}`}
    >
      <div className="w-full sm:max-w-48 md:max-w-64 bg-slate-300 dark:bg-slate-950/50 h-full rounded-t-md sm:rounded-l-md flex items-center justify-center">
        {announcement.image ? (
          <Image
            className="max-h-48 sm:max-h-24 md:max-h-32 w-auto"
            src={getURLForSanityImage(announcement.image).width(512).url()}
            alt={"Announcement image"}
            width={512}
            height={128}
          />
        ) : (
          <LucideImageOff className="size-12" />
        )}
      </div>
      <div className="flex-1 p-3 flex flex-col h-full">
        {/* TODO: March 16, 2024 Verify UI for category. */}
        {/* TODO: March 16, 2024 Add filter for categories. */}
        <div className="flex items-center text-lg sm:text-xl font-bold">
          <span className="flex-1">{announcement.title}</span>
          <span className="bg-green-500 px-1 rounded-sm max-w-max text-sm">
            {announcement.category}
          </span>
        </div>
        <div className="text-sm sm:text-base max-h-16 sm:max-h-full overflow-clip">
          {Array.isArray(announcement.body) && announcement.body.length > 0 ? (
            <PortableText
              value={announcement.body}
              components={sanityBodyPTComponents}
            />
          ) : (
            <div>No description provided.</div>
          )}
        </div>
        <div className="flex-1 h-full"></div>
        <div className="text-xs sm:text-sm border-t border-slate-300 dark:border-slate-700 mt-0.5 pt-0.5">
          Posted at {createdAt.toDateString()} @{" "}
          {GetTimeStringFromDate(createdAt)}
        </div>
      </div>
    </Link>
  );
}
