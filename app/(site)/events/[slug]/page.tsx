import { PortableText, toPlainText } from "@portabletext/react";
import {
  AreDatesTheSame,
  GetTimeStringFromDate,
  getURLForSanityImage,
  sanityBlocksToText,
  sanityBodyPTComponents,
} from "../../utils";
import { getEvent, getEventType } from "~/app/sanity/lib/query";
import {
  LucideArrowLeft,
  LucideCalendarClock,
  LucideExternalLink,
  LucideMapPin,
} from "lucide-react";
import { Separator } from "../../components/UI/separator";
import { EventLocationDisplay } from "../EventLocationDisplay";
import InternalLinkButton from "../../components/General/InternalLinkButton";
import Link from "next/link";
import InternalLink from "../../components/General/InternalLink";
import BannerImageWithBlurredBackground from "../../components/BannerImageWithBlurredBackground";
import { Metadata, ResolvingMetadata } from "next";
import { AppEmail, AppFullName } from "../../config";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const event: getEventType = await getEvent(slug);
  const previousImages = (await parent).openGraph?.images || [];
  if (event.image) {
    previousImages.unshift(getURLForSanityImage(event.image).quality(50).url());
  }

  // @ts-expect-error Type doesn't match due to non-existent Sanity Types
  const bodyPlainText = toPlainText(event.body);
  const description =
    event.body === undefined ? "No description" : bodyPlainText;
  const limitedDescription =
    description.length > 384
      ? `${description.substring(0, 384)}...`
      : description;

  const limitedTitle = event.title.substring(0, 128);
  return {
    title: limitedTitle,
    description: limitedDescription,
    openGraph: {
      title: limitedTitle,
      description: limitedDescription,
      emails: [AppEmail],
      images: previousImages,
      siteName: AppFullName,
      publishedTime: event._createdAt,
      authors: event.postedBy ? [event.postedBy.fullName] : undefined,
      type: "article",
      locale: "en_US",
    },
  };
}
export const revalidate = process.env.NODE_ENV === "development" ? 0 : 1800;
export default async function Page({ params }: Props) {
  const { slug } = params;
  const event: getEventType = await getEvent(slug);
  if (!event) {
    return (
      <div className="w-11/12 sm:w-9/12 md:w-7/12 py-8 mx-auto flex items-center justify-center flex-col gap-2">
        <div className="text-3xl font-bold">Error 404</div>
        <div>Unable to find that event.</div>
        <InternalLinkButton variant="success" href="/events/">
          View Events
        </InternalLinkButton>
      </div>
    );
  }
  const body = event.body ?? [];
  const startDate: Date = new Date(event.startDate);
  const endDate: Date = new Date(event.endDate);
  const relevantLinks = event?.relevantLinks;
  // bg-slate-300 dark:bg-slate-950/50
  return (
    <article className="w-11/12 sm:w-9/12 md:w-7/12 py-8 mx-auto">
      <div className="mb-2">
        <Link
          href={"/events"}
          className="hover:text-green-500 transition-colors"
        >
          <LucideArrowLeft className="inline" />
          Go back
        </Link>
      </div>
      <BannerImageWithBlurredBackground
        image={event.image}
        title={event.title}
      />
      <div>
        <div className="text-xl md:text-3xl font-bold">{event.title}</div>
        <div className="text-base sm:text-lg md:text-1xl font-medium">
          <LucideCalendarClock className="size-5 inline-block" />{" "}
          <span>
            {startDate.toDateString()} @ {GetTimeStringFromDate(startDate)}
            {" to "}
            {!AreDatesTheSame(startDate, endDate) && (
              <>{endDate.toDateString()} @ </>
            )}
            {GetTimeStringFromDate(new Date(event.endDate))}
          </span>
        </div>
        <div className="text-base sm:text-lg md:text-1xl font-medium">
          <LucideMapPin className="size-5 inline-block" />{" "}
          <span>
            <EventLocationDisplay event={event} type="node" />
          </span>
        </div>
        {event.bookTicket && (
          <InternalLinkButton
            className="mt-2"
            variant="information"
            href={event.bookTicket}
            target="_blank"
          >
            Attend
          </InternalLinkButton>
        )}
      </div>
      <Separator className="bg-slate-400 dark:bg-slate-900 my-4" />
      <div className="hyphens-manual break-all">
        {Array.isArray(body) && body.length > 0 ? (
          <PortableText value={body} components={sanityBodyPTComponents} />
        ) : (
          <div>No description provided.</div>
        )}
      </div>
      {Array.isArray(relevantLinks) && relevantLinks.length > 0 && (
        <>
          <Separator className="bg-slate-400 dark:bg-slate-900 my-4" />
          <div className="flex flex-wrap gap-1">
            <div className="flex items-center gap-1">
              <LucideExternalLink className="size-5 inline-block" />{" "}
              <span>Relevant Links: </span>
            </div>
            {relevantLinks.map((relLink, index) => (
              <span key={relLink}>
                <InternalLink
                  href={relLink}
                  target="_blank"
                  referrerPolicy="no-referrer"
                >
                  {relLink}
                </InternalLink>
                {index < relevantLinks.length - 1 && <>,</>}
              </span>
            ))}
          </div>
        </>
      )}
    </article>
  );
}
