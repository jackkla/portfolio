import React from 'react';
import { useParams, Link, NavLink } from 'react-router-dom';
import ConnectionsGame from '../components/puzzles/ConnectionsGame';
import { connectionsPuzzles } from '../data/puzzles/connectionsData';

const ConnectionsPage = () => {
  const { id } = useParams();
  const puzzle = connectionsPuzzles.find(p => p.id === id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link to="/puzzles" className="text-sm font-bold text-gray-500 hover:text-gray-900 mb-4 inline-block">← Back to Puzzles</Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sticky top-24">
            <h3 className="font-bold text-gray-900 mb-4 px-2">All Puzzles</h3>
            <div className="space-y-1">
              {connectionsPuzzles.map(p => (
                <NavLink
                  key={p.id}
                  to={`/puzzles/connections/${p.id}`}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? 'bg-yellow-100 text-yellow-900 font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  {p.title}
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow">
          {puzzle ? (
            <>
              <div className="mb-6">
                <h1 className="text-4xl font-display font-bold text-gray-900">{puzzle.title}</h1>
                <p className="text-gray-600">{puzzle.description}</p>
              </div>
              <ConnectionsGame puzzle={puzzle} key={puzzle.id} />
            </>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Puzzle Not Found</h2>
              <p className="text-gray-600">Select a puzzle from the list to play.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnectionsPage;

