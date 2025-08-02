// src/components/Forecast.jsx
import React, { useState, useEffect } from 'react';

const Forecast = () => {
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await fetch(
          'https://api.openweathermap.org/data/2.5/forecast?q=Los Angeles,US&units=imperial&appid=06f2906b72bbe88e416d645201b05de2'
        );
        const data = await response.json();

        // Extract one forecast per day (every 24 hours)
        const dailyData = data.list.filter((reading, index) => index % 8 === 0).map((reading) => ({
          date: new Date(reading.dt_txt).toLocaleDateString(),
          temp: `${reading.main.temp.toFixed(1)}°F`,
          humidity: `${reading.main.humidity}%`,
          wind: `${reading.wind.speed.toFixed(2)} mph`,
        }));

        setForecastData(dailyData);
      } catch (error) {
        console.error('Error fetching forecast:', error);
      }
    };

    fetchForecast();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📅 5-Day Forecast - Los Angeles</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp</th>
            <th>Humidity</th>
            <th>Wind</th>
          </tr>
        </thead>
        <tbody>
          {forecastData.map((day, index) => (
            <tr key={index}>
              <td>{day.date}</td>
              <td>{day.temp}</td>
              <td>{day.humidity}</td>
              <td>{day.wind}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Forecast;
