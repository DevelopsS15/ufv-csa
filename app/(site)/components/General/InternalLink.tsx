import Link from "next/link";
import React from "react";
import { cn } from "~/app/(site)/utils";

interface InternalLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  prefetch?: boolean;
}

const InternalLink = React.forwardRef<HTMLAnchorElement, InternalLinkProps>(
  ({ className, href, children, ...props }, ref) => {
    return (
      <Link
        href={href ?? "#"}
        ref={ref}
        className={cn(
          `text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400`,
          className,
        )}
        {...props}
      >
        {children}
      </Link>
    );
  },
);
InternalLink.displayName = "InternalLink";
export default InternalLink;
