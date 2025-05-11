import * as POKIE from "pokie";
import { VideoSlotSession, VideoSlotSessionSerializer } from "pokie";

export enum SlotSymbols {
  SHIMPANZINI = "shimpanzini",
  CAPPUCCINO = "cappucino",
  SAHUR = "sahur",
  LIRILI = "lirili",
  TRALALELO = "tralalelo",
  TRULIMERO = "trulimero",
  GUSINI_SCATTER = "gusini_scatter",
  CROKODILO_WILD = "crocodilo_wild",
}

const config = new POKIE.VideoSlotConfig();
config.setReelsNumber(3);
config.setReelsSymbolsNumber(3);

const linesDefinitions = new POKIE.LinesDefinitionsFor3x3();
const customLinesDefinitions = new POKIE.CustomLinesDefinitions();
customLinesDefinitions.setLineDefinition(
  "0",
  linesDefinitions.getLineDefinition("0"),
);
customLinesDefinitions.setLineDefinition(
  "1",
  linesDefinitions.getLineDefinition("1"),
);
customLinesDefinitions.setLineDefinition(
  "2",
  linesDefinitions.getLineDefinition("2"),
);
customLinesDefinitions.setLineDefinition(
  "3",
  linesDefinitions.getLineDefinition("3"),
);
customLinesDefinitions.setLineDefinition(
  "4",
  linesDefinitions.getLineDefinition("4"),
);
config.setLinesDefinitions(customLinesDefinitions);
config.setCreditsAmount(1_000_000);

config.setAvailableSymbols(Object.values(SlotSymbols));
config.setScatterSymbols([SlotSymbols.GUSINI_SCATTER]);
config.setWildSymbols([SlotSymbols.CROKODILO_WILD]);

const pt = new POKIE.Paytable(
  config.getAvailableBets(),
  config.getAvailableSymbols(),
);

// payouts for 2 symbols
pt.setPayoutForSymbol(SlotSymbols.SHIMPANZINI, 2, 0.4);
pt.setPayoutForSymbol(SlotSymbols.CAPPUCCINO, 2, 0.5);

pt.setPayoutForSymbol(SlotSymbols.SAHUR, 2, 0.6);
pt.setPayoutForSymbol(SlotSymbols.LIRILI, 2, 0.7);

pt.setPayoutForSymbol(SlotSymbols.TRALALELO, 2, 0.8);

pt.setPayoutForSymbol(SlotSymbols.TRULIMERO, 2, 0.9);

// payouts for 3 symbols
pt.setPayoutForSymbol(SlotSymbols.SHIMPANZINI, 3, 1);
pt.setPayoutForSymbol(SlotSymbols.CAPPUCCINO, 3, 2);

pt.setPayoutForSymbol(SlotSymbols.SAHUR, 3, 3);
pt.setPayoutForSymbol(SlotSymbols.LIRILI, 3, 4);

pt.setPayoutForSymbol(SlotSymbols.TRALALELO, 3, 5);

pt.setPayoutForSymbol(SlotSymbols.TRULIMERO, 3, 6);

// payout for 3 scatter symbols
pt.setPayoutForSymbol(SlotSymbols.GUSINI_SCATTER, 3, 10);

config.setPaytable(pt);

const symbolsNumbers = {
  [SlotSymbols.SHIMPANZINI]: 10,
  [SlotSymbols.CAPPUCCINO]: 7,
  [SlotSymbols.SAHUR]: 6,
  [SlotSymbols.LIRILI]: 5,
  [SlotSymbols.TRALALELO]: 4,
  [SlotSymbols.TRULIMERO]: 3,
  [SlotSymbols.GUSINI_SCATTER]: 2,
  [SlotSymbols.CROKODILO_WILD]: 1,
};
const sequence = new POKIE.SymbolsSequence().fromNumbersOfSymbols(
  symbolsNumbers,
);

for (let i = 0; i < sequence.getSize(); i++) {
  const symbols = sequence.getSymbols(i, config.getReelsSymbolsNumber());
  const indexOfS = symbols.indexOf(SlotSymbols.GUSINI_SCATTER);
  const lastIndexOfS = symbols.lastIndexOf(SlotSymbols.GUSINI_SCATTER);
  if (indexOfS !== lastIndexOfS) {
    i = 0;
    sequence.shuffle();
  }
}

console.log("Sequence size: " + sequence.getSize());

config.setSymbolsSequences([
  new POKIE.SymbolsSequence().fromArray(sequence.toArray()),
  new POKIE.SymbolsSequence().fromArray(sequence.toArray()),
  new POKIE.SymbolsSequence().fromArray(sequence.toArray()),
]);

const session = new VideoSlotSession(config);

const customGameSession = session;
const customGameSessionSerializer = new VideoSlotSessionSerializer();

export { config, customGameSession, customGameSessionSerializer };
