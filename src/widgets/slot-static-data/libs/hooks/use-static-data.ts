import {
  SymbolsCombination,
  SymbolsCombinationsAnalyzer,
  VideoSlotWinCalculator,
} from 'pokie';
import { useEffect, useState } from 'react';

import { StateName, useAppSelector } from '@/shared/model';

export const useStaticData = () => {
  const [totalCombinations, setTotalCombinations] = useState<number>(0);
  const [winningCombinations, setWinningCombinations] = useState<number>(0);
  const [hitFrequency, setHitFrequency] = useState<number>(0);
  const [calculatedRTP, setCalculatedRTP] = useState<number>(0);
  const [totalPayout, setTotalPayout] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { config, isReady } = useAppSelector(
    (state) => state[StateName.SLOT_CONFIG],
  );

  useEffect(() => {
    if (isReady) {
      const allReelsCombinations =
        SymbolsCombinationsAnalyzer.getAllPossibleSymbolsCombinations(
          config.getSymbolsSequences(),
          config.getReelsSymbolsNumber(),
        );

      setTotalCombinations(allReelsCombinations.length);

      const allWinsData = [];
      let totalPayout = 0;
      allReelsCombinations.forEach((combination) => {
        const wc = new VideoSlotWinCalculator(config);
        wc.calculateWin(
          config.getBet(),
          new SymbolsCombination().fromMatrix(combination),
        );
        if (wc.getWinAmount() > 0) {
          allWinsData.push(wc);
          totalPayout += wc.getWinAmount();
        }
      });

      setTotalPayout(totalPayout);
      setWinningCombinations(allWinsData.length);
      setHitFrequency(allWinsData.length / allReelsCombinations.length);
      setCalculatedRTP(totalPayout / allReelsCombinations.length);
      setIsLoading(false);
    }
  }, [isReady]);

  return {
    totalCombinations,
    winningCombinations,
    hitFrequency,
    calculatedRTP,
    totalPayout,
    isLoading,
  };
};
