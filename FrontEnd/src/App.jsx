import React, { useState } from "react";
import QrScanner from "./components/QRScanner";


const App = () => {
  const [isScannerActive, setIsScannerActive] = useState(false); // Controls scanner visibility
  const [scannedData, setScannedData] = useState(""); // Stores scanned data

  const handleScannedData = (data) => {
    setScannedData(data); // Update parent state with scanned data
    setIsScannerActive(false); // Close the scanner
  };

  return (
    <div>
      <h1>QR Code Scanner App</h1>
      {scannedData && (
        <div>
          <h2>Scanned Data:</h2>
          <p>{scannedData}</p>
        </div>
      )}
      {isScannerActive && (
        <QrScanner onScanComplete={handleScannedData} />
      )}
      <button
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          fontSize: "20px",
          cursor: "pointer",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
        onClick={() => setIsScannerActive(true)}
      >
        Scan
      </button>
    </div>
  );
};

export default App;
