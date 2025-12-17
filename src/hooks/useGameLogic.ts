import { useState, useEffect, useCallback } from 'react';
import { GameState, Feedback } from '../types/index';
import { LEVELS } from '../utils/levels';

export const useGameLogic = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [gameState, setGameState] = useState<GameState>('intro');
  const [flashing, setFlashing] = useState<Set<number>>(new Set());
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [flashOn, setFlashOn] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>({
    correct: [],
    wrong: [],
    missed: [],
  });
  const [showHint, setShowHint] = useState(false);

  const level = LEVELS[currentLevel];

  // Calculate correct squares based on current level rule
  const getCorrectSquares = useCallback((): Set<number> => {
    const correct = new Set<number>();
    for (let i = 0; i < 25; i++) {
      if (level.rule(i)) {
        correct.add(i);
      }
    }
    return correct;
  }, [level]);

  // Start watching phase
  const startWatching = () => {
    setGameState('watching');
    setSelected(new Set());
    setFlashing(getCorrectSquares());
    setTimeLeft(10);
    setShowHint(false);
  };

  // Flash animation during watching phase
  useEffect(() => {
    if (gameState === 'watching') {
      const flashInterval = setInterval(() => {
        setFlashOn((prev) => !prev);
      }, 500);
      return () => clearInterval(flashInterval);
    } else {
      setFlashOn(false);
    }
  }, [gameState]);

  // Countdown timer
  useEffect(() => {
    if (gameState === 'watching' && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (gameState === 'watching' && timeLeft === 0) {
      setGameState('selecting');
      setFlashing(new Set());
    }
  }, [gameState, timeLeft]);

  // Toggle square selection
  const toggleSquare = (index: number) => {
    if (gameState !== 'selecting') return;
    setSelected((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(index)) {
        newSelected.delete(index);
      } else {
        newSelected.add(index);
      }
      return newSelected;
    });
  };

  // Submit answer
  const submitAnswer = () => {
    const correct = getCorrectSquares();
    const correctPicks: number[] = [];
    const wrongPicks: number[] = [];
    const missedSquares: number[] = [];

    selected.forEach((index) => {
      if (correct.has(index)) {
        correctPicks.push(index);
      } else {
        wrongPicks.push(index);
      }
    });

    correct.forEach((index) => {
      if (!selected.has(index)) {
        missedSquares.push(index);
      }
    });

    setFeedback({ correct: correctPicks, wrong: wrongPicks, missed: missedSquares });

    if (wrongPicks.length === 0 && missedSquares.length === 0) {
      setScore((prev) => prev + 100);
    }
    setGameState('feedback');
  };

  // Next level
  const nextLevel = () => {
    if (currentLevel < LEVELS.length - 1) {
      setCurrentLevel((prev) => prev + 1);
      setGameState('intro');
      setFeedback({ correct: [], wrong: [], missed: [] });
    } else {
      setGameState('complete');
    }
  };

  // Retry level
  const retryLevel = () => {
    setGameState('intro');
    setFeedback({ correct: [], wrong: [], missed: [] });
  };

  // Reset game
  const resetGame = () => {
    setCurrentLevel(0);
    setGameState('intro');
    setScore(0);
    setSelected(new Set());
    setFeedback({ correct: [], wrong: [], missed: [] });
  };

  return {
    currentLevel,
    level,
    gameState,
    flashing,
    selected,
    flashOn,
    timeLeft,
    score,
    feedback,
    showHint,
    setShowHint,
    startWatching,
    toggleSquare,
    submitAnswer,
    nextLevel,
    retryLevel,
    resetGame,
  };
};