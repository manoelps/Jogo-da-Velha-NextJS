'use client';

import useGame from '@/hooks/useGame';
import classNames from 'classnames';
import { FaPerson, FaRobot } from 'react-icons/fa6';

const Home = () => {
  const { player, moves, handlePlay, win, resetGame, scoreboard } = useGame();

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="flex flex-col items-center p-2 gap-2 bg-white rounded">
          <div className="flex justify-center items-center w-full py-2 bg-purple-500 text-white  rounded ">
            <FaRobot className="" size={40} />
          </div>
          <div className="text-[#56BAEC] text-lg font-bold">Pontuação</div>
          <div className="text-3xl font-extrabold text-purple-600">
            {scoreboard.player2}
          </div>
        </div>

        <div>
          <div className="grid grid-cols-3 gap-1 p-5 rounded-md">
            {moves.map((move, index) => (
              <button
                disabled={move.owner !== '' || win?.win}
                onClick={() => {
                  handlePlay(move);
                }}
                key={move.id}
                className={classNames(
                  'flex flex-col items-center justify-center w-14 h-14 font-bold text-2xl hover:scale-95 rounded',
                  {
                    'cursor-not-allowed': move.owner !== '' || win?.win
                  },
                  {
                    'bg-orange-600/95 text-white':
                      index === win?.positions[0] ||
                      index === win?.positions[1] ||
                      index === win?.positions[2]
                  },
                  {
                    'bg-white text-[#56BAEC]':
                      index !== win?.positions[0] ||
                      index !== win?.positions[1] ||
                      index !== win?.positions[2]
                  }
                )}
              >
                {index !== win?.positions[0] &&
                index !== win?.positions[1] &&
                index !== win?.positions[2] &&
                win?.win ? (
                  ''
                ) : move.owner === 'O' ? (
                  <FaPerson className="" size={26} />
                ) : (
                  move.owner === 'X' && <FaRobot className="" size={26} />
                )}
              </button>
            ))}
          </div>

          <div className="w-full flex items-center justify-center py-4 gap-3">
            <button
              onClick={resetGame}
              className={classNames(
                'px-8 py-3 lg:px-6 lg:py-2  md:px-6 md:py-2 text-[#56BAEC] bg-white font-semibold rounded-md shadow hover:scale-95'
              )}
            >
              NOVA PARTIDA
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center p-2 gap-2 bg-white rounded relative">
          <div className="flex justify-center items-center py-2 bg-purple-500 text-white w-full rounded ">
            <FaPerson className="" size={40} />
          </div>
          <div className="text-[#56BAEC] text-lg font-bold">Pontuação</div>
          <div className="text-3xl font-extrabold text-purple-600">
            {scoreboard.player1}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
