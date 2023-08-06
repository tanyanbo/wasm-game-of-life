import { useState } from 'react';

import Game from './components/Game';
import { Header } from './components/Header';
import { GameState } from './common';
import { Universe } from '../pkg/wasm_game_of_life';

import './index.css';

function App() {
  const [rows, setRows] = useState(30);
  const [cols, setCols] = useState(30);
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
    <div className="max-w-5xl">
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
  );
}

export default App;
