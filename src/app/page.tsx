"use client";

import {
  config,
  customGameSession,
  customGameSessionSerializer,
  SlotSymbols,
} from "@/app/_lib/config";
import { SyntheticEvent, useEffect, useState } from "react";
import * as POKIE from "pokie";
import {
  SymbolsCombination,
  SymbolsCombinationsAnalyzer,
  VideoSlotWinCalculator,
} from "pokie";
import { getInitialData, initializeData } from "@/app/_lib/data";

initializeData(customGameSession, customGameSessionSerializer);

const simulationConfig = new POKIE.SimulationConfig();

export default function Home() {
  const [rounds, setRounds] = useState<string>("100000");

  // static
  const [totalCombinations, setTotalCombinations] = useState<number>(0);
  const [winningCombinations, setWinningCombinations] = useState<number>(0);
  const [hitFrequency, setHitFrequency] = useState<number>(0);
  const [calculatedRTP, setCalculatedRTP] = useState<number>(0);
  const [totalPayout, setTotalPayout] = useState<number>(0);

  // simulation
  const [averageRTP, setAverageRTP] = useState<number>(0);
  const [averagePayout, setAveragePayout] = useState<number>(0);
  const [payoutDeviation, setPayoutDeviation] = useState<number>(0);
  const [averageWinPayout, setAverageWinPayout] = useState<number>(0);
  const [winPayoutDeviation, setWinPayoutDeviation] = useState<number>(0);

  const handleRunSimulation = () => {
    simulationConfig.setNumberOfRounds(Number.parseInt(rounds));
    const simulation = new POKIE.Simulation(
      customGameSession,
      simulationConfig,
    );
    simulation.run();

    setAverageRTP(simulation.getAverageRtp());
    setAveragePayout(simulation.getAveragePayout());
    setPayoutDeviation(simulation.getPayoutsStandardDeviation());
    setAverageWinPayout(simulation.getAveragePayout(false));
    setWinPayoutDeviation(simulation.getPayoutsStandardDeviation(false));
  };

  useEffect(() => {
    try {
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
    } catch (e) {
      console.error(e);
    }
  }, []);

  const formatter = new Intl.NumberFormat();

  const handleChangeInput = (e: SyntheticEvent<HTMLInputElement>) => {
    const num = Number.parseInt(e.currentTarget.value);

    if (Number.MAX_SAFE_INTEGER < num) return;

    setRounds(e.currentTarget.value);
  };

  useEffect(() => {
    (async () => {
      console.log(await getInitialData());
    })();
  }, []);

  return (
    <div className="flex flex-col w-full p-10 bg-blue-100">
      <div className="bg-green-100 p-5">
        <h2 className="text-2xl font-semibold">Balance: {}</h2>
      </div>
      <div className="bg-blue-200 p-5 space-y-5">
        <div>
          <h2 className="text-2xl font-semibold">Available symbols:</h2>
          <ul className="space-y-1.5">
            {Object.values(SlotSymbols).map((el) => (
              <li key={el} className="underline">
                {el}
              </li>
            ))}
          </ul>
        </div>
        <h2 className="text-3xl font-semibold">Static results:</h2>
        <div>
          <h2 className="text-2xl font-semibold">Total combinations:</h2>
          <p>{formatter.format(totalCombinations)}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">
            Total payout to user (bet = 1):
          </h2>
          <p>{formatter.format(totalPayout)}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">
            Total winning combinations:
          </h2>
          <p>{formatter.format(winningCombinations)}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Calculated hit frequency:</h2>
          <p>{formatter.format(hitFrequency)}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Calculated RTP:</h2>
          <p>{formatter.format(calculatedRTP * 100)}%</p>
        </div>
        <h2 className="text-3xl font-semibold">
          Simulation results for {formatter.format(Number.parseInt(rounds))}:
        </h2>
        <div>
          <h2 className="text-2xl font-semibold">Average RTP:</h2>
          <p>{formatter.format(averageRTP * 100)}%</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Average payout per bet:</h2>
          <p>{formatter.format(averagePayout)}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">
            Payouts standard deviation:
          </h2>
          <p>{formatter.format(payoutDeviation)}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">
            Average payout without non-winning rounds:
          </h2>
          <p>{formatter.format(averageWinPayout)}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">
            Payouts standard deviation without non-winning rounds:
          </h2>
          <p>{formatter.format(winPayoutDeviation)}</p>
        </div>
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="rounds-input">Type number of rounds:</label>
          <input
            className="bg-red-200 border-2 rounds-input"
            value={rounds}
            onChange={handleChangeInput}
            type="number"
          />
          <button
            onClick={handleRunSimulation}
            className="bg-red-500 text-white p-1 border-2 border-black cursor-pointer"
          >
            Run simulation
          </button>
        </div>
      </div>
    </div>
  );
}
