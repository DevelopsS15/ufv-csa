"use client";
import { type VariantProps } from "class-variance-authority";
import Link from "next/link";
import React from "react";
import { type ButtonCustomProps, buttonVariants } from "../UI/button";
import { cn } from "~/app/(site)/utils";
import { LucideLoader2 } from "lucide-react";

export interface ButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants>,
    ButtonCustomProps {}

const InternalLinkButton = React.forwardRef<HTMLAnchorElement, ButtonProps>(
  (
    {
      className,
      variant,
      href,
      size,
      iconPos = "left",
      loading = false,
      children,
      icon,
      ...props
    },
    ref,
  ) => {
    return (
      <Link
        className={cn(buttonVariants({ variant, size, className }))}
        href={href ?? ""}
        ref={ref}
        {...props}
      >
        <>
          {iconPos === "left" &&
            (loading ? <LucideLoader2 className="animate-spin" /> : icon)}
          {children}
          {iconPos === "right" &&
            (loading ? <LucideLoader2 className="animate-spin" /> : icon)}
        </>
      </Link>
    );
  },
);
InternalLinkButton.displayName = "Button";

export default InternalLinkButton;
