import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from "./theme";
import { suggestWord } from '../util/service';
import Block from "./Block";
import { useKeyPress } from '../util/hook';

const Row = styled.div`
    display: flex;
    justify-content: center;
`

const Blockrow = ({ word, active }) => {
  useEffect(() => {
    if (!word) return
    
    const wordArray = word.split('')
    const defaultRowAnswer = wordArray.map((letter) => {
      return {[letter]: 0}
    })
    setRowAnswer(defaultRowAnswer)
  }, [])
  
  const [rowAnswer, setRowAnswer] = useState([{s: 0}, {t: 0}, {e: 0}, {a: 0}, {k: 0}]);
  
  const enterKeyPress = useKeyPress('Enter')

  if (active) {
    if (enterKeyPress === true) {
      console.log('active row state:', rowAnswer);
      suggestWord(rowAnswer);
    }
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

  if (!word) {
    return <Row>
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
      </Row>
  }

  const wordArray = word.split('');

  return (
      <Row>
        {wordArray.map((letter) => {
          return <Block active onChange={onChange} key={letter}>{letter}</Block>
        })}
      </Row>
    )
}

export default Blockrow