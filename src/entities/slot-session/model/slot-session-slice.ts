import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { VideoSlotSession, VideoSlotSessionSerializer } from 'pokie';

import { StateName } from '@/shared/model';

import { SlotSessionState } from '../lib';

const initialState: SlotSessionState = {
  session: null,
  serializer: new VideoSlotSessionSerializer(),
};

const slotSessionSlice = createSlice({
  initialState,
  name: StateName.SLOT_SESSION,
  reducers: {
    setSession: (state, { payload }: PayloadAction<VideoSlotSession>) => {
      state.session = payload;
    },
  },
});

export const { setSession } = slotSessionSlice.actions;

export const slotSessionReducer = slotSessionSlice.reducer;
