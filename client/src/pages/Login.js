import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post('/api/auth/login', { username, password });
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        alert('Logged in!');
        if (onLogin) onLogin();
        navigate('/protected');
      } else {
        setMessage('Error');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: '2rem auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
        </div>
        <div>
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
} 