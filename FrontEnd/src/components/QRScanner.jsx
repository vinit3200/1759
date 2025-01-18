import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

const QrScanner = ({ onScanComplete }) => {
  const [lastError, setLastError] = useState(null);

  const handleScan = (result) => {
    if (result && result.text) {
      onScanComplete(result.text); // Pass the scanned data to the parent
    }
  };

  const handleError = (error) => {
    if (error && error.message !== lastError) {
      setLastError(error.message); // Log unique errors
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
