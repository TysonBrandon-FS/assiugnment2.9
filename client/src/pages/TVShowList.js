import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/style.css';

const API_URL = process.env.REACT_APP_API_URL;

const TVShowList = () => {
  const [tvShows, setTVShows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/tvshows`);
        setTVShows(response.data);
      } catch (error) {
        console.error('Error fetching TV shows:', error);
      }
    };

    fetchTVShows();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/tvshows/${id}`);
      setTVShows(tvShows.filter(show => show._id !== id));
    } catch (error) {
      console.error('Error deleting TV show:', error);
    }
  };

  return (
    <div className="tvshows-container">
      <h1 className="tvshows-title">All TV Shows</h1>
      <div className="tvshows-grid">
        {tvShows.map((show) => (
          <div className="tvshow-card" key={show._id}>
            <div className="tvshow-content">
              <h2 className="tvshow-title">{show.title}</h2>
              <p className="tvshow-genre">{show.genre}</p>
              <div className="tvshow-rating">
                <span>Rating: {show.rating}/10</span>
              </div>
            </div>
            <div className="tvshow-actions">
              <button
                className="action-button edit-button"
                onClick={() => navigate(`/tvshows/edit/${show._id}`)}
              >
                Edit
              </button>
              <button
                className="action-button delete-button"
                onClick={() => handleDelete(show._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TVShowList; 