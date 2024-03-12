"use client";

import { Button } from "../components/UI/button";
import RootLayout from "./root";

export default function Page({ reset }: { reset: () => void }) {
  return (
    <RootLayout>
      <div>
        <div className="text-center">
          Unable to load announcements due to an error
        </div>
        <Button variant="information" onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </RootLayout>
  );
}
