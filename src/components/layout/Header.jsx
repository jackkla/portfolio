import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  // If on home page, make header transparent/absolute to show background
  const headerClass = isHome 
    ? "absolute top-0 left-0 w-full z-20 bg-transparent" 
    : "bg-white shadow-sm";

  const linkClass = isHome
    ? "hover:text-white transition-colors text-puzzle-accent drop-shadow-sm" // Updated to #EEF1F5 variable
    : "hover:text-puzzle-accent transition-colors text-puzzle-text";

  return (
    <header className={headerClass}>
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/" className={`text-2xl font-display font-bold transition-colors ${isHome ? 'text-puzzle-accent drop-shadow-sm' : 'text-puzzle-primary'}`}>
          JK
        </Link>
        <nav>
          <ul className="flex space-x-6 font-bold">
            <li><Link to="/" className={linkClass}>Home</Link></li>
            <li><Link to="/about" className={linkClass}>About</Link></li>
            <li><Link to="/puzzles" className={linkClass}>Puzzles</Link></li>
            <li><Link to="/poetry" className={linkClass}>Poetry</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
