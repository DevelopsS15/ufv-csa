import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/app/(site)/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
	"inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default:
					"bg-slate-200 hover:bg-slate-300 dark:bg-slate-900 dark:hover:bg-slate-950",
				information: "bg-blue-500 text-white hover:bg-blue-600",
				danger: "bg-red-500 text-white hover:bg-red-600",
				warning: "bg-yellow-500 text-white hover:bg-yellow-500",
				success: "bg-green-500 text-white hover:bg-green-600",
				outline:
					"border border-input bg-background hover:bg-accent hover:text-accent-foreground",
				secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
				ghost: "bg-slate-0 dark:bg-slate-0 hover:bg-slate-400/50 dark:hover:bg-slate-950/50",
				link: "text-primary underline-offset-4 hover:underline",
				theme: "bg-slate-300/50 hover:bg-slate-400/50 dark:bg-slate-950/50 dark:hover:bg-slate-950/75",
			},
			size: {
				default: "h-10 px-4 py-2",
				xs: "h-min py-1 px-2 rounded-sm",
				sm: "h-9 rounded-md px-3",
				lg: "h-11 rounded-md px-8",
				icon: "h-min p-2",
				xsicon: "p-1",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface ButtonCustomProps {
	loading?: boolean;
	icon?: React.ReactNode;
	iconPos?: "left" | "right";
}

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants>,
		ButtonCustomProps {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			asChild,
			iconPos = "left",
			loading = false,
			children,
			disabled,
			icon,
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				disabled={disabled ?? loading}
				ref={ref}
				{...props}>
				<>
					{iconPos === "left" &&
						(loading ? <Loader2 className="size-4 animate-spin" /> : icon)}
					{children}
					{iconPos === "right" &&
						(loading ? <Loader2 className="size4 animate-spin" /> : icon)}
				</>
			</Comp>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
