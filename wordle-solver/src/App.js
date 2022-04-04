import './App.css';
import styled from 'styled-components';
import Game from './components/game.js';

const Title = styled.h1`
  font-family: "nyt-karnak";
  font-weight: 700;
`;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Title>WordleSolver</Title>
      </header>
      <main>
        <Game />
      </main>
    </div>
  );
}

export default App;
