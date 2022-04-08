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

  // const filterWordList = (accumulated, listWord) => {
  //   const activeRowAnswers = rowAnswers[gameIterations - 1].answerKey
  //   let splitWord = listWord.split('')
  //   let firstLetter = get(activeRowAnswers[0], splitWord[0])
  //   let secondLetter = get(activeRowAnswers[1], splitWord[1])
  //   let thirdLetter = get(activeRowAnswers[2], splitWord[2])
  //   let fourthLetter = get(activeRowAnswers[3], splitWord[3])
  //   let fifthLetter = get(activeRowAnswers[4], splitWord[4])
  
  //   if (firstLetter === 2 && secondLetter === 2 && thirdLetter === 2) {
  //     accumulated.push(listWord)
  //   }
  
  //   // debugger;
  
  //   return accumulated
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newWordList = filter(wordList, (word) => {
      for (let letterPosition = 0; letterPosition < 5; letterPosition++){
        const currentAnswerKey = rowAnswers[gameIterations - 1].answerKey[letterPosition];
        const currentLetter = Object.keys(currentAnswerKey)[0]
        const splitWord = rowAnswers[gameIterations - 1].word.split('')
        // switch (activeRowAnswers[letterPosition]){
          switch(currentAnswerKey[currentLetter]) {
          // //Grey letter
          case 0:
            if (!word.includes(currentLetter)){ 
              console.log('hit!')
              return false;
            }
            break;
          // //Yellow letter
          case 1:
            if (word.includes(currentLetter)) {
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
          return false
      }
  })
    console.log('newWordList', newWordList)
    // const filteredWordList = reduce(
    //   wordList,
    //   (accumulated, listWord) => {
    //     // trying to reduce 5 times, based on word length
    //     for (let i = 0; i < 5; i++) {
    //       accumulated = filterWordList(accumulated, listWord);
    //     }
    //     return uniq(accumulated)
    //   },
    //   []);
    // console.log('filteredWordList', filteredWordList)  
    // // console.log('rowAnswers:', rowAnswers)
    // let randomElement = filteredWordList[Math.floor(Math.random() * filteredWordList.length)];
    // const replaceWord = rowAnswers[gameIterations].word = randomElement
    setGameIterations(gameIterations + 1)
    // const updatedRowAnswers = merge(replaceWord, rowAnswers)
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