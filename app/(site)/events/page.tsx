import { getUpcomingEvents } from "~/app/sanity/lib/query";
import RootLayout from "./root";
import { Metadata } from "next";
import { AppFullName } from "../config";
import { BasicEventDisplay } from "./BasicEventDisplay";
export const metadata: Metadata = {
  title: "Events",
  description: `View all the events hosted by the ${AppFullName} or our partners.`,
};
// export const revalidate = process.env.NODE_ENV === "development" ? 0 : 1800;
export default async function Page() {
  const events = await getUpcomingEvents();
  return (
    <RootLayout>
      {events.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {events.map((event) => (
            <BasicEventDisplay key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center">No events</div>
      )}
    </RootLayout>
  );
}
