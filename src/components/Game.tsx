import cn from 'classnames';
import { useEffect, useState } from 'react';
import { Universe } from '../../pkg/wasm_game_of_life';
import { memory } from '../../pkg/wasm_game_of_life_bg.wasm';

interface GameProps {
  rows: number;
  cols: number;
  tickTime: number;
  started: boolean;
}

export default function Game({ rows, cols, tickTime, started }: GameProps) {
  const [isBlack, setIsBlack] = useState<boolean[]>([]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const universe = Universe.new(rows, cols);

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

    if (started) tick();

    return () => {
      clearTimeout(timer);
    };
  }, [tickTime, rows, cols, started]);

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      }}
      className="grid m-3"
    >
      {Array.from({ length: rows * cols }).map((_, idx) => (
        <div
          key={idx}
          className={cn('aspect-square', {
            'bg-black': !isBlack[idx],
          })}
        ></div>
      ))}
    </div>
  );
}
