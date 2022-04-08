import React, { useState, useEffect } from 'react';
import Blockrow from './Blockrow';
import wholeWordList from '../wordList.js'
import { reduce, filter, merge, find, hasIn} from 'lodash';
import { defaultRowAnswers } from '../util/service';
import { Gameshell, Footer, SubmitButton } from "./typography"

const Game = () => {  
  const [wordList, setWordList] = useState(null)
  const [gameIterations, setGameIterations] = useState(1)
  const [rowAnswers, setRowAnswers] = useState(defaultRowAnswers);

  useEffect(() => {
    setWordList(wholeWordList)
  }, [wordList, gameIterations]); 
  
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
    
    console.log('rowAnswers:', rowAnswers)
    let randomElement = filteredWordList[Math.floor(Math.random() * filteredWordList.length)];
    const replaceWord = rowAnswers[gameIterations].word = randomElement
    const updatedRowAnswers = merge(replaceWord, rowAnswers)
  }

  const onChange = (blockState) => {
    // merge value from Block component into rowAnswer
    const { letter, value } = blockState
    let id = gameIterations - 1
    const foundRowAnswerKey = rowAnswers[id].answerKey
    const replaceAnswerKey = find(foundRowAnswerKey, (answerKey) => { 
      return hasIn(answerKey, letter);
    })
    replaceAnswerKey['value'] = value
    // const updatedRowAnswers = merge(replaceAnswerKey, rowAnswers)
    // setRowAnswers(updatedRowAnswers);
  }

    let endCounter = gameIterations === 7
    return (
      <Gameshell>
        <form onSubmit={handleSubmit}>
          {
            rowAnswers.map(row => {
              const active = gameIterations === row.id

              return <Blockrow active={active} key={row.id} word={row.word} rowAnswer={row.answerKey} onChange={onChange} />
            })
          }
        <Footer>
          {endCounter ? null : <div style={{width: '100%'}}>
            <SubmitButton type="submit">Submit</SubmitButton>
          </div>}
        </Footer>
        </form>
      </Gameshell>
    )
}

export default Game