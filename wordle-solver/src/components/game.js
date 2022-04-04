import React from 'react';
import styled from 'styled-components'

const Gameshell = styled.div`
    display: flex;
    justify-content: center;
    height: 80vh;
`;

const Block = styled.div`
    border: 2px solid #D3D6DA;
    height: 62px;
    width: 62px;
    margin: 5px;
`;

const Row = styled.div`
    display: flex;
`

const BlockRow = () => {
    return <Row>
      <Block/><Block/><Block/><Block/><Block/>
      </Row>
}

const Game = () => {
    return <Gameshell>
        <BlockRow />
    </Gameshell>
}

export default Game