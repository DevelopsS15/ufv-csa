import { LucideKeyRound } from "lucide-react";
import { defineField, defineType } from "sanity";

const sanityWebhookDocumentAlert =
  "DO NOT CREATE ITEMS HERE. THIS IS USED INTERNALLY BY THE SANITY WEBHOOK.";
export default defineType({
  name: "idempotencyKey",
  title: "Idempotency Keys",
  type: "document",
  icon: LucideKeyRound,
  fields: [
    defineField({
      name: "ignoredPrivateField",
      title: sanityWebhookDocumentAlert,
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "value",
      title: "Idempotency Key",
      type: "string",
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
  ],
});
