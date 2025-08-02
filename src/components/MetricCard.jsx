import React from 'react';
import './MetricCard.css';

const MetricCard = ({ title, value, icon }) => {
  return (
    <div className="metric-card">
      <div className="metric-icon">{icon}</div>
      <div className="metric-content">
        <h4>{title}</h4>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default MetricCard;
