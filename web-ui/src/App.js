import { useState, useEffect } from 'react';
import './App.css';
import bearImage from './cute-pink-bear-png.webp'; 

function App() {
  const [streak, setStreak] = useState(0);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [lastDoseTime, setLastDoseTime] = useState(null);
  const [petImageSrc, setPetImageSrc] = useState(bearImage); // 🧸 state for image

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

  useEffect(() => {
    // In the future, you can switch between different pet images here
    if (!lastDoseTime || Date.now() - lastDoseTime > 36 * 3600 * 1000) {
      setPetImageSrc(bearImage); // same image for now
    } else {
      setPetImageSrc(bearImage); // could use a different image here
    }
  }, [lastDoseTime]);

  return (
    <div className="app">
      <h1>🐻 BearBudddy</h1>
      <img src={petImageSrc} className="pet" alt="Pet" />
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
