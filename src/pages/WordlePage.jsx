import React from 'react';
import { Link } from 'react-router-dom';
import ExtremeWordleGame from '../components/puzzles/ExtremeWordleGame';
import { extremeWordlePuzzles } from '../data/puzzles/extremeWordleData';

const WordlePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <Link to="/puzzles" className="text-sm font-bold text-gray-500 hover:text-gray-900 mb-4 inline-block">← Back to Puzzles</Link>
        <h1 className="text-4xl font-display font-bold text-gray-900">Extreme Wordle</h1>
        <p className="text-gray-600">A reverse-logic word game.</p>
      </div>

      <ExtremeWordleGame data={extremeWordlePuzzles} />
    </div>
  );
};

export default WordlePage;
