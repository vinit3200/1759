// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import AdminPanel from "./components/AdminPanel";
import DishPage from "./components/DishPage";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage"; // Import the LoginPage component
import AddDishModal from "./components/AddDishModal";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} /> {/* Login route */}
          <Route path="/add-sih" element={<AddDishModal />} /> {/* Login route */}
          <Route path="/admin" element={<AdminPanel />} /> {/* Admin Panel route */}
          <Route path="/dish/:id" element={<DishPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
