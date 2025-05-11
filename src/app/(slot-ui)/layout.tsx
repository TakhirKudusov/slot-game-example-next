'use client';

import { FC, ReactNode } from 'react';

import { useSlotConfiguration } from '@/features/initial-slot-configuration';

import { SlotUiName, setCurrentTab } from '@/entities/slot-ui';

import { StateName, useAppDispatch, useAppSelector } from '@/shared/model';
import { Button } from '@/shared/ui';

type Props = {
  slotGameUi: ReactNode;
  slotStatUi: ReactNode;
};

const Layout: FC<Props> = ({ slotGameUi, slotStatUi }) => {
  useSlotConfiguration();

  const { currentTab } = useAppSelector((state) => state[StateName.SLOT_UI]);

  const dispatch = useAppDispatch();

  const handleClickButton = (value: SlotUiName) => () => {
    dispatch(setCurrentTab(value));
  };

  const handleGetUI = () => {
    switch (currentTab) {
      case SlotUiName.SLOT_GAME:
        return slotGameUi;
      case SlotUiName.SLOT_STAT:
        return slotStatUi;
    }
  };

  return (
    <>
      <div className="w-screen h-screen bg-green-100 p-5">
        <div className="flex space-x-[10px]">
          <Button onClick={handleClickButton(SlotUiName.SLOT_STAT)}>
            Go to stat
          </Button>
          <Button onClick={handleClickButton(SlotUiName.SLOT_GAME)}>
            Go to game
          </Button>
        </div>
        {handleGetUI()}
      </div>
    </>
  );
};

export default Layout;
