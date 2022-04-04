import './App.css';
import styled from 'styled-components';
import { Title, Header } from './components/typography';
import Game from './components/game';

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
