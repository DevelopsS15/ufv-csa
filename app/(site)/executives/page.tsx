import {
  getCurrentExecutiveType,
  getCurrentExecutives,
} from "~/app/sanity/lib/query";
import RootLayout from "./root";
import { Metadata } from "next";
import { ExecutiveDisplay } from "./ExecutiveDisplay";

export const metadata: Metadata = {
  title: "Executives",
};

export const revalidate = process.env.NODE_ENV === "development" ? 0 : 86400; // 1 day
export default async function Page() {
  const executives = await getCurrentExecutives();
  const filterForExecs = (exec: getCurrentExecutiveType) =>
    exec.latestPosition?.title?.toLowerCase().includes("president");

  const presidents = executives.filter(filterForExecs);
  const otherExecs = executives.filter((exec) => !filterForExecs(exec));
  return (
    <RootLayout>
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center w-max mx-auto gap-4">
          {presidents.map((pres) => (
            <ExecutiveDisplay key={pres._id} executive={pres} />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-center mx-auto w-max gap-4">
          {otherExecs.map((exec) => (
            <ExecutiveDisplay key={exec._id} executive={exec} />
          ))}
        </div>
      </div>
    </RootLayout>
  );
}
