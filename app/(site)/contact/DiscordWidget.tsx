"use client";

import React from "react";
import { AppDiscordWidgetLink } from "../config";

export default function DiscordWidget() {
  const [hasError, setHasError] = React.useState<boolean>(false);
  return (
    !hasError && (
      <iframe
        referrerPolicy="no-referrer"
        src={AppDiscordWidgetLink}
        onErrorCapture={() => setHasError(true)}
        onError={() => setHasError(true)}
        className="border-0 rounded-md w-full h-[500px] mx-auto bg-slate-300 dark:bg-slate-900"
      />
    )
  );
}
