import React, { useEffect, useState } from 'react';

const CurrentWeather = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('Los Angeles');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const API_KEY = '06f2906b72bbe88e416d645201b05de2';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${API_KEY}`
        );
        const result = await response.json();
        if (result.cod === 200) {
          setData(result);
          setError(false);
        } else {
          setError(true);
        }
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  const getEmoji = (desc) => {
    const d = desc.toLowerCase();
    if (d.includes('clear')) return '☀️';
    if (d.includes('cloud')) return '☁️';
    if (d.includes('rain')) return '🌧️';
    if (d.includes('storm')) return '⛈️';
    if (d.includes('snow')) return '❄️';
    if (d.includes('mist') || d.includes('fog')) return '🌫️';
    return '🌡️';
  };

  return (
    <section>
      <h2>🌡️ Current Weather</h2>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Enter city"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ padding: '0.5rem', marginRight: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <button onClick={() => setLocation(location)} style={{ padding: '0.5rem 1rem', borderRadius: '6px', backgroundColor: '#646cff', color: 'white', border: 'none' }}>
          Search
        </button>
      </div>

      {loading ? (
        <p>Loading current weather...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>⚠️ Unable to fetch weather data. Check city name or try again.</p>
      ) : (
        <div
          style={{
            border: '2px solid #646cff',
            borderRadius: '12px',
            padding: '1rem',
            backgroundColor: 'rgba(255,255,255,0.05)',
            textAlign: 'center',
            boxShadow: '0 0 10px rgba(0,0,0,0.2)',
            maxWidth: '300px',
            margin: '0 auto'
          }}
        >
          <p style={{ fontSize: '2rem' }}>{getEmoji(data.weather[0].description)}</p>
          <p><strong>{data.name}</strong></p>
          <p>{data.weather[0].description}</p>
          <p>🌡️ Temp: {data.main.temp}°F</p>
          <p>💧 Humidity: {data.main.humidity}%</p>
          <p>🌬️ Wind: {data.wind.speed} mph</p>
        </div>
      )}
    </section>
  );
};

export default CurrentWeather;
