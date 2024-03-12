import { SiDiscord } from "@icons-pack/react-simple-icons";
import { defineField, defineType } from "sanity";

const discordMessageAlert =
  "DO NOT CREATE ITEMS HERE. THIS IS USED INTERNALLY BY DISCORD WEBHOOKS.";
export default defineType({
  name: "discordMessages",
  title: "Discord Messages",
  type: "document",
  icon: SiDiscord,
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
      name: "type",
      readOnly: true,
      type: "string",
      initialValue: "event",
      options: {
        layout: "dropdown",
        list: [
          {
            title: "event",
            value: "event",
          },
          {
            title: "announcement",
            value: "event",
          },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "eventDocumentId",
      type: "reference",
      weak: true,
      readOnly: true,
      to: { type: "event" },
    }),
    defineField({
      name: "revisionId",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "announcementDocumentId",
      type: "reference",
      weak: true,
      readOnly: true,
      to: { type: "announcement" },
    }),
  ],
  preview: {
    select: {
      eventTitle: "eventDocumentId.title",
      type: "type",
      announcementTitle: "announcementDocumentId.title",
      revisionId: "revisionId",
      discordMessageId: "discordMessageId",
    },
    prepare({
      announcementTitle,
      eventTitle,
      type,
      discordMessageId,
      revisionId,
    }) {
      return {
        title:
          (type === "event" ? eventTitle : announcementTitle) ??
          "Unknown Message",
        subtitle: `${discordMessageId} for Revision: ${revisionId}`,
      };
    },
  },
});
