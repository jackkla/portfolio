import React from 'react';
import PuzzleCard from '../components/puzzles/PuzzleCard';

const PuzzlesHub = () => {
  const puzzles = [
    {
      id: 'crossword-1',
      title: 'My First Crossword',
      type: 'purple',
      description: 'A full 15x15 crossword puzzle with a tricky theme. Best played on desktop.',
      link: '/puzzles/crossword',
      status: 'Featured'
    },
    {
      id: 'connections-1',
      title: 'Classic Connections',
      type: 'yellow',
      description: 'Find the common threads between words. Difficulty: Easy',
      link: '/puzzles/connections/1',
      status: 'New'
    },
    {
      id: 'connections-2',
      title: 'Tricky Trios',
      type: 'green',
      description: 'Watch out for red herrings in this one. Difficulty: Medium',
      link: '/puzzles/connections/2',
      status: 'Play'
    },
    {
      id: 'wordle-variant',
      title: 'Wordle with a Twist',
      type: 'blue',
      description: 'Guess the word, but the rules change every day.',
      link: '/puzzles/wordle',
      status: 'Beta'
    },
    {
      id: 'wiki-game',
      title: 'Redacted Wikipedia',
      type: 'pink',
      description: 'Guess the article title from a heavily redacted page.',
      link: 'https://github.com/jacobklausner/wiki-game', // External link example
      status: 'Code'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-display font-bold mb-4 text-gray-900 tracking-tight">
          PUZZLES
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {puzzles.map(puzzle => (
          <PuzzleCard 
            key={puzzle.id}
            {...puzzle}
          />
        ))}
      </div>
    </div>
  );
};

export default PuzzlesHub;
