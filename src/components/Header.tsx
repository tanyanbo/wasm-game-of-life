import { useState } from 'react';
import cn from 'classnames';

import startIcon from '../assets/start.svg';
import pauseIcon from '../assets/pause.svg';
import stopIcon from '../assets/stop.svg';
import { GameState } from '../common';

interface HeaderProps {
  gameState: GameState;
  onGameStateChange(
    newGameState: GameState,
    boardInfo?: { rows: number; cols: number }
  ): void;
}

export const Header = ({ gameState, onGameStateChange }: HeaderProps) => {
  const [rows, setRows] = useState(30);
  const [cols, setCols] = useState(30);

  return (
    <div className="m-3 grid items-center grid-rows-2 grid-cols-2">
      <div className="row-start-1 row-end-1 w-48 mt-3 grid gap-2 grid-cols-[50px_minmax(0,_1fr)] justify-between items-center">
        <label htmlFor="rows">Rows</label>
        <input
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
          className="p-1 pl-2 border rounded-lg border-gray-300"
          type="number"
          max={100}
          min={10}
          id="cols"
          value={cols}
          onChange={(e) => setCols(+e.target.value)}
        />
      </div>
      <div className="flex justify-self-end row-span-2 gap-3">
        {gameState !== GameState.Started ? (
          <img
            className="w-16 h-16 cursor-pointer"
            src={startIcon}
            alt="start"
            onClick={() => onGameStateChange(GameState.Started, { rows, cols })}
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
          alt="start"
          onClick={() => {
            if (gameState !== GameState.Stopped) {
              onGameStateChange(GameState.Stopped);
            }
          }}
        />
      </div>
    </div>
  );
};
