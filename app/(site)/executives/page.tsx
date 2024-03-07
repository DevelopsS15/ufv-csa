import Image from "next/image";
import {
  getCurrentExecutive,
  getCurrentExecutives,
} from "~/app/sanity/lib/query";
import { cn, urlFor } from "../utils";
import {
  SiDiscord,
  SiInstagram,
  SiLinkedin,
  SiTwitter,
} from "@icons-pack/react-simple-icons";
import BasicTooltip from "../components/General/Tooltip";
import Link from "next/link";
import { LucideLoader2, LucideUser2 } from "lucide-react";
import { Skeleton } from "../components/UI/skeleton";

export const fetchCache = "force-no-store";
export default async function Page() {
  const executives = await getCurrentExecutives();
  console.log(executives);
  const filterForExecs = (exec: getCurrentExecutive) =>
    exec.positionName?.toLowerCase().includes("president");
  const presidents = executives.filter(filterForExecs);
  const otherExecs = executives.filter((exec) => !filterForExecs(exec));
  return (
    <main className="w-11/12 mx-auto py-8">
      <div className="text-center font-bold text-3xl mb-4">
        Meet The Executives
      </div>
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center w-max mx-auto gap-4">
          {presidents.map((pres) => (
            <ExecutiveDisplay key={pres._id} executive={pres} />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-center mx-auto w-max gap-4">
          {otherExecs.map((exec) => (
            <ExecutiveDisplay key={exec._id} executive={exec} />
          ))}
        </div>
      </div>
    </main>
  );
}

export function ExecutiveDisplay({
  executive,
  loading,
}: {
  executive?: getCurrentExecutive;
  loading?: boolean;
}) {
  const hasSocialMedia =
    executive &&
    !!(
      executive.discordUsername ||
      executive.instagram ||
      executive.linkedin ||
      executive.twitter
    );
  return (
    <div className="text-center">
      {executive?.avatar ? (
        <Image
          className="flex justify-center mx-auto rounded-full mb-2"
          src={urlFor(executive.avatar).width(160).url()}
          alt={`${executive.fullName} Avatar`}
          width={160}
          height={160}
        />
      ) : (
        <div
          className={cn(
            "flex items-center justify-center mx-auto rounded-full mb-2 size-[160px] bg-slate-500 dark:bg-slate-600",
            {
              "animate-pulse": loading,
            }
          )}
        >
          {!loading && <LucideUser2 className="size-32" />}
        </div>
      )}
      {loading ? (
        <Skeleton className="mx-auto h-6 w-full max-w-32 bg-slate-500 dark:bg-slate-600" />
      ) : (
        <div className="text-2xl font-bold">{executive?.positionName}</div>
      )}
      {loading ? (
        <Skeleton className="mt-2 mx-auto h-5 w-full max-w-40 bg-slate-500 dark:bg-slate-600" />
      ) : (
        <div className="text-lg">{executive?.fullName}</div>
      )}
      {hasSocialMedia ? (
        <div className="flex items-center justify-center gap-2">
          {executive.discordUsername && (
            <BasicTooltip content={executive.discordUsername}>
              <SiDiscord />
            </BasicTooltip>
          )}
          {executive.instagram && (
            <Link
              target="_blank"
              href={`https://instagram.com/${executive.instagram}`}
            >
              <SiInstagram />
            </Link>
          )}
          {executive.linkedin && (
            <Link
              target="_blank"
              href={`https://linkedin.com/in/${executive.linkedin}`}
            >
              <SiLinkedin />
            </Link>
          )}
          {executive.twitter && (
            <Link
              target="_blank"
              href={`https://twitter.com/${executive.twitter}`}
            >
              <SiTwitter />
            </Link>
          )}
        </div>
      ) : (
        <div className="h-6"></div>
      )}
    </div>
  );
}
