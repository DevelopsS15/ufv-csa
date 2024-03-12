import { Skeleton } from "../components/UI/skeleton";
import RootLayout from "./root";

export default function Page() {
  const events = Array(8).fill(undefined);
  return (
    <RootLayout>
      {events.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {events.map((_, index) => (
            <Skeleton key={index} className="h-64 w-full" />
          ))}
        </div>
      ) : (
        <div className="text-center">No events</div>
      )}
    </RootLayout>
  );
}
