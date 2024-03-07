import Link from "next/link";
import Image from "next/image";
import {
  SiDiscord,
  SiFacebook,
  SiInstagram,
  SiLinkedin,
  SiTwitter,
} from "@icons-pack/react-simple-icons";
import {
  AppAbbreviationName,
  AppDiscordInviteLink,
  AppFacebookLink,
  AppFullName,
  AppInstagramLink,
  AppLinkedInLink,
  AppLogoBlendedGreen,
  AppTwitterLink,
} from "../config";
import LogoWithCSAStacked from "./LogoWithCSAStacked";

export default function Footer() {
  const FooterSocialMediaClassName = `hover:text-[${AppLogoBlendedGreen}] transition-colors`;
  return (
    <footer className="bg-slate-200 dark:bg-slate-900 w-full border-t border-slate-400 dark:border-slate-700 py-2">
      <div className="w-11/12 sm:w-9/12 flex flex-col sm:flex-row items-center mx-auto gap-4 sm:gap-8">
        <div className="flex flex-col gap-2">
          <LogoWithCSAStacked />
          <div className="flex items-center gap-2">
            <Link
              className={FooterSocialMediaClassName}
              href={AppDiscordInviteLink}
            >
              <SiDiscord />
            </Link>
            <Link className={FooterSocialMediaClassName} href={AppLinkedInLink}>
              <SiLinkedin />
            </Link>
            <Link
              className={FooterSocialMediaClassName}
              href={AppInstagramLink}
            >
              <SiInstagram />
            </Link>
            <Link className={FooterSocialMediaClassName} href={AppTwitterLink}>
              <SiTwitter />
            </Link>
            <Link className={FooterSocialMediaClassName} href={AppFacebookLink}>
              <SiFacebook />
            </Link>
          </div>
        </div>
        <div className="flex-1 text-center sm:text-left">
          <div>
            We acknowledge that the {AppFullName} is situated in the traditional
            territory of the Stó:lō peoples.
          </div>
          <div>
            &copy; 2006-{new Date().getFullYear()} {AppFullName} (
            {AppAbbreviationName}).
          </div>
        </div>
      </div>
    </footer>
  );
}
