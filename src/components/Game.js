import React, { useEffect } from 'react';
import styled from 'styled-components';
import Blockrow from './Blockrow';

const Gameshell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Footer = styled.div`
  margin-top: 32px;
`

const Game = () => {

  // Game state
  // holds 6 blockrows of rowAnswers
  // hold the progressively filtered word list
  
  // find active blockrow
  // pass rowAnswer value to algo
  // algo returns new word
  // set `word`

  
    return (
      <Gameshell>
        <Blockrow active word="steak" rowAnswer={null} />
        <Blockrow />
        <Blockrow />
        <Blockrow />
        <Blockrow />
        <Blockrow />
        <Footer>
          To submit your answer, just hit 'enter'
        </Footer>
      </Gameshell>
    )
}

export default Game