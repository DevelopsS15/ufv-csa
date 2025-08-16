import { LucideCalendarFold, LucideCalendarRange } from "lucide-react";
import { defineField, defineType } from "sanity";
import { GetTimeStringFromDate, isEventOnCampus } from "~/app/(site)/utils";
import { allCampusOptions } from "../constants";

export default defineType({
  name: "event",
  title: "Events",
  icon: LucideCalendarFold,
  type: "document",
  fieldsets: [
    {
      name: "location",
      title: "Event Location",
    },
    {
      name: "dateTime",
      title: "Date & Time",
    },
  ],
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
      title: "Event Image",
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
      name: "startDate",
      title: "Start",
      type: "datetime",
      fieldset: "dateTime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End",
      type: "datetime",
      fieldset: "dateTime",
      validation: (rule) => [
        rule.min(rule.valueOfField("startDate")),
        rule.required(),
      ],
    }),
    defineField({
      name: "campus",
      title: "Campus",
      type: "string",
      fieldset: "location",
      options: {
        layout: "dropdown",
        list: allCampusOptions,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "additionalDetails",
      title: "Additional Details",
      description: "Ex. Via Zoom",
      type: "string",
      fieldset: "location",
      hidden: ({ document }) =>
        isEventOnCampus(
          typeof document?.campus === `string` ? document?.campus : ""
        ),
    }),
    defineField({
      name: "building",
      title: "Building",
      type: "string",
      description:
        "Use only the letter (Ex. D). Leave blank for To Be Announced (TBA).",
      fieldset: "location",
      hidden: ({ document }) =>
        !isEventOnCampus(
          typeof document?.campus === `string` ? document?.campus : ""
        ),
    }),
    defineField({
      name: "room",
      title: "Room",
      description:
        "The room number (Ex. 224). Leave blank for To Be Announced (TBA).",
      type: "string",
      fieldset: "location",
      hidden: ({ document }) =>
        !isEventOnCampus(
          typeof document?.campus === `string` ? document?.campus : ""
        ) ||
        typeof document?.building !== `string` ||
        document?.building.length === 0,
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "string",
      initialValue: "free",
      options: {
        layout: "dropdown",
        list: [
          {
            title: "Free",
            value: "free",
          },
          {
            title: "Paid",
            value: "paid",
          },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bookTicket",
      title: "Book Ticket",
      description:
        "If the event requires a ticket/booking, provide the direct link. Ex: https://clubs.getqpay.com/?s=6138&eventid=21791",
      type: "url",
    }),
    defineField({
      name: "relevantLinks",
      title: "Relevant Links",
      type: "array",
      of: [{ type: "url" }],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
  ],
  initialValue: {
    campus: "A",
  },
  preview: {
    select: {
      title: "title",
      startDate: "startDate",
      image: "image",
    },
    prepare({ title, startDate, image }) {
      const startDateInstance = new Date(startDate);
      const isValidDate = !isNaN(startDateInstance.getTime());
      return {
        title:
          typeof title === `string` && title.length > 1 ? title : "No name",
        subtitle: isValidDate
          ? `${startDateInstance.toDateString()} @ ${GetTimeStringFromDate(
              startDateInstance
            )}`
          : "Date: Unknown",
        media: image ?? LucideCalendarRange,
      };
    },
  },
});
