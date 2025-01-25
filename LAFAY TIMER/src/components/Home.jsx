import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1>Lafay Break Timer</h1>
      <p>La méthode Lafay met l'accent sur l'importance des temps de repos pour améliorer la performance physique et mentale.</p>
      <Link to="/timer">Commencer</Link>
    </div>
  );
};

export default Home;
