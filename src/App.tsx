import { useState } from 'react';
import Game from './components/Game';
import { GameData, Header } from './components/Header';

import './index.css';

function App() {
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);
  const [started, setStarted] = useState(false);

  function startOrEnd({ rows, cols, start }: GameData) {
    setRows(rows);
    setCols(cols);
    setStarted(start);
  }

  return (
    <>
      <Header startOrEnd={startOrEnd} />
      <Game rows={rows} cols={cols} tickTime={100} started={started} />
    </>
  );
}

export default App;
