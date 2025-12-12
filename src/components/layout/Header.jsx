import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-display font-bold text-puzzle-primary hover:text-puzzle-accent transition-colors">
          JK
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:text-puzzle-accent transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-puzzle-accent transition-colors">About</Link></li>
            <li><Link to="/puzzles" className="hover:text-puzzle-accent transition-colors">Puzzles</Link></li>
            <li><Link to="/poetry" className="hover:text-puzzle-accent transition-colors">Poetry</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

