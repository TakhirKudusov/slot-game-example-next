'use client';

import { SimulationConfig } from 'pokie';
import { SyntheticEvent, useState } from 'react';

import { SlotStaticData } from '@/widgets/slot-static-data';

const simulationConfig = new SimulationConfig();

export const SlotStatUi = () => {
  const [rounds, setRounds] = useState<string>('100000');

  // simulation
  const [averageRTP, setAverageRTP] = useState<number>(0);
  const [averagePayout, setAveragePayout] = useState<number>(0);
  const [payoutDeviation, setPayoutDeviation] = useState<number>(0);
  const [averageWinPayout, setAverageWinPayout] = useState<number>(0);
  const [winPayoutDeviation, setWinPayoutDeviation] = useState<number>(0);

  const handleRunSimulation = () => {
    // simulationConfig.setNumberOfRounds(Number.parseInt(rounds));
    // const simulation = new Simulation(customGameSession, simulationConfig);
    // simulation.run();
    //
    // setAverageRTP(simulation.getAverageRtp());
    // setAveragePayout(simulation.getAveragePayout());
    // setPayoutDeviation(simulation.getPayoutsStandardDeviation());
    // setAverageWinPayout(simulation.getAveragePayout(false));
    // setWinPayoutDeviation(simulation.getPayoutsStandardDeviation(false));
  };

  const formatter = new Intl.NumberFormat();

  const handleChangeInput = (e: SyntheticEvent<HTMLInputElement>) => {
    const num = Number.parseInt(e.currentTarget.value);

    if (Number.MAX_SAFE_INTEGER < num) return;

    setRounds(e.currentTarget.value);
  };

  return (
    <div className="flex flex-col w-full bg-blue-100">
      <div className="bg-green-100 p-5">
        <h2 className="text-2xl font-semibold">Balance: {}</h2>
      </div>
      <SlotStaticData />
      <div className="bg-blue-200 p-5 space-y-5">
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
};
