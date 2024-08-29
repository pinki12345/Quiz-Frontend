import React, { useState } from 'react';

// Sample Modal Components
const ModalTest = ({ onClose, onContinue }) => (
  <div className="modal">
    <h2>First Modal</h2>
    <p>Update the data here.</p>
    {/* Button to close modal */}
    <button onClick={onClose}>Close</button>
    {/* Button to continue to the next modal */}
    <button onClick={onContinue}>Continue</button>
  </div>
);

const SecondModal = ({ onClose }) => (
  <div className="modal">
    <h2>Second Modal</h2>
    <p>This is the second modal, data has been updated successfully!</p>
    {/* Button to close the second modal */}
    <button onClick={onClose}>Close</button>
  </div>
);

const ModalFlow = () => {
  const [isFirstModalOpen, setFirstModalOpen] = useState(true); // Start with the first modal open
  const [isSecondModalOpen, setSecondModalOpen] = useState(false);

  const handleFirstModalClose = () => {
    setFirstModalOpen(false);
  };

  const handleFirstModalContinue = () => {
    setFirstModalOpen(false);
    setSecondModalOpen(true);
  };

  const handleSecondModalClose = () => {
    setSecondModalOpen(false);
  };

  return (
    <div>
      {isFirstModalOpen && (
        <FirstModal
          onClose={handleFirstModalClose}
          onContinue={handleFirstModalContinue}
        />
      )}
      {isSecondModalOpen && <SecondModal onClose={handleSecondModalClose} />}
    </div>
  );
};

export default ModalTest;
