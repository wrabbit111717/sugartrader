import React from 'react';
import Modal from 'react-modal';

const ConfirmModal = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirm Modal"
    >
      <h2>Are you sure?</h2>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onRequestClose}>No</button>
    </Modal>
  );
};

export default ConfirmModal;
