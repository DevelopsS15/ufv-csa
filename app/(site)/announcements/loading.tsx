import { Skeleton } from "../components/UI/skeleton";
import RootLayout from "./root";

export default function Page() {
  const announcements = Array(6).fill(undefined);
  return (
    <RootLayout>
      {announcements.length > 0 ? (
        <div className="flex flex-col gap-2 max-w-7xl mx-auto">
          {announcements.map((_, index) => (
            <Skeleton key={index} className="h-32 w-full" />
          ))}
        </div>
      ) : (
        <div className="text-center">No announcements</div>
      )}
    </RootLayout>
  );
}
