import React from 'react';
import { Link } from 'react-router-dom';
import PuzzleCard from '../components/puzzles/PuzzleCard';
import textureBg from '../assets/images/texture_bg.png';

const PuzzlesHub = () => {
  const puzzles = [
    {
      id: 'crossword-1',
      title: 'Themeless #1',
      type: 'purple',
      description: 'A full 15x15 themeless crossword puzzle.',
      link: '/puzzles/crossword',
      status: 'Play'
    },
    {
      id: 'connections-hub',
      title: 'Connections',
      type: 'yellow',
      description: 'Find groups of four items that share something in common.',
      link: '/puzzles/connections/1',
      status: 'Play'
    },
    {
      id: 'extreme-wordle',
      title: 'Extreme Wordle',
      type: 'blue',
      description: 'A more challenging variant of the popular word game.',
      link: '/puzzles/extreme-wordle',
      status: 'WIP'
    }
  ];

  return (
    <div 
      className="min-h-screen flex flex-col items-center py-12 px-4 font-body text-puzzle-text"
      style={{
        backgroundImage: `url(${textureBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute top-6 left-6">
        <Link to="/" className="text-gray-900 hover:text-connections-pink font-bold text-lg flex items-center gap-2 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </Link>
      </div>

      <header className="mb-12 text-center">
        <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 text-gray-900 tracking-tight">
          PUZZLES
        </h1>
        <p className="text-xl text-gray-600">Select a game to start playing</p>
      </header>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

