import { getPost } from "~/app/sanity/lib/query";
import { SanityPost } from "~/app/types";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { SanityImageWithAltType, urlFor } from "../../utils";

const ptComponents = {
  types: {
    image: (value: SanityImageWithAltType) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <Image
          alt={value.alt ?? " "}
          loading="lazy"
          src={urlFor(value)
            .width(320)
            .height(240)
            .fit("max")
            .auto("format")
            .url()}
        />
      );
    },
  },
};

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post: SanityPost = await getPost(slug);
  if (!post) {
    return <div>No post</div>;
  }
  const body = post.body ?? [];
  console.log(post);
  return (
    <article className="w-9/12 py-8 mx-auto">
      <h1>{post.slug?.current}</h1>
      <div>{post.title}</div>
      <div>{post.name}</div>
      <div>
        {post.authorImage && (
          <div>
            <Image
              src={urlFor(post.authorImage).width(128).url()}
              alt={"Author image"}
              width={128}
              height={128}
            />
          </div>
        )}
        {post.publishedAt}
      </div>
      <PortableText value={body} components={ptComponents} />
      {post.categories && (
        <ul>
          Posted in
          {post.categories.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      )}
    </article>
  );
}
