import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

const WordleGame = ({ data }) => {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameStatus, setGameStatus] = useState('playing'); // playing, won, lost
  const [message, setMessage] = useState('');

  const targetWord = data.targetWord;

  useEffect(() => {
    const handleKeyUp = (e) => {
      if (gameStatus !== 'playing') return;

      const key = e.key.toUpperCase();

      if (key === 'ENTER') {
        if (currentGuess.length !== WORD_LENGTH) {
          showMessage('Too short');
          return;
        }
        // In a real app, check dictionary here
        submitGuess();
      } else if (key === 'BACKSPACE') {
        setCurrentGuess(prev => prev.slice(0, -1));
      } else if (/^[A-Z]$/.test(key)) {
        if (currentGuess.length < WORD_LENGTH) {
          setCurrentGuess(prev => prev + key);
        }
      }
    };

    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [currentGuess, gameStatus]);

  const submitGuess = () => {
    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);
    setCurrentGuess('');

    if (currentGuess === targetWord) {
      setGameStatus('won');
      showMessage('Splendid!');
    } else if (newGuesses.length >= MAX_GUESSES) {
      setGameStatus('lost');
      showMessage(`The word was ${targetWord}`);
    }
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 2000);
  };

  // Helper to get color of a letter in a specific guess
  const getLetterColor = (guess, index) => {
    const letter = guess[index];
    if (!letter) return 'bg-white border-gray-300'; // Empty cell

    if (targetWord[index] === letter) return 'bg-connections-green text-white border-connections-green'; // Correct spot
    if (targetWord.includes(letter)) return 'bg-connections-yellow text-white border-connections-yellow'; // Wrong spot
    return 'bg-gray-500 text-white border-gray-500'; // Not in word
  };

  // Helper for current active row
  const getCurrentRowClass = (index) => {
    // Basic styling for active typing
    return 'bg-white border-gray-400 text-black';
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      {/* Game Grid */}
      <div className="grid gap-2 mb-8" style={{ gridTemplateRows: `repeat(${MAX_GUESSES}, 1fr)` }}>
        {[...Array(MAX_GUESSES)].map((_, rowIndex) => {
          const isSubmitted = rowIndex < guesses.length;
          const isCurrent = rowIndex === guesses.length;
          const guess = isSubmitted ? guesses[rowIndex] : (isCurrent ? currentGuess.padEnd(WORD_LENGTH, ' ') : '     ');

          return (
            <div key={rowIndex} className="grid grid-cols-5 gap-2">
              {[...Array(WORD_LENGTH)].map((_, colIndex) => {
                const letter = guess[colIndex]?.trim();
                let className = "w-full aspect-square border-2 flex items-center justify-center text-2xl font-bold rounded uppercase";
                
                if (isSubmitted) {
                  className += ` ${getLetterColor(guesses[rowIndex], colIndex)}`;
                } else if (isCurrent && letter) {
                  className += " border-gray-800 text-black animate-pulse";
                } else {
                  className += " border-gray-300";
                }

                return (
                  <motion.div 
                    key={colIndex}
                    initial={isSubmitted ? { rotateX: 0 } : false}
                    animate={isSubmitted ? { rotateX: 360 } : false}
                    transition={{ delay: colIndex * 0.1 }}
                    className={className}
                  >
                    {letter}
                  </motion.div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Message Toast */}
      {message && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-lg font-bold shadow-lg z-50">
          {message}
        </div>
      )}

      {/* On-screen Keyboard (Optional, simplified) */}
      <div className="flex justify-center mt-8">
        <p className="text-gray-500 text-sm">Type to play</p>
      </div>
    </div>
  );
};

export default WordleGame;

