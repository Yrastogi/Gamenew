import React from 'react';

interface HeaderProps {
  score: number;
  darkMode: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ score, darkMode, onToggleTheme }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Pattern Puzzle</h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Decode the flashing pattern
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-semibold">Score</p>
          <p className="text-2xl font-bold text-blue-500">{score}</p>
        </div>
        <button
          onClick={onToggleTheme}
          className={`p-3 rounded-lg ${
            darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'
          } shadow-md transition-colors`}
          aria-label="Toggle theme"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  );
};