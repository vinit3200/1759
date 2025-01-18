import React, { useState, useEffect, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

const QRScanner = ({ onScan }) => {
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const codeReader = useRef(new BrowserMultiFormatReader());

  useEffect(() => {
    const startScanning = async () => {
      try {
        const videoInputDevices = await codeReader.current.listVideoInputDevices();
        const selectedDeviceId = videoInputDevices[0].deviceId;
        codeReader.current.decodeFromVideoDevice(selectedDeviceId, videoRef.current, (result, err) => {
          if (result) onScan(result.getText());
          if (err) setError(err);
        });
      } catch (err) {
        setError('Error starting scanner');
      }
    };
    startScanning();
    return () => { codeReader.current.reset(); };
  }, [onScan]);

  return (
    <div>
      <video ref={videoRef} width="100%" />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default QRScanner;
