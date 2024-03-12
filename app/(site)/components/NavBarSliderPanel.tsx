"use client";

import { LucideMenu } from "lucide-react";
import { Button } from "./UI/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "./UI/sheet";
import LogoWithCSAStacked from "./LogoWithCSAStacked";
import InternalLinkButton from "./General/InternalLinkButton";
import React, { PropsWithChildren } from "react";

export default function NavBarSliderPanel() {
  const [open, setOpen] = React.useState<boolean>(false);
  const onClick = () => setOpen(false);

  return (
    <>
      <div className="block md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button icon={<LucideMenu />} size="icon" variant="ghost"></Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-[320px]">
            <SheetHeader>
              <SheetDescription className="flex flex-col">
                <div className="mb-2" onClick={onClick}>
                  <LogoWithCSAStacked />
                </div>
                <div className="mx-4">
                  <div className="w-full text-left border-b py-2">About</div>
                  <SheetNavButton href="/executives" onClick={onClick}>
                    Executives
                  </SheetNavButton>
                  <SheetNavButton href="/regulations" onClick={onClick}>
                    Regulations
                  </SheetNavButton>
                  <SheetNavButton href="/constitution" onClick={onClick}>
                    Constitution
                  </SheetNavButton>
                </div>
                <SheetNavButton href="/announcements" onClick={onClick}>
                  Announcements
                </SheetNavButton>
                <SheetNavButton href="/events" onClick={onClick}>
                  Events
                </SheetNavButton>
                <SheetNavButton href="/minutes" onClick={onClick}>
                  Minutes
                </SheetNavButton>
                <SheetNavButton href="/contact" onClick={onClick}>
                  Contact
                </SheetNavButton>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

function SheetNavButton({
  href,
  onClick,
  children,
}: PropsWithChildren<{
  href: string;
  onClick: () => void;
}>) {
  return (
    <InternalLinkButton
      className="justify-start w-full bg-slate-400 hover:bg-slate-300 dark:bg-slate-950 dark:hover:bg-slate-900"
      href={href}
      variant="ghost"
      onClick={onClick}
    >
      {children}
    </InternalLinkButton>
  );
}
