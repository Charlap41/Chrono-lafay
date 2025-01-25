import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { DurationsContext } from '../App';

const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes > 0) {
    return `${minutes}'${remainingSeconds > 0 ? `${remainingSeconds}"` : ''}`;
  }
  return `${remainingSeconds}"`;
};

const playBip = (duration) => {
  const context = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(1000, context.currentTime); // 1000 Hz frequency
  gainNode.gain.setValueAtTime(1, context.currentTime);
  oscillator.start();

  setTimeout(() => {
    oscillator.stop();
  }, duration); // Duration of the bip
};

const Timer = () => {
  const { durations } = useContext(DurationsContext);
  const [time, setTime] = useState(25);
  const [isActive, setIsActive] = useState(false);
  const [series, setSeries] = useState(0);
  const [activeSeries, setActiveSeries] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  useEffect(() => {
    if (time <= 5 && time > 0) {
      playBip(500); // Short bip for the last 5 seconds
    } else if (time === 0) {
      playBip(2000); // Long bip when time is up
    }
  }, [time]);

  const handleDurationClick = (duration) => {
    setTime(duration);
    setIsActive(true);
    setActiveSeries(series);
    if (series > 0) {
      setSeries(series - 1);
    }
  };

  const handleSeriesClick = (seriesCount) => {
    setSeries(seriesCount);
  };

  const handleStop = () => {
    setIsActive(false);
    setTime(25);
    setSeries(activeSeries);
  };

  useEffect(() => {
    if (time === 0) {
      setIsActive(false);
      alert('Break time is over!');
    }
  }, [time]);

  return (
    <div className="timer">
      <h1>Timer: {formatDuration(time)}</h1>
      <div className="series-tiles">
        {[...Array(7)].map((_, index) => (
          <div
            key={index}
            className={`series-tile ${series === index ? 'active' : ''}`}
            onClick={() => handleSeriesClick(index)}
          >
            {index}
          </div>
        ))}
      </div>
      <div className="duration-tiles">
        {durations.map((duration, index) => (
          <div
            key={index}
            className="duration-tile"
            onClick={() => handleDurationClick(duration)}
          >
            {formatDuration(duration)}
          </div>
        ))}
      </div>
      {isActive && (
        <button className="stop-button" onClick={handleStop}>Arrêter</button>
      )}
      <Link to="/settings">Paramètres</Link>
      <Link to="/stats">Statistiques</Link>
    </div>
  );
};

export default Timer;
