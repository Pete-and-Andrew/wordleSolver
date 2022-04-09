/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import Blockrow from './Blockrow';
import wholeWordList from '../wordList.js'
import { reduce, filter, merge, find, hasIn, map, get, uniq} from 'lodash';
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
    const newWordList = filter(wordList, (word) => {
      for (let letterPosition = 0; letterPosition < 5; letterPosition++){
        const currentAnswerKey = rowAnswers[gameIterations - 1].answerKey[letterPosition];
        const currentLetter = Object.keys(currentAnswerKey)[0]
        const splitWord = word.split('')
        // switch (activeRowAnswers[letterPosition]){
          switch(currentAnswerKey[currentLetter]) {
          // //Grey letter
          case 0:
            if (word.includes(currentLetter)){ 
              return false;
            }
            break;
          // //Yellow letter
          case 1:
            if (!word.includes(currentLetter)) {
              return false;
            }
            if (splitWord[letterPosition] == currentLetter) {
              return false;
            }
            break;
          //Green letter
          case 2:
            if (splitWord[letterPosition] !== currentLetter) {
              return false;
            }
            break;
          }
      }
      return true;
    })
    console.log('newWordList', newWordList)

    setGameIterations(gameIterations + 1)

    rowAnswers[gameIterations].word = suggestBestGuess(newWordList);

    // const updatedRowAnswers = merge(replaceWord, rowAnswers)
  }

  const suggestBestGuess = (wordList) => { 
    let letterPosValuesWrapper = [{}, {}, {}, {}, {}]

    wordList.forEach(word => {
      const splitWord = word.split('');
      splitWord.forEach((letter, i) => { 
        if (letterPosValuesWrapper[i][letter]){ 
          console.log('ding should increase')
          letterPosValuesWrapper[i][letter]++
        }else { 
          letterPosValuesWrapper[i][letter] = 1;
        }
      })
    })
    console.log('letterPosValuesWrapper', letterPosValuesWrapper)

    let currentBestGuess;
    let currentBestGuessValue = 0;

    wordList.forEach(word => { 
      const splitWord = word.split('');
      let value = 0;
      splitWord.forEach((letter, i) => { 
        value = value + letterPosValuesWrapper[i][letter]
      })
      console.log('word + value', word, value)
      if (value > currentBestGuessValue) {
        currentBestGuess = word;
        currentBestGuessValue = value; 
      }
    })
    console.log('OUR SUGGESTED GUESS IS:', currentBestGuess)
    return currentBestGuess;
  }

  const onChange = (blockState) => {
    // merge value from Block component into rowAnswer
    const { letter, value } = blockState
    let id = gameIterations - 1
    const foundRowAnswerKey = rowAnswers[id].answerKey
    const replaceAnswerKey = find(foundRowAnswerKey, (answerKey) => { 
      return hasIn(answerKey, letter);
    })
    replaceAnswerKey[letter] = value
  }

    let endCounter = gameIterations === 7
    return (
      <Gameshell>
        <form onSubmit={handleSubmit}>
          {
            rowAnswers.map(row => {
            
              const active = gameIterations === row.id
              console.log('ACTIVE ROW:', gameIterations, row.id, active)
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