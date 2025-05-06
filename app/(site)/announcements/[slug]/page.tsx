import { PortableText, toPlainText } from "@portabletext/react";
import { cn, getURLForSanityImage, sanityBodyPTComponents } from "../../utils";
import {
  getAnnouncement,
  getAnnouncementsForStaticParams,
} from "~/app/sanity/lib/query";
import { LucideArrowLeft } from "lucide-react";
import { Separator } from "../../components/UI/separator";
import InternalLinkButton from "../../components/General/InternalLinkButton";
import Link from "next/link";
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
  const announcement = await getAnnouncement(slug);
  if (!announcement) {
    return {
      title: "Unknown announcement",
      description: "Unable to find this announcement.",
    };
  }
  
  const previousImages = (await parent).openGraph?.images || [];
  if (announcement.image) {
    previousImages.unshift(
      getURLForSanityImage(announcement.image).quality(50).url()
    );
  }

  // @ts-expect-error Type doesn't match due to non-existent Sanity Types
  const descriptionText = toPlainText(announcement.body).trim();
  const description =
    descriptionText.length > 1 ? descriptionText : "No description";
  const limitedDescription =
    description.length > 384
      ? `${description.substring(0, 384)}...`
      : description;

  const limitedTitle = announcement.title.substring(0, 128);
  return {
    title: limitedTitle,
    description: limitedDescription,
    openGraph: {
      emails: [AppEmail],
      title: limitedTitle,
      description: limitedDescription,
      publishedTime: announcement._createdAt,
      authors: announcement.postedBy ? [announcement.postedBy] : undefined,
      images: previousImages,
      siteName: AppFullName,
      locale: "en_US",
      type: "article",
    },
  };
}

export async function generateStaticParams() {
  const announcements = await getAnnouncementsForStaticParams();
  return announcements;
}

// export const revalidate = process.env.NODE_ENV === "development" ? 0 : 3600; // 1 hour
export default async function Page({ params }: Props) {
  const { slug } = params;
  const announcement = await getAnnouncement(slug);
  const baseClassName = "w-11/12 sm:w-9/12 md:w-7/12 py-8 mx-auto";
  if (!announcement) {
    return (
      <div
        className={cn(
          baseClassName,
          "flex items-center justify-center flex-col gap-2"
        )}
      >
        <div className="text-3xl font-bold">Error 404</div>
        <div>Unable to find that announcement.</div>
        <InternalLinkButton variant="success" href="/announcements">
          View Announcements
        </InternalLinkButton>
      </div>
    );
  }
  const body = announcement.body ?? [];

  return (
    <article className={baseClassName}>
      <div className="mb-2">
        <Link
          href={"/announcements"}
          className="hover:text-green-500 transition-colors flex items-center gap-1"
        >
          <LucideArrowLeft className="size-5 min-w-5" />
          Go back
        </Link>
      </div>
      <BannerImageWithBlurredBackground
        image={announcement.image}
        title={announcement.title}
      />
      <div>
        <div className="text-xl md:text-3xl font-bold">
          {announcement.title}
        </div>
      </div>
      <Separator className="bg-slate-400 dark:bg-slate-900 my-4" />
      <div className="hyphens-manual break-words">
        {Array.isArray(body) && body.length > 0 ? (
          <PortableText value={body} components={sanityBodyPTComponents} />
        ) : (
          <div>No description provided.</div>
        )}
      </div>
    </article>
  );
}
