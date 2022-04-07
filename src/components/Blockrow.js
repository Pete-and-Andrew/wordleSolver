import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from "./theme";
import { suggestWord } from '../util/service';
import Block from "./Block";

const Row = styled.div`
    display: flex;
    justify-content: center;
`

const Blockrow = ({ word, active, onChange, setRowAnswer }) => {
  useEffect(() => {
    if (!word) return
    const wordArray = word.split('')
    const defaultRowAnswer = wordArray.map((letter) => {
      return {[letter]: 0}
    })
    setRowAnswer(defaultRowAnswer)
  }, [])
  
  if (!word) {
    return <Row>
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
      </Row>
  }

  return (
      <Row>
        {word.split('').map((letter) => {
          return <Block active onChange={onChange}>{letter}</Block>
        })}
      </Row>
    )
}

export default Blockrow