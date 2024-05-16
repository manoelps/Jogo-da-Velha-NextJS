import { getRadomNumber } from '@/helpers/helper';
import { board } from '@/mocks/board';
import { PlacarProps, PlayProps, WinProps } from '@/types/types';
import { useEffect, useState } from 'react';

const useGame = () => {
  const [moves, setMoves] = useState<PlayProps[]>(board);
  const [player, setPlayer] = useState<boolean>(false);
  const [win, setWin] = useState<WinProps>();
  const [scoreboard, setScoreboard] = useState<PlacarProps>({
    player1: 0,
    player2: 0
  });

  const position_1 = [0, 1, 2];
  const position_2 = [3, 4, 5];
  const position_3 = [6, 7, 8];
  const position_4 = [0, 3, 6];
  const position_5 = [1, 4, 7];
  const position_6 = [2, 5, 8];
  const position_7 = [0, 4, 8];
  const position_8 = [2, 4, 6];

  const iaPlayer = (
    checa1: WinProps,
    checa2: WinProps,
    checa3: WinProps,
    checa4: WinProps,
    checa5: WinProps,
    checa6: WinProps,
    checa7: WinProps,
    checa8: WinProps
  ) => {
    const alreadyWon =
      !checa1.win &&
      !checa2.win &&
      !checa3.win &&
      !checa4.win &&
      !checa5.win &&
      !checa6.win &&
      !checa7.win &&
      !checa8.win;

    if (player && alreadyWon) {
      setTimeout(() => {
        let availableMoves: number[] = [];

        moves.map(value => {
          if (value.owner === '') {
            availableMoves.push(value.id);
          }
        });

        const play = getRadomNumber(availableMoves.length);

        handlePlay({ id: availableMoves[play], owner: '' });
      }, 500);
    }
  };

  const handlePlay = (play: PlayProps) => {
    const newMoves = moves.map((move: PlayProps) => {
      if (move.id === play.id) {
        return { ...move, owner: player ? 'X' : 'O' };
      }
      return move;
    });

    setMoves(newMoves);
    setPlayer(!player);
  };

  const checkWinningPosition = (positions: number[]) => {
    let winner = '';
    let play: string[] = [];

    play.push(moves[positions[0]].owner);
    play.push(moves[positions[1]].owner);
    play.push(moves[positions[2]].owner);

    const win = play.every((value, index, array) => {
      winner = array[0];
      return value !== '' && value === array[0];
    });

    return {
      win,
      winner,
      positions
    };
  };

  const checkScoreboard = () => {
    const check_1 = checkWinningPosition(position_1);
    const check_2 = checkWinningPosition(position_2);
    const check_3 = checkWinningPosition(position_3);
    const check_4 = checkWinningPosition(position_4);
    const check_5 = checkWinningPosition(position_5);
    const check_6 = checkWinningPosition(position_6);
    const check_7 = checkWinningPosition(position_7);
    const check_8 = checkWinningPosition(position_8);

    if (check_1.win) {
      setWin(check_1);
    } else if (check_2.win) {
      setWin(check_2);
    } else if (check_3.win) {
      setWin(check_3);
    } else if (check_4.win) {
      setWin(check_4);
    } else if (check_5.win) {
      setWin(check_5);
    } else if (check_6.win) {
      setWin(check_6);
    } else if (check_7.win) {
      setWin(check_7);
    } else if (check_8.win) {
      setWin(check_8);
    }

    iaPlayer(
      check_1,
      check_2,
      check_3,
      check_4,
      check_5,
      check_6,
      check_7,
      check_8
    );
  };

  const resetGame = () => {
    const newMoves = moves.map((move: PlayProps) => {
      return { ...move, owner: '' };
    });
    setMoves(newMoves);
    setPlayer(false);
    setWin({
      win: false,
      winner: '',
      positions: []
    });
  };

  useEffect(() => {
    checkScoreboard();
  }, [moves]);

  useEffect(() => {
    if (win?.winner === 'O') {
      setScoreboard({
        ...scoreboard,
        player1: scoreboard.player1 + 1
      });
    } else if (win?.winner === 'X') {
      setScoreboard({
        ...scoreboard,
        player2: scoreboard.player2 + 1
      });
    }
  }, [win]);

  const isWinningPosition = (index: number): boolean => {
    return (
      index === win?.positions[0] ||
      index === win?.positions[1] ||
      index === win?.positions[2]
    );
  };

  return {
    player,
    moves,
    handlePlay,
    win,
    resetGame,
    scoreboard,
    isWinningPosition
  };
};

export default useGame;
