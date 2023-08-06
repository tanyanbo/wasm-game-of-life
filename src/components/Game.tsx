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
  const [isBlack, setIsBlack] = useState<boolean[]>(
    () => Array.from({ length: rows * cols }).fill(true) as boolean[]
  );

  const array = useMemo(
    () => Array.from({ length: rows * cols }),
    [rows, cols]
  );

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      universe.tick();

      const cellsPtr = universe.cells();

      const cells = new Uint8Array(memory.buffer, cellsPtr, rows * cols);

      const newIsBlack: boolean[] = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const n = r * rows + c;
          newIsBlack.push(cells[n] ? false : true);
        }
      }

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
      className="grid m-3"
    >
      {array.map((_, idx) => (
        <div
          key={idx}
          className={cn('aspect-square', {
            'bg-black': isBlack[idx],
          })}
        ></div>
      ))}
    </div>
  );
}
