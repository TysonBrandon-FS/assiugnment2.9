import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/style.css';

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">TV Shows App</h1>
        <div className="navbar-buttons">
          <Link to="/" className="nav-button">Home</Link>
          <Link to="/tvshows" className="nav-button">TV Shows</Link>
          <Link to="/tvshows/new" className="nav-button">Add Show</Link>
          {!loggedIn ? (
            <>
              <Link to="/login" className="nav-button">Login</Link>
              <Link to="/register" className="nav-button">Register</Link>
            </>
          ) : (
            <>
              <Link to="/protected" className="nav-button">Protected</Link>
              <button onClick={handleLogout} className="nav-button">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 