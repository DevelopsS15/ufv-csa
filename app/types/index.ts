import { PortableTextBlock } from "sanity";

export type SanityPost = {
  title: string;
  name: string;
  slug: {
    current: string;
  };
  categories: string[];
  authorImage: {
    alt: string;
    image: string;
  };
  body: PortableTextBlock;
  publishedAt: string;
};
