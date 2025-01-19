// AddDishModal.jsx
import React, { useState } from "react";
import api from "../api"; // API for making requests

const AddDishModal = ({ onClose }) => {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", quantity: "", calories: "" }]);

  // Handle adding a new dish
  const handleAddDish = async () => {
    try {
      const newDish = { name, calories, ingredients };
      await api.post("/api/add_dish", newDish); // API request to add the new dish
      onClose(); // Close the modal after adding
    } catch (error) {
      console.error("Error adding dish", error);
    }
  };

  // Handle change in ingredients fields
  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  // Add a new ingredient to the form
  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "", calories: "" }]);
  };

  return (
    <div className="modal">
      <h3>Add New Dish</h3>
      <form onSubmit={(e) => { e.preventDefault(); handleAddDish(); }}>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Calories</label>
        <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} required />

        <label>Ingredients</label>
        {ingredients.map((ingredient, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Ingredient Name"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              value={ingredient.quantity}
              onChange={(e) => handleIngredientChange(index, "quantity", e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Calories"
              value={ingredient.calories}
              onChange={(e) => handleIngredientChange(index, "calories", e.target.value)}
              required
            />
          </div>
        ))}

        <button type="button" onClick={handleAddIngredient}>Add Ingredient</button>

        <button type="submit">Add Dish</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default AddDishModal;
