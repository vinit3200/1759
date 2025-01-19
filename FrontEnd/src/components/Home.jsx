import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QrScanner from "./QrScanner";

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
      <h1>Welcome to the QR Code Food Tracker</h1>
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
    </div>
  );
};

export default Home;
