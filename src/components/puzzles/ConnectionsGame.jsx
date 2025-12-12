import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Utility to shuffle array
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const ConnectionsGame = ({ puzzle, onComplete }) => {
  const [words, setWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [solvedGroups, setSolvedGroups] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing'); // playing, won, lost
  const [feedback, setFeedback] = useState('');

  // Initialize game
  useEffect(() => {
    if (puzzle) {
      const allWords = puzzle.groups.flatMap(group => 
        group.words.map(word => ({ word, group: group.name, color: group.color }))
      );
      setWords(shuffleArray(allWords));
      setSolvedGroups([]);
      setMistakes(0);
      setGameStatus('playing');
      setSelectedWords([]);
    }
  }, [puzzle]);

  const handleWordClick = (wordObj) => {
    if (gameStatus !== 'playing') return;
    
    const isSelected = selectedWords.some(w => w.word === wordObj.word);
    
    if (isSelected) {
      setSelectedWords(prev => prev.filter(w => w.word !== wordObj.word));
    } else {
      if (selectedWords.length < 4) {
        setSelectedWords(prev => [...prev, wordObj]);
      }
    }
  };

  const handleSubmit = () => {
    if (selectedWords.length !== 4) return;

    // Check if words match any group
    // In this simplified version, we check if all selected words belong to the SAME group name
    const firstGroup = selectedWords[0].group;
    const isMatch = selectedWords.every(w => w.group === firstGroup);

    if (isMatch) {
      // Find the full group object from puzzle data
      const groupData = puzzle.groups.find(g => g.name === firstGroup);
      
      // Add to solved
      setSolvedGroups(prev => [...prev, groupData]);
      
      // Remove from active words
      const solvedWordStrings = selectedWords.map(w => w.word);
      setWords(prev => prev.filter(w => !solvedWordStrings.includes(w.word)));
      
      setSelectedWords([]);
      
      // Check win condition
      if (solvedGroups.length + 1 === 4) {
        setGameStatus('won');
        if (onComplete) onComplete(true);
      }
    } else {
      // Mistake logic
      // Check "One Away"
      // Count how many words belong to each group in the selection
      const counts = {};
      selectedWords.forEach(w => {
        counts[w.group] = (counts[w.group] || 0) + 1;
      });
      const isOneAway = Object.values(counts).includes(3);

      setMistakes(prev => {
        const newMistakes = prev + 1;
        if (newMistakes >= 4) {
          setGameStatus('lost');
        }
        return newMistakes;
      });

      setFeedback(isOneAway ? "One away!" : "Incorrect group.");
      
      // Clear feedback after delay
      setTimeout(() => setFeedback(''), 2000);
      
      // Deselect all (optional, NYT keeps them but shakes)
      // keeping them selected allows easier modification
    }
  };

  const handleShuffle = () => {
    setWords(prev => shuffleArray(prev));
  };

  const handleDeselect = () => {
    setSelectedWords([]);
  };

  // Color mapping with inline styles as fallback
  const getColorStyles = (color) => {
    const colorMap = {
      yellow: { backgroundColor: '#F9DF6D', color: '#000' },
      green: { backgroundColor: '#A0C35A', color: '#000' },
      blue: { backgroundColor: '#B0C4EF', color: '#000' },
      purple: { backgroundColor: '#BA81C5', color: '#000' },
      pink: { backgroundColor: '#F472B6', color: '#000' },
    };
    return colorMap[color] || { backgroundColor: '#e5e7eb', color: '#000' };
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Solved Groups Display */}
      <div className="grid gap-2 mb-4">
        {solvedGroups.map((group, idx) => (
          <div 
            key={idx} 
            className="p-4 rounded-lg text-center"
            style={getColorStyles(group.color)}
          >
            <h3 className="font-bold text-lg">{group.name}</h3>
            <p>{group.words.join(', ')}</p>
          </div>
        ))}
      </div>

      {/* Game Grid */}
      {gameStatus !== 'won' && (
        <div className="grid grid-cols-4 gap-2 mb-8">
          {words.map((wordObj, idx) => {
            const isSelected = selectedWords.some(w => w.word === wordObj.word);
            return (
              <motion.button
                key={wordObj.word}
                layout
                onClick={() => handleWordClick(wordObj)}
                className={`
                  aspect-square sm:aspect-video flex items-center justify-center p-2 rounded-lg font-bold text-sm sm:text-base uppercase transition-colors
                  ${isSelected ? 'bg-gray-800 text-white' : 'bg-white text-gray-900 hover:bg-gray-100'}
                `}
                whileTap={{ scale: 0.95 }}
              >
                {wordObj.word}
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Controls */}
      {gameStatus === 'playing' && (
        <div className="space-y-4">
          <div className="flex justify-center items-center gap-2 mb-4">
            <span className="font-bold">Mistakes remaining:</span>
            <div className="flex gap-1">
              {[...Array(4 - mistakes)].map((_, i) => (
                <div key={i} className="w-3 h-3 rounded-full bg-gray-800" />
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button onClick={handleShuffle} className="px-6 py-2 rounded-full border border-gray-300 hover:bg-gray-50">Shuffle</button>
            <button onClick={handleDeselect} className="px-6 py-2 rounded-full border border-gray-300 hover:bg-gray-50">Deselect All</button>
            <button 
              onClick={handleSubmit} 
              disabled={selectedWords.length !== 4}
              className={`px-6 py-2 rounded-full border ${selectedWords.length === 4 ? 'bg-black text-white' : 'border-gray-300 text-gray-400'}`}
            >
              Submit
            </button>
          </div>
          
          {feedback && (
            <div className="text-center font-bold animate-bounce text-gray-800 mt-4">
              {feedback}
            </div>
          )}
        </div>
      )}

      {/* Win/Loss Messages */}
      {gameStatus === 'won' && (
        <div className="text-center p-8">
          <h2 className="text-3xl font-bold mb-2">Puzzle Solved!</h2>
          <p>Great job!</p>
        </div>
      )}
      
      {gameStatus === 'lost' && (
        <div className="text-center p-8">
          <h2 className="text-3xl font-bold mb-2">Game Over</h2>
          <p>Better luck next time.</p>
          <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-black text-white rounded-full">Retry</button>
        </div>
      )}
    </div>
  );
};

export default ConnectionsGame;
