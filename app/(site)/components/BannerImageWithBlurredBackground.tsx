import { LucideImageOff } from "lucide-react";
import Image from "next/image";
import { SanityImageWithAltType, getURLForSanityImage } from "../utils";

export default function BannerImageWithBlurredBackground({
  image,
  title,
}: {
  title: string;
  image?: SanityImageWithAltType;
}) {
  const bannerImageUrl = image
    ? getURLForSanityImage(image).quality(95).url()
    : "";

  return (
    <>
      <div className="relative">
        <div className="absolute z-20 w-full max-h-64 md:max-h-96 h-64 md:h-96 backdrop-blur-lg rounded-md flex items-center justify-center">
          {image ? (
            <Image
              className="rounded-md max-h-64 md:max-h-96 aspect-auto w-auto"
              src={bannerImageUrl}
              alt={`${title} Image`}
              loading="lazy"
              width={720}
              height={405}
            />
          ) : (
            <LucideImageOff className="size-32" />
          )}
        </div>
      </div>
      <div
        className="w-full max-h-64 md:max-h-96 flex items-center justify-center bg-no-repeat bg-cover bg-center rounded-md bg-slate-900 mb-4"
        style={
          image
            ? {
                backgroundImage: `url("${bannerImageUrl}")`,
              }
            : undefined
        }
      >
        <div className="h-64 md:h-96"></div>
      </div>
    </>
  );
}
