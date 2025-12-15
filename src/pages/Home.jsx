import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import bgImage from '../assets/images/abstract-art/fire_collage.png';
import PuzzleCard from '../components/puzzles/PuzzleCard';

const Home = () => {
  const [view, setView] = useState('initial'); // 'initial', 'read', 'play'

  // Hardcoded Animation Parameters (Locked In)
  const params = {
    hueSpeed: 60,       // 60s
    hueTarget: 100,     // 100deg
    
    // RGB Oscillations
    redSpeed: 0.30,   redAmp: 0.20,
    greenSpeed: 0.20, greenAmp: 0.15,
    blueSpeed: 0.10,  blueAmp: 0.15,

    // Pixel Swap / Grain
    scrambleAmount: 22,  
    scrambleGrain: 0.9, 
    scrambleSpeed: 96, // 96ms
  };

  // Refs for direct DOM manipulation
  const requestRef = useRef();
  const lastUpdateRef = useRef(0);
  const matrixRef = useRef(null);
  const turbulenceRef = useRef(null); 
  const startTimeRef = useRef(Date.now());
  const seedRef = useRef(0);
  
  // Animation Loop
  useEffect(() => {
    const animate = (time) => {
      const now = Date.now();
      const elapsed = (now - startTimeRef.current) / 1000;

      // 1. Handle Seed Update (Standard Pixel Swap)
      if (turbulenceRef.current) {
          if (time - lastUpdateRef.current > params.scrambleSpeed) {
              seedRef.current = (seedRef.current + 1) % 100;
              turbulenceRef.current.setAttribute('seed', seedRef.current);
              lastUpdateRef.current = time;
          }
      }

      // 2. Handle RGB Oscillations
      if (matrixRef.current) {
        const r = params.redAmp * Math.sin(elapsed * params.redSpeed);
        const g = params.greenAmp * Math.sin(elapsed * params.greenSpeed);
        const b = params.blueAmp * Math.sin(elapsed * params.blueSpeed);

        const matrixValues = `
            1 0 0 0 ${r}
            0 1 0 0 ${g}
            0 0 1 0 ${b}
            0 0 0 1 0
        `;
        matrixRef.current.setAttribute('values', matrixValues);
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); 

  // Data
  const puzzles = [
    {
      id: 'crossword-1',
      title: 'Themeless #1',
      type: 'purple',
      description: 'A full 15x15 themeless crossword puzzle.',
      link: '/puzzles/crossword',
      status: 'Play'
    },
    {
      id: 'connections-hub',
      title: 'Connections',
      type: 'yellow',
      description: 'Find groups of four items that share something in common.',
      link: '/puzzles/connections/1',
      status: 'Play'
    },
    {
      id: 'extreme-wordle',
      title: 'Extreme Wordle',
      type: 'blue',
      description: 'A more challenging variant of the popular word game.',
      link: '/puzzles/extreme-wordle',
      status: 'WIP'
    }
  ];

  const handleSpotifyClick = () => {
    // Placeholder for actual Spotify interaction or analytics
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-black text-puzzle-accent font-body selection:bg-pink-500 selection:text-white">
      
      {/* Dynamic SVG Filter Definition */}
      <svg className="invisible absolute width-0 height-0">
        <defs>
          <filter id="complexFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence 
              ref={turbulenceRef} 
              type="turbulence" 
              baseFrequency={params.scrambleGrain} 
              numOctaves="2" 
              seed="0" 
              result="turbulence" 
            />
            <feDisplacementMap 
              in2="turbulence" 
              in="SourceGraphic" 
              scale={params.scrambleAmount} 
              xChannelSelector="R" 
              yChannelSelector="G"
              result="displaced"
            />
            <feColorMatrix 
                ref={matrixRef}
                in="displaced"
                type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" 
                result="colored"
            />
            <feGaussianBlur 
                in="colored" 
                stdDeviation="0.5" 
                result="blurred"
            />
          </filter>
        </defs>
      </svg>

      {/* Background Layer */}
      <div 
        className="absolute inset-0 animate-hue-only scale-110"
        style={{
            '--hue-target': `${params.hueTarget}deg`,
            animationDuration: `${params.hueSpeed}s`,
            willChange: 'filter'
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'url(#complexFilter)', 
          }}
        />
      </div>

      {/* Content */}
      <div className="relative w-full h-full flex flex-col items-center pt-20 pb-10">
        
        {/* Name and Toggle */}
        <div className="flex-shrink-0 text-center space-y-8 pointer-events-none relative">
            <h1 
              className="font-black uppercase tracking-tighter cursor-pointer hover:scale-105 transition-transform text-white mix-blend-difference pointer-events-auto leading-none"
              style={{ fontSize: '13vw' }}
              onClick={() => setView('initial')}
            >
            Jack's Pu<span style={{ marginRight: '3px' }}>z</span>zles
            </h1>
            
            <div className="flex justify-center text-2xl font-bold pointer-events-auto">
              <Link to="/puzzles">
                  <motion.button 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-4 border-white text-white px-12 py-4 text-4xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition-colors mix-blend-difference"
                  >
                    Play
                  </motion.button>
              </Link>
            </div>
        </div>

        {/* Footer / Socials */}
        <div className="flex-shrink-0 w-full p-6 flex flex-col items-center gap-6 mt-auto">
          <div className="flex gap-8 text-xl font-bold tracking-widest uppercase mix-blend-difference">
            <a 
              href="https://www.linkedin.com/in/jacob-klausner-377b48219/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white hover:scale-110 transition-all text-white"
            >
              LinkedIn
            </a>
            <a 
              href="https://github.com/jackkla" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white hover:scale-110 transition-all text-white"
            >
              GitHub
            </a>
            <a 
              href="https://open.spotify.com/user/jackkla" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white hover:scale-110 transition-all text-white"
            >
              Spotify
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
