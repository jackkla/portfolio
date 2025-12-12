import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-display font-bold mb-8 text-puzzle-accent">About Me</h1>
      <div className="prose lg:prose-xl">
        <p>
          I'm a word game enthusiast with a background in data science and philosophy.
          My passion for puzzles started with playing Ghost and Scrabble with my dad.
        </p>
        <p>
          Currently, I'm an actuary candidate with 2 exams passed, but my dream is to work in puzzles.
        </p>
      </div>
    </div>
  );
};

export default About;

