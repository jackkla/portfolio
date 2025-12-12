import React from 'react';
import { Link } from 'react-router-dom';

const PuzzleCard = ({ title, type, description, color = "bg-white", link, status = "Play" }) => {
  // Map color prop to simplified Pink/Yellow/Blue palette
  // Fallback map: Purple -> Pink, Green -> Yellow/Blue
  const accentColor = {
    yellow: "border-l-connections-yellow text-yellow-600",
    blue: "border-l-connections-blue text-blue-600",
    pink: "border-l-connections-pink text-pink-600",
    
    // Remaps
    purple: "border-l-connections-pink text-pink-600",
    green: "border-l-connections-blue text-blue-600",
    default: "border-l-gray-300 text-gray-600"
  }[type] || "border-l-gray-300 text-gray-600";

  return (
    <div className={`bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border-l-4 ${accentColor.split(' ')[0]} group h-full flex flex-col`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-display font-bold text-gray-900 group-hover:text-connections-pink transition-colors">{title}</h3>
        <span className="text-xs font-bold uppercase tracking-wider bg-gray-50 px-2 py-1 rounded text-gray-500">{status}</span>
      </div>
      
      <p className="text-gray-600 mb-6 flex-grow">{description}</p>
      
      <Link 
        to={link} 
        className={`inline-block font-bold hover:underline ${accentColor.split(' ')[1]}`}
      >
        Play Now →
      </Link>
    </div>
  );
};

export default PuzzleCard;
