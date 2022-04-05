import React from 'react';
import styled from 'styled-components';
import { theme } from "./theme";
import Block from "./Block";

const Row = styled.div`
    display: flex;
    justify-content: center;
`

const Blockrow = ({ word }) => {
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
          return <Block key={letter}>{letter}</Block>
        })}
      </Row>
    )
}

export default Blockrow