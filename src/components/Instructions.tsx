import React from 'react';
import { LEVELS } from '../utils/levels';

interface InstructionsProps {
  darkMode: boolean;
}

export const Instructions: React.FC<InstructionsProps> = ({ darkMode }) => {
  return (
    <div
      className={`mt-8 p-6 rounded-xl ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-lg`}
    >
      <h3 className="text-xl font-bold mb-3">How to Play</h3>
      <ol
        className={`list-decimal list-inside space-y-2 ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}
      >
        <li>Watch the 5×5 grid as certain squares flash on and off for 10 seconds</li>
        <li>Memorize which squares were flashing</li>
        <li>After the timer ends, click to select the squares you think were flashing</li>
        <li>Submit your answer to see how you did</li>
        <li>Complete all {LEVELS.length} levels to win!</li>
      </ol>
    </div>
  );
};