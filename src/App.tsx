import React, { useState } from 'react';
import { Header } from './components/Header';
import { Grid } from './components/Grid';
import { Instructions } from './components/Instructions';
import { useGameLogic } from './hooks/useGameLogic';
import { LEVELS } from './utils/levels';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const {
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
  } = useGameLogic();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? 'bg-gray-900 text-white'
          : 'bg-gradient-to-br from-blue-50 to-purple-50 text-gray-900'
      }`}
    >
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header score={score} darkMode={darkMode} onToggleTheme={() => setDarkMode(!darkMode)} />

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8`}>
          {/* Intro State */}
          {gameState === 'intro' && (
            <div className="text-center">
              <div className="mb-6">
                <span
                  className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                    darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  Level {level.id} of {LEVELS.length}
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-4">{level.name}</h2>
              <p className={`text-lg mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Watch the pattern carefully for 10 seconds, then select the squares that were
                flashing.
              </p>
              <button
                onClick={startWatching}
                className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold text-lg transition-colors shadow-lg"
              >
                Start Level {level.id}
              </button>
            </div>
          )}

          {/* Watching State */}
          {gameState === 'watching' && (
            <div>
              <div className="text-center mb-6">
                <p className="text-2xl font-bold mb-2">Watch the pattern!</p>
                <p
                  className={`text-5xl font-bold ${
                    timeLeft <= 3 ? 'text-red-500' : 'text-blue-500'
                  }`}
                >
                  {timeLeft}s
                </p>
              </div>
              <Grid
                flashing={flashing}
                selected={selected}
                flashOn={flashOn}
                feedback={feedback}
                gameState={gameState}
                darkMode={darkMode}
                onToggle={toggleSquare}
              />
            </div>
          )}

          {/* Selecting State */}
          {gameState === 'selecting' && (
            <div>
              <div className="text-center mb-6">
                <p className="text-2xl font-bold mb-2">Select the flashing squares</p>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Click the squares you think were flashing
                </p>
                <p className="mt-2 text-sm font-semibold">Selected: {selected.size} squares</p>
              </div>
              <Grid
                flashing={flashing}
                selected={selected}
                flashOn={flashOn}
                feedback={feedback}
                gameState={gameState}
                darkMode={darkMode}
                onToggle={toggleSquare}
              />
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => toggleSquare(-1)}
                  className={`px-6 py-3 ${
                    darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'
                  } rounded-lg font-semibold transition-colors`}
                >
                  Clear Selection
                </button>
                <button
                  onClick={submitAnswer}
                  disabled={selected.size === 0}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    selected.size === 0
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  Submit Answer
                </button>
              </div>
            </div>
          )}

          {/* Feedback State */}
          {gameState === 'feedback' && (
            <div>
              <div className="text-center mb-6">
                {feedback.wrong.length === 0 && feedback.missed.length === 0 ? (
                  <>
                    <p className="text-4xl mb-4">🎉</p>
                    <p className="text-3xl font-bold text-green-500 mb-2">Perfect!</p>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>+100 points</p>
                  </>
                ) : (
                  <>
                    <p className="text-4xl mb-4">❌</p>
                    <p className="text-3xl font-bold text-red-500 mb-2">Not quite right</p>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                      {feedback.correct.length} correct, {feedback.wrong.length} wrong,{' '}
                      {feedback.missed.length} missed
                    </p>
                  </>
                )}
              </div>

              <Grid
                flashing={flashing}
                selected={selected}
                flashOn={flashOn}
                feedback={feedback}
                gameState={gameState}
                darkMode={darkMode}
                onToggle={toggleSquare}
              />

              <div className={`my-6 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="flex items-center gap-4 flex-wrap justify-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span>Correct</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span>Wrong</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span>Missed</span>
                  </div>
                </div>
              </div>

              {(feedback.wrong.length > 0 || feedback.missed.length > 0) && (
                <div className="text-center mb-6">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className={`px-4 py-2 ${
                      darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                    } rounded-lg text-sm font-semibold transition-colors`}
                  >
                    {showHint ? 'Hide' : 'Show'} Hint
                  </button>
                  {showHint && (
                    <p className={`mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'} italic`}>
                      {level.description}
                    </p>
                  )}
                </div>
              )}

              <div className="flex justify-center gap-4">
                {feedback.wrong.length > 0 || feedback.missed.length > 0 ? (
                  <>
                    <button
                      onClick={retryLevel}
                      className={`px-6 py-3 ${
                        darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'
                      } rounded-lg font-semibold transition-colors`}
                    >
                      Retry Level
                    </button>
                    <button
                      onClick={nextLevel}
                      className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
                    >
                      Skip to Next Level
                    </button>
                  </>
                ) : (
                  <button
                    onClick={nextLevel}
                    className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold text-lg transition-colors shadow-lg"
                  >
                    {currentLevel < LEVELS.length - 1 ? 'Next Level' : 'Complete Game'}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Complete State */}
          {gameState === 'complete' && (
            <div className="text-center">
              <p className="text-6xl mb-4">🏆</p>
              <h2 className="text-4xl font-bold mb-4">Congratulations!</h2>
              <p className={`text-xl mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                You've completed all levels!
              </p>
              <p className="text-3xl font-bold text-blue-500 mb-8">Final Score: {score}</p>
              <button
                onClick={resetGame}
                className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold text-lg transition-colors shadow-lg"
              >
                Play Again
              </button>
            </div>
          )}
        </div>

        <Instructions darkMode={darkMode} />
      </div>
    </div>
  );
};

export default App;