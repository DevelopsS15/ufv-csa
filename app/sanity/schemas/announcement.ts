import { LucideCalendarRange, LucideMegaphone } from "lucide-react";
import { defineField, defineType } from "sanity";
import { AppAbbreviationName, AppFullName } from "~/app/(site)/config";
import { SanityAnnouncementType } from "~/app/types";

const announcementCategoryOptions: {
  value: SanityAnnouncementType;
  title: string;
}[] = [
  {
    title: `${AppFullName} (${AppAbbreviationName})`,
    value: SanityAnnouncementType.CSA,
  },
  {
    title: "Institute of Electrical and Electronics Engineers (IEEE)",
    value: SanityAnnouncementType.IEEE,
  },
];

export default defineType({
  name: "announcement",
  title: "Announcements",
  icon: LucideMegaphone,
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL Path)",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Announcement Image",
      type: "image",
    }),
    defineField({
      name: "postedBy",
      title: "Posted By",
      type: "reference",
      to: { type: "executives" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pingEveryone",
      title: "Ping Everyone",
      description: `This will ping everyone in the ${AppAbbreviationName} Server`,
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      initialValue: "csa",
      options: {
        list: announcementCategoryOptions,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      postedBy: "postedBy.fullName",
      image: "image",
    },
    prepare({ title, postedBy, image }) {
      return {
        title:
          typeof title === `string` && title.length > 1 ? title : "No title",
        subtitle: typeof postedBy === `string` ? `Posted by: ${postedBy}` : "",
        media: image ?? LucideCalendarRange,
      };
    },
  },
});
