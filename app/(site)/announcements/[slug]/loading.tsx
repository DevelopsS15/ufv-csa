import { LucideLoader2 } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex items-center justify-center w-full h-full py-8">
      <LucideLoader2 className="size-12 animate-spin" />
    </main>
  );
}
