'use client';

import { SlotSimulationData } from '@/widgets/slot-simulation-data';
import { SlotStaticData } from '@/widgets/slot-static-data';

export const SlotStatUi = () => {
  return (
    <div className="flex flex-col w-full bg-blue-100">
      <SlotStaticData />
      <SlotSimulationData />
    </div>
  );
};
