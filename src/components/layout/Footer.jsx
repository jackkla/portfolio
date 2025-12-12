import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-8 mt-auto">
      <div className="container mx-auto px-4 text-center text-gray-500">
        <p className="mb-2">Built with React & Cursor by Jacob Klausner</p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:text-puzzle-accent transition-colors">GitHub</a>
          <a href="#" className="hover:text-puzzle-accent transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


