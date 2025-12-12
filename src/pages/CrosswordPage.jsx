import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const CrosswordPage = () => {
  const puzzleContainerRef = useRef(null);

  useEffect(() => {
    // Basic Exolve puzzle definition
    const puzzleText = `
exolve-begin
  exolve-id: jacob-crossword-1
  exolve-title: My First Crossword
  exolve-setter: Jacob Klausner
  exolve-copyright: 2025 Jacob Klausner
  exolve-width: 5
  exolve-height: 5
  exolve-grid:
    H.E.L.L.O
    . . . . .
    W.O.R.L.D
    . . . . .
    S.M.I.L.E
  exolve-across:
    1 Greeting (5)
    3 Planet we live on (5)
    5 Facial expression (5)
  exolve-down:
    1 . (1)
    2 . (1)
    3 . (1)
    4 . (1)
    5 . (1)
exolve-end
    `;

    // Initialize Exolve if available
    if (window.createExolve) {
        // Exolve usually looks for an ID or object. 
        // We can create a new Exolve object attached to our container.
        // However, standard Exolve usage often parses the text directly in the HTML.
        // A cleaner way in React is to inject the text into a div and let Exolve parse it,
        // or use the JS API if documented. 
        // Simpler approach: create the puzzle object.
        
        try {
            const puz = new window.Exolve(puzzleText, "exolve-container");
        } catch (e) {
            console.error("Exolve init error:", e);
        }
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link to="/puzzles" className="text-sm font-bold text-gray-500 hover:text-gray-900 mb-4 inline-block">← Back to Puzzles</Link>
        <h1 className="text-4xl font-display font-bold text-gray-900">Crossword</h1>
        <p className="text-gray-600">A sample 5x5 grid (Placeholder for full puzzle).</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md max-w-4xl mx-auto">
        <div id="exolve-container" ref={puzzleContainerRef}></div>
      </div>
    </div>
  );
};

export default CrosswordPage;

