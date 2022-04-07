import styled from 'styled-components'

export const Title = styled.h2`
  font-family: system-ui;
  font-weight: 800;
  margin: 16px;
`;

export const SubmitButton = styled.button`
  width: 64px;
  height: 32px;
  color: white;
  font-weight: bold;
  background: #858585;
`

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid #D3D6DA;
  font-size: calc(10px + 2vmin);
  color: black;
  margin-bottom: 16px;
`;

export const Gameshell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 32px;
`