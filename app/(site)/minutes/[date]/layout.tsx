import { LucideArrowLeft } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <article className="w-11/12 sm:w-9/12 lg:w-7/12 py-8 mx-auto">
      <div className="mb-2">
        <Link
          href={`/minutes/`}
          className="hover:text-green-500 transition-colors flex items-center gap-1"
        >
          <LucideArrowLeft className="size-5 min-w-5" />
          Go back
        </Link>
      </div>
      {children}
    </article>
  );
}
