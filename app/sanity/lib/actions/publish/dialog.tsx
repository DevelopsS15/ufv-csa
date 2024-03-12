import groq from "groq";
import { LucideLoader2, LucideTrash2 } from "lucide-react";
import { createClient } from "next-sanity";
import React from "react";
import {
  DocumentActionConfirmDialogProps,
  DocumentActionDescription,
  DocumentActionDialogProps,
  DocumentActionProps,
  useDocumentOperation,
} from "sanity";
import client from "~/app/(site)/client";

export function ConfirmDialogAction({
  id,
  type,
  onComplete,
  ...props
}: DocumentActionProps): DocumentActionDescription {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const { del } = useDocumentOperation(id, type);
  const dialogProps: DocumentActionConfirmDialogProps = {
    type: "confirm",
    onCancel: onComplete,
    onConfirm: async () => {
      // setDeleting(true);
      // await client.delete({
      //   query: groq`*[_type == "discordMessages" && type == "event" && eventDocumentId._ref == $documentId]`,
      //   params: {
      //     documentId: id,
      //   },
      // });
      // setDeleting(false);
      // del.execute();
      onComplete();
    },
    confirmButtonIcon: deleting
      ? () => <LucideLoader2 className="size-3 animate-spin" />
      : undefined,
    message: "Are you sure you want to delete this event?",
  };
  return {
    label: "Delete",
    icon: LucideTrash2,
    disabled: !!del.disabled,
    onHandle: () => {
      setDialogOpen(true);
    },
    dialog: dialogOpen && dialogProps,
  };
}
