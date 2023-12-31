import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { createStage, checkCollision } from './gameHelpers';
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus';

import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
import QuitButton from './QuitButton';

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [userInfo,SetUserInfo] = useState([]);
  const [gotEmail,SetGotEmail] = useState("");
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );
  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      const email = JSON.parse(storedUserInfo);
      SetGotEmail(email);
    }
  
    const handleGameOver = async () => {
      if (gameOver && score > userInfo.highScore && userInfo.highScore !== null) {
        try {
          const response = await axios.put(`http://localhost:8000/api/users/${gotEmail}`, { highScore: score });
          console.log('Score updated successfully!', response.data);
          
          setTimeout(() => {
            window.location.reload();
          }, 800);
        } catch (error) {
          console.error('Error updating score:', error);
        }
      }
    };
    
  
    handleGameOver();
    window.addEventListener('gameOver', handleGameOver);
  
    axios.get(`http://localhost:8000/api/users/` + gotEmail)
      .then((res) => {
        SetUserInfo(res.data);
      })
      .catch((error) => {
        console.error('Error retrieving user data:', error);
      });
  
    return () => {
      window.removeEventListener('gameOver', handleGameOver);
    };
  }, [gameOver, gotEmail, score, userInfo.highScore]);
  


  console.log('re-render');

  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1));
      }
    }
  };

  const startGame = () => {
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setScore(0);
    setLevel(0);
    setRows(0);
    setGameOver(false);
  };

  const endGame = () => {
    setDropTime(0);
    setGameOver(true);
  };

  const drop = () => {
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game over!
      if (player.pos.y < 1) {
        console.log('GAME OVER!!!');
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  useInterval(() => {
    drop();
  }, dropTime);

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      }
    }
  };

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={e => move(e)}
      onKeyUp={keyUp}
    >
      <div className='shift'>
      <StyledTetris>
        <Stage stage={stage} />
        <aside className='shift'>
        <h3 className='title text-light'>Tetris Game</h3>
          {gameOver ? (
            <div>
              <Display gameOver={gameOver} text="Game Over" />
              <div>
                {score <= userInfo.highScore ? (
                    <h6 className='scoreButton'>Your Score: {score}</h6>
                ) : (
                    <h6 className='scoreButton'>New High Score: {score}</h6>
                )}
              </div>
            </div>
            
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}
          <StartButton callback={startGame} />
          <QuitButton callback={endGame} />
        </aside>
      </StyledTetris>

      
      </div>
    </StyledTetrisWrapper>
    
  );
};

export default Tetris;