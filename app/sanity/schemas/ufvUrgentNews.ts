import { LucideNewspaper } from "lucide-react";
import { defineField, defineType } from "sanity";

const discordMessageAlert =
  "DO NOT CREATE ITEMS HERE. THIS IS USED INTERNALLY BY UFV URGENT NEWS.";
export default defineType({
  name: "ufvUrgentNews",
  title: "UFV Urgent News",
  type: "document",
  icon: LucideNewspaper,
  fields: [
    defineField({
      name: "ignoredPrivateField",
      title: discordMessageAlert,
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "discordMessageId",
      type: "string",
      readOnly: true,
      validation: (rule) => [
        rule.required().error("You must provide a Discord Id"),
        rule
          .regex(/^\d{17,19}$/g)
          .error("This appears to be an invalid Discord Id"),
      ],
    }),
    defineField({
      name: "newsTitle",
      readOnly: true,
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "newsUrl",
      readOnly: true,
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      _createdAt: "_createdAt",
      newsTitle: "newsTitle",
      discordMessageId: "discordMessageId",
    },
    prepare({ newsTitle, _createdAt, discordMessageId }) {
      return {
        title: newsTitle,
        subtitle: `${_createdAt} ${discordMessageId}`,
      };
    },
  },
});
