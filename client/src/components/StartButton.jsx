import React, { useEffect, useState  } from 'react';
import styled from 'styled-components';

const StyledStartButton = styled.button`
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


const StartButton = ({ callback }) => {
    const [preventScroll, setPreventScroll] = useState(false);
  
    useEffect(() => {
      const handleKeyDown = (event) => {
        if (preventScroll && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
          event.preventDefault();
        }
      };
  
      window.addEventListener('keydown', handleKeyDown);
  
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [preventScroll]);
  
    const handleClick = () => {
      setPreventScroll(true);
      callback();
    };
  
    return (
      <StyledStartButton onClick={handleClick}>Start Game</StyledStartButton>
    );
  };
  
  export default StartButton;