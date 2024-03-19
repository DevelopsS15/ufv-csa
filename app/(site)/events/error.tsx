"use client";

import { Button } from "../components/UI/button";
import RootLayout from "./root";

export default function Page({ reset }: { reset: () => void }) {
  return (
    <RootLayout>
      <div>
        <div className="text-center">Unable to load events due to an error</div>
        <div className="mx-auto w-max mt-4">
          <Button variant="information" onClick={() => reset()}>
            Try again
          </Button>
        </div>
      </div>
    </RootLayout>
  );
}
