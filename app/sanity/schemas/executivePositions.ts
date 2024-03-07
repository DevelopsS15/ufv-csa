import { LucideNetwork } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "executivePositions",
  title: "Executive Positions",
  type: "document",
  icon: LucideNetwork,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
  ],
});
