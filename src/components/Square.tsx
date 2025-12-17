import React from 'react';
import { GameState, Feedback } from '../types/index';

interface SquareProps {
  index: number;
  isFlashing: boolean;
  isSelected: boolean;
  feedback: Feedback;
  gameState: GameState;
  darkMode: boolean;
  onToggle: (index: number) => void;
}

export const Square: React.FC<SquareProps> = ({
  index,
  isFlashing,
  isSelected,
  feedback,
  gameState,
  darkMode,
  onToggle,
}) => {
  const isCorrect = feedback.correct.includes(index);
  const isWrong = feedback.wrong.includes(index);
  const isMissed = feedback.missed.includes(index);

  let bgColor = darkMode ? 'bg-gray-700' : 'bg-gray-200';
  let borderColor = 'border-gray-400';

  if (gameState === 'watching' && isFlashing) {
    bgColor = 'bg-blue-500';
  } else if (gameState === 'selecting' && isSelected) {
    bgColor = darkMode ? 'bg-blue-600' : 'bg-blue-400';
  } else if (gameState === 'feedback') {
    if (isCorrect) {
      bgColor = 'bg-green-500';
    } else if (isWrong) {
      bgColor = 'bg-red-500';
    } else if (isMissed) {
      bgColor = 'bg-yellow-500';
    }
  }

  return (
    <button
      onClick={() => onToggle(index)}
      disabled={gameState !== 'selecting'}
      className={`
        w-16 h-16 rounded-lg border-2 transition-all duration-200
        ${bgColor} ${borderColor}
        ${gameState === 'selecting' ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}
        ${isFlashing ? 'shadow-lg' : ''}
      `}
      aria-label={`Square ${index}`}
    />
  );
};