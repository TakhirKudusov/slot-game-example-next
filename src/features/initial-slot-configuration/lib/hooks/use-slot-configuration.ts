import { useEffect } from 'react';

import {
  setCreditAmount,
  setIsReady,
  setLinesDefinitions,
  setPaytable,
  setReelsConfig,
  setSequence,
  setSymbols,
} from '@/entities/slot-config';

import { useAppDispatch } from '@/shared/model';

import {
  DEFAULT_CREDIT_AMOUNT,
  DEFAULT_PAYTABLE_DATA,
  DEFAULT_SYMBOLS_NUMBERS,
} from '../constants';
import { SlotSymbol } from '../enums';
import { handleCreateLinesDefinitions } from '../helpers';

export const useSlotConfiguration = () => {
  const dispatch = useAppDispatch();

  const customLinesDefinitions = handleCreateLinesDefinitions();

  useEffect(() => {
    dispatch(
      setReelsConfig({
        reelsSymbolsNumber: 3,
        reelsNumber: 3,
      }),
    );

    dispatch(setLinesDefinitions(customLinesDefinitions));

    dispatch(setCreditAmount(DEFAULT_CREDIT_AMOUNT));

    dispatch(
      setSymbols({
        availableSymbols: Object.values(SlotSymbol),
        wildSymbols: [SlotSymbol.CROKODILO_WILD],
        scatterSymbols: [SlotSymbol.GUSINI_SCATTER],
      }),
    );

    dispatch(setPaytable(DEFAULT_PAYTABLE_DATA));

    dispatch(
      setSequence({
        scatterSymbol: SlotSymbol.GUSINI_SCATTER,
        symbolsNumbers: DEFAULT_SYMBOLS_NUMBERS,
      }),
    );

    dispatch(setIsReady(true));
  }, []);
};
