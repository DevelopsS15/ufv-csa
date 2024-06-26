import { cn } from "~/app/(site)/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-400 dark:bg-gray-950",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
