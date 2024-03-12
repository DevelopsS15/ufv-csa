import { Skeleton } from "../components/UI/skeleton";
import RootLayout from "./root";

export default function Page() {
  const meetingMinutes = Array(6).fill(undefined);
  return (
    <RootLayout>
      {meetingMinutes.length > 0 ? (
        <div className="flex flex-col gap-2 max-w-7xl mx-auto">
          {meetingMinutes.map((_, index) => (
            <Skeleton key={index} className="h-32 w-full" />
          ))}
        </div>
      ) : (
        <div className="text-center">No meeting minutes</div>
      )}
    </RootLayout>
  );
}
