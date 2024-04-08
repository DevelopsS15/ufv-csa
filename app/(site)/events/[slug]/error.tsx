"use client";

import { Button } from "../../components/UI/button";

export default function Page({ reset }: { reset: () => void }) {
  return (
    <div>
      <div className="text-center">
        Unable to load that event due to an error
      </div>
      <div className="mx-auto w-max mt-4">
        <Button variant="information" onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </div>
  );
}
