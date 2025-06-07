import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProtectedContent() {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProtected = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('/api/auth/protected', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessage(res.data.message);
        setUser(res.data.user);
      } catch (err) {
        setMessage(err.response?.data?.message || 'Unauthorized');
      }
    };
    fetchProtected();
  }, []);

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Protected Content</h2>
      <p>{message}</p>
      {user && <pre>{JSON.stringify(user, null, 2)}</pre>}
    </div>
  );
} 