"use client";
import Image from "next/image";
import { useSpringRef, useSpring, animated } from "@react-spring/web";
import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import {
  AppAbbreviationName,
  AppDiscordInviteLink,
  AppFullName,
} from "./config";
import Link from "next/link";
import InternalLink from "./components/General/InternalLink";
import InternalLinkButton from "./components/General/InternalLinkButton";

const Index = () => {
  const [, setForward] = React.useState<boolean>(false);

  const csaLogoSpring = useSpring({
    from: {
      x: -512,
      opacity: 0,
    },
    to: {
      x: 0,
      opacity: 1,
    },
  });

  const csaTextSpring = useSpring({
    from: {
      x: 512,
      opacity: 0,
    },
    to: {
      x: 0,
      opacity: 1,
    },
  });

  useEffect(() => {
    setForward(true);
  }, []);

  return (
    <main>
      <div className="w-11/12 sm:w-9/12 mx-auto py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 text-center lg:text-left items-center mx-auto justify-center gap-8">
          <Image
            className="mx-auto"
            src="/csalogo.png"
            alt=""
            width={384}
            height={384}
          />
          <div>
            <div className="text-2xl sm:text-3xl font-bold">{AppFullName}</div>
            <div className="text-lg sm:text-xl">
              Representing computing students to UFV faculty and staff since
              2006
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-900/50">
        <div className="w-11/12 sm:w-6/12 mx-auto">
          <div className="py-8 text-center">
            <div className="text-3xl font-bold">
              What is {AppAbbreviationName}?
            </div>
            <div>
              Formerly known as the{" "}
              <strong>
                UFV Computer Information Systems Student Association (CISSA)
              </strong>
              , we aim to represent computing students to UFV faculty and staff.
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
      <div className="w-11/12 sm:w-9/12 mx-auto py-20 text-center">
        <div className="text-3xl font-bold">Future Events</div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 my-4">
          <div className="bg-slate-900 h-32 animate-pulse rounded-md"></div>
          <div className="bg-slate-900 h-32 animate-pulse rounded-md"></div>
          <div className="bg-slate-900 h-32 animate-pulse rounded-md"></div>
        </div>
        <InternalLinkButton variant="information" href="/events">
          View More
        </InternalLinkButton>
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
};

export default Index;
