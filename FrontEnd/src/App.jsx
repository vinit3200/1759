import React, { useState } from 'react';
import QRScanner from './components/QRScanner';
import DishCard from './components/DishCard';
import './App.css';

const App = () => {
  const [dishData, setDishData] = useState(null);

  // Handle the QR scan result
  const handleQRScan = (data) => {
    try {
      const parsedData = JSON.parse(data);
      fetchItemCalories(parsedData);  // Fetch item calorie data from the server
    } catch (error) {
      console.error('Invalid QR Code', error);
    }
  };

  // Fetch calorie data for the scanned dish items
  const fetchItemCalories = async (data) => {
    try {
      // You can replace this mock data with an actual API call to your backend
      const items = [
        { name: 'Idli', calories: 100 },
        { name: 'Vada', calories: 200 },
        { name: 'Sambhar', calories: 120 },
        { name: 'Chutney', calories: 80 }
      ];

      const updatedItems = data.items.map((item) => {
        const calorieItem = items.find((i) => i.name === item.name);
        return { ...item, calories: calorieItem ? calorieItem.calories : 0 };
      });

      setDishData({ ...data, items: updatedItems });
    } catch (err) {
      console.error('Failed to fetch item data:', err);
    }
  };

  return (
    <div className="App">
      <h1>QR Code Calorie Counter</h1>

      {/* Show QR scanner if dish data is not available */}
      {!dishData ? (
        <QRScanner onScan={handleQRScan} />
      ) : (
        <DishCard dishData={dishData} />
      )}
    </div>
  );
};

export default App;
