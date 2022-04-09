import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from "./theme";
import Block from "./Block";

const Row = styled.div`
    display: flex;
    justify-content: center;
`

const Blockrow = ({ word, active, onChange, solvedColumns }) => { 
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
        {word.split('').map((letter, i) => {
          return <Block key={`${word}${i}`} isSolved={solvedColumns[i]} active={active} onChange={active ? onChange : null}>{letter}</Block>
        })}
      </Row>
    )
}

export default Blockrow