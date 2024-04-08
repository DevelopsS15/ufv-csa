"use client";

import { getUpcomingEventType } from "~/app/sanity/lib/query";
import { AreDatesTheSame } from "../utils";
import React, { useEffect } from "react";

export const StatusOfEventClient = ({
  event,
}: {
  event: getUpcomingEventType;
}) => {
  const [statusOfEvent, setStatusOfEvent] = React.useState<string>("");
  useEffect(() => {
    const todayDate = new Date();
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    const isBeforeEventEnd = todayDate < endDate;
    const isEventOccuring = todayDate >= startDate && isBeforeEventEnd;

    const isStartingSoon =
      todayDate >
        new Date(new Date(startDate).setHours(startDate.getHours() - 1)) &&
      isBeforeEventEnd;

    const isEventToday =
      AreDatesTheSame(todayDate, startDate) && isBeforeEventEnd;

    let _statusOfEvent = "";
    if (isEventOccuring) {
      _statusOfEvent = "now";
    } else if (isStartingSoon) {
      _statusOfEvent = "soon";
    } else if (isEventToday) {
      _statusOfEvent = "today";
    } else if (!isBeforeEventEnd) {
      _statusOfEvent = "over";
    }
    setStatusOfEvent(_statusOfEvent);
  }, [event.endDate, event.startDate]);

  return (
    statusOfEvent.length > 0 && (
      <div className="relative">
        <div className="absolute right-0 top-0">
          <span
            className="ml-2 bg-green-500 px-2 py-0.5 rounded-tr-md rounded-bl-md"
            aria-label={`The event is happening ${statusOfEvent}`}
          >
            {statusOfEvent.toUpperCase()}
          </span>
        </div>
      </div>
    )
  );
};
