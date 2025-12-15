import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  // Don't show footer on home page since it has its own
  if (isHome) return null;

  return (
    <footer className="w-full py-8 mt-auto bg-transparent text-gray-500">
      <div className="container mx-auto px-4 text-center">
        <Link to="/puzzles" className="block mb-4 hover:text-connections-pink transition-colors font-bold uppercase tracking-widest">
            Back to Puzzles
        </Link>
        <p className="mb-2">Built with React & Cursor by Jacob Klausner</p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:text-connections-pink transition-colors">GitHub</a>
          <a href="#" className="hover:text-connections-pink transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
