// src/TripCalculator.js

import React, { useState } from 'react';
import axios from 'axios';
import './TripCalculator.css';

const TripCalculator = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [tripCost, setTripCost] = useState(null);

  const calculateTripCost = async () => {
    try {
      // Replace 'YOUR_TOLLGURU_API_KEY' with your actual TollGuru API key
      const apiKey = 'https://apis.tollguru.com/toll/v2/gps-tracks-csv-upload';
      const apiUrl = `https://dev.tollguru.com/v1/calc/shortest_route/driving?orig=${origin}&dest=${destination}&api_key=${apiKey}`;

      const response = await axios.get(apiUrl);
      const cost = response.data.summary.totalCost;
      setTripCost(cost);
    } catch (error) {
      console.error('Error calculating trip cost:', error.message);
    }
  };

  return (
    <div className="trip-calculator">
      <h1>Advanced Trip Calculator</h1>
      <div>
        <label>
          Origin:
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Destination:
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </label>
      </div>
      <button onClick={calculateTripCost}>Calculate Trip Cost</button>
      {tripCost !== null && (
        <div className="result">
          <p>Trip Cost: ${tripCost}</p>
        </div>
      )}
    </div>
  );
};

export default TripCalculator;
