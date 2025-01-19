import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QrScanner from "./QrScanner";
import "./Home.css";

const Home = () => {
  const [isScannerActive, setIsScannerActive] = useState(false);
  const [scannedData, setScannedData] = useState(null); // Store the scanned data
  const navigate = useNavigate();

  const handleScanDataStore = (data) => {
    setScannedData(data); // Store the scanned data in the state
  };

  const closeScanner = () => {
    setIsScannerActive(false); // Close the scanner manually if needed
  };

  // Check if the scanned data has an id and redirect to the dish page
  useEffect(() => {
    if (scannedData) {
      const dishId = scannedData; // Assuming the scanned data is the dish ID
      if (dishId) {
        navigate(`/dish/${dishId}`); // Redirect to the dish page
        setScannedData(null); // Clear the stored data after redirection
      }
    }
  }, [scannedData, navigate]);

  return (
    <div className="home-container">
      <h1>Track Your Calories, Achieve Your Health Goals!</h1>
      <button className="scan-button" onClick={() => setIsScannerActive(true)}>
        Start Scanning
      </button>

      {/* Conditionally render the QR scanner as a modal */}
      {isScannerActive && (
        <QrScanner
          onDataStore={handleScanDataStore} // Pass the function to store data
          onClose={closeScanner} // Pass close function to the scanner
        />
      )}

      {/* Flex Data Section */}
      <div className="flex-section">
        <div className="flex-card">
          <h3>Precise Recognition of Food</h3>
          <p>
            Food AI API utilizes highly trained models that are not only able to
            recognize a variety of dishes but have the granularity to
            differentiate between different presentation styles, preparation
            methods, and regional variations.
          </p>
        </div>
        <div className="flex-card">
          <h3>Perpetually Evolving Food Identification</h3>
          <p>
            Food AI API is developed with the latest in machine learning
            techniques. With every photo, we are able to continuously improve
            the accuracy of the Food AI API by immediately piping those photos
            into our training sets.
          </p>
        </div>
        <div className="flex-card">
          <h3>Highly Diverse Food Database</h3>
          <p>
            Our database encompasses many regional and ethnic specialty food
            items. Never before has it been possible to receive analysis on
            such a wide selection of foods.
          </p>
        </div>
        <div className="flex-card">
          <h3>Rapid Analysis</h3>
          <p>
            Within a second, a photo can become a highly detailed food profile
            complete with nutrition information and soon even more.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
