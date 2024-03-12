import { LucideBookMarked, LucideUser2 } from "lucide-react";
import { SanityDocument } from "next-sanity";
import { defineField, defineType } from "sanity";
import { AreDatesTheSame, GetTimeStringFromDate } from "~/app/(site)/utils";
import { defaultSanityDateTimeFormatOptions } from "../lib/utils";

const getExecutiveIds = (executives: unknown): string[] =>
  Array.isArray(executives)
    ? executives
        .map((exec) => exec?._ref)
        .filter((exec) => typeof exec === `string`)
    : [];

const filterOutIncludedExecutives = ({
  document,
}: {
  document: SanityDocument;
}) => {
  const presentExecutiveIds = getExecutiveIds(document.executivesPresent);
  const absentExecutiveIds = getExecutiveIds(document.executivesAbsent);
  // isCurrent == $isCurrent &&
  return {
    filter: `!(_id in $ids)`,
    params: {
      isCurrent: false,
      ids: presentExecutiveIds.concat(absentExecutiveIds),
    },
  };
};

const filterPresentExecutives = ({
  document,
}: {
  document: SanityDocument;
}) => {
  const presentExecutiveIds = getExecutiveIds(document.executivesPresent);
  return {
    filter: `_id in $ids`,
    params: {
      isCurrent: false,
      ids: presentExecutiveIds,
    },
  };
};

const preventChangeAfterFirstPublish = (data: { document?: SanityDocument }) =>
  false;

export default defineType({
  name: "meetingMinutes",
  title: "Meeting Minutes",
  description: "Once you publish once, you will not be able to modify this.",
  icon: LucideBookMarked,
  type: "document",
  fieldsets: [
    {
      name: "called",
      title: "Meeting Called Information",
    },
    {
      name: "attendance",
      title: "Meeting Attendance",
    },
    {
      name: "adjourned",
      title: "Meeting Adjourned Information",
    },
  ],
  fields: [
    defineField({
      name: "frozen",
      title: ` `,
      description:
        "This form can no longer be modified after the first publish",
      type: "string",
      readOnly: true,
      hidden: (data) => !preventChangeAfterFirstPublish(data),
    }),
    defineField({
      name: "executivesPresent",
      title: "Executives Present",
      fieldset: "attendance",
      type: "array",
      initialValue: [],
      of: [
        {
          type: "reference",
          to: [{ type: "executives" }],
          options: {
            filter: filterOutIncludedExecutives,
          },
        },
      ],
      validation: (rule) => rule.required().unique(),
      readOnly: (data) => preventChangeAfterFirstPublish(data),
    }),
    defineField({
      name: "executivesAbsent",
      title: "Executives Absent",
      fieldset: "attendance",
      type: "array",
      initialValue: [],
      of: [
        {
          type: "reference",
          to: [{ type: "executives" }],
          options: {
            filter: filterOutIncludedExecutives,
          },
        },
      ],
      validation: (rule) => rule.unique(),
      readOnly: (data) => preventChangeAfterFirstPublish(data),
    }),
    defineField({
      name: "membersPresent",
      title: "Members / Guests Present",
      fieldset: "attendance",
      type: "array",
      initialValue: [],
      of: [
        {
          type: "object",
          icon: LucideUser2,
          fields: [
            {
              title: "Position",
              name: "position",
              type: "string",
            },
            {
              title: "Name",
              name: "name",
              type: "string",
            },
          ],
        },
      ],
      validation: (rule) => rule.unique(),
      readOnly: (data) => preventChangeAfterFirstPublish(data),
    }),
    defineField({
      name: "calledBy",
      title: "Called By",
      description: "The executive who called the meeting into order",
      fieldset: "called",
      type: "reference",
      to: { type: "executives" },
      options: {
        filter: filterPresentExecutives,
      },
      validation: (rule) => rule.required(),
      readOnly: (data) => preventChangeAfterFirstPublish(data),
    }),
    defineField({
      name: "calledAt",
      title: "Called At",
      type: "datetime",
      fieldset: "called",
      validation: (rule) => rule.required(),
      readOnly: (data) => preventChangeAfterFirstPublish(data),
      options: defaultSanityDateTimeFormatOptions,
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "calledAt",
        slugify: (input) =>
          typeof input === `string` ? input.substring(0, 10) : "",
      },
      validation: (rule) =>
        rule.required().custom((value, context) => {
          const calledAtValue = context.document?.calledAt as string;
          const slugValue = value?.current;
          if (!calledAtValue) return true;
          if (!slugValue) return "You must provide a slug";
          if (slugValue.length !== 10)
            return "Use the generate function for a valid format";
          return calledAtValue.startsWith(slugValue)
            ? true
            : "The date provided doesn't match the 'calledAt' field.";
        }),
    }),
    defineField({
      name: "meetingItems",
      title: "Meeting Items",
      type: "blockContent",
      validation: (rule) => rule.required(),
      readOnly: (data) => preventChangeAfterFirstPublish(data),
    }),
    defineField({
      name: "adjournedBy",
      title: "Adjourned By",
      description: "The executive who adjourned the meeting",
      type: "reference",
      fieldset: "adjourned",
      to: { type: "executives" },
      options: {
        filter: filterPresentExecutives,
      },
      validation: (rule) => rule.required(),
      readOnly: (data) => preventChangeAfterFirstPublish(data),
    }),
    defineField({
      name: "adjournedAt",
      title: "Adjourned At",
      type: "datetime",
      fieldset: "adjourned",
      validation: (rule) => rule.required(),
      options: defaultSanityDateTimeFormatOptions,
      readOnly: (data) => preventChangeAfterFirstPublish(data),
    }),
    defineField({
      name: "nextScheduledMeetingAt",
      title: "Next Scheduled Meeting At",
      type: "datetime",
      fieldset: "adjourned",
      options: defaultSanityDateTimeFormatOptions,
      readOnly: (data) => preventChangeAfterFirstPublish(data),
    }),
    defineField({
      name: "createdBy",
      title: "Created By",
      description: "The executive(s) who created the meeting minutes",
      type: "array",
      initialValue: [],
      of: [
        {
          type: "reference",
          to: [{ type: "executives" }],
        },
      ],
      validation: (rule) => rule.min(1).unique(),
      readOnly: (data) => preventChangeAfterFirstPublish(data),
    }),
  ],
  preview: {
    select: {
      calledAt: "calledAt",
      createdBy: "createdBy[]{fullName}",
      image: "image",
    },
    prepare({ calledAt, createdBy, image }) {
      const calledAtDate = new Date(calledAt);
      return {
        title: isNaN(calledAtDate.getTime())
          ? "Unknown Meeting Minutes"
          : `${calledAtDate.toDateString()} @ ${GetTimeStringFromDate(
              calledAtDate,
            )}`,
        subtitle: `Created by: ${
          typeof createdBy === `string` ? ` ${createdBy}` : ""
        }`,
      };
    },
  },
});
