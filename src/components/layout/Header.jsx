import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Always use absolute/transparent header now
  const headerClass = "absolute top-0 left-0 w-full z-20 bg-transparent";

  // Text color logic: 
  // Home: Light accent text (for dark/colorful bg)
  // Others: Dark text (for light texture bg)
  const textClass = isHome 
    ? "text-puzzle-accent drop-shadow-sm hover:text-white" 
    : "text-puzzle-text hover:text-connections-pink";

  return (
    <header className={headerClass}>
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/" className={`text-2xl font-display font-bold transition-colors ${textClass}`}>
          JK
        </Link>
        <nav>
          <ul className="flex space-x-6 font-bold">
            <li><Link to="/" className={`transition-colors ${textClass}`}>Home</Link></li>
            <li><Link to="/about" className={`transition-colors ${textClass}`}>About</Link></li>
            <li><Link to="/puzzles" className={`transition-colors ${textClass}`}>Puzzles</Link></li>
            <li><Link to="/poetry" className={`transition-colors ${textClass}`}>Poetry</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
