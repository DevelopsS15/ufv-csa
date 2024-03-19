"use client";

import { Button } from "../../components/UI/button";

export default function Page({ reset }: { reset: () => void }) {
  return (
    <div className="flex items-center justify-center flex-col gap-2 py-8">
      <div className="text-center">
        Unable to load the meeting minutes due to an error
      </div>
      <div className="mx-auto w-max mt-4">
        <Button variant="information" onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </div>
  );
}
