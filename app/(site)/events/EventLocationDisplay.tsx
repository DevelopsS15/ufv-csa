import Link from "next/link";
import { getUpcomingEventType } from "~/app/sanity/lib/query";
import {
  getEventBuilding,
  getEventCampusName,
  getEventRoom,
  getValidString,
  isEventOnCampus,
} from "../utils";
import InternalLink from "../components/General/InternalLink";

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

    return `${campusName}${eventBuildingOrAdditionalDetails.trim().endsWith(',') ? eventBuildingOrAdditionalDetails.substring(0, eventBuildingOrAdditionalDetails.length - 1) : eventBuildingOrAdditionalDetails}`;
  } else {
    let floor = eventRoom.substring(
      0,
      1
    );
    if (eventBuilding === "S" && eventRoom.toLowerCase().includes('evered hall')) {
      floor = '1';
    }
    const validDomains = [`ufv-ca.zoom.us`];
    return (
      <>
        {campusName}
        {isEventOnCampus(campus) ? (
          <>,{" "}
            {buildingText}{" "}
            {hasBuilding && eventRoom.length > 0 ? (
              <InternalLink
                href={`/FloorPlans/${campus}-${eventBuilding}${floor}.pdf`}
                target="_blank"
                className="underline"
              >
                {eventBuilding}
                {/\d/.test(eventRoom[0]) ? eventRoom : ` ${eventRoom}`}
              </InternalLink>
            ) : (
              <>{hasBuilding ? `${eventBuilding} ${eventRoomOrTBD}` : "TBD"}</>
            )}
          </>
        ) : (
          <>{additionalDetails.length > 0 ? <>, {validDomains.some((domain) => additionalDetails.startsWith(`https://${domain}`)) ? <InternalLink target="_blank" href={additionalDetails}>{additionalDetails}</InternalLink> : additionalDetails}</> : null}</>
        )}
      </>
    );
  }
}
