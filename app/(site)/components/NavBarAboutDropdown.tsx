"use client";

import React from "react";
import InternalLinkButton from "./General/InternalLinkButton";
import { Button } from "./UI/button";
import { Popover, PopoverContent, PopoverTrigger } from "./UI/popover";

export default function NavBarAboutDropdown() {
  const [open, setOpen] = React.useState<boolean>(false);
  const buttonOnClick = () => setOpen(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost">About</Button>
      </PopoverTrigger>
      <PopoverContent className="w-max flex flex-col gap-1 p-1 bg-slate-300 dark:bg-slate-900 border-slate-400 dark:border-slate-800 border-2">
        <InternalLinkButton
          href="/executives"
          variant="ghost"
          onClick={buttonOnClick}
        >
          Executives
        </InternalLinkButton>
        <InternalLinkButton
          href="/history"
          variant="ghost"
          onClick={buttonOnClick}
        >
          History
        </InternalLinkButton>
        <InternalLinkButton
          href="/regulations"
          variant="ghost"
          onClick={buttonOnClick}
        >
          Regulations
        </InternalLinkButton>
        <InternalLinkButton
          href="/constitution"
          variant="ghost"
          onClick={buttonOnClick}
        >
          Constitution
        </InternalLinkButton>
      </PopoverContent>
    </Popover>
  );
}
