import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Stats = () => {
  const [sessions, setSessions] = useState([]);

  const addSession = (session) => {
    setSessions([...sessions, session]);
  };

  return (
    <div className="stats">
      <h1>Stats</h1>
      <div className="sessions">
        {sessions.map((session, index) => (
          <div key={index}>
            <p>Session {index + 1}: {session.time} seconds</p>
          </div>
        ))}
      </div>
      <Link to="/timer">Back to Timer</Link>
    </div>
  );
};

export default Stats;
