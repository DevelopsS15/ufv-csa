import { getUpcomingEventType } from "~/app/sanity/lib/query";
import {
  getEventBuilding,
  getEventRoom,
  isEventOnCampus,
} from "../utils";
import InternalLink from "../components/General/InternalLink";
import React, { ReactNode } from "react";
import { allCampusOptions } from "~/app/sanity/constants";

export function EventLocationDisplay({
  event,
  type = "node",
  withMarkdown = false,
}: {
  event: getUpcomingEventType;
  type?: "string" | "node";
  withMarkdown?: boolean;
}) {
  const validDomains = [`ufv-ca.zoom.us`];

  const { building, campus, room } = event;
  const campusData = allCampusOptions.find((campusOption) => campusOption.value === campus);
  if (!campusData) return "Unknown Campus";

  const campusName = campusData.title;
  const isOnCampus = isEventOnCampus(campus);

  const eventBuilding = getEventBuilding(building);
  const hasBuilding = eventBuilding.length > 0;

  const eventRoom = getEventRoom(campus, room);
  const hasRoom = eventRoom.length > 0;
  const buildingText = eventRoom.length > 0 ? "" : "Building ";
  let floor = eventRoom.substring(0, 1);
  if (campus === 'A' && eventBuilding === "S" && eventRoom.toLowerCase().includes('evered hall')) {
    floor = '1';
  }
  const additionalDetails = event?.additionalDetails;

  const components: ReactNode[] = [];
  if (campusData.referenceLink) {
    if (type === "string") {
      components.push(withMarkdown ? `[${campusName}](${campusData.referenceLink})` : campusName);
    } else {
      components.push(<InternalLink target="_blank" href={campusData.referenceLink}>{campusName}</InternalLink>)
    }
  } else {
    components.push(campusName);
  }


  // If the event is on campus, we can display the building and room information (If present)
  if (isOnCampus) {
    if (hasBuilding) {
      const isRoomNumber = /\d/.test(eventRoom[0]);
      const fullBuildingText = buildingText + eventBuilding;
      const roomText = isRoomNumber ? eventRoom : ` ${eventRoom}`;

      if (hasRoom) {
        const buildingAndRoomText = `${fullBuildingText}${roomText}`;
        const floorplanURL = `https://csa.ufv.ca/FloorPlans/${campus}-${eventBuilding}${floor}.pdf`;

        components.push(type === 'string' ? (withMarkdown ? `[${buildingAndRoomText}](${floorplanURL})` : buildingAndRoomText) : <InternalLink
          href={floorplanURL}
          target="_blank"
        >
          {buildingAndRoomText}
        </InternalLink>)
      } else {
        components.push(`${fullBuildingText}, Room: TBA`);
      }
    } else {
      components.push(`TBA`);
    }

  } else if (typeof additionalDetails === 'string') {
    // Push the additional details
    const isPartOfValidDomain = validDomains.some((domain) => additionalDetails.startsWith(`https://${domain}`));
    if (type === 'node' && isPartOfValidDomain) {
      components.push(<InternalLink target="_blank" href={additionalDetails}>{additionalDetails}</InternalLink>)
    } else {
      components.push(additionalDetails);
    }
  }

  return type === 'string' ? components.join(', ') : (
    <>
      {components.map((component, index) => (
        <React.Fragment key={index}>
          {component}
          {index < components.length - 1 && ", "}
        </React.Fragment>
      ))}
    </>
  );
}
