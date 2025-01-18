import React, { useState } from 'react';

const DishCard = ({ dishData }) => {
  const [items, setItems] = useState(dishData.items);

  const handleQuantityChange = (itemName, change) => {
    const updatedItems = items.map((item) => {
      if (item.name === itemName) {
        return { ...item, quantity: item.quantity + change };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const calculateCalories = () => {
    return items.reduce((total, item) => total + item.quantity * item.calories, 0);
  };

  return (
    <div>
      <h2>{dishData.dishName}</h2>
      {items.map((item, index) => (
        <div key={index}>
          <div>
            <span>{item.name}</span>
            <span>
              {item.quantity} x {item.calories} cal = {item.quantity * item.calories} cal
            </span>
          </div>
          <button onClick={() => handleQuantityChange(item.name, 1)}>+</button>
          <button onClick={() => handleQuantityChange(item.name, -1)}>-</button>
        </div>
      ))}
      <h3>Total Calories: {calculateCalories()} cal</h3>
    </div>
  );
};

export default DishCard;
