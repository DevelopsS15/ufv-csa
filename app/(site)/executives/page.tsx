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

// export const revalidate = process.env.NODE_ENV === "development" ? 0 : 86400; // 1 day
export default async function Page() {
  const executives = await getCurrentExecutives();
  const filterForExecs = (exec: getCurrentExecutiveType) =>
    exec.latestPosition?.title?.toLowerCase().includes("president");

  const presidents = executives.filter(filterForExecs);
  const otherExecs = executives.filter((exec) => !filterForExecs(exec));

  const execGroupClassName =
    "flex flex-wrap justify-center mx-auto max-w-4xl";
  const execItemClassName = `w-full sm:w-2/4 md:w-1/3 lg:w-1/4 p-4`;

  return (
    <RootLayout>
      <div className={execGroupClassName}>
        {presidents.map((pres) => (
          <div className={execItemClassName} key={pres._id}>
            <ExecutiveDisplay executive={pres} />
          </div>
        ))}
      </div>
      <div className={execGroupClassName}>
        {otherExecs.map((exec) => (
          <div className={execItemClassName} key={exec._id}>
            <ExecutiveDisplay executive={exec} />
          </div>
        ))}
      </div>
    </RootLayout>
  );
}
