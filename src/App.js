import './App.css';
import { Title, Header } from './components/typography';
import Game from './components/Game';

function App() {
  return (
    <div className="App">
      <Header>
        <Title>WordleSolver</Title>
      </Header>
      <main>
        <Game />
      </main>
    </div>
  );
}

export default App;
