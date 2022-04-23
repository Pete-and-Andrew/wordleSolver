/* eslint-disable default-case */
//TODO handle duplicate letters
import React, { useState, useEffect } from 'react';
import Blockrow from './Blockrow';
import wholeWordList from '../wordList.js'
import { reduce, filter, merge, find, hasIn, map, get, uniq, zipObject, forEach } from 'lodash';
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

    if(wordList.length === 0) {
      alert("No valid words left, please ensure your selected word is on the wordle solutions list and that an error hasn't been entered")
    }
    const currentAnswer = rowAnswers[gameIterations - 1].answerKey;

    let duplicateLetters = {};
    
    currentAnswer.forEach(letterObj => { 
      const letter = Object.keys(letterObj)[0]
      if (duplicateLetters[letter] === 0){ 
        duplicateLetters[letter] = 1
      }else{ 
        duplicateLetters[letter] = 0
      }
    })
    const newWordList = filter(wordList, (word) => {
      for (let letterPosition = 0; letterPosition < 5; letterPosition++){
        const currentAnswerKey = rowAnswers[gameIterations - 1].answerKey[letterPosition];
        const currentLetter = Object.keys(currentAnswerKey)[0]
        const splitWord = word.split('')

          switch(currentAnswerKey[currentLetter]) {
          //Grey letter
          case 0:
            if (word.includes(currentLetter) && !duplicateLetters[currentLetter]){ 
              return false;
            }

            if (word.includes(currentLetter) && duplicateLetters[currentLetter]){
              if (splitWord.filter(letter => letter === currentLetter).length > 1) {
                return false;
              } 
            }

            break;
          //Yellow letter
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
            solvedColumns[letterPosition] = true;
            if (splitWord[letterPosition] !== currentLetter) {
              return false;
            }


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
      let usedLetters = []
      splitWord.forEach((letter, i) => { 
        if (!usedLetters.includes(letter)){ 
          value = value + letterPosValuesWrapper[i][letter]
          usedLetters.push(letter)
        }
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
    const { letter, value, position } = blockState
    let id = gameIterations - 1

    const foundRowAnswerKey = rowAnswers[id].answerKey
    foundRowAnswerKey[position] = {[letter]: value}
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