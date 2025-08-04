// App.jsx
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [streak, setStreak] = useState(0);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [lastDoseTime, setLastDoseTime] = useState(null);

  useEffect(() => {
    updatePetImage();
  }, [lastDoseTime]);

  const logDose = () => {
    const now = Date.now();
    if (lastDoseTime && now - lastDoseTime < 12 * 3600 * 1000) {
      alert('You already logged a dose recently.');
      return;
    }
    setLastDoseTime(now);
    setStreak(prev => prev + 1);
    const newXp = xp + 20;
    setXp(newXp);
    if (newXp >= level * 100) {
      setLevel(prev => prev + 1);
    }
  };

  const updatePetImage = () => {
    const img = document.getElementById('pet-img');
    if (!lastDoseTime || Date.now() - lastDoseTime > 36 * 3600 * 1000) {
      img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Emoji_u1f641.svg/240px-Emoji_u1f641.svg.png';
    } else {
      img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Emoji_u1f60a.svg/240px-Emoji_u1f60a.svg.png';
    }
  };

  return (
    <div className="app">
      <h1>🐻 BearBuddy</h1>
      <img id="pet-img" className="pet" alt="Pet" />
      <div className="level">Level {level}</div>
      <div className="streak">Streak: {streak} days</div>
      <div className="xp-bar">
        <div className="xp-fill" style={{ width: `${xp % 100}%` }}></div>
      </div>
      <button onClick={logDose}>✅ I took my pill</button>
    </div>
  );
}

export default App;
