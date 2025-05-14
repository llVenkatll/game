import React, { useState } from 'react';
import Game from './Game';
import Leaderboard from './Leaderboard';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [startGame, setStartGame] = useState(false);

  return (
    <div className="app">
      {!startGame ? (
        <div className="start-screen">
          <h2>Enter Your Name to Start</h2>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
          <button onClick={() => setStartGame(true)}>Start Game</button>
          <Leaderboard />
        </div>
      ) : (
        <Game username={username} />
      )}
    </div>
  );
}

export default App;