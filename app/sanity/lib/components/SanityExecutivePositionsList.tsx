// @ts-nocheck
import groq from "groq";
import React from "react";
import { readClient, readClientWithCDN } from "~/app/(site)/client";
import { Skeleton } from "~/app/(site)/components/UI/skeleton";
import { longMonthDayYearDateFormatOption } from "~/app/(site)/utils";

export function SanityExecutivePositionsList(props) {
  const [positions, setPositions] = React.useState<{ _id: string; title: string }[]>([]);
  const [retrievingPositions, setRetrievingPositions] = React.useState<boolean>(true);

  React.useEffect(() => {
    const hasAnyPositions = props.value.filter((item) => item.position && item.position._ref).length > 0;
    if (!hasAnyPositions) return;

    const runAsync = async () => {
      try {
        setRetrievingPositions(true);
        const data = await readClientWithCDN.fetch(groq`*[_type=="executivePositions"]{_id, title}`);
        setPositions(data);
      } catch (error) {
        console.error(error);
      } finally {
        setRetrievingPositions(false);
      }
    }
    runAsync();
  }, []);

  return props.renderDefault({
    ...props,
    renderPreview: (itemProp) => {
      // This is the main custom rendering for each item in the Positions list. 
      // This allows us to display the position title and formatted term duration, instead of raw references and date strings.
      if (itemProp.value._type === "termDuration") {
        const startDateInstance = new Date(itemProp.value.startDate);
        const endDateInstance = new Date(itemProp.value.endDate);
        const isValidStart = !isNaN(startDateInstance.getTime());
        const isValidEnd = !isNaN(endDateInstance.getTime());

        const positionRef = itemProp.value.position?._ref;
        const positionData = positions.find((pos) => pos._id === positionRef);
        const positionName = positionData ? positionData.title : null;

        let durationString = "Unknown duration";
        if (isValidStart || isValidEnd) {
          const startString = isValidStart ? startDateInstance.toLocaleDateString(undefined, longMonthDayYearDateFormatOption) : "Unknown";
          const endString = isValidEnd ? endDateInstance.toLocaleDateString(undefined, longMonthDayYearDateFormatOption) : "unknown";
          durationString = `${startString} to ${endString}`;
        }

        return (
          <>
            {retrievingPositions ? (<Skeleton className="h-4 w-full" />) : (<div>{positionName ?? "Unknown position"}</div>)}
            <div>{durationString}</div>
          </>
        );
      }
      return props.renderPreview(itemProp);
    }
  });
}