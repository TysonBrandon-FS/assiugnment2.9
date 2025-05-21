import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/style.css';

const TVShowForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    rating: 0,
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchTVShow = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/tvshows/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error('Error fetching TV show:', error);
        }
      };
      fetchTVShow();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/tvshows/${id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/tvshows', formData);
      }
      navigate('/tvshows');
    } catch (error) {
      console.error('Error saving TV show:', error);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">
        {id ? 'Edit TV Show' : 'Add New TV Show'}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="title">Title</label>
          <input
            className="form-input"
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="genre">Genre</label>
          <select
            className="form-select"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          >
            <option value="">Select a genre</option>
            <option value="Drama">Drama</option>
            <option value="Comedy">Comedy</option>
            <option value="Action">Action</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Horror">Horror</option>
            <option value="Romance">Romance</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Rating</label>
          <div className="rating-container">
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="0"
              max="10"
              step="0.5"
              className="form-input"
              required
            />
          </div>
        </div>

        <div className="form-buttons">
          <button type="submit" className="primary-button">
            {id ? 'Update' : 'Add'} Show
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={() => navigate('/tvshows')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TVShowForm; 