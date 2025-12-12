import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const CrosswordPage = () => {
  const puzzleContainerRef = useRef(null);
  const puzzleInstanceRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPuzzle = async () => {
      try {
        // Wait for Exolve and the converter to load
        if (!window.Exolve || !window.exolveFromPuz) {
          setTimeout(loadPuzzle, 100);
          return;
        }

        // Fetch the .puz file as an ArrayBuffer
        const response = await fetch('/themeless-1.puz');
        if (!response.ok) {
          throw new Error('Failed to load puzzle file');
        }
        
        const arrayBuffer = await response.arrayBuffer();
        
        // Convert .puz to Exolve format using the official converter
        let exolveSpec = window.exolveFromPuz(arrayBuffer, 'themeless-1.puz');
        
        if (!exolveSpec) {
          throw new Error('Failed to parse .puz file');
        }

        // Add a unique puzzle ID to avoid conflicts
        const uniqueId = 'themeless-crossword-1';
        exolveSpec = exolveSpec.replace(/exolve-begin/, `exolve-begin\n  exolve-id: ${uniqueId}`);

        // Create the Exolve puzzle
        if (puzzleContainerRef.current) {
          puzzleContainerRef.current.innerHTML = '';
          puzzleInstanceRef.current = new window.Exolve(exolveSpec, 'exolve-container');
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading puzzle:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    loadPuzzle();

    // Cleanup on unmount
    return () => {
      if (puzzleInstanceRef.current && puzzleInstanceRef.current.destroy) {
        puzzleInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link to="/puzzles" className="text-sm font-bold text-gray-500 hover:text-gray-900 mb-4 inline-block">← Back to Puzzles</Link>
        <h1 className="text-4xl font-display font-bold text-gray-900">Themeless #1</h1>
        <p className="text-gray-600">A 15x15 themeless crossword puzzle.</p>
      </div>

      {isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading puzzle...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 max-w-4xl mx-auto mb-8">
          Error loading puzzle: {error}
        </div>
      )}

      <div className="bg-white p-4 rounded-xl shadow-md max-w-5xl mx-auto">
        <div id="exolve-container" ref={puzzleContainerRef}></div>
      </div>
    </div>
  );
};

export default CrosswordPage;
