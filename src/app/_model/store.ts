import { configureStore } from '@reduxjs/toolkit';

import { slotConfigReducer } from '@/entities/slot-config';
import { slotUiReducer } from '@/entities/slot-ui';

import { StateName } from '@/shared/model';

/**
 * Функция для создания хранилища Redux
 */
export const store = configureStore({
  reducer: {
    [StateName.SLOT_UI]: slotUiReducer,
    [StateName.SLOT_CONFIG]: slotConfigReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
