"use client";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import React, { type PropsWithChildren, type ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../UI/tooltip";

const BasicTooltip = React.forwardRef(
  (
    {
      children,
      content,
    }: PropsWithChildren<{
      content: ReactNode;
    }>,
    _,
  ) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent>
            <TooltipArrow className="fill-white dark:fill-slate-950" />
            {content ?? "Missing tooltip"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  },
);
BasicTooltip.displayName = "BasicTooltip";

export default BasicTooltip;
