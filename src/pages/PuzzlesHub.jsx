import React from 'react';

const PuzzlesHub = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-display font-bold mb-8 text-puzzle-accent">Puzzles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder cards */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-puzzle-primary">
          <h2 className="text-2xl font-bold mb-2">Crossword</h2>
          <p className="text-gray-600 mb-4">A full crossword puzzle.</p>
          <button className="text-puzzle-accent font-bold hover:underline">Play Now</button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-connections-purple">
          <h2 className="text-2xl font-bold mb-2">Connections</h2>
          <p className="text-gray-600 mb-4">Group words by common thread.</p>
          <button className="text-puzzle-accent font-bold hover:underline">Play Now</button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-connections-green">
          <h2 className="text-2xl font-bold mb-2">Wordle Variants</h2>
          <p className="text-gray-600 mb-4">Original word guessing games.</p>
          <button className="text-puzzle-accent font-bold hover:underline">Play Now</button>
        </div>
      </div>
    </div>
  );
};

export default PuzzlesHub;

