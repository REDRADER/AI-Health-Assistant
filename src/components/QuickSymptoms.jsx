// src/components/QuickSymptoms.jsx
import React from 'react';

const commonSymptoms = [
  'Fever and chills',
  'Cough and sore throat',
  'Headache and dizziness',
  'Stomach pain and nausea',
  'Shortness of breath',
  'Rash or skin irritation',
  'Muscle aches',
  'Fatigue and malaise',
];

const QuickSymptoms = ({ onSymptomClick }) => {
  return (
    <aside className="hidden md:block w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
      <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Quick symptoms</h2>
      <div className="grid grid-cols-1 gap-2">
        {commonSymptoms.map((s) => (
          <button
            key={s}
            onClick={() => onSymptomClick(s)}
            className="text-left text-sm px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/80"
          >
            {s}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default QuickSymptoms;


