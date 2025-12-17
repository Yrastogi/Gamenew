import React from 'react';
import { Square } from './Square';
import { GameState, Feedback } from '../types/index';

interface GridProps {
  flashing: Set<number>;
  selected: Set<number>;
  flashOn: boolean;
  feedback: Feedback;
  gameState: GameState;
  darkMode: boolean;
  onToggle: (index: number) => void;
}

export const Grid: React.FC<GridProps> = ({
  flashing,
  selected,
  flashOn,
  feedback,
  gameState,
  darkMode,
  onToggle,
}) => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: 25 }, (_, i) => (
          <Square
            key={i}
            index={i}
            isFlashing={flashing.has(i) && flashOn}
            isSelected={selected.has(i)}
            feedback={feedback}
            gameState={gameState}
            darkMode={darkMode}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
};