import { VideoSlotSession, VideoSlotSessionSerializer } from 'pokie';

export type SlotSessionState = {
  session: VideoSlotSession | null;
  serializer: VideoSlotSessionSerializer;
};
