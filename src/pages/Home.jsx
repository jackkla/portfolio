import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import bgImage from '../assets/images/abstract-art/fire_collage.png';

const Home = () => {
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

  return (
    <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center overflow-hidden bg-black">
      
      {/* Dynamic SVG Filter Definition */}
      <svg className="invisible absolute width-0 height-0">
        <defs>
          <filter id="complexFilter" x="-20%" y="-20%" width="140%" height="140%">
            {/* 1. Turbulence / Scramble */}
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
            
            {/* 2. RGB Channel Shifting */}
            <feColorMatrix 
                ref={matrixRef}
                in="displaced"
                type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" 
                result="colored"
            />

            {/* 3. Final Mild Blur Pass */}
            <feGaussianBlur 
                in="colored" 
                stdDeviation="0.5" 
                result="blurred"
            />
          </filter>
        </defs>
      </svg>

      {/* Background Layer (Z-0) */}
      <div 
        className="absolute inset-0 z-0 animate-hue-only scale-110"
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

      {/* Content (Z-30) */}
      <div className="relative z-30 max-w-4xl mx-auto px-4 pt-20 flex flex-col items-center">
        
        {/* Simple Text Container - No Glassmorphism */}
        <div className="space-y-6 text-center animate-fade-in-up">
            <h1 className="text-6xl md:text-8xl font-display font-bold text-puzzle-accent tracking-tight drop-shadow-md">
            Jacob Klausner
            </h1>
            
            <p className="text-xl md:text-3xl font-body text-puzzle-accent max-w-2xl mx-auto leading-relaxed font-bold drop-shadow-sm">
            Word Game Enthusiast & Puzzle Creator
            </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 justify-center pt-12 animate-fade-in-up delay-200">
          <Link 
            to="/puzzles" 
            className="text-puzzle-accent text-xl font-bold drop-shadow-md hover:text-white transition-colors"
          >
            Play My Puzzles
          </Link>
          
          <Link 
            to="/about" 
            className="text-puzzle-accent text-xl font-bold drop-shadow-md hover:text-white transition-colors"
          >
            Read About Me
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
