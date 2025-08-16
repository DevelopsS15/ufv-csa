import { SiDiscord } from "@icons-pack/react-simple-icons";
import { defineField, defineType } from "sanity";

const discordMessageAlert =
  "DO NOT CREATE ITEMS HERE. THIS IS USED INTERNALLY BY DISCORD WEBHOOKS.";
export default defineType({
  name: "discordEvents",
  title: "Discord Events",
  type: "document",
  // @ts-expect-error 
  icon: SiDiscord,
  fields: [
    defineField({
      name: "ignoredPrivateField",
      title: discordMessageAlert,
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "discordEventId",
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
      name: "reminders",
      type: "object",
      initialValue: {},
      readOnly: false,
      fields: [
        {
          name: "month",
          title: "Month Before",
          type: "datetime",
          initialValue: null,
        },
        {
          name: "week",
          title: "Week Before",
          type: "datetime",
          initialValue: null,
        },
        {
          name: "day",
          title: "Day Of",
          type: "datetime",
          initialValue: null,
        },
      ],
    }),
  ],
  preview: {
    select: {
      eventTitle: "eventDocumentId.title",
      revisionId: "revisionId",
      discordMessageId: "discordMessageId",
    },
    prepare({ eventTitle, discordMessageId, revisionId }) {
      return {
        title: eventTitle ?? "Unknown Event",
        subtitle: `${discordMessageId} for Revision: ${revisionId}`,
      };
    },
  },
});
