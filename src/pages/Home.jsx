import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 text-puzzle-accent">
        Jacob Klausner
      </h1>
      <p className="text-xl md:text-2xl font-body mb-8 text-gray-700 max-w-2xl">
        Word Game Enthusiast & Puzzle Creator
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl w-full">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="text-2xl font-bold text-puzzle-primary">10,000+</div>
          <div className="text-sm text-gray-600">Word Hunt Wins</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="text-2xl font-bold text-puzzle-primary">1800</div>
          <div className="text-sm text-gray-600">Woogles ELO</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="text-2xl font-bold text-puzzle-primary">2:30</div>
          <div className="text-sm text-gray-600">NYT Monday Record</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="text-2xl font-bold text-puzzle-primary">Flux</div>
          <div className="text-sm text-gray-600">App Co-creator</div>
        </div>
      </div>

      <div className="flex gap-4">
        <Link 
          to="/puzzles" 
          className="bg-puzzle-accent text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-colors"
        >
          Play My Puzzles
        </Link>
        <Link 
          to="/about" 
          className="bg-puzzle-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-colors"
        >
          Read About Me
        </Link>
      </div>
    </div>
  );
};

export default Home;

