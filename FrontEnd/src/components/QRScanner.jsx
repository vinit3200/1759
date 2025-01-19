import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";

const QrScanner = ({ onDataStore, onClose }) => {
  const [lastError, setLastError] = useState(null);
  const [isScanning, setIsScanning] = useState(true); // Flag to manage scanning state

  // Cleanup the scanner when the component is unmounted
  useEffect(() => {
    return () => {
      setIsScanning(false); // Stop scanning when component is unmounted
    };
  }, []);

  const handleScan = (result) => {
    if (isScanning && result?.text) {
      setIsScanning(false); // Stop scanning after the first result
      onDataStore(result.text); // Store scanned data in parent
      onClose(); // Close the scanner after a successful scan
    }
  };

  const handleError = (error) => {
    if (error && error.message !== lastError) {
      setLastError(error.message);
      console.warn("QR Scanner Error:", error.message);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div style={{ width: "90%", maxWidth: "400px", borderRadius: "8px", overflow: "hidden" }}>
        {lastError && (
          <div
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              color: "white",
              backgroundColor: "red",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            Error: {lastError}
          </div>
        )}
        <QrReader
          onResult={(result, error) => {
            if (result) handleScan(result);
            if (error) handleError(error);
          }}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
};

export default QrScanner;
