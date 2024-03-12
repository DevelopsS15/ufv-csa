import { LucideLoader2 } from "lucide-react";
import { ExecutiveDisplay } from "./ExecutiveDisplay";
import RootLayout from "./root";

export default function Loading() {
  return (
    <RootLayout>
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center w-max mx-auto gap-4">
          {[1, 2].map((pres) => (
            <ExecutiveDisplay key={pres} loading />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-center mx-auto w-max gap-4">
          {[1, 2, 3, 4].map((exec) => (
            <ExecutiveDisplay key={exec} loading />
          ))}
        </div>
      </div>
    </RootLayout>
  );
}
