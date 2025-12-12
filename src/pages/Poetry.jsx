import React from 'react';
import { poems } from '../data/poemsData';

const Poetry = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-display font-bold mb-4 text-gray-900 tracking-tight">
          POETRY
        </h1>
      </header>

      <div className="space-y-12">
        {poems.map(poem => (
          <article key={poem.id} className="bg-white p-8 rounded-2xl shadow-sm border-l-8 border-connections-pink">
            <header className="mb-6 flex justify-between items-baseline border-b border-gray-100 pb-4">
              <h2 className="text-3xl font-display font-bold text-gray-900">{poem.title}</h2>
              <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">{poem.date}</span>
            </header>
            <div className="prose prose-lg text-gray-700 whitespace-pre-line font-body leading-loose">
              {poem.content}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Poetry;
