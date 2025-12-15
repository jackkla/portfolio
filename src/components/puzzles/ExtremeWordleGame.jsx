import React, { useState, useEffect } from 'react';

// Wordle Logic Helper: Calculates letter statuses for the user's guess against the solution
const getGuessStatuses = (guessWord, solutionWord) => {
  if (!guessWord) return [];
  const guess = guessWord.toUpperCase().split('');
  const solution = solutionWord.toUpperCase().split('');
  const statuses = Array(guess.length).fill('gray');
  const solutionChars = [...solution];

  // 1. Check for GREEN (Correct position)
  guess.forEach((letter, i) => {
    if (letter === solution[i]) {
      statuses[i] = 'green';
      solutionChars[i] = null; // Mark as used
    }
  });

  // 2. Check for YELLOW (Wrong position)
  guess.forEach((letter, i) => {
    if (statuses[i] !== 'green') {
      const foundIndex = solutionChars.indexOf(letter);
      if (foundIndex !== -1) {
        statuses[i] = 'yellow';
        solutionChars[foundIndex] = null; // Mark as used
      }
    }
  });

  return statuses;
};

// Helper to get status of solution letters based on clue match
// Returns array of statuses: 'green' (matched by clue green), 'yellow' (matched by clue yellow), or 'blue' (remainder/hint)
const getSolutionStatuses = (puzzle) => {
  const solution = puzzle.solution.toUpperCase().split('');
  const statuses = Array(solution.length).fill('blue'); // Default to blue (remainder)

  // OPTIONAL: If a manual remainder is provided, prioritize marking THOSE letters as blue
  // and everything else as 'consumed' (we'll figure out green/yellow for them later or just leave them dim)
  if (puzzle.remainder) {
    // Strategy: Match remainder letters to solution letters greedily (or preserving order)
    const remainderChars = puzzle.remainder.toUpperCase().split('');
    const solutionChars = [...solution];
    const isBlue = Array(solution.length).fill(false);
    
    // Attempt to match remainder chars in order to solution chars
    let searchStartIndex = 0;
    remainderChars.forEach(char => {
      const index = solutionChars.indexOf(char, searchStartIndex);
      if (index !== -1) {
        isBlue[index] = true;
        // Optimization: search next char after this one to preserve order if possible
        // But ZIRCONIA -> IRON (I at 1, R at 2, O at 4, N at 5). Order is preserved.
        searchStartIndex = index + 1; 
      } else {
        // Fallback: search from beginning if strict order fails (though it shouldn't for valid anagrams)
        const fallbackIndex = solutionChars.indexOf(char);
        if (fallbackIndex !== -1) {
            isBlue[fallbackIndex] = true;
            solutionChars[fallbackIndex] = '#'; // consume
        }
      }
    });

    // Now apply these to statuses
    // Anything NOT blue is 'gray' initially, but we want to color them Green/Yellow if possible
    // to show WHY they were removed.
    
    // Let's re-run standard logic but force the Blue ones to stay Blue?
    // Actually, simpler: Use standard logic, then OVERRIDE with Blue based on remainder?
    // No, standard logic calculates Blue as "what's left". 
    // If standard logic says "RONI" and we want "IRON", standard logic picked the wrong 'I'.
    
    // So we should mark the "Blue" ones as "Protected".
    // Then run Green/Yellow matching on the non-protected ones.
    
    // Reset statuses to null
    statuses.fill(null);
    
    // Mark protected blues
    isBlue.forEach((blue, i) => {
      if (blue) statuses[i] = 'blue';
    });
  }

  // 1. Mark Greens
  puzzle.greenIndices.forEach(clueIndex => {
    // Only mark green if not already protected blue (though for a valid puzzle, remainder shouldn't overlap green/yellow)
    if (clueIndex < solution.length && statuses[clueIndex] !== 'blue') {
      statuses[clueIndex] = 'green';
    }
  });

  // 2. Mark Yellows
  const clueChars = puzzle.clue.split('');
  const usedSolutionIndices = new Set();
  
  // Mark greens and blues as used first
  statuses.forEach((status, i) => {
    if (status === 'green' || status === 'blue') usedSolutionIndices.add(i);
  });

  puzzle.yellowIndices.forEach(clueIndex => {
    const char = clueChars[clueIndex];
    // Find first matching letter in solution that isn't used
    const matchIndex = solution.findIndex((sChar, sIndex) => 
      sChar === char && !usedSolutionIndices.has(sIndex)
    );
    
    if (matchIndex !== -1) {
      statuses[matchIndex] = 'yellow';
      usedSolutionIndices.add(matchIndex);
    }
  });

  // Fill any remaining nulls with 'yellow' (implied match?) or 'gray'? 
  // In a perfect puzzle, everything is either Blue (Hint) or Consumed (Green/Yellow).
  // If we have leftovers, they are implicitly consumed/gray.
  // We'll mark them yellow to be safe/dimmed.
  statuses.forEach((s, i) => {
     if (s === null) statuses[i] = 'yellow'; // Fallback
  });

  return statuses;
};

// Bonus Hint Logic Helper: Extracts remaining letters from solution
const getRemainingLetters = (puzzle) => {
  // 0. Override
  if (puzzle.remainder) return puzzle.remainder;

  const solution = puzzle.solution.toUpperCase().split('');
  const solutionFlags = Array(solution.length).fill(true); // true = keep, false = removed
  const solutionChars = [...solution]; // Working copy to track usage

  // 1. Process Green Indices
  puzzle.greenIndices.forEach(clueIndex => {
    if (clueIndex < solution.length) {
      solutionFlags[clueIndex] = false;
      solutionChars[clueIndex] = null;
    }
  });

  // 2. Process Yellow Indices
  const clueChars = puzzle.clue.split('');
  puzzle.yellowIndices.forEach(clueIndex => {
    const char = clueChars[clueIndex];
    const matchIndex = solutionChars.indexOf(char);
    if (matchIndex !== -1) {
      solutionFlags[matchIndex] = false;
      solutionChars[matchIndex] = null;
    }
  });

  return solution.filter((_, i) => solutionFlags[i]).join('');
};

const PuzzleRow = ({ puzzle, isSolved, onSolve }) => {
  const [guess, setGuess] = useState('');
  const [error, setError] = useState(false);
  
  // Clear input when puzzle changes
  useEffect(() => {
    setGuess('');
    setError(false);
  }, [puzzle.clue, puzzle.solution]);

  const remainingLetters = isSolved ? getRemainingLetters(puzzle) : null;
  const solutionStatuses = isSolved ? getSolutionStatuses(puzzle) : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (guess.toUpperCase() === puzzle.solution.toUpperCase()) {
      onSolve(puzzle.difficulty);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  const clueLetters = puzzle.clue.split('');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className={`font-bold text-lg ${
            puzzle.difficulty === 'Easy' ? 'text-green-600' :
            puzzle.difficulty === 'Medium' ? 'text-yellow-600' :
            puzzle.difficulty === 'Hard' ? 'text-red-600' :
            'text-blue-600'
          }`}>
            {puzzle.difficulty}
          </h3>
          <div className="flex text-yellow-400 text-sm">
            {[...Array(puzzle.stars)].map((_, i) => <span key={i}>★</span>)}
          </div>
        </div>
        {isSolved && <span className="text-green-600 font-bold">SOLVED ✓</span>}
      </div>

      {/* Clue Word Display */}
      <div className="flex flex-col items-center gap-4 mb-6">
        {/* Clue */}
        <div className="flex flex-wrap gap-1 justify-center">
          {clueLetters.map((letter, i) => {
            let status = 'gray';
            if (puzzle.greenIndices.includes(i)) status = 'green';
            else if (puzzle.yellowIndices.includes(i)) status = 'yellow';

            return (
              <div
                key={i}
                className={`w-10 h-10 flex items-center justify-center font-bold text-lg rounded select-none
                  ${status === 'green' ? 'bg-green-500 text-white' : 
                    status === 'yellow' ? 'bg-yellow-400 text-white' : 
                    'bg-gray-100 text-gray-800'}`}
              >
                {letter}
              </div>
            );
          })}
        </div>

        {/* Solved State: Solution Visualization */}
        {isSolved && (
          <div className="flex flex-wrap gap-1 justify-center animate-fade-in">
             {puzzle.solution.split('').map((letter, i) => {
               const status = solutionStatuses[i];
               // Green: Matched position
               // Yellow: Matched wrong position
               // Blue: The 'Bonus Hint' remainder
               
               let bgClass = 'bg-gray-100 text-gray-800';
               
               if (puzzle.difficulty === 'Bonus') {
                 // For Bonus puzzle, the "win" state is all blue (Wordle-style all-correct)
                 bgClass = 'bg-blue-500 text-white shadow-lg scale-105';
               } else if (status === 'green') {
                 bgClass = 'bg-green-500 text-white opacity-50'; // Dim matched
               } else if (status === 'yellow') {
                 bgClass = 'bg-yellow-400 text-white opacity-50'; // Dim matched
               } else if (status === 'blue') {
                 bgClass = 'bg-blue-500 text-white ring-2 ring-blue-300 ring-offset-2';
               }

               return (
                 <div
                   key={i}
                   className={`w-10 h-10 flex items-center justify-center font-bold text-lg rounded select-none transition-all ${bgClass}`}
                 >
                   {letter}
                 </div>
               );
             })}
          </div>
        )}
      </div>

      {/* Input Area */}
      {!isSolved ? (
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            className={`border-2 rounded-lg px-4 py-2 w-full max-w-xs text-center uppercase tracking-widest font-bold focus:outline-none focus:border-blue-500 transition-colors
              ${error ? 'border-red-500 animate-shake' : 'border-gray-200'}`}
            placeholder={`Enter ${puzzle.solution.length} letters`}
            maxLength={20}
          />
          <button 
            type="submit"
            className="px-6 py-2 bg-gray-900 text-white rounded-lg font-bold text-sm hover:bg-gray-700 transition-colors"
          >
            CHECK
          </button>
        </form>
      ) : (
        <div className="text-center animate-fade-in mt-2">
          {puzzle.difficulty !== 'Bonus' && (
            <p className="text-blue-600 text-sm font-bold">
              Remainder: <span className="font-mono text-lg">{remainingLetters}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

const ExtremeWordleGame = ({ data }) => {
  // Use the first puzzle set (latest) by default, or allow selection
  const [activePuzzleId, setActivePuzzleId] = useState(data[0].id);
  const activePuzzleSet = data.find(p => p.id === activePuzzleId) || data[0];
  
  const [solvedLevels, setSolvedLevels] = useState([]);

  // Reset solved levels when puzzle changes
  useEffect(() => {
    setSolvedLevels([]);
  }, [activePuzzleId]);

  const handleSolve = (difficulty) => {
    if (!solvedLevels.includes(difficulty)) {
      setSolvedLevels([...solvedLevels, difficulty]);
    }
  };

  const getHintString = () => {
    const easy = activePuzzleSet.levels.find(p => p.difficulty === 'Easy');
    const medium = activePuzzleSet.levels.find(p => p.difficulty === 'Medium');
    const hard = activePuzzleSet.levels.find(p => p.difficulty === 'Hard');

    const getPartOrHidden = (puzzle) => 
       solvedLevels.includes(puzzle.difficulty) ? getRemainingLetters(puzzle) : "???";

    return `${getPartOrHidden(easy)} ${getPartOrHidden(medium)} ${getPartOrHidden(hard)}`;
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Date Selector */}
      <div className="flex justify-center mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1 flex gap-1">
          {data.map(p => (
            <button
              key={p.id}
              onClick={() => setActivePuzzleId(p.id)}
              className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${
                activePuzzleId === p.id 
                  ? 'bg-gray-900 text-white shadow-sm' 
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {p.date}
            </button>
          ))}
        </div>
      </div>

      {/* Header / Rules Summary */}
      <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg mb-8">
        <h2 className="text-2xl font-display font-bold mb-4">How to Play</h2>
        <p className="text-gray-300 mb-4">
          The colored words below are <span className="font-bold text-white">clues</span>. 
          Use the color logic (Green = Correct Spot, Yellow = Wrong Spot) to figure out the <span className="font-bold text-white">hidden solution word</span>.
        </p>
        <div className="text-sm bg-gray-800 p-4 rounded-lg">
          <span className="text-blue-400 font-bold">BONUS:</span> Solving the first three puzzles will reveal a hint for the final Bonus word!
        </div>
      </div>

      {/* Main Puzzles */}
      {activePuzzleSet.levels.map((puzzle, index) => (
        <PuzzleRow 
          key={index} 
          puzzle={puzzle} 
          isSolved={solvedLevels.includes(puzzle.difficulty)}
          onSolve={handleSolve}
        />
      ))}

      {/* Hint Banner */}
      <div className="sticky bottom-4 z-10">
        <div className="bg-white/95 backdrop-blur shadow-2xl border-2 border-blue-500 rounded-xl p-4 text-center max-w-lg mx-auto">
          <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">Bonus Hint</p>
          <p className="text-xl font-mono font-bold text-gray-900 tracking-wider">
            {getHintString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExtremeWordleGame;

