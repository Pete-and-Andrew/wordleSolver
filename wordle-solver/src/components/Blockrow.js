import React from 'react';
import styled from 'styled-components';
import { theme } from "./theme";

const Block = styled.div`
    border: 2px solid #D3D6DA;
    display: flex;
    justify-content: center;
    background-color: ${props => props.color};
    align-items: center;
    height: 62px;
    width: 62px;
    margin: 2px;
    font-size: 2rem;
    font-weight: bold;
    text-transform: uppercase;
`;

const Row = styled.div`
    display: flex;
    justify-content: center;
`

const Blockrow = ({ word }) => {
  if (!word) {
    return <Row>
        <Block color={theme.blockGreen} />
        <Block color={theme.blockYellow}/>
        <Block/>
        <Block/>
        <Block/>
      </Row>
  }

  const wordArray = word.split('');
    return (
      <Row>
        {wordArray.map((letter) => {
          return <Block>{letter}</Block>
        })}
      </Row>
    )
}

export default Blockrow