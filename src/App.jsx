import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import Radar from './components/RadarMap'; // ✅ updated import
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.className = darkMode ? 'light' : 'dark';
  };

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>☀️ So Cal Weather App</h1>
          <button className="theme-toggle" onClick={toggleTheme}>
            {darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </header>

        <nav className="app-nav">
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
            🌡️ Current
          </NavLink>
          <NavLink to="/forecast" className={({ isActive }) => isActive ? 'active' : ''}>
            📅 Forecast
          </NavLink>
          <NavLink to="/radar" className={({ isActive }) => isActive ? 'active' : ''}>
            🗺️ Radar
          </NavLink>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<CurrentWeather />} />
            <Route path="/forecast" element={<Forecast />} />
            <Route path="/radar" element={<Radar />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;


