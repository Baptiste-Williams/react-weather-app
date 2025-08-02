// src/components/Radar.jsx
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Radar = () => {
  const position = [34.0522, -118.2437]; // Los Angeles coordinates
  const zoomLevel = 10;
  const apiKey = '06f2906b72bbe88e416d645201b05de2';

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer center={position} zoom={zoomLevel} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`}
          attribution='Map data © OpenTopoMap contributors, Radar © OpenWeatherMap'
        />
      </MapContainer>
    </div>
  );
};

export default Radar;
