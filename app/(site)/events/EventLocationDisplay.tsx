import Link from "next/link";
import { getUpcomingEventType } from "~/app/sanity/lib/query";
import {
  getEventBuilding,
  getEventCampusName,
  getEventRoom,
  getValidString,
  isEventOnCampus,
} from "../utils";

export function EventLocationDisplay({
  event,
  type = "node",
}: {
  event: getUpcomingEventType;
  type?: "string" | "node";
}) {
  const { building, campus, room } = event;
  const campusName = getEventCampusName(campus);
  const eventRoom = getEventRoom(campus, room);
  const eventBuilding = getEventBuilding(building);
  const buildingText = eventRoom.length > 0 ? "" : "Building ";
  const additionalDetails = getValidString(event?.additionalDetails);
  const hasBuilding = eventBuilding.length > 0;
  const eventRoomOrTBD = eventRoom.length > 0 ? eventRoom : "Room: TBD";
  if (type === "string") {
    const eventBuildingOrAdditionalDetails = isEventOnCampus(campus)
      ? hasBuilding
        ? `, ${buildingText}${eventBuilding} ${eventRoomOrTBD}`
        : " TBD"
      : ` ${additionalDetails}`;

    return `${campusName}${eventBuildingOrAdditionalDetails}`;
  } else {
    return (
      <>
        {campusName},{" "}
        {isEventOnCampus(campus) ? (
          <>
            {buildingText}{" "}
            {hasBuilding && eventRoom.length > 0 ? (
              <Link
                href={`/FloorPlans/${campus}-${eventBuilding}${eventRoom.substring(
                  0,
                  1
                )}.pdf`}
                target="_blank"
                className="underline"
              >
                {eventBuilding}
                {eventRoom}
              </Link>
            ) : (
              <>{hasBuilding ? `${eventBuilding} ${eventRoomOrTBD}` : "TBD"}</>
            )}
          </>
        ) : (
          <>{additionalDetails}</>
        )}
      </>
    );
  }
}
