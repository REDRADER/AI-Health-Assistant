// src/components/Header.jsx
import React from 'react';
import reactLogo from '../assets/react.svg';

const Header = ({ onShowDisclaimer, theme = 'system', onToggleTheme }) => {
  const themeLabel = theme === 'system' ? 'System' : theme === 'dark' ? 'Dark' : 'Light';
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={reactLogo} className="h-8 w-8" alt="Logo" />
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">AI Health Assistant</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Educational use only. Not medical advice.</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href="https://www.who.int/"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-medical-secondary hover:text-medical-primary"
          >
            WHO
          </a>
          <button
            onClick={onToggleTheme}
            className="px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
            title="Toggle theme"
          >
            {themeLabel}
          </button>
          <button
            onClick={onShowDisclaimer}
            className="px-3 py-1.5 text-sm bg-medical-primary text-white rounded-md hover:bg-medical-secondary"
          >
            Disclaimer
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;


