// src/components/LoadingIndicator.jsx
import React from 'react';

const LoadingIndicator = () => {
  return (
    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
      <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-600 border-t-medical-primary rounded-full animate-spin" />
      <span>Thinking...</span>
    </div>
  );
};

export default LoadingIndicator;


