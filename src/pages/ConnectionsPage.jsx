import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ConnectionsGame from '../components/puzzles/ConnectionsGame';
import { connectionsPuzzles } from '../data/puzzles/connectionsData';

const ConnectionsPage = () => {
  const { id } = useParams();
  const puzzle = connectionsPuzzles.find(p => p.id === id);

  if (!puzzle) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Puzzle Not Found</h2>
        <Link to="/puzzles" className="text-puzzle-primary hover:underline">Back to Puzzles</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link to="/puzzles" className="text-sm font-bold text-gray-500 hover:text-gray-900 mb-4 inline-block">← Back to Puzzles</Link>
        <h1 className="text-4xl font-display font-bold text-gray-900">{puzzle.title}</h1>
        <p className="text-gray-600">{puzzle.description}</p>
      </div>

      <ConnectionsGame puzzle={puzzle} />
    </div>
  );
};

export default ConnectionsPage;

