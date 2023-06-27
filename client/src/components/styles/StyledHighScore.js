import styled from 'styled-components';

import bgImage from '../img/bg.png'

export const StyledHighScore = styled.div`
  display: flex;
  background: url(${bgImage}) #000;
  align-items: flex-start;
  padding: 40px;
  width: 60vw;
  height: 100vh;
  background-size: cover;
  overflow: hidden;
`;

export const StyledHighScoreTable = styled.div`
border-radius: 20px;
overflow: hidden;
`;
