import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/style.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to TV Shows App</h1>
      <p className="home-subtitle">Your personal collection of favorite TV shows</p>
      <div className="home-buttons">
        <button
          className="primary-button"
          onClick={() => navigate('/tvshows')}
        >
          View Shows
        </button>
        <button
          className="secondary-button"
          onClick={() => navigate('/tvshows/new')}
        >
          Add New Show
        </button>
      </div>
    </div>
  );
};

export default Home; 