import React from 'react';
import styled from 'styled-components';
import Blockrow from './Blockrow';

const Gameshell = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Game = () => {
    return (
      <Gameshell>
        <Blockrow word="steak" />
        <Blockrow />
        <Blockrow />
        <Blockrow />
        <Blockrow />
        <Blockrow />
      </Gameshell>
    )
}

export default Game