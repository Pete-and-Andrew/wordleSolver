import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Blockrow from './Blockrow';
import wholeWordList from '../wordList.js'

const Gameshell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Footer = styled.div`
  margin-top: 32px;
`

// Game state
// holds 6 blockrows of rowAnswers
// hold the progressively filtered word list

// find active blockrow
// pass rowAnswer value to algo
// algo returns new word
// set `word`
const Game = () => {  
  let rowAnswer = null; 
  const [wordList, setWordList] = useState(null)
  const [activeBlockRowAnswer, setActiveBlockRowAnswer] = useState('steak');
  
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    setWordList(wholeWordList)
    
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, [wordList]); // Empty array ensures that effect is only run on mount and unmount
  
  function downHandler({ key }) {
    if (key === 'Enter') {
      console.log(wordList)
      // const randomElement = wordList[Math.floor(Math.random() * wordList.length)];
      // setActiveBlockRowAnswer(randomElement);
    }
  }
  
    return (
      <Gameshell>
        <Blockrow active word={activeBlockRowAnswer} rowAnswer={rowAnswer} />
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