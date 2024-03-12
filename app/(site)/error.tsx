"use client";

import { Button } from "./components/UI/button";

export default function Page({ reset }: { reset: () => void }) {
  return (
    <div>
      <div className="text-center">Unable to load the page due to an error</div>
      <Button variant="information" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
