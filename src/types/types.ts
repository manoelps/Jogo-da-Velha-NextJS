export type PlayProps = {
  id: number;
  owner: string;
};

export type WinProps = {
  win: boolean;
  winner: string;
  positions: number[];
};

export type PlacarProps = {
  player1: number;
  player2: number;
};
