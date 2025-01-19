// DeleteConfirmationModal.jsx
import React from "react";

const DeleteConfirmationModal = ({ onConfirm, onClose }) => {
  return (
    <div className="modal">
      <h3>Are you sure you want to delete this dish?</h3>
      <button onClick={onConfirm}>Yes, Delete</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default DeleteConfirmationModal;
