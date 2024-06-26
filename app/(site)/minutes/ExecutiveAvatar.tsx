"use client";
import Image from "next/image";
import { MeetingMinutesExecutive } from "~/app/sanity/lib/query";
import { getURLForSanityImage } from "../utils";
import { LucideUser } from "lucide-react";
import BasicTooltip from "../components/General/Tooltip";
import React from "react";

export function ExecutiveAvatar({
  executive,
}: {
  executive: MeetingMinutesExecutive;
}) {
  const imageDimensionsPX = 32;
  const [errorLoadingImage, setErrorLoadingImage] =
    React.useState<boolean>(false);

  return (
    <BasicTooltip
      content={`${executive.fullName}${
        executive.position ? ` (${executive.position})` : ""
      }`}
    >
      {executive.avatar && !errorLoadingImage ? (
        <Image
          className="rounded-full"
          alt={executive.fullName}
          onError={() => setErrorLoadingImage(true)}
          width={imageDimensionsPX}
          height={imageDimensionsPX}
          src={
            typeof executive.avatar === `string`
              ? executive.avatar
              : getURLForSanityImage(executive.avatar)
                  .width(imageDimensionsPX)
                  .height(imageDimensionsPX)
                  .url()
          }
        />
      ) : (
        <div className="bg-slate-500 size-8 rounded-full flex items-center justify-center">
          <LucideUser className="size-6" />
        </div>
      )}
    </BasicTooltip>
  );
}
