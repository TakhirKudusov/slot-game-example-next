import { Simulation, SimulationConfig } from 'pokie';
import { SyntheticEvent, useState } from 'react';

import { StateName, useAppSelector } from '@/shared/model';
import { DataRow } from '@/shared/ui';

const simulationConfig = new SimulationConfig();

export const SlotSimulationData = () => {
  const [rounds, setRounds] = useState<string>('100000');

  // simulation
  const [averageRTP, setAverageRTP] = useState<number>(0);
  const [averagePayout, setAveragePayout] = useState<number>(0);
  const [payoutDeviation, setPayoutDeviation] = useState<number>(0);
  const [averageWinPayout, setAverageWinPayout] = useState<number>(0);
  const [winPayoutDeviation, setWinPayoutDeviation] = useState<number>(0);

  const { session } = useAppSelector((state) => state[StateName.SLOT_SESSION]);

  const handleRunSimulation = () => {
    if (!session) return;

    simulationConfig.setNumberOfRounds(Number.parseInt(rounds));
    const simulation = new Simulation(session, simulationConfig);
    simulation.run();

    setAverageRTP(simulation.getAverageRtp());
    setAveragePayout(simulation.getAveragePayout());
    setPayoutDeviation(simulation.getPayoutsStandardDeviation());
    setAverageWinPayout(simulation.getAveragePayout(false));
    setWinPayoutDeviation(simulation.getPayoutsStandardDeviation(false));
  };

  const formatter = new Intl.NumberFormat();

  const handleChangeInput = (e: SyntheticEvent<HTMLInputElement>) => {
    const num = Number.parseInt(e.currentTarget.value);

    if (Number.MAX_SAFE_INTEGER < num) return;

    setRounds(e.currentTarget.value);
  };

  return (
    <div className="bg-blue-200 p-5 space-y-5">
      <h2 className="text-3xl font-semibold">
        Simulation results for {formatter.format(Number.parseInt(rounds))}:
      </h2>
      <DataRow
        title="Average RTP:"
        data={`${formatter.format(averageRTP * 100)}%`}
      />
      <DataRow
        title="Average payout per bet:"
        data={formatter.format(averagePayout)}
      />
      <DataRow
        title="Payouts standard deviation:"
        data={formatter.format(payoutDeviation)}
      />
      <DataRow
        title="Average payout without non-winning rounds:"
        data={formatter.format(averageWinPayout)}
      />
      <DataRow
        title="Payouts standard deviation without non-winning rounds:"
        data={formatter.format(winPayoutDeviation)}
      />
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
  );
};
