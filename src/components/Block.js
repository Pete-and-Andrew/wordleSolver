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

const Block = ({ children }) => {
  const [blockColor, setBlockColor] = useState('#FFF');
  const pickColor = () => {
    switch(blockColor) {
      case '#FFF':
        return '#74AA64'
      case '#74AA64':
        return '#C9B458'
      default:
        return '#FFF'
    }
  }
    return (
      <StyledBlock onClick={() => setBlockColor(pickColor)} blockColor={blockColor}>{children}</StyledBlock>
    )
}



export default Block