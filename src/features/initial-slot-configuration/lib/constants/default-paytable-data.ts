import { DefaultPaytableData } from '@/entities/slot-config';

import { SlotSymbol } from '../enums';

export const DEFAULT_PAYTABLE_DATA: DefaultPaytableData = [
  // для 2 символов
  [SlotSymbol.SHIMPANZINI, 2, 0.4],
  [SlotSymbol.CAPPUCCINO, 2, 0.5],
  [SlotSymbol.SAHUR, 2, 0.6],
  [SlotSymbol.LIRILI, 2, 0.7],
  [SlotSymbol.TRALALELO, 2, 0.8],
  [SlotSymbol.TRULIMERO, 2, 0.9],

  // для 3 символов
  [SlotSymbol.SHIMPANZINI, 3, 1],
  [SlotSymbol.CAPPUCCINO, 3, 2],
  [SlotSymbol.SAHUR, 3, 3],
  [SlotSymbol.LIRILI, 3, 4],
  [SlotSymbol.TRALALELO, 3, 5],
  [SlotSymbol.TRULIMERO, 3, 6],

  // для 3 скеттеров
  [SlotSymbol.GUSINI_SCATTER, 3, 10],
];
