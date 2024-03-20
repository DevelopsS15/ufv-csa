import { cn } from "../../utils";

export function BulletPoints({
  className,
  points,
}: {
  className?: string;
  points: React.ReactNode[];
}) {
  return (
    <ol className={cn("list-decimal flex flex-col gap-3 pl-6", className)}>
      {points.map((point, index) => (
        <li key={index}>{point}</li>
      ))}
    </ol>
  );
}
