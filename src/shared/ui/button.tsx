import { FC, PropsWithChildren, SyntheticEvent } from 'react';

type Props = {
  onClick: (e?: SyntheticEvent<HTMLButtonElement>) => void;
};

export const Button: FC<PropsWithChildren & Props> = ({
  children,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border-black border-solid border-2 p-2 cursor-pointer bg-amber-100 hover:bg-amber-200 font-semibold transition active:bg-amber-300"
    >
      {children}
    </button>
  );
};
