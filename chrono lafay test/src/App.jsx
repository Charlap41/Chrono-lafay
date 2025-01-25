import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Timer from './components/Timer';
import Settings from './components/Settings';
import Stats from './components/Stats';

export const DurationsContext = createContext();

const App = () => {
  const [durations, setDurations] = useState([25, 60, 90, 120, 180, 240]);

  return (
    <DurationsContext.Provider value={{ durations, setDurations }}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/timer" />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </Router>
    </DurationsContext.Provider>
  );
};

export default App;
