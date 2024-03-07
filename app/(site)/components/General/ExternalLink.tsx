"use client";
import { ExternalLinkIcon } from "lucide-react";
import React from "react";
import { cn } from "~/app/(site)/utils";

const ExternalLink = React.forwardRef<
	HTMLAnchorElement,
	React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, href, children, ...props }, ref) => {
	return (
		<a
			href={href ?? "#"}
			ref={ref}
			className={cn(
				`inline-flex items-center gap-1 text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400`,
				className,
			)}
			{...props}>
			{children}
			{typeof href === "string" && <ExternalLinkIcon className="size-3" />}
		</a>
	);
});
ExternalLink.displayName = "ExternalLink";

export default ExternalLink;
