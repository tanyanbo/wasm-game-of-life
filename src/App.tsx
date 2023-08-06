import { useState } from 'react';

import Game from './components/Game';
import { Header } from './components/Header';
import { GameState, INITIAL_COLS, INITIAL_ROWS } from './common';
import { Universe } from '../pkg/wasm_game_of_life';

import './index.css';

function App() {
  const [rows, setRows] = useState(INITIAL_ROWS);
  const [cols, setCols] = useState(INITIAL_COLS);
  const [gameState, setGameState] = useState(GameState.Stopped);
  const [universe, setUniverse] = useState(() => Universe.new(rows, cols));
  const [gameComponentKey, setGameComponentKey] = useState(0);

  function onGameStateChange(
    newGameState: GameState,
    boardInfo?: { rows: number; cols: number }
  ) {
    if (newGameState === GameState.Stopped) {
      if (boardInfo == null) {
        throw new Error('Need to provide a row and col count');
      }
      setUniverse(() => Universe.new(boardInfo!.rows, boardInfo!.cols));
      setGameComponentKey((prev) => prev + 1);
    }

    setGameState(newGameState);
  }

  function setRowsAndCols(data: { rows: number; cols: number }) {
    setRows(data.rows);
    setCols(data.cols);
    setUniverse(() => Universe.new(data.rows, data.cols));
    setGameComponentKey((prev) => prev + 1);
  }

  return (
    <div className="w-full mt-4 flex justify-center">
      <div id="main-content">
        <h3 className="text-center mt-3 text-3xl text-sky-700">
          Conway's Game of Life with React and WebAssembly
        </h3>
        <Header
          gameState={gameState}
          onGameStateChange={onGameStateChange}
          setRowsAndCols={setRowsAndCols}
        />
        <Game
          rows={rows}
          cols={cols}
          tickTime={100}
          gameState={gameState}
          universe={universe}
          key={gameComponentKey}
        />
        <p className="mt-3 text-xl text-center">
          Click on a cell to toggle its state
        </p>
      </div>
    </div>
  );
}

export default App;
