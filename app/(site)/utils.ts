import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import imageUrlBuilder from "@sanity/image-url";
import client from "~/app/(site)/client";
import { Image as SanityImageType } from "sanity";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface SanityImageWithAltType extends SanityImageType {
  alt?: string;
}

export function urlFor(source: SanityImageWithAltType) {
  return imageUrlBuilder(client).image(source);
}
