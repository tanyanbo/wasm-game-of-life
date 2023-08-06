import { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';

import { Universe } from '../../pkg/wasm_game_of_life';
import { memory } from '../../pkg/wasm_game_of_life_bg.wasm';
import { GameState } from '../common';

interface GameProps {
  rows: number;
  cols: number;
  tickTime: number;
  gameState: GameState;
  universe: Universe;
}

export default function Game({
  rows,
  cols,
  tickTime,
  gameState,
  universe,
}: GameProps) {
  const [isBlack, setIsBlack] = useState<boolean[]>(() => {
    return getBoardState(universe, rows, cols);
  });

  const array = useMemo(
    () => Array.from({ length: rows * cols }),
    [rows, cols]
  );

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      universe.tick();

      const newIsBlack = getBoardState(universe, rows, cols);

      setIsBlack(newIsBlack);

      timer = setTimeout(tick, tickTime);
    }

    if (gameState === GameState.Started) {
      tick();
    }

    return () => {
      clearTimeout(timer);
    };
  }, [tickTime, rows, cols, gameState, universe]);

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      }}
      className="grid bg-black"
    >
      {array.map((_, idx) => (
        <div
          key={idx}
          className={cn('aspect-square', {
            'bg-white': !isBlack[idx],
          })}
          onClick={() => {
            universe.set(idx, isBlack[idx]);
            setIsBlack((prev) => {
              const result = [...prev];
              result[idx] = !prev[idx];
              return result;
            });
          }}
        ></div>
      ))}
    </div>
  );
}

function getBoardState(universe: Universe, rows: number, cols: number) {
  const cellsPtr = universe.cells();

  const cells = new Uint8Array(
    memory.buffer,
    cellsPtr,
    Math.ceil((rows * cols) / 8)
  );

  const board: boolean[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const n = r * rows + c;
      board.push(isBitSet(n, cells) ? false : true);
    }
  }

  return board;
}

function isBitSet(n: number, arr: Uint8Array) {
  const byte = Math.floor(n / 8);
  const mask = 1 << n % 8;
  return (arr[byte] & mask) === mask;
}
