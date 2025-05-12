'use client';

import { VideoSlotSession } from 'pokie';
import { FC, ReactNode, useEffect } from 'react';

import { useSlotConfiguration } from '@/features/initial-slot-configuration';

import { setSession } from '@/entities/slot-session';
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

  const { config, isReady } = useAppSelector(
    (state) => state[StateName.SLOT_CONFIG],
  );

  const { session } = useAppSelector((state) => state[StateName.SLOT_SESSION]);

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

  useEffect(() => {
    if (isReady && !session) dispatch(setSession(new VideoSlotSession(config)));
  }, [isReady, session]);

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
