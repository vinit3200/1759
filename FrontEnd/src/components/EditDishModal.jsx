// EditDishModal.jsx
import React, { useState, useEffect } from "react";
import api from "../api"; // API for making requests

const EditDishModal = ({ dish, onClose }) => {
  const [name, setName] = useState(dish.name);
  const [calories, setCalories] = useState(dish.calories);
  const [ingredients, setIngredients] = useState(dish.ingredients);

  // Handle updating a dish
  const handleUpdateDish = async () => {
    try {
      const updatedDish = { name, calories, ingredients };
      await api.put(`/api/update_dish/${dish._id}`, updatedDish); // API request to update the dish
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error updating dish", error);
    }
  };

  return (
    <div className="modal">
      <h3>Edit Dish</h3>
      <form onSubmit={(e) => { e.preventDefault(); handleUpdateDish(); }}>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        
        <label>Calories</label>
        <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} required />
        
        {/* Render ingredients here, for now just a simple input */}
        <label>Ingredients</label>
        <input 
          type="text" 
          value={ingredients.join(", ")} 
          onChange={(e) => setIngredients(e.target.value.split(", "))} 
          required 
        />
        
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditDishModal;
