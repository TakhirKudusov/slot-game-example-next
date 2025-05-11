"use client";

import {
  VideoSlotInitialNetworkData,
  VideoSlotRoundNetworkData,
  VideoSlotSession,
  VideoSlotSessionSerializer,
  VideoSlotWithFreeGamesInitialNetworkData,
  VideoSlotWithFreeGamesRoundNetworkData,
  VideoSlotWithFreeGamesSession,
  VideoSlotWithFreeGamesSessionSerializer,
} from "pokie";

let localSession: VideoSlotSession | VideoSlotWithFreeGamesSession;
let localSerializer:
  | VideoSlotSessionSerializer
  | VideoSlotWithFreeGamesSessionSerializer;

export const initializeData = (
  session: VideoSlotSession | VideoSlotWithFreeGamesSession,
  serializer:
    | VideoSlotSessionSerializer
    | VideoSlotWithFreeGamesSessionSerializer,
) => {
  localSession = session;
  localSerializer = serializer;
};

export const getInitialData = async (): Promise<
  VideoSlotInitialNetworkData | VideoSlotWithFreeGamesInitialNetworkData
> => {
  return new Promise((res) => {
    res(
      localSerializer.getInitialData(
        localSession as VideoSlotWithFreeGamesSession,
      ),
    );
  });
};

export const getRoundData = async (): Promise<
  VideoSlotRoundNetworkData | VideoSlotWithFreeGamesRoundNetworkData
> => {
  return new Promise((res) => {
    localSession.play();
    res(
      localSerializer.getRoundData(
        localSession as VideoSlotWithFreeGamesSession,
      ),
    );
  });
};
