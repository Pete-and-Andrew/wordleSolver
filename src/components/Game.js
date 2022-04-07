import React, { useState, useEffect } from 'react';
import Blockrow from './Blockrow';
import wholeWordList from '../wordList.js'
import { reduce, filter } from 'lodash';
import { Gameshell, Footer } from "./typography"


// Game state
// holds 6 blockrows of rowAnswers
// hold the progressively filtered word list

// find active blockrow
// pass rowAnswer value to algo
// algo returns new word
// set `word`
const Game = () => {  
  // need to keep track how many times enter is pressed to move active state on Blockrow
  const [wordList, setWordList] = useState(null)
  const [gameIterations, setGameIterations] = useState(0)
  const [activeBlockRowAnswer, setActiveBlockRowAnswer] = useState(null);
  
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
      // this doesn't work?
      setGameIterations(gameIterations + 1)
      
      // WIP begining of algo
      const filteredWordList = reduce(
        wordList,
        // TODO: move this lol
        function(accumulated, word){
            let splitWord = word.split('')
            // need to get rowAnswer state here
            // this is where the algo would go
            if (splitWord[0] === 's') {
              accumulated.push(word)
            }
            return accumulated
        },
        []);
      // console.log('filteredWordList', filteredWordList)  
      
      let randomElement = filteredWordList[Math.floor(Math.random() * filteredWordList.length)];
      setActiveBlockRowAnswer(randomElement);
    }
  }
  
    
    return (
      <Gameshell>
        <Blockrow active={gameIterations === 0} word="steak" />
        <Blockrow active={gameIterations === 1} word={gameIterations === 1 ? activeBlockRowAnswer : null} />
        <Blockrow active={gameIterations === 2} word={gameIterations === 2 ? activeBlockRowAnswer : null} />
        <Blockrow active={gameIterations === 3} word={gameIterations === 3 ? activeBlockRowAnswer : null} />
        <Blockrow active={gameIterations === 4} word={gameIterations === 4 ? activeBlockRowAnswer : null} />
        <Blockrow active={gameIterations === 5} word={gameIterations === 5 ? activeBlockRowAnswer : null} />
        <Footer>
          To submit your answer, just hit 'enter'
        </Footer>
      </Gameshell>
    )
}

export default Game