import Image from "next/image";
import Link from "next/link";
import BasicTooltip from "~/app/(site)/components/General/Tooltip";
import NavBar from "~/app/(site)/components/NavBar";
import { AppFullName, AppLogoBlendedGreen } from "~/app/(site)/config";
import "~/app/globals.css";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <BasicTooltip content="Go home">
          <Link href="/" className="block z-50 fixed bottom-4 left-4 bg-slate-200 dark:bg-slate-900 p-1 border rounded-full border-slate-400 dark:border-slate-700">
            <Image
                  src={"/icon-144x144.png"}
                  width={32}
                  height={32}
                  alt={`${AppFullName} logo`}
                />
          </Link>
        </BasicTooltip>
        {children}
      </body>
    </html>
  );
}
