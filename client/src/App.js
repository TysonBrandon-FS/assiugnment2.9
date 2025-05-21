import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TVShowList from './pages/TVShowList';
import TVShowForm from './pages/TVShowForm';
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
