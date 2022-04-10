import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from "./theme";

const StyledBlock = styled.div`
    border: 2px solid #D3D6DA;
    display: flex;
    justify-content: center;
    background: ${props => props.blockColor || 'white'};
    align-items: center;
    height: 62px;
    width: 62px;
    margin: 2px;
    font-size: 2rem;
    font-weight: bold;
    text-transform: uppercase;
`;

function BlockState(letter, value, position) {
  this.letter = letter;
  this.value = value;
  this.position = position
}

const Block = ({ children, active, onChange, isSolved, position }) => {
  const [blockColor, setBlockColor] = useState(isSolved ? '#74AA64' : '#FFF');
  const pickColor = () => {
    switch(blockColor) {
      case '#FFF':
        onChange(new BlockState(children, 1, position))
        return '#C9B458'
      case '#C9B458':
        onChange(new BlockState(children, 2, position))
        return '#74AA64'
      case '#74AA64':
        onChange(new BlockState(children, 0, position))
        return '#FFF'
      default:
        return '#FFF'
    }
  }

  if (active){ 
    return (
      <StyledBlock onClick={() => active ? setBlockColor(pickColor) : null } blockColor={blockColor}>{children}</StyledBlock>
    )
  } else { 
    return (
      <StyledBlock blockColor={blockColor}>{children}</StyledBlock>
    )
  }
    
}



export default Block