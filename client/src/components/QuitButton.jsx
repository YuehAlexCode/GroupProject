import React from 'react';
import styled from 'styled-components';

const StyledEndButton = styled.button`
  box-sizing: border-box;

  margin: 0 0 20px 0;
  padding: 20px;
  min-height: 30px;
  width: 100%;
  border-radius: 20px;
  border: none;
  color: white;
  background: #212529;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 1rem;
  outline: none;
  cursor: pointer;
  `;


const QuitButton = ({ callback }) => (
  <StyledEndButton onClick={callback}>End Game</StyledEndButton>
);

export default QuitButton;