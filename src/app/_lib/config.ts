import {
  LinesDefinitionsFor5x4,
  Paytable,
  RightToLeftLinesPatterns,
  SymbolsSequence,
  VideoSlotConfig,
  VideoSlotSession,
  VideoSlotSessionSerializer,
} from "pokie";

/**
 * Символы на слотах
 */
enum SlotSymbol {
  TUNG_SAHUR = "TUNG_SAHUR",
  SHIMPANZINI_BANANINI = "SHIMPANZINI_BANANINI",
  TRALALERO_TRALALA = "TRALALERO_TRALALA",
  LIRILI_LARILA = "LIRILI_LARILA",
  BRR_PATAPIM = "BRR_PATAPIM",
  CAPPUCCINI_ASASSINO = "CAPPUCCINI_ASASSINO",
  TRULIMERO_TRULICINA = "TRULIMERO_TRULICINA",
  BOMBINI_GUSINI_SCATTER = "BOMBINI_GUSINI_SCATTER",
  BOMBARDILO_CROCODILO_WILD = "BOMBARDILO_CROCODILO_WILD",
}

/**
 * Конфигурация слота
 */
const config = new VideoSlotConfig();
config.setReelsNumber(5);
config.setReelsSymbolsNumber(4);
config.setAvailableBets([10, 20, 30, 40, 50, 100, 200, 250, 500]);
config.setAvailableSymbols(Object.values(SlotSymbol));
config.setWildSymbols([SlotSymbol.BOMBARDILO_CROCODILO_WILD]);
config.setScatterSymbols([SlotSymbol.BOMBINI_GUSINI_SCATTER]);

/**
 * Дефольная настройка выигрышных линий
 */
const defaultLinesDefinitions = new LinesDefinitionsFor5x4();

const linesPatterns = new RightToLeftLinesPatterns(config.getReelsNumber());
config.setLinesPatterns(linesPatterns);

/**
 * Последовательности символов
 */
const sequences = [];
for (let i = 0; i < config.getReelsNumber(); i++) {
  /*
  Create a single sequence for the current reel. The sequence is empty by default.
   */
  const sequence = new SymbolsSequence();

  /*
  There are several ways of initializing the sequence with symbols.
  Here we will initialize it by defining a map of the number of each symbol on the sequence.
  Let's say we want to have 5 symbols "Nines" and "Tens", 4 "Jacks" and "Queens", 3 "Kings", 2 "Aces", 5 "Wilds",
  and only 1 "Scatter1".
   */
  sequence.fromNumbersOfSymbols({
    [SlotSymbol.TUNG_SAHUR]: 9,
    [SlotSymbol.SHIMPANZINI_BANANINI]: 8,
    [SlotSymbol.TRALALERO_TRALALA]: 7,
    [SlotSymbol.LIRILI_LARILA]: 6,
    [SlotSymbol.BRR_PATAPIM]: 5,
    [SlotSymbol.CAPPUCCINI_ASASSINO]: 4,
    [SlotSymbol.TRULIMERO_TRULICINA]: 3,
    [SlotSymbol.BOMBARDILO_CROCODILO_WILD]: 2,
    [SlotSymbol.BOMBINI_GUSINI_SCATTER]: 1,
  });

  /*
  The sequence we've just created will contain the stacks of the size of the number of every symbol we've provided.
  We need to shuffle it to have symbols distributed randomly on the sequence.
   */
  sequence.shuffle();

  /*
  Since we want to have only 1 "Scatter1" symbol on every reel during play, we need to continue shuffling
  the sequence until there are no situations where 2 or more "Scatter1" symbols appear together.
   */
  for (let j = 0; j < sequence.getSize(); j++) {
    const symbols = sequence.getSymbols(j, config.getReelsSymbolsNumber());
    const scatters = symbols.filter(
      (symbol) => symbol === SlotSymbol.BOMBINI_GUSINI_SCATTER,
    );
    if (scatters.length > 1) {
      sequence.shuffle();
      j = 0;
    }
  }

  /*
  Once we have the properly built sequence, we save it for the current reel.
   */
  sequences.push(sequence);
}

config.setSymbolsSequences(sequences);

config.setCreditsAmount(10000);

const paytable = new Paytable(config.getAvailableBets());

paytable.setPayoutForSymbol(SlotSymbol.TUNG_SAHUR, 3, 1);
paytable.setPayoutForSymbol(SlotSymbol.TUNG_SAHUR, 4, 2);
paytable.setPayoutForSymbol(SlotSymbol.TUNG_SAHUR, 5, 3);

paytable.setPayoutForSymbol(SlotSymbol.SHIMPANZINI_BANANINI, 3, 1);
paytable.setPayoutForSymbol(SlotSymbol.SHIMPANZINI_BANANINI, 4, 2);
paytable.setPayoutForSymbol(SlotSymbol.SHIMPANZINI_BANANINI, 5, 3);

paytable.setPayoutForSymbol(SlotSymbol.TRALALERO_TRALALA, 3, 2);
paytable.setPayoutForSymbol(SlotSymbol.TRALALERO_TRALALA, 4, 4);
paytable.setPayoutForSymbol(SlotSymbol.TRALALERO_TRALALA, 5, 6);

paytable.setPayoutForSymbol(SlotSymbol.LIRILI_LARILA, 3, 2);
paytable.setPayoutForSymbol(SlotSymbol.LIRILI_LARILA, 4, 4);
paytable.setPayoutForSymbol(SlotSymbol.LIRILI_LARILA, 5, 6);

paytable.setPayoutForSymbol(SlotSymbol.BRR_PATAPIM, 3, 4);
paytable.setPayoutForSymbol(SlotSymbol.BRR_PATAPIM, 4, 6);
paytable.setPayoutForSymbol(SlotSymbol.BRR_PATAPIM, 5, 8);

paytable.setPayoutForSymbol(SlotSymbol.CAPPUCCINI_ASASSINO, 3, 6);
paytable.setPayoutForSymbol(SlotSymbol.CAPPUCCINI_ASASSINO, 4, 8);
paytable.setPayoutForSymbol(SlotSymbol.CAPPUCCINI_ASASSINO, 5, 10);

paytable.setPayoutForSymbol(SlotSymbol.TRULIMERO_TRULICINA, 3, 6);
paytable.setPayoutForSymbol(SlotSymbol.TRULIMERO_TRULICINA, 4, 8);
paytable.setPayoutForSymbol(SlotSymbol.TRULIMERO_TRULICINA, 5, 10);

paytable.setPayoutForSymbol(SlotSymbol.BOMBINI_GUSINI_SCATTER, 3, 10);
paytable.setPayoutForSymbol(SlotSymbol.BOMBINI_GUSINI_SCATTER, 4, 20);
paytable.setPayoutForSymbol(SlotSymbol.BOMBINI_GUSINI_SCATTER, 5, 30);

config.setPaytable(paytable);

const session = new VideoSlotSession(config);

export const customGameSession = session;
export const customGameSessionSerializer = new VideoSlotSessionSerializer();
export const customScenarios = [];
