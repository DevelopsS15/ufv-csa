"use client";

import { Button } from "../../components/UI/button";

export default function Page({ reset }: { reset: () => void }) {
  return (
    <div
      className={
        "w-11/12 sm:w-9/12 md:w-7/12 py-8 mx-auto flex items-center justify-center flex-col gap-2"
      }
    >
      <div className="text-center">Unable to load the announcement.</div>
      <Button variant="information" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
