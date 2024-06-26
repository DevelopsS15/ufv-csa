import Image from "next/image";
import React from "react";
import {
  AppAbbreviationName,
  AppDiscordInviteLink,
  AppFullName,
  AppInstagramLink,
  AppLinkedInLink,
  AppLogoBlendedGreen,
  UniversityAbbreviationName,
} from "./config";
import InternalLink from "./components/General/InternalLink";
import InternalLinkButton from "./components/General/InternalLinkButton";
import { getUpcomingEventType, getUpcomingEvents } from "../sanity/lib/query";
import { BasicEventDisplay } from "./events/BasicEventDisplay";
import { CodingTypeAnimation } from "./components/Home/CodingTypeAnimation";
import Link from "next/link";
import {
  SiDiscord,
  SiInstagram,
  SiLinkedin,
} from "@icons-pack/react-simple-icons";
import { cn } from "./utils";
import ElectionBanner from "./components/Home/ElectionBanner";

export default async function Page() {
  const upcomingEvents = await getUpcomingEvents(3);
  const SocialMediaClassName = `fill-white hover:fill-green-500 transition-colors`;
  interface HighlightsImage {
    localPath: string;
    sourcePath: string;
    eventName: string;
  }

  const columnOneHighlightImages: HighlightsImage[] = [
    {
      localPath: "TechPanel_1.jpg",
      eventName: "Tech Panel",
      sourcePath: `https://flickr.com/photos/ufv/53589642941/in/album-72177720315460690/`,
    },
    {
      localPath: "TechPanel_2.jpg",
      eventName: "Tech Panel",
      sourcePath:
        "https://flickr.com/photos/ufv/53589642776/in/album-72177720315460690/",
    },
  ];

  const columnTwoHighlightImages: HighlightsImage[] = [
    {
      localPath: "2023_OpenHouse.jpg",
      sourcePath:
        "https://www.instagram.com/stories/highlights/17950247879254495/",
      eventName: "2023 Open House",
    },
    {
      localPath: "TechPanel_3.jpg",
      eventName: "Tech Panel",
      sourcePath: `https://flickr.com/photos/ufv/53590086235/in/album-72177720315460690/`,
    },
  ];

  const columnThreeHighlightImages: HighlightsImage[] = [
    {
      localPath: "CSAHackathon_1.jpg",
      sourcePath:
        "https://flickr.com/photos/ufv/53740057128/in/album-72177720317223688/",
      eventName: "CSA Startup Hackathon",
    },
    {
      localPath: "TechPanel_5.jpg",
      sourcePath:
        "https://flickr.com/photos/ufv/53588768442/in/album-72177720315460690/",
      eventName: "Tech Panel",
    },
  ];

  const highlightImages: HighlightsImage[][] = [
    columnOneHighlightImages,
    columnTwoHighlightImages,
    columnThreeHighlightImages,
  ];

  return (
    <main>
      <div className="w-11/12 lg:w-9/12 mx-auto py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 text-center lg:text-left items-center mx-auto justify-center lg:gap-4 min-h-[512px]">
          <div>
            <Image
              className="mx-auto w-full max-w-80"
              src="/CSA_Leaf_512x512.png"
              alt={`${AppFullName} Logo`}
              width={320}
              height={320}
              quality={100}
            />
          </div>
          <div className="sm:w-10/12 mx-auto col-span-3">
            {/* hidden md:block  */}
            <div className="min-h-20">
              <CodingTypeAnimation />
            </div>
            {/* <div className="md:hidden text-2xl sm:text-3xl font-bold">
              {AppFullName}
            </div> */}
            <div className="text-lg sm:text-xl">
              Representing computing students to {UniversityAbbreviationName}{" "}
              faculty and staff since 2006
            </div>
            <InternalLinkButton
              variant={"success"}
              className="mt-2"
              href={AppDiscordInviteLink}
              target="_blank"
            >
              Join Today
            </InternalLinkButton>
          </div>
        </div>
      </div>
      <div className="bg-slate-900/50">
        <div className="w-11/12 sm:w-8/12 md:6/12 mx-auto">
          <div className="py-8 text-center">
            <div className="text-3xl font-bold">
              What is {AppAbbreviationName}?
            </div>
            <div>
              Formerly known as the{" "}
              <strong>
                {UniversityAbbreviationName} Computer Information Systems
                Student Association (CISSA)
              </strong>
              , the <strong>{AppFullName}</strong> aims to represent computing
              students to {UniversityAbbreviationName} faculty and staff.
            </div>
            <div className="my-4">
              We provide a space for students to hangout, make friends, and
              request tutors or help for projects through our{" "}
              <InternalLink href={AppDiscordInviteLink}>Discord</InternalLink>{" "}
              and events. We manage the{" "}
              <strong>Student Computing Centre (SCC)</strong> in room{" "}
              <InternalLink target="_blank" href="./FloorPlans/A-D2.pdf">
                D224
              </InternalLink>{" "}
              at the Abbotsford campus and it has numerous resources for
              students to take advantage of.
            </div>
            <div>
              Interested in planning an event or starting a project? Let us know
              through our{" "}
              <InternalLink href={AppDiscordInviteLink}>
                Discord server
              </InternalLink>{" "}
              or via social media.
            </div>
          </div>
        </div>
      </div>
      {/* <div className="bg-slate-700/75">
        <div className="w-11/12 max-w-screen-xl mx-auto py-8">
          <ElectionBanner />
        </div>
      </div> */}
      <div className="w-11/12 sm:w-9/12 mx-auto py-20">
        <h1 className="text-3xl font-bold text-center">Highlights</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-8 max-w-6xl mx-auto">
          {highlightImages.map((images, index) => (
            <div
              key={index}
              className={cn("gap-3", index === 2 ? "hidden lg:grid" : "grid")}
            >
              {images.map((image) => (
                <InternalLink
                  href={image.sourcePath}
                  target="_blank"
                  key={image.localPath}
                >
                  <Image
                    alt={image.eventName}
                    className="w-full h-auto rounded-lg"
                    width={512}
                    height={512}
                    src={`/Home/${image.localPath}`}
                  />
                </InternalLink>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-slate-900/50">
        <div className="w-11/12 sm:w-9/12 mx-auto py-8">
          <h1 className="text-3xl font-bold text-center">Upcoming Events</h1>
          {upcomingEvents.length > 0 ? (
            <div
              className={
                "grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4 my-4"
              }
            >
              <DisplayEvents events={upcomingEvents} />
            </div>
          ) : (
            <div className="my-4 text-center">No events</div>
          )}
          <div className="w-max mx-auto">
            <InternalLinkButton variant="information" href="/events">
              View More
            </InternalLinkButton>
          </div>
        </div>
      </div>
      <div className="w-11/12 sm:w-9/12 mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold">
          Want the latest {AppAbbreviationName} news?
        </h1>
        <div className="text-lg">
          Follow all our social media and join our Discord server.
        </div>
        <div className="flex gap-4 items-center justify-center mt-2">
          <Link
            className={SocialMediaClassName}
            href={AppDiscordInviteLink}
            target="_blank"
          >
            <SiDiscord className="size-8 fill-inherit" />
          </Link>
          <Link
            className={SocialMediaClassName}
            target="_blank"
            href={AppLinkedInLink}
          >
            <SiLinkedin className="size-8 fill-inherit" />
          </Link>
          <Link
            className={SocialMediaClassName}
            href={AppInstagramLink}
            target="_blank"
          >
            <SiInstagram className="size-8 fill-inherit" />
          </Link>
        </div>
      </div>
    </main>
  );
}

function DisplayEvents({ events }: { events: getUpcomingEventType[] }) {
  if (events.length === 3) {
    return (
      <>
        <div className="col-span-2">
          <BasicEventDisplay event={events[0]} />
        </div>
        <div className="col-span-2">
          <BasicEventDisplay event={events[1]} />
        </div>
        <div className="col-span-2 md:max-xl:col-start-2">
          <BasicEventDisplay event={events[2]} />
        </div>
      </>
    );
  } else if (events.length === 2) {
    return (
      <>
        <div className="col-span-2 xl:col-start-2">
          <BasicEventDisplay event={events[0]} />
        </div>
        <div className="col-span-2">
          <BasicEventDisplay event={events[1]} />
        </div>
      </>
    );
  } else {
    return (
      <div className="col-span-2 md:col-start-2 xl:col-start-3">
        <BasicEventDisplay event={events[0]} />
      </div>
    );
  }
}
