// DishList.jsx
import React, { useState, useEffect } from "react";
import api from "../api"; // Assuming you have a centralized Axios instance
import { useNavigate } from "react-router-dom";
import AddDishModal from "./AddDishModal";

const DishList = () => {
  const [dishes, setDishes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await api.get("/api/dishes");
        setDishes(response.data);
      } catch (error) {
        console.error("Error fetching dishes", error);
      }
    };
    fetchDishes();
  }, []);

  const deleteDish = async (id) => {
    try {
      await api.delete(`/api/dishes/${id}`);
      setDishes(dishes.filter(dish => dish._id !== id));
    } catch (error) {
      console.error("Error deleting dish", error);
    }
  };

  const editDish = (id) => {
    navigate(`/admin/dishes/edit/${id}`);
  };

  return (
    <div className="dish-list-container">
      <h2>Dishes</h2>
      <button onClick={() => setShowModal(true)}>Add Dish</button>
      
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Calories</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dishes.map(dish => (
            <tr key={dish._id}>
              <td>{dish.name}</td>
              <td>{dish.calories}</td>
              <td>
                <button onClick={() => editDish(dish._id)}>Edit</button>
                <button onClick={() => deleteDish(dish._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && <AddDishModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default DishList;
