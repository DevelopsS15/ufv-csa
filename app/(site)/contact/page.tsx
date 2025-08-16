import {
  SiDiscord,
  SiInstagram,
  SiLinkedin,
} from "@icons-pack/react-simple-icons";
import Link from "next/link";
import {
  AppAbbreviationName,
  AppDiscordInviteLink,
  AppEmail,
  AppFullName,
  AppInstagramLink,
  AppLinkedInLink,
  AppRoomNumber,
} from "../config";
import { LucideMail, LucideMapPin } from "lucide-react";
import DiscordWidget from "./DiscordWidget";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: `View all the related contact information for the ${AppFullName}.`,
};

export default function Page() {
  const socialMediaLinkClassName =
    "max-w-max hover:text-green-500 transition-colors";
  return (
    <main className="w-11/12 mx-auto py-8">
      <div className="text-3xl font-bold text-center">Contact Us</div>
      <div className="max-w-max mx-auto">
        <div className="text-center">
          Want to make friends? Plan a project? Get help with homework? Join us!
        </div>
        <div className="flex flex-col gap-2 w-full my-4">
          <Link
            href={`/FloorPlans/A-D2.pdf`}
            target="_blank"
            className={socialMediaLinkClassName}
          >
            <LucideMapPin className="inline" />{" "}
            <span className="underline">
              UFV Abbotsford Campus {AppRoomNumber}
            </span>
          </Link>
          <Link
            href={`mailto:${AppEmail}`}
            target="_blank"
            className={socialMediaLinkClassName}
          >
            <LucideMail className="inline" />{" "}
            <span className="underline">{AppEmail}</span>
          </Link>
          <Link
            href={AppDiscordInviteLink}
            target="_blank"
            className={socialMediaLinkClassName}
          >
            <SiDiscord className="inline" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>{" "}
            <span className="underline">
              {AppAbbreviationName} Discord Server
            </span>
          </Link>
          <Link
            href={AppLinkedInLink}
            target="_blank"
            className={socialMediaLinkClassName}
          >
            <SiLinkedin className="inline" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>{" "}
            <span className="underline">ufvcsa</span>
          </Link>
          <Link
            href={AppInstagramLink}
            target="_blank"
            className={socialMediaLinkClassName}
          >
            <SiInstagram className="inline" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>{" "}
            <span className="underline">ufvcsa</span>
          </Link>
        </div>
        <DiscordWidget />
      </div>
    </main>
  );
}
