// @ts-nocheck
import groq from "groq";
import React from "react";
import { readClient } from "~/app/(site)/client";
import { Skeleton } from "~/app/(site)/components/UI/skeleton";
import { longMonthDayYearDateFormatOption } from "~/app/(site)/utils";

export function SanityExecutivePositionsList(props) {
  const validProps = {
    ...props,
    renderPreview: (itemProp) => CustomPreviewComponent(itemProp, props),
  };
  return validProps.renderDefault(validProps);
}

function CustomPreviewComponent(itemProp, props) {
  const [positionName, setPositionName] = React.useState<string | null>(null);
  const [fetchingPositionName, setFetchingPositionName] =
    React.useState<boolean>(false);

  const itemValue = itemProp.value;
  React.useEffect(() => {
    if (itemValue._type !== "termDuration") return;
    const itemPositionRef = itemValue.position?._ref;
    if (!itemValue.position || !itemPositionRef) return;
    const runAsync = async () => {
      try {
        setFetchingPositionName(true);
        const data = await readClient.fetch(
          groq`*[_type=="executivePositions" && _id == $ref][0]`,
          {
            ref: itemPositionRef,
          }
        );
        if (typeof data?.title === `string`) {
          setPositionName(data.title);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setFetchingPositionName(false);
      }
    };
    runAsync();
  }, [itemValue]);

  if (itemValue._type === "termDuration") {
    const startDateInstance = new Date(itemValue.startDate);
    const endDateInstance = new Date(itemValue.endDate);
    const isValidStart = !isNaN(startDateInstance.getTime());
    const isValidEnd = !isNaN(endDateInstance.getTime());
    return (
      <>
        {fetchingPositionName ? (
          <Skeleton className="h-4 w-full" />
        ) : (
          <div>{positionName ?? "Unknown position"}</div>
        )}
        <div>
          {isValidStart || isValidEnd ? (
            <>
              {isValidStart
                ? startDateInstance.toLocaleDateString(
                    undefined,
                    longMonthDayYearDateFormatOption
                  )
                : "Unknown"}{" "}
              to{" "}
              {isValidEnd
                ? endDateInstance.toLocaleDateString(
                    undefined,
                    longMonthDayYearDateFormatOption
                  )
                : "unknown"}
            </>
          ) : (
            "Unknown duration"
          )}
        </div>
      </>
    );
  }
  return props.renderPreview(itemProp);
}
