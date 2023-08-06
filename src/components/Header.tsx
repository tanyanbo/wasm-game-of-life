import { useState } from 'react';
import cn from 'classnames';

import startIcon from '../assets/start.svg';
import pauseIcon from '../assets/pause.svg';
import stopIcon from '../assets/stop.svg';
import { GameState, INITIAL_COLS, INITIAL_ROWS } from '../common';

interface HeaderProps {
  gameState: GameState;
  onGameStateChange(
    newGameState: GameState,
    boardInfo?: { rows: number; cols: number }
  ): void;
  setRowsAndCols(data: { rows: number; cols: number }): void;
}

export const Header = ({
  gameState,
  onGameStateChange,
  setRowsAndCols,
}: HeaderProps) => {
  const [rows, setRows] = useState(INITIAL_ROWS);
  const [cols, setCols] = useState(INITIAL_COLS);

  return (
    <div className="mb-3 grid items-center grid-rows-3 grid-cols-2">
      <div className="row-start-1 row-end-1 w-48 mt-3 grid gap-2 grid-cols-[50px_minmax(0,_1fr)] justify-between items-center">
        <label htmlFor="rows">Rows</label>
        <input
          disabled={gameState !== GameState.Stopped}
          className="p-1 pl-2 border rounded-lg border-gray-300"
          type="number"
          max={100}
          min={10}
          id="rows"
          value={rows}
          onChange={(e) => setRows(+e.target.value)}
        />
      </div>
      <div className="row-start-2 row-end-2 w-48 mt-3 grid gap-2 grid-cols-[50px_minmax(0,_1fr)] justify-between items-center">
        <label htmlFor="cols">Cols</label>
        <input
          disabled={gameState !== GameState.Stopped}
          className="p-1 pl-2 border rounded-lg border-gray-300"
          type="number"
          max={100}
          min={10}
          id="cols"
          value={cols}
          onChange={(e) => setCols(+e.target.value)}
        />
      </div>
      <button
        className={cn(
          'rounded-lg row-start-3 row-end-3 w-48 h-10 mt-3 text-white',
          {
            'cursor-pointer bg-sky-500 hover:bg-sky-600 ':
              gameState === GameState.Stopped,
            'cursor-not-allowed bg-gray-200': gameState !== GameState.Stopped,
          }
        )}
        onClick={() => setRowsAndCols({ rows, cols })}
        disabled={gameState !== GameState.Stopped}
      >
        Apply
      </button>
      <div className="flex justify-self-end row-span-3 gap-3">
        {gameState !== GameState.Started ? (
          <img
            className="w-16 h-16 cursor-pointer"
            src={startIcon}
            alt="start"
            onClick={() => onGameStateChange(GameState.Started)}
          />
        ) : (
          <img
            className="w-16 h-16 cursor-pointer"
            src={pauseIcon}
            alt="start"
            onClick={() => onGameStateChange(GameState.Paused)}
          />
        )}
        <img
          className={cn('w-16 h-16 ml-4', {
            'cursor-pointer': gameState !== GameState.Stopped,
            'cursor-not-allowed': gameState === GameState.Stopped,
          })}
          src={stopIcon}
          alt="stop"
          onClick={() => {
            if (gameState !== GameState.Stopped) {
              onGameStateChange(GameState.Stopped, { rows, cols });
            }
          }}
        />
      </div>
    </div>
  );
};
