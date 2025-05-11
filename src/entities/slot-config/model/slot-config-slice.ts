import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  LinesDefinitionsDescribing,
  Paytable,
  SymbolsSequence,
  VideoSlotConfig,
} from 'pokie';

import { SlotConfigState } from '@/entities/slot-config/lib';

import { StateName } from '@/shared/model';

const initialState: SlotConfigState = {
  config: new VideoSlotConfig(),
  isReady: false,
};

const slotConfigSlice = createSlice({
  name: StateName.SLOT_CONFIG,
  initialState,
  reducers: {
    /**
     * Настройка количества слотов и окна
     * @param state
     * @param payload
     */
    setReelsConfig: (
      state,
      {
        payload,
      }: PayloadAction<{
        reelsNumber: number;
        reelsSymbolsNumber: number;
      }>,
    ) => {
      state.config.setReelsNumber(payload.reelsNumber);
      state.config.setReelsSymbolsNumber(payload.reelsSymbolsNumber);
    },

    /**
     * Настройка выигрышных линий
     * @param state
     * @param payload
     */
    setLinesDefinitions: (
      state,
      { payload }: PayloadAction<LinesDefinitionsDescribing>,
    ) => {
      state.config.setLinesDefinitions(payload);
    },

    /**
     * Настройка доступного баланса
     * @param state
     * @param payload
     */
    setCreditAmount: (state, { payload }: PayloadAction<number>) => {
      state.config.setCreditsAmount(payload);
    },

    /**
     * Настройка символов
     * @param state
     * @param payload
     */
    setSymbols: (
      state,
      {
        payload,
      }: PayloadAction<{
        availableSymbols: string[];
        scatterSymbols: string[];
        wildSymbols: string[];
      }>,
    ) => {
      state.config.setAvailableSymbols(payload.availableSymbols);
      state.config.setScatterSymbols(payload.scatterSymbols);
      state.config.setWildSymbols(payload.wildSymbols);
    },

    /**
     * Настройка таблицы выплат
     * @param state
     * @param payload
     */
    setPaytable: (
      state,
      { payload }: PayloadAction<[string, number, number][]>,
    ) => {
      const paytable = new Paytable(
        state.config.getAvailableBets(),
        state.config.getAvailableSymbols(),
      );

      for (const paytableData of payload) {
        paytable.setPayoutForSymbol(...paytableData);
      }

      state.config.setPaytable(paytable);
    },

    /**
     * Настройка последовательности символов слотов
     * @param state
     * @param payload
     */
    setSequence: (
      state,
      {
        payload,
      }: PayloadAction<{
        symbolsNumbers: {
          [key: string]: number;
        };
        scatterSymbol?: string;
      }>,
    ) => {
      const sequence = new SymbolsSequence().fromNumbersOfSymbols(
        payload.symbolsNumbers,
      );

      for (let i = 0; i < sequence.getSize(); i++) {
        const symbols = sequence.getSymbols(
          i,
          state.config.getReelsSymbolsNumber(),
        );

        if (payload.scatterSymbol) {
          const indexOfS = symbols.indexOf(payload.scatterSymbol);
          const lastIndexOfS = symbols.lastIndexOf(payload.scatterSymbol);
          if (indexOfS !== lastIndexOfS) {
            i = 0;
            sequence.shuffle();
          }
        }
      }

      state.config.setSymbolsSequences([
        new SymbolsSequence().fromArray(sequence.toArray()),
        new SymbolsSequence().fromArray(sequence.toArray()),
        new SymbolsSequence().fromArray(sequence.toArray()),
      ]);
    },

    setIsReady: (state, { payload }: PayloadAction<boolean>) => {
      state.isReady = payload;
    },
  },
});

export const {
  setCreditAmount,
  setLinesDefinitions,
  setPaytable,
  setReelsConfig,
  setSequence,
  setSymbols,
  setIsReady,
} = slotConfigSlice.actions;

export const slotConfigReducer = slotConfigSlice.reducer;
