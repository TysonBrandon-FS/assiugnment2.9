import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TVShowList from './pages/TVShowList';
import TVShowForm from './pages/TVShowForm';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedContent from './pages/ProtectedContent';
import './styles/style.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tvshows" element={<TVShowList />} />
          <Route path="/tvshows/new" element={<TVShowForm />} />
          <Route path="/tvshows/edit/:id" element={<TVShowForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/protected" element={<ProtectedContent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
