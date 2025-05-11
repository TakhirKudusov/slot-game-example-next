import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { StateName } from '@/shared/model';

import { SlotUiName, SlotUiState } from '../lib';

const initialState: SlotUiState = {
  currentTab: SlotUiName.SLOT_GAME,
};

const slotUiSlice = createSlice({
  name: StateName.SLOT_UI,
  initialState,
  reducers: {
    setCurrentTab: (
      state,
      { payload }: PayloadAction<SlotUiState['currentTab']>,
    ) => {
      state.currentTab = payload;
    },
  },
});

export const { setCurrentTab } = slotUiSlice.actions;

export const slotUiReducer = slotUiSlice.reducer;
