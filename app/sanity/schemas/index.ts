import blockContent from "./blockContent";
import event from "./event";
import executives from "./executives";
import executivePositions from "./executivePositions";
import discordMessages from "./discordMessages";
import announcement from "./announcement";
import meetingMinutes from "./meetingMinutes";
import discordEvents from "./discordEvents";
import idempotencyKey from "./idempotencyKey";
import ufvUrgentNews from "./ufvUrgentNews";
import roomStatus from "./roomStatus";

export const schemaTypes = [
  event,
  announcement,
  blockContent,
  meetingMinutes,
  executives,
  executivePositions,
  roomStatus,
  ufvUrgentNews,
  discordMessages,
  discordEvents,
  idempotencyKey,
];
