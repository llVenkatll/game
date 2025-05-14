import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const canvasWidth = 400;
const canvasHeight = 500;
const playerWidth = 60;

function Game({ username }) {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [playerX, setPlayerX] = useState(canvasWidth / 2 - 30);
  const [balls, setBalls] = useState([]);

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    let animationFrameId;

    function drawPlayer() {
      context.fillStyle = 'blue';
      context.fillRect(playerX, canvasHeight - 30, playerWidth, 20);
    }

    function drawBalls() {
      balls.forEach((ball, index) => {
        context.beginPath();
        context.arc(ball.x, ball.y, 15, 0, 2 * Math.PI);
        context.fillStyle = ball.type === 'good' ? 'green' : 'red';
        context.fill();
        ball.y += 2;

        if (ball.y > canvasHeight - 45 && ball.x > playerX && ball.x < playerX + playerWidth) {
          const newScore = ball.type === 'good' ? score + 1 : score - 2;
          setScore(newScore);
          balls.splice(index, 1);
        }
      });
    }

    function gameLoop() {
      context.clearRect(0, 0, canvasWidth, canvasHeight);
      drawPlayer();
      drawBalls();
      animationFrameId = requestAnimationFrame(gameLoop);
    }

    gameLoop();

    const ballInterval = setInterval(() => {
      const newBall = {
        x: Math.random() * (canvasWidth - 30) + 15,
        y: 0,
        type: Math.random() > 0.7 ? 'bad' : 'good',
      };
      setBalls((prev) => [...prev, newBall]);
    }, 1000);

    function handleKeyDown(e) {
      if (e.key === 'ArrowLeft') setPlayerX((x) => Math.max(0, x - 20));
      if (e.key === 'ArrowRight') setPlayerX((x) => Math.min(canvasWidth - playerWidth, x + 20));
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(ballInterval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [playerX, balls, score]);

  useEffect(() => {
    return () => {
      axios.post('https://soft-quaint-change.glitch.me/submit-score', { username, score });
    };
  }, []);

  return (
    <div>
      <h3>Score: {score}</h3>
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} style={{ border: '1px solid black' }} />
    </div>
  );
}

export default Game;
