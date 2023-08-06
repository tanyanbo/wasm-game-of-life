import Game from './components/Game';
import { Header } from './components/Header';

import './index.css';

function App() {
  return (
    <>
      <Header />
      <Game rows={20} cols={20} tickTime={100} started={false} />
    </>
  );
}

export default App;
