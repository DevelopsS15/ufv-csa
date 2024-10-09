import { LucideHome } from "lucide-react";
import { defineField, defineType } from "sanity";

const discordMessageAlert =
  "DO NOT CREATE ITEMS HERE. THIS IS USED INTERNALLY BY DISCORD COMMANDS.";
export default defineType({
  name: "roomStatus",
  title: "SCC Room Status",
  type: "document",
  icon: LucideHome,
  fields: [
    defineField({
      name: "ignoredPrivateField",
      title: discordMessageAlert,
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "discordUserId",
      description:
        "DO NOT MODIFY THIS VALUE UNLESS THE ORIGINAL MESSAGE WAS DELETED.",
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
      name: "status",
      title: "Is Room Open?",
      type: "boolean",
      initialValue: false,
    }),
  ],
  // preview: {
  //   select: {
  //     eventTitle: "eventDocumentId.title",
  //     type: "type",
  //     announcementTitle: "announcementDocumentId.title",
  //     revisionId: "revisionId",
  //     discordMessageId: "discordMessageId",
  //   },
  //   prepare({
  //     announcementTitle,
  //     eventTitle,
  //     type,
  //     discordMessageId,
  //     revisionId,
  //   }) {
  //     return {
  //       title:
  //         (type === "event" ? eventTitle : announcementTitle) ??
  //         "Unknown Message",
  //       subtitle: `${discordMessageId} for Revision: ${revisionId}`,
  //     };
  //   },
  // },
});
