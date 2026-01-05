import React, { useRef, useEffect, useState } from 'react';

const FlappyBird = () => {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('START'); // START, PLAYING, GAME_OVER
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Game Constants
  const GRAVITY = 0.6;
  const JUMP = -8; // slightly stronger jump
  const PIPE_SPEED = 3;
  const PIPE_SPAWN_RATE = 100; // Frames between spawns
  const BIRD_SIZE = 20;
  const PIPE_WIDTH = 50;
  const GAP_SIZE = 150;

  // Game State Refs (mutable for performance in loop)
  const birdY = useRef(300);
  const birdVelocity = useRef(0);
  const pipes = useRef([]);
  const frameCount = useRef(0);
  const requestRef = useRef();

  const resetGame = () => {
    birdY.current = 300;
    birdVelocity.current = 0;
    pipes.current = [];
    frameCount.current = 0;
    setScore(0);
    setGameState('START');
  };

  const jump = () => {
    if (gameState === 'PLAYING') {
      birdVelocity.current = JUMP;
    } else if (gameState === 'START' || gameState === 'GAME_OVER') {
      if (gameState === 'GAME_OVER') resetGame();
      setGameState('PLAYING');
      birdVelocity.current = JUMP;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Handle resizing
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const loop = () => {
      // Clear
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      ctx.fillStyle = '#70c5ce';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (gameState === 'PLAYING') {
        // Physics
        birdVelocity.current += GRAVITY;
        birdY.current += birdVelocity.current;

        // Pipe Spawning
        frameCount.current++;
        if (frameCount.current % PIPE_SPAWN_RATE === 0) {
          const minPipeHeight = 50;
          const maxPipeHeight = canvas.height - GAP_SIZE - minPipeHeight;
          const topHeight = Math.floor(Math.random() * (maxPipeHeight - minPipeHeight + 1)) + minPipeHeight;
          
          pipes.current.push({
            x: canvas.width,
            topHeight: topHeight,
            passed: false
          });
        }

        // Pipe Logic
        for (let i = pipes.current.length - 1; i >= 0; i--) {
          const p = pipes.current[i];
          p.x -= PIPE_SPEED;

          // Remove off-screen pipes
          if (p.x + PIPE_WIDTH < 0) {
            pipes.current.splice(i, 1);
            continue;
          }

          // Collision Detection
          // Bird Box: x=50, y=birdY.current, w=BIRD_SIZE, h=BIRD_SIZE
          // Top Pipe: x=p.x, y=0, w=PIPE_WIDTH, h=p.topHeight
          // Bottom Pipe: x=p.x, y=p.topHeight + GAP_SIZE, w=PIPE_WIDTH, h=canvas.height
          
          const birdLeft = 50;
          const birdRight = 50 + BIRD_SIZE;
          const birdTop = birdY.current;
          const birdBottom = birdY.current + BIRD_SIZE;

          const pipeLeft = p.x;
          const pipeRight = p.x + PIPE_WIDTH;

          // Horizontal overlap
          if (birdRight > pipeLeft && birdLeft < pipeRight) {
             // Vertical overlap (Top pipe or Bottom pipe)
             if (birdTop < p.topHeight || birdBottom > p.topHeight + GAP_SIZE) {
                 setGameState('GAME_OVER');
             }
          }

          // Score
          if (!p.passed && birdLeft > pipeRight) {
            setScore(prev => prev + 1);
            p.passed = true;
          }
        }

        // Ground/Ceiling Collision
        if (birdY.current + BIRD_SIZE > canvas.height || birdY.current < 0) {
          setGameState('GAME_OVER');
        }
      }

      // Draw Pipes
      ctx.fillStyle = '#228B22'; // Forest Green
      pipes.current.forEach(p => {
        // Top Pipe
        ctx.fillRect(p.x, 0, PIPE_WIDTH, p.topHeight);
        // Bottom Pipe
        ctx.fillRect(p.x, p.topHeight + GAP_SIZE, PIPE_WIDTH, canvas.height - (p.topHeight + GAP_SIZE));
      });

      // Draw Bird
      ctx.fillStyle = '#FFD700'; // Gold
      ctx.fillRect(50, birdY.current, BIRD_SIZE, BIRD_SIZE);

      // Draw UI
      ctx.fillStyle = 'white';
      ctx.font = '24px sans-serif';
      ctx.fillText(`Score: ${score}`, 20, 40);

      if (gameState === 'START') {
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '30px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Tap to Start', canvas.width / 2, canvas.height / 2);
      } else if (gameState === 'GAME_OVER') {
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '30px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
        ctx.font = '20px sans-serif';
        ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 40);
        ctx.fillText('Tap to Restart', canvas.width / 2, canvas.height / 2 + 80);
      }

      requestRef.current = requestAnimationFrame(loop);
    };

    requestRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameState, score]);

  // Update high score
  useEffect(() => {
    if (score > highScore) {
        setHighScore(score);
    }
  }, [score]);

  return (
    <div 
      style={{ width: '100vw', height: '100vh', overflow: 'hidden', touchAction: 'none' }} 
      onPointerDown={jump}
    >
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </div>
  );
};

export default FlappyBird;
