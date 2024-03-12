"use client";

import { LucideMegaphone } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { getLatestAnnouncement } from "~/app/sanity/lib/query";

export default function LatestAnnouncementBanner() {
  const [latestAnnouncement, setLatestAnnouncement] =
    React.useState<getLatestAnnouncement | null>(null);

  useEffect(() => {
    fetch("/api/announcements/latest")
      .then((data) => data.json())
      .then((data: { success: boolean; data: getLatestAnnouncement[] }) => {
        if (data?.success && Array.isArray(data.data)) {
          setLatestAnnouncement(data.data.length === 1 ? data.data[0] : null);
        }
      })
      .catch((err) => {
        console.error(`Unable to get latest announcement`);
      });
  }, []);

  return (
    latestAnnouncement && (
      <Link
        href={`/announcements/${latestAnnouncement.slug.current}`}
        className="bg-green-200 dark:bg-green-900 w-full py-2 whitespace-nowrap block border-b border-slate-400 dark:border-slate-700"
      >
        <div className="w-11/12 sm:w-9/12 flex items-center mx-auto gap-2 overflow-clip">
          <span className="mx-auto flex items-center gap-2">
            <LucideMegaphone className="min-w-4" /> {latestAnnouncement.title}
          </span>
        </div>
      </Link>
    )
  );
}
