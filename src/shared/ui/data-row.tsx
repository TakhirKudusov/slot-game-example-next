import { FC } from 'react';

type Props = {
  title: string;
  data: string;
};

export const DataRow: FC<Props> = ({ title, data }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p>{data}</p>
    </div>
  );
};
