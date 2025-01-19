import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api"; // Axios instance
import "./DishPage.css"; // Custom CSS for styling

const DishPage = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [dishData, setDishData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchDishData = async () => {
      try {
        const response = await api.get(`/api/dishes/${id}`);
        setDishData(response.data);
        setIngredients(
          response.data.ingredients.map((ingredient) => ({
            ...ingredient,
            selectedQuantity: ingredient.quantity, // Set initial quantity
          }))
        );
        setLoading(false);
      } catch (err) {
        setError("Failed to load dish details. Please try again.");
        setLoading(false);
      }
    };

    fetchDishData();
  }, [id]);

  const handleSliderChange = (index, newQuantity) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient, i) =>
        i === index ? { ...ingredient, selectedQuantity: newQuantity } : ingredient
      )
    );
  };

  const calculateTotalCalories = () => {
    return ingredients.reduce(
      (total, ingredient) => total + ingredient.calories * ingredient.selectedQuantity,
      0
    );
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  const { name, description } = dishData;
  

  return (
    <div className="dish-page">
      <div className="imgcont">

      <img className="dishImage" src="data:image/webp;base64,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" alt="" />
      </div>
      <div className="dish-header">
        <h1>{name}</h1>
        <p className="dish-description">{description}</p>
      </div>

      <div className="dish-details">
        <div className="calories-overview">
          <h2>Total Calories</h2>
          <p className="calories">{calculateTotalCalories()} kcal</p>
        </div>

        <div className="ingredients-section">
          <h2>Ingredients</h2>
          {ingredients.map((ingredient, index) => (
            <div key={ingredient._id} className="ingredient-item">
              <div className="ingredient-info">
                <span className="ingredient-name">{ingredient.name}</span>
                <span className="ingredient-calories">
                  {ingredient.calories * ingredient.selectedQuantity} kcal
                </span>
              </div>
              <div className="slider-container">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={ingredient.selectedQuantity}
                  onChange={(e) => handleSliderChange(index, parseInt(e.target.value))}
                />
                <span className="slider-quantity">{ingredient.selectedQuantity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DishPage;
