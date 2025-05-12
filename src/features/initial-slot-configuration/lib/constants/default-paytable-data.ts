import { DefaultPaytableData } from '@/entities/slot-config';

import { SlotSymbol } from '../enums';

export const DEFAULT_PAYTABLE_DATA: DefaultPaytableData = [
  // для 2 символов
  [SlotSymbol.APPLE, 2, 0.4],
  [SlotSymbol.LEMON, 2, 0.5],
  [SlotSymbol.WATERMELON, 2, 0.6],
  [SlotSymbol.KIWI, 2, 0.7],
  [SlotSymbol.ORANGE, 2, 0.8],
  [SlotSymbol.PEAR, 2, 0.9],

  // для 3 символов
  [SlotSymbol.APPLE, 3, 1],
  [SlotSymbol.LEMON, 3, 2],
  [SlotSymbol.WATERMELON, 3, 3],
  [SlotSymbol.KIWI, 3, 4],
  [SlotSymbol.ORANGE, 3, 5],
  [SlotSymbol.PEAR, 3, 6],

  // для 3 скеттеров
  [SlotSymbol.BANANA_SCATTER, 3, 10],
];
