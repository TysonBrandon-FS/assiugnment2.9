import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">TV Shows App</h1>
        <div className="navbar-buttons">
          <Link to="/" className="nav-button">Home</Link>
          <Link to="/tvshows" className="nav-button">TV Shows</Link>
          <Link to="/tvshows/new" className="nav-button">Add Show</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 