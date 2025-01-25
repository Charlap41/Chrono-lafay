import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DurationsContext } from '../App';

const Settings = () => {
  const { durations, setDurations } = useContext(DurationsContext);

  const handleDurationChange = (index, value) => {
    const newDurations = [...durations];
    newDurations[index] = parseInt(value, 10);
    setDurations(newDurations);
  };

  return (
    <div className="settings">
      <h1>Paramètres</h1>
      <div className="durations">
        {durations.map((duration, index) => (
          <div key={index}>
            <label>Chrono {index + 1}</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => handleDurationChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>
      <Link to="/timer">Retour au Timer</Link>
    </div>
  );
};

export default Settings;
