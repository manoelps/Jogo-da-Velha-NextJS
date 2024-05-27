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

  const iaPlayer = (...checks: WinProps[]) => {
    const alreadyWon = checks.every(check => !check.win);

    if (player && alreadyWon) {
      setTimeout(() => {
        const availableMoves = moves
          .filter(move => move.owner === '')
          .map(move => move.id);

        if (availableMoves.length > 0) {
          const playIndex = getRadomNumber(availableMoves.length);
          handlePlay({ id: availableMoves[playIndex], owner: '' });
        }
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
    const play = positions.map(pos => moves[pos].owner);
    const winner = play[0];
    const win = play.every(value => value !== '' && value === winner);

    return {
      win,
      winner: win ? winner : '',
      positions
    };
  };

  const checkScoreboard = () => {
    const positions = [
      position_1,
      position_2,
      position_3,
      position_4,
      position_5,
      position_6,
      position_7,
      position_8
    ];
    let winCheck = null;

    for (let i = 0; i < positions.length; i++) {
      const check = checkWinningPosition(positions[i]);
      if (check.win) {
        winCheck = check;
        break;
      }
    }

    if (winCheck) {
      setWin(winCheck);
    }

    iaPlayer(...positions.map(checkWinningPosition));
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
