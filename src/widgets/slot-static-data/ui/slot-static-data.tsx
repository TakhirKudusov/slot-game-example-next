import { SlotSymbol } from '@/features/initial-slot-configuration';

import { DataRow, Spinner } from '@/shared/ui';

import { useStaticData } from '../libs';

export const SlotStaticData = () => {
  const {
    hitFrequency,
    calculatedRTP,
    winningCombinations,
    totalCombinations,
    totalPayout,
    isLoading,
  } = useStaticData();

  const formatter = new Intl.NumberFormat();

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div>
            <h2 className="text-2xl font-semibold">Available symbols:</h2>
            <ul className="space-y-1.5">
              {Object.values(SlotSymbol).map((el) => (
                <li key={el} className="underline">
                  {el}
                </li>
              ))}
            </ul>
          </div>
          <h2 className="text-3xl font-semibold">Static results:</h2>
          <DataRow
            title="Total combinations:"
            data={formatter.format(totalCombinations)}
          />
          <DataRow
            title="Total payout to user (bet = 1):"
            data={formatter.format(totalPayout)}
          />
          <DataRow
            title="Total winning combinations:"
            data={formatter.format(winningCombinations)}
          />
          <DataRow
            title="Calculated hit frequency:"
            data={formatter.format(hitFrequency)}
          />
          <DataRow
            title="Calculated RTP:"
            data={`${formatter.format(calculatedRTP * 100)}%`}
          />
        </>
      )}
    </>
  );
};
