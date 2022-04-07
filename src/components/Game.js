import React, { useState, useEffect } from 'react';
import Blockrow from './Blockrow';
import wholeWordList from '../wordList.js'
import { reduce, filter } from 'lodash';
import { Gameshell, Footer, SubmitButton } from "./typography"


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
  const [rowAnswer, setRowAnswer] = useState([{s: 0}, {t: 0}, {e: 0}, {a: 0}, {k: 0}]);

  useEffect(() => {
    setWordList(wholeWordList)
  }, [wordList]); 
  
  const handleSubmit = (e) => {
    e.preventDefault();
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
    console.log('rowAnswer:', rowAnswer)
    let randomElement = filteredWordList[Math.floor(Math.random() * filteredWordList.length)];
    setActiveBlockRowAnswer(randomElement);
  }

  const onChange = (blockState) => {
    // merge value from Block component into rowAnswer
    const { letter, value } = blockState

    const rowAnswerState = rowAnswer.map((obj) => {
        if (obj.hasOwnProperty(letter)) {
          obj[letter] = value;
        }
        return obj
      })
    setRowAnswer(rowAnswerState)
  }
    
    return (
      <Gameshell>
        <form onSubmit={handleSubmit}>
        <Blockrow active={gameIterations === 0} word="steak" onChange={onChange} rowAnswer={rowAnswer} setRowAnswer={setRowAnswer} />
        {/* TODO: Replace null with previous answer state */}
        <Blockrow active={gameIterations === 1} word={gameIterations === 1 ? activeBlockRowAnswer : null} />
        <Blockrow active={gameIterations === 2} word={gameIterations === 2 ? activeBlockRowAnswer : null} />
        <Blockrow active={gameIterations === 3} word={gameIterations === 3 ? activeBlockRowAnswer : null} />
        <Blockrow active={gameIterations === 4} word={gameIterations === 4 ? activeBlockRowAnswer : null} />
        <Blockrow active={gameIterations === 5} word={gameIterations === 5 ? activeBlockRowAnswer : null} />
        <Footer>
          <div style={{width: '100%'}}>
            <SubmitButton type="submit">Submit</SubmitButton>
          </div>
        </Footer>
        </form>
      </Gameshell>
    )
}

export default Game