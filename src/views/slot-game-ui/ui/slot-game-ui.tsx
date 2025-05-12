'use client';

import Image from 'next/image';
import {
  VideoSlotInitialNetworkData,
  VideoSlotRoundNetworkData,
  VideoSlotWithFreeGamesInitialNetworkData,
  VideoSlotWithFreeGamesRoundNetworkData,
  VideoSlotWithFreeGamesSession,
} from 'pokie';
import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { SlotSymbol } from '@/features/initial-slot-configuration';

import { StateName, useAppSelector } from '@/shared/model';
import { Button } from '@/shared/ui';

type BoxProps = {
  config: number[];
};

const Box: FC<BoxProps> = ({ config }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td
            className="h-3 w-3 border-2 border-black"
            style={{
              backgroundColor: config[0] === 0 ? 'green' : undefined,
            }}
          ></td>
          <td
            className="h-3 w-3 border-2 border-black"
            style={{
              backgroundColor: config[1] === 0 ? 'green' : undefined,
            }}
          ></td>
          <td
            className="h-3 w-3 border-2 border-black"
            style={{
              backgroundColor: config[2] === 0 ? 'green' : undefined,
            }}
          ></td>
        </tr>
        <tr>
          <td
            className="h-3 w-3 border-2 border-black"
            style={{
              backgroundColor: config[0] === 1 ? 'green' : undefined,
            }}
          ></td>
          <td
            className="h-3 w-3 border-2 border-black"
            style={{
              backgroundColor: config[1] === 1 ? 'green' : undefined,
            }}
          ></td>
          <td
            className="h-3 w-3 border-2 border-black"
            style={{
              backgroundColor: config[2] === 1 ? 'green' : undefined,
            }}
          ></td>
        </tr>
        <tr>
          <td
            className="h-3 w-3 border-2 border-black"
            style={{
              backgroundColor: config[0] === 2 ? 'green' : undefined,
            }}
          ></td>
          <td
            className="h-3 w-3 border-2 border-black"
            style={{
              backgroundColor: config[1] === 2 ? 'green' : undefined,
            }}
          ></td>
          <td
            className="h-3 w-3 border-2 border-black"
            style={{
              backgroundColor: config[2] === 2 ? 'green' : undefined,
            }}
          ></td>
        </tr>
      </tbody>
    </table>
  );
};

export const SlotGameUi = () => {
  const [availableBets, setAvailableBets] = useState<number[]>([]);
  const [betAmount, setBetAmount] = useState<number>(0);
  const [linesDef, setLinesDef] = useState<{
    [key: string]: number[];
  } | null>();
  const [payTable, setPaytable] =
    useState<Record<number, Record<string, Record<number, number>>>>();
  const [reelsSymbols, setReelsSymbols] = useState<string[][]>([]);
  const [winningPatterns, setWinningPatterns] = useState<number[][]>([]);
  const [winCombinations, setWinCombinations] = useState<string[]>([]);

  const { session, serializer } = useAppSelector(
    (state) => state[StateName.SLOT_SESSION],
  );
  const [credits, setCredits] = useState<number>(0);

  const isSessionExisting = !!session;

  const getInitialData = async (): Promise<
    | VideoSlotInitialNetworkData
    | VideoSlotWithFreeGamesInitialNetworkData
    | null
  > => {
    if (!session) return null;

    return new Promise((res) => {
      res(
        serializer.getInitialData(
          session as unknown as VideoSlotWithFreeGamesSession,
        ),
      );
    });
  };

  const getRoundData = async (): Promise<
    VideoSlotRoundNetworkData | VideoSlotWithFreeGamesRoundNetworkData | null
  > => {
    if (!session) return null;

    return new Promise((res) => {
      session.play();
      res(
        serializer.getRoundData(
          session as unknown as VideoSlotWithFreeGamesSession,
        ),
      );
    });
  };

  useEffect(() => {
    if (isSessionExisting) {
      (async () => {
        const initialData = await getInitialData();

        if (initialData) {
          setAvailableBets(initialData.availableBets);

          setLinesDef(initialData.linesDefinitions);

          setPaytable(initialData.paytable);

          setBetAmount(initialData.bet);

          setCredits(initialData.credits);

          setReelsSymbols(initialData.reelsSymbols);
        }
      })();
    }
  }, [isSessionExisting]);

  const formatter = new Intl.NumberFormat();

  const handleSpinClick = async () => {
    const newData = await getRoundData();

    if (!newData) return;

    setCredits(Number(newData.credits.toFixed(2)));

    setReelsSymbols(newData.reelsSymbols);

    const winnings = newData?.winningLines
      ? Object.values(newData.winningLines).reduce(
          (prev, curr) => prev + curr.winAmount,
          0,
        )
      : 0;

    const winPositionsArr: [number, number][] = [];

    if (winnings) {
      toast.success(`You won ${winnings}$!`);

      setWinCombinations(Object.keys(newData.winningLines!));

      const winningLines = Object.values(newData.winningLines!);

      for (const lineData of winningLines) {
        const definition = lineData.definition;

        const positions = lineData.symbolsPositions;

        for (let i = 0; i < positions.length; i++)
          winPositionsArr.push([definition[i], positions[i]]);
      }
    } else {
      setWinCombinations([]);
    }

    setWinningPatterns(winPositionsArr);
  };

  const handleChangeBetAmount = (amount: number) => () => {
    session?.setBet(amount);
    setBetAmount(amount);
  };

  return (
    <div className="p-5 bg-blue-200 flex flex-col space-y-2">
      <div className="flex flex-col space-y-2">
        {/*выигрышные линии*/}
        <h1 className="text-2xl font-semibold">Ways to win:</h1>
        <div>
          <p>Winning lines: </p>
          <div className="flex space-x-2">
            {linesDef &&
              Object.entries(linesDef).map((el) => (
                <div
                  key={`index:${el[0]}@value:${JSON.stringify(el[1])}`}
                  className="flex items-center space-x-1"
                >
                  <p>{el[0]})</p>
                  <Box config={el[1]} />
                </div>
              ))}
          </div>
        </div>
      </div>

      {/*таблица выплат*/}
      <table>
        <tbody className="border-black border-2">
          {betAmount && payTable
            ? Object.values(SlotSymbol).map((el, index) => {
                return (
                  <tr key={`index:${index}@value:${el}`}>
                    <th className="border-black border-2">{el}: </th>
                    {Object.entries(
                      payTable?.[betAmount.toString() as any][el],
                    ).map((el, index) => (
                      <td
                        key={`index:${index}@value:${JSON.stringify(el)}`}
                        className="border-black border-2"
                      >
                        <p>Elements in line: {el[0]}</p>
                        <p>Payout: {formatter.format(el[1])}$</p>
                      </td>
                    ))}
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>

      {/*баланс*/}
      <div className="bg-green-100 p-5 font-semibold">
        <p>Balance: {credits}$</p>
        <p>Current bet amount: {formatter.format(betAmount)}$</p>
      </div>
      {/*меню выбора ставки*/}
      <div className="flex flex-col space-y-2">
        <p>Choose bet amount:</p>
        <div className="flex  space-x-2">
          {availableBets.map((el) => (
            <Button key={el} onClick={handleChangeBetAmount(el)}>
              {el}
            </Button>
          ))}
        </div>
      </div>

      <Button onClick={handleSpinClick}>Spin!</Button>
      <p>You got winning lines: {winCombinations.join(', ')}</p>
      <div className="flex space-x-5">
        {reelsSymbols.map((el1, index1) => {
          return (
            <div
              className="flex flex-col space-y-0.5"
              key={`index:${index1}@value:${JSON.stringify(el1)}`}
            >
              {el1.map((el2, index2) => {
                return (
                  <div key={`index:${index2}@value:${el2}`}>
                    <div
                      className="size-40 border-10 flex justify-center items-center"
                      style={{
                        borderColor: winningPatterns.some(
                          (el) => el[0] === index2 && el[1] === index1,
                        )
                          ? 'green'
                          : 'lightgrey',
                      }}
                    >
                      <Image
                        src={`/${el2}.png`}
                        alt={el2}
                        width={200}
                        height={200}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
