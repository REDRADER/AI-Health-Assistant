// src/components/DisclaimerModal.jsx
import React from 'react';

const DisclaimerModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-gray-900 max-w-lg w-full mx-4 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Important Disclaimer</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          This AI Health Assistant provides general information for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. If you think you may have a medical emergency, call your local emergency number immediately.
        </p>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-medical-primary text-white rounded-md hover:bg-medical-secondary">I Understand</button>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerModal;


