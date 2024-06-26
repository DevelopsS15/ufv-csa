import { AppDiscordInviteLink, AppEmail, AppFullName } from "../config";
import { cn } from "../utils";
import {
  ExecutiveHistoryDisplayWithSocialLink,
  TimelineItem,
  TimelineItems,
} from "../components/History/TimelineItems";
import InternalLinkButton from "../components/General/InternalLinkButton";
import { Metadata } from "next";
import InternalLink from "../components/General/InternalLink";
import { LucideAlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "History",
  description: "Discover the history of the CISSA/CSA",
};

export default function Page() {
  return (
    <main
      style={{
        backgroundImage: `url("/History/CircuitBoardSeamless.png")`,
      }}
    >
      <div className="w-11/12 md:w-10/12 max-w-screen-xl mx-auto py-8 overflow-hidden">
        <div>
          <div className="text-2xl sm:text-3xl font-bold text-center mb-8">
            History
          </div>
          <div className="flex mb-4 sm:hidden">
            <div className="bg-yellow-600 w-10 flex items-center justify-center rounded-l-md">
              <LucideAlertTriangle className="size-8" />
            </div>
            <div className="flex-1 bg-slate-900 p-3 rounded-r-md">
              For the best viewing experience, we strongly recommend using a
              device with a screen wider than 640px
            </div>
          </div>
          <div>
            We would like to thank everyone who has been involved with the{" "}
            <strong>{AppFullName}</strong> (Formerly the{" "}
            <strong>Computer Information Systems Student Association</strong>).
            Whether you were a CSA/CISSA executive, a computing student, a UFV
            Faculty or Staff member, or one of our partners/sponsors, your
            contributions are the foundation of what we are today.
          </div>
          <div className="mt-4 flex flex-col gap-1">
            <div>
              Special thanks to the following (in no particular order):{" "}
            </div>
            <div>
              <strong>WaybackMachine</strong> for the archives of prior
              websites. Most of this wouldn&apos;t be possible without their
              service
            </div>
            <div>
              <strong>LinkedIn</strong> for their search functionality which
              identified many executives/members of CISSA/CSA
            </div>
            <div>
              <strong>
                Mike Lee (1994 Co-Founder & Vice-President, 1995 President)
              </strong>{" "}
              for the invaluable information regarding the startings of the
              association and for their efforts in creating the CIS Student
              Council (changed to CISSA later)
            </div>
            <div>
              <strong>Avinesh Bangar (1996-2000 Webmaster)</strong> for
              providing some crucial information from 1996-2000
            </div>
            <div>
              <strong>Derek Forese (2011-2012 President)</strong> for providing
              valuable information, names of executives, and connections
            </div>
            <div>
              <strong>Graham St. Eloi (2011-2017, various positions)</strong>{" "}
              for providing details regarding executives and fundamental
              milestones for CISSA/CSA throughout 2012 to 2015
            </div>
            <div>
              <strong>
                Maxine Cowan (2015-2017 Secretary, 2017-2018 Finance Officer)
              </strong>{" "}
              and <strong>Cody Beaty (2016-2020, various positions)</strong> for
              improving the quality and consistency of meeting minutes from 2015
              to 2018
            </div>
            <div>
              <strong>Samuel Shull (2024 Webmaster/Vice-President)</strong> for
              researching, collecting, and constructing this history into one
              place up until 2024
            </div>
          </div>
        </div>
        <div className="mt-4">
          Note: This history is still a work-in-progress as we progressively
          fill in the gaps. If you have additional information to contribute,
          send us an email at{" "}
          <InternalLink href={`mailto:${AppEmail}?subject=CSA History`}>
            {AppEmail}
          </InternalLink>
        </div>
        <div className="my-8">
          {TimelineItems.map((item, index) => (
            <div
              className="grid grid-cols-[40px_calc(100%-40px)] lg:grid-cols-[calc(50%-20px)_40px_calc(50%-20px)]"
              key={item.header}
            >
              <div
                className={
                  index % 2 === 0 ? "max-lg:order-2" : "hidden lg:block"
                }
              >
                {index % 2 === 0 ? (
                  <HistoryTimelineItem direction={"left"} item={item} />
                ) : (
                  <div></div>
                )}
              </div>
              <div className="flex flex-col h-full items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-gray-900 rounded-full ring-white p-2">
                  {item.icon}
                </div>
                <div className="mx-auto w-1 h-full bg-slate-700"></div>
              </div>
              <div className={index % 2 !== 0 ? undefined : "hidden lg:block"}>
                {index % 2 !== 0 ? (
                  <HistoryTimelineItem direction={"right"} item={item} />
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          ))}
          <div className="grid grid-cols-[40px_calc(100%-40px)] lg:grid-cols-[calc(50%-20px)_40px_calc(50%-20px)]">
            <div className="hidden lg:block"></div>
            <div className="mx-auto rounded-full size-4 bg-blue-100 dark:bg-gray-900"></div>
            <div></div>
          </div>
          <div className="lg:text-center mt-2">
            <div className="text-xl font-extrabold">TODAY</div>
            <div className="mt-1 mb-2">
              Want to be part of the {AppFullName} history?
            </div>
            <InternalLinkButton variant="success" href={AppDiscordInviteLink}>
              Join Our Discord
            </InternalLinkButton>
          </div>
        </div>
      </div>
    </main>
  );
}

async function HistoryTimelineItem({
  direction,
  item,
}: {
  direction: "left" | "right";
  item: TimelineItem;
}) {
  const executiveData = item.executives ? await item.executives : [];
  // getExecutivesByName(["Josh Gourde"]).then((data) => {
  //   return data.map((exec) => ({
  //     name: exec.fullName,
  //     position: "Unknown",
  //     imageURL: exec.avatar
  //       ? getURLForSanityImage(exec.avatar).url()
  //       : undefined,
  //   }));
  // })
  const disclaimers: string[] = [];
  if (item.missingCitation) {
    disclaimers.push(`Due to no supporting documentation, there may be incorrect
            information`);
  }

  if (item.missingInformation) {
    disclaimers.push(`There is missing information for this historical record`);
  }

  return (
    <div
      className={cn(
        "flex max-lg:mb-4",
        direction === "left" ? "lg:flex-row-reverse lg:text-right" : undefined
      )}
    >
      <div
        className={cn(
          "h-1 bg-slate-700 min-w-3 mt-4",
          direction === "left" ? "mr-1 lg:ml-1" : "mr-1"
        )}
      ></div>
      <div className="mt-2">
        <div className="text-slate-300 text-sm">
          {new Date(item.date).toLocaleDateString(undefined, {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
        <h1 className="text-lg font-extrabold uppercase">{item.header}</h1>
        <div
          className={cn(
            "flex flex-col",
            direction === "left" ? "lg:items-end" : undefined
          )}
        >
          {item.description}
        </div>
        {Array.isArray(executiveData) && (
          <div
            className={cn(
              "flex flex-col",
              direction === "left" ? "lg:items-end text-left" : undefined
            )}
          >
            <div className="flex flex-col gap-1 max-w-max">
              {executiveData.map((executive) => (
                <ExecutiveHistoryDisplayWithSocialLink
                  key={executive.name + "_" + executive.position}
                  executive={executive}
                  showImage={true}
                />
              ))}
            </div>
          </div>
        )}
        {disclaimers.length > 0 && (
          <div className="text-xs">
            Note:{" "}
            {disclaimers
              .map((disclaimer, index) =>
                index > 0 ? disclaimer.toLowerCase() : disclaimer
              )
              .join(" & ")}
            .
          </div>
        )}
      </div>
    </div>
  );
}
