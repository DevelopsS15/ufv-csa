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

export const schemaTypes = [
  event,
  announcement,
  blockContent,
  meetingMinutes,
  executives,
  executivePositions,
  ufvUrgentNews,
  discordMessages,
  discordEvents,
  idempotencyKey,
];
