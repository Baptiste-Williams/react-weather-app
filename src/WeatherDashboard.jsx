import React, { useEffect, useState } from 'react';
import './WeatherDashboard.css';
import MetricCard from './MetricCard';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [city, setCity] = useState('Los Angeles');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const getCoordinates = async (cityName) => {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
    );
    const data = await response.json();
    if (!data || data.length === 0) {
      setCity('Los Angeles');
      throw new Error(`City "${cityName}" not found. Defaulting to Los Angeles.`);
    }
    return { lat: data[0].lat, lon: data[0].lon };
  };

  const fetchWeather = async () => {
    setLoading(true);
    setError('');
    try {
      const { lat, lon } = await getCoordinates(city);

      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely&appid=${apiKey}`
      );
      if (!weatherRes.ok) throw new Error('Weather API failed');
      const weather = await weatherRes.json();

      const airRes = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
      const air = await airRes.json();

      setWeatherData(weather);
      setAirQuality(air?.list?.[0] || null);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setAirQuality(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  const formatTime = (ts) =>
    new Date(ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`weather-dashboard ${darkMode ? 'dark' : ''}`}>
      <header>
        <h1>🌦️ Weather Dashboard</h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>

      <div className="search-section">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {loading && <div className="spinner">🔄 Loading...</div>}
      {error && <div className="error-message">❌ {error}</div>}

      {weatherData?.current && (
        <div className="weather-info">
          <h2>{city}</h2>
          <div className="metrics-section">
            <MetricCard title="Temperature" value={`${Math.round(weatherData.current.temp)}°F`} icon="🌡️" />
            <MetricCard title="Humidity" value={`${weatherData.current.humidity}%`} icon="💧" />
            <MetricCard title="Visibility" value={`${weatherData.current.visibility / 1000} km`} icon="🌫️" />
            <MetricCard title="UV Index" value={weatherData.current.uvi} icon="☀️" />
            <MetricCard title="Wind Speed" value={`${weatherData.current.wind_speed} mph`} icon="🌬️" />
            <MetricCard title="Wind Angle" value={`${weatherData.current.wind_deg}°`} icon="🧭" />
            <MetricCard title="Sunrise" value={formatTime(weatherData.current.sunrise)} icon="🌅" />
            <MetricCard title="Sunset" value={formatTime(weatherData.current.sunset)} icon="🌇" />
          </div>

          {airQuality && (
            <div className="air-quality">
              <h3>Air Quality</h3>
              <p>PM2.5: {airQuality.components.pm2_5} μg/m³</p>
              <p>PM10: {airQuality.components.pm10} μg/m³</p>
              <p>CO: {airQuality.components.co} μg/m³</p>
              <p>O₃: {airQuality.components.o3} μg/m³</p>
              <p>Main pollutant index: {airQuality.main.aqi}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
