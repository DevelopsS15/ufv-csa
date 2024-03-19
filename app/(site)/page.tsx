import Image from "next/image";
import React from "react";
import {
  AppAbbreviationName,
  AppDiscordInviteLink,
  AppFullName,
  UniversityAbbreviationName,
} from "./config";
import InternalLink from "./components/General/InternalLink";
import InternalLinkButton from "./components/General/InternalLinkButton";
import { getUpcomingEventType, getUpcomingEvents } from "../sanity/lib/query";
import { BasicEventDisplay } from "./events/BasicEventDisplay";

export const revalidate = process.env.NODE_ENV === "development" ? 0 : 10_800; // 3 hours
export default async function Page() {
  const threeUpcomingEvents = await getUpcomingEvents(3);
  // const [, setForward] = React.useState<boolean>(false);

  // const csaLogoSpring = useSpring({
  //   from: {
  //     x: -512,
  //     opacity: 0,
  //   },
  //   to: {
  //     x: 0,
  //     opacity: 1,
  //   },
  // });

  // const csaTextSpring = useSpring({
  //   from: {
  //     x: 512,
  //     opacity: 0,
  //   },
  //   to: {
  //     x: 0,
  //     opacity: 1,
  //   },
  // });

  // useEffect(() => {
  //   setForward(true);
  // }, []);

  return (
    <main>
      <div className="w-11/12 sm:w-9/12 mx-auto py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 text-center lg:text-left items-center mx-auto justify-center gap-4 lg:gap-8">
          <Image
            className="mx-auto"
            src="/CSA_Leaf_512x512.png"
            alt={`${AppFullName} Logo`}
            width={256}
            height={256}
          />
          <div>
            <div className="text-2xl sm:text-3xl font-bold">{AppFullName}</div>
            <div className="text-lg sm:text-xl">
              Representing computing students to {UniversityAbbreviationName}{" "}
              faculty and staff since 2006
            </div>
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
              , the {AppFullName} aims to represent computing students to{" "}
              {UniversityAbbreviationName}{" "}
              faculty and staff.
            </div>
            <div className="my-4">
              We provide a space for students to hangout, make friends, and
              request tutors or help for projects through our{" "}
              <InternalLink href={AppDiscordInviteLink}>Discord</InternalLink>{" "}
              and events. We manage the{" "}
              <strong>Student Computing Centre (SCC)</strong> in room D224 at
              the Abbotsford campus and it has numerous resources for students
              to take advantage of.
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
      <div className="w-11/12 sm:w-9/12 mx-auto py-20">
        <div className="text-3xl font-bold text-center">Upcoming Events</div>
        {threeUpcomingEvents.length > 0 ? (
          <div
            className={
              "grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4 my-4"
            }
          >
            <DisplayEvents events={threeUpcomingEvents} />
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
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center w-full md:w-10/12 mx-auto gap-4">
        <animated.div className="overflow-hidden" style={csaLogoSpring}>
          <Image src="/csalogo.png" alt="" width={512} height={512} />
        </animated.div>
        <animated.div className="overflow-hidden" style={csaTextSpring}>
          UFV&apos;s Computing Student Association exists to represent computing
          students to UFV faculty and Staff. We provide a space for students to
          hang out, make friends, and inquire about tutoring or help with
          projects. We manage the Student Computing Centre (SCC) in room D224 in
          D-building at the Abbotsford campus. If you have an event you want to
          organize, or a project you would like to run, talk with us and
          we&apos;ll work with you to make it happen.
        </animated.div>
      </div> */}
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
