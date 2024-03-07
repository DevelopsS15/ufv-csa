import { defineField, defineType } from "sanity";
import {
  SiDiscord,
  SiInstagram,
  SiLinkedin,
  SiTwitter,
} from "@icons-pack/react-simple-icons";
import { LucideUserSquare2, LucideUsersRound } from "lucide-react";

export default defineType({
  name: "executives",
  title: "Executives",
  type: "document",
  icon: LucideUsersRound,
  groups: [
    {
      name: "general",
      title: "General",
    },
    {
      name: "socialMedia",
      title: "Social Media",
    },
  ],
  fields: [
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
      validation: (rule) => rule.required().min(1).max(128),
      group: "general",
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
      group: "general",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "isCurrent",
      title: "Is Current Executive",
      type: "boolean",
      group: "general",
      initialValue: true,
    }),
    defineField({
      name: "position",
      title: "Position",
      type: "reference",
      group: "general",
      to: { type: "executivePositions" },
      validation: (rule) =>
        rule.required().error("You must assign a executive position"),
    }),
    defineField({
      name: "startDate",
      title: "Started At",
      type: "date",
      group: "general",
      initialValue: new Date().toISOString().substring(0, 10),
    }),
    defineField({
      name: "endDate",
      title: "Ended At",
      type: "date",
      group: "general",
      validation: (rule) =>
        rule.custom((endDate, context) => {
          if (typeof endDate === `undefined`) {
            return true;
          }
          return context.document?.startDate &&
            context.document.startDate < endDate
            ? true
            : "End date must be after their start date.";
        }),
    }),
    defineField({
      name: "twitter",
      title: "Twitter Username",
      type: "string",
      description: "https://twitter.com/YourUsername",
      group: "socialMedia",
      icon: SiTwitter,
    }),
    defineField({
      name: "discordId",
      title: "Discord ID",
      type: "string",
      group: "socialMedia",
      icon: SiDiscord,
      validation: (rule) => [
        rule.required().error("You must provide a Discord Id"),
        rule
          .regex(/^\d{17,19}$/g)
          .error("This appears to be an invalid Discord Id"),
      ],
    }),
    defineField({
      name: "discordUsername",
      title: "Discord Username",
      description: "This will be publicly displayed",
      type: "string",
      group: "socialMedia",
      icon: SiDiscord,
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn Username",
      type: "string",
      description:
        "https://linkedin.com/in/YourUsername. This will be publicly displayed",
      group: "socialMedia",
      icon: SiLinkedin,
    }),
    defineField({
      name: "instagram",
      title: "Instagram Username",
      description:
        "https://instagram.com/YourUsername. This will be publicly displayed",
      type: "string",
      group: "socialMedia",
      icon: SiInstagram,
    }),
  ],
  preview: {
    select: {
      title: "fullName",
      isCurrent: "isCurrent",
      position: "position.title",
      media: "avatar",
    },
    prepare({ title, isCurrent, media, position }) {
      return {
        title:
          typeof title === `string` && title.length > 1 ? title : "No name",
        subtitle: `${isCurrent ? "Current" : "Former"} ${
          position ?? "Executive"
        }`,
        media: media ?? LucideUserSquare2,
      };
    },
  },
});
