import React from 'react';
import './StatCard.css';

const StatCard = ({ angka, teks }) => {
  return (
    <div className="stat-card">
      <h2>{angka}</h2>
      <p>{teks}</p>
    </div>
  );
};

export default StatCard;