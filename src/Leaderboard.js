import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Leaderboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    axios.get('https://soft-quaint-change.glitch.me/leaderboard')
      .then((res) => setScores(res.data))
      .catch((err) => console.error('Error loading leaderboard:', err));
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {scores.map((entry, index) => (
          <li key={index}>{entry.username} - {entry.highScore}</li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;