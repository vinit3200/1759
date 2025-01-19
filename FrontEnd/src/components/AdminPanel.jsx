import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // Assume you have an api.js file for API calls
import EditDishModal from "./EditDishModal"; // Modal for editing dishes
import DeleteConfirmationModal from "./DeleteConfirmationModal"; // Modal for delete confirmation
import AddDishModal from "./AddDishModal"; // Modal for adding a new dish

const AdminPanel = () => {
  const [dishes, setDishes] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null); // To store selected dish for edit/delete
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddDishModal, setShowAddDishModal] = useState(false); // New state for Add Dish modal
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // Clear authentication data
    navigate("/login"); // Redirect to login page
  };

  // Fetch dishes from API
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login if not authenticated
    } else {
      const fetchDishes = async () => {
        try {
          const response = await api.get("/api/dishes");
          setDishes(response.data);
        } catch (error) {
          console.error("Error fetching dishes", error);
        }
      };

      fetchDishes();
    }
  }, [navigate]);

  // Handle delete dish action
  const handleDeleteDish = async () => {
    try {
      await api.delete(`/api/delete_dish/${selectedDish._id}`);
      setDishes(dishes.filter(dish => dish._id !== selectedDish._id)); // Remove the deleted dish from the state
      setShowDeleteModal(false); // Close the delete confirmation modal
    } catch (error) {
      console.error("Error deleting dish", error);
    }
  };

  // Handle edit dish action
  const handleEditDish = async (dish) => {
    setSelectedDish(dish); // Set the dish to be edited
    setShowEditModal(true); // Open the edit modal
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <button onClick={() => setShowAddDishModal(true)}>Add New Dish</button>
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
                <button onClick={() => handleEditDish(dish)}>Edit</button>
                <button onClick={() => { setSelectedDish(dish); setShowDeleteModal(true); }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show modals */}
      {showEditModal && <EditDishModal dish={selectedDish} onClose={() => setShowEditModal(false)} />}
      {showDeleteModal && <DeleteConfirmationModal onConfirm={handleDeleteDish} onClose={() => setShowDeleteModal(false)} />}
      {showAddDishModal && <AddDishModal onClose={() => setShowAddDishModal(false)} />}
      <button style={{background:"red"}}  onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminPanel;
