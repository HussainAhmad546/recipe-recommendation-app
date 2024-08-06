import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Bind modal to your appElement (root)

const DeleteConfirmationModal = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal" overlayClassName="modal-overlay">
      <h2 className="text-xl font-semibold mb-4">Are you sure you want to delete?</h2>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onRequestClose}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            onConfirm();
            onRequestClose();
          }}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
