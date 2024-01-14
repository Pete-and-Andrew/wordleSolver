import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from "./theme";
import Block from "./Block";

const Row = styled.div`
    display: flex;
    justify-content: center;
`

const FirstBlockrow = ({ active, guess, onChange }) => { 
  const blocksLeft = 5 - guess.length

  return (
    <Row>
        {guess.split('').map((letter, i) => {
          return <Block key={`${letter}${i}`} position={i} isSolved={false} active={active} onChange={active ? onChange : null}>{letter}</Block>
        })}
        {Array.from({length: blocksLeft}, (v, i) => {
          return <Block key={`${v}${i}`} position={i}></Block>
        })}
      </Row>
    )
}

export default FirstBlockrow