import { LucideArrowLeft } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "../../components/UI/skeleton";
import { Separator } from "../../components/UI/separator";

export default function Loading() {
  return (
    <div className="flex flex-col gap-1">
      <Skeleton className="h-5 w-full max-w-64" />
      <Skeleton className="h-5 w-full max-w-[512px]" />
      <Skeleton className="h-5 w-full max-w-60" />
      <Skeleton className="h-80 w-full max-w-64 ml-8" />
      <Skeleton className="h-5 w-full max-w-[576px]" />
      <Skeleton className="h-5 w-full max-w-56" />
      <Skeleton className="h-5 w-full max-w-64" />
      <Skeleton className="h-5 w-full max-w-[592px]" />
      <Separator className="bg-slate-400 dark:bg-slate-900 my-4" />
      <Skeleton className="h-5 w-full max-w-64" />
      <Skeleton className="h-5 w-full max-w-96" />
      <Skeleton className="h-5 w-full max-w-48" />
      <div className="ml-4 flex flex-col gap-1">
        <Skeleton className="h-5 w-full max-w-80" />
        <Skeleton className="h-5 w-full max-w-64" />
        <Skeleton className="h-5 w-full max-w-80" />
        <Skeleton className="h-5 w-full max-w-64" />
      </div>
      <Skeleton className="h-5 w-full max-w-48" />
      <Skeleton className="h-5 w-full max-w-96" />
    </div>
  );
}
