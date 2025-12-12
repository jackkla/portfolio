import React from 'react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  // On Home page, we might want to hide it or style differently. 
  // For now, let's keep it transparent and absolute at bottom.
  // If it's not home, we still want it transparent but at the bottom of flow.
  
  return (
    <footer className={`w-full py-8 mt-auto bg-transparent ${isHome ? 'absolute bottom-0 z-20 text-puzzle-accent' : 'text-gray-500'}`}>
      <div className="container mx-auto px-4 text-center">
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
