import {
  type DialogTriggerProps,
  type DialogContentProps,
  type DialogProps,
} from "@radix-ui/react-dialog";
import React, { type PropsWithChildren, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "~/app/(site)/components/UI/dialog";
import { cn } from "~/app/(site)/utils";

export interface CustomDialogProps extends DialogProps {
  trigger?: ReactNode;
  title?: string;
  pt?: {
    content?: DialogContentProps;
    trigger?: DialogTriggerProps;
  };
}

const BasicDialog = ({
  children,
  trigger,
  ...props
}: PropsWithChildren<CustomDialogProps>) => {
  return (
    <Dialog {...props}>
      {trigger && (
        <DialogTrigger {...props.pt?.trigger}>{trigger}</DialogTrigger>
      )}
      <DialogContent
        {...props.pt?.content}
        className={cn(
          "max-h-[90%] overflow-y-auto",
          props?.pt?.content?.className
        )}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default BasicDialog;
