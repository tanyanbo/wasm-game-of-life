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

  function onGameStateChange(
    newGameState: GameState,
    boardInfo?: { rows: number; cols: number }
  ) {
    if (newGameState === GameState.Started) {
      if (boardInfo == null) {
        throw new Error('Need to provide a row and col count');
      }
      setRows(boardInfo.rows);
      setCols(boardInfo.cols);
    }

    if (gameState === GameState.Stopped && newGameState === GameState.Started) {
      setUniverse(() => Universe.new(boardInfo!.rows, boardInfo!.cols));
    }

    setGameState(newGameState);
  }

  return (
    <div className="w-full mt-4 flex justify-center">
      <div id="main-content">
        <h3 className="text-center mt-3 text-3xl text-sky-700">
          Conway's Game of Life with React and WebAssembly
        </h3>
        <Header gameState={gameState} onGameStateChange={onGameStateChange} />
        <Game
          rows={rows}
          cols={cols}
          tickTime={100}
          gameState={gameState}
          universe={universe}
        />
      </div>
    </div>
  );
}

export default App;
