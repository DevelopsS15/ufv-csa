import { groq } from "next-sanity";
import client from "~/app/(site)/client";
import { Image as SanityImageType } from "sanity";
export async function getPost(slug: string) {
  return client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]{
        title, 
        "name": author->name, 
        "image": author->image,
        "categories": categories[]->title,
        "authorImage": author->image,
        body
        }`,
    { slug }
  );
}

export interface getCurrentExecutive {
  _id: string;
  fullName: string;
  avatar: SanityImageType;
  startDate: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  discordUsername?: string;
  discordId?: string;
  positionName?: string;
  positionDescription?: string;
}

export async function getCurrentExecutives(): Promise<getCurrentExecutive[]> {
  return client.fetch(groq`*[_type == "executives" && isCurrent == true]{
    _id,
    fullName,
    avatar,
    "positionName": position->title,
    "positionDescription": position->description,
    startDate,
    twitter,
    instagram,
    linkedin,
    discordUsername,
    discordId
  }`);
}
