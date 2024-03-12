import { defineField, defineType } from "sanity";
import {
  SiDiscord,
  SiInstagram,
  SiLinkedin,
  SiTwitter,
} from "@icons-pack/react-simple-icons";
import { LucideUserSquare2, LucideUsersRound } from "lucide-react";
import { defaultSanityDateTimeFormatOptions } from "../lib/utils";
import { SanityExecutivePositionsList } from "../lib/components/SanityExecutivePositionsList";

export default defineType({
  name: "executives",
  title: "Executives",
  type: "document",
  icon: LucideUsersRound,
  fieldsets: [
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
      fieldset: "general",
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
      fieldset: "general",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "isCurrent",
      title: "Is Current Executive",
      type: "boolean",
      fieldset: "general",
      initialValue: true,
    }),
    defineField({
      name: "positions",
      title: "Positions",
      description: "List your positions in reverse chronological order.",
      type: "array",
      fieldset: "general",
      components: {
        input: SanityExecutivePositionsList,
      },
      of: [
        {
          title: "Term Duration",
          name: "termDuration",
          type: "object",
          fields: [
            {
              name: "position",
              type: "reference",
              to: { type: "executivePositions" },
            },
            {
              name: "startDate",
              type: "date",
              title: "Start of Term",
              options: defaultSanityDateTimeFormatOptions,
            },
            {
              name: "endDate",
              type: "date",
              title: "End Of Term",
              options: defaultSanityDateTimeFormatOptions,
              validation: (rule) =>
                rule.custom((endDate, context) => {
                  if (!endDate || typeof endDate !== `string`) {
                    return true;
                  }
                  // @ts-ignore
                  const startDate = context?.parent?.startDate;
                  if (!startDate || typeof startDate !== `string`) return true;
                  return new Date(startDate) < new Date(endDate)
                    ? true
                    : "End date must be after their start date.";
                }),
            },
          ],
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "twitter",
      title: "Twitter Username",
      type: "string",
      description:
        "https://twitter.com/YourUsername. This will be publicly displayed",
      fieldset: "socialMedia",
      icon: SiTwitter,
    }),
    defineField({
      name: "discordId",
      title: "Discord ID",
      type: "string",
      description: "This will be private",
      fieldset: "socialMedia",
      icon: SiDiscord,
      validation: (rule) =>
        rule
          .regex(/^\d{17,19}$/g)
          .error("This appears to be an invalid Discord Id"),
    }),
    defineField({
      name: "discordUsername",
      title: "Discord Username",
      description: "This will be publicly displayed",
      type: "string",
      fieldset: "socialMedia",
      icon: SiDiscord,
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn Username",
      type: "string",
      description:
        "https://linkedin.com/in/YourUsername. This will be publicly displayed",
      fieldset: "socialMedia",
      icon: SiLinkedin,
    }),
    defineField({
      name: "instagram",
      title: "Instagram Username",
      description:
        "https://instagram.com/YourUsername. This will be publicly displayed",
      type: "string",
      fieldset: "socialMedia",
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
