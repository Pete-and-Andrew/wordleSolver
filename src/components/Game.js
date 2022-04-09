/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import Blockrow from './Blockrow';
import wholeWordList from '../wordList.js'
import { reduce, filter, merge, find, hasIn, map, get, uniq, zipObject } from 'lodash';
import { defaultRowAnswers } from '../util/service';
import { Gameshell, Footer, SubmitButton } from "./typography"

const Game = () => {  
  const [wordList, setWordList] = useState(null)
  const [gameIterations, setGameIterations] = useState(1)
  const [rowAnswers, setRowAnswers] = useState(defaultRowAnswers);
  const [solvedColumns, setSolvedColumns] = useState([false, false, false, false, false])

  useEffect(() => {
    if (gameIterations === 1){ 
      setWordList(wholeWordList)
    }
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
            if (splitWord[letterPosition] === currentLetter) {
              return false;
            }
            break;
          //Green letter
          case 2:
            if (splitWord[letterPosition] !== currentLetter) {
              return false;
            }
            solvedColumns[letterPosition] = true;

            break;
          }
      }
      return true;
    })

    setGameIterations(gameIterations + 1)

    const bestGuessWord = suggestBestGuess(newWordList);
    setWordList(newWordList);
    rowAnswers[gameIterations].word = bestGuessWord
    rowAnswers[gameIterations].answerKey = createAnswerKey(bestGuessWord)
    // const updatedRowAnswers = merge(replaceWord, rowAnswers)
  }

  const createAnswerKey = (word) => { 
    const splitWord = word.split('');
    let newAnswer = [];
    splitWord.forEach((letter, i) => {
      let value = solvedColumns[i] ? 2 : 0;
      newAnswer.push({[letter]: value});
    })
    return newAnswer;
  }

  const suggestBestGuess = (wordList) => { 
    let letterPosValuesWrapper = [{}, {}, {}, {}, {}]

    wordList.forEach(word => {
      const splitWord = word.split('');
      splitWord.forEach((letter, i) => { 
        if (letterPosValuesWrapper[i][letter]){ 
          letterPosValuesWrapper[i][letter]++
        }else { 
          letterPosValuesWrapper[i][letter] = 1;
        }
      })
    })

    let currentBestGuess;
    let currentBestGuessValue = 0;

    if (wordList.length === 1){ 
      setSolvedColumns([true, true, true, true, true]);
      return wordList[0]
    }
    wordList.forEach(word => { 
      const splitWord = word.split('');
      let value = 0;
      splitWord.forEach((letter, i) => { 
        value = value + letterPosValuesWrapper[i][letter]
      })
      if (value > currentBestGuessValue) {
        currentBestGuess = word;
        currentBestGuessValue = value; 
      }
    })
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
              return <Blockrow active={active} key={row.id} word={row.word} rowAnswer={row.answerKey} solvedColumns={solvedColumns} onChange={onChange} />
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