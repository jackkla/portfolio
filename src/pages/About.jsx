import React from 'react';
import bgImage from '../assets/images/abstract-art/fire_collage.png';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <header>
            <h1 className="text-5xl font-display font-bold mb-4 text-gray-900">
              From Data Science to <span className="text-pink-500">Word Games</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed font-light">
              I've always thought of work as pragmatic—a clear path to stability. But my real passion has always been word games.
            </p>
          </header>

          <section className="prose prose-lg text-gray-800">
            <p>
              I graduated about six months ago with a background in <strong>Data Science and Philosophy</strong>. 
              Currently, I'm an actuary candidate (2 exams passed, studying for the third), but I find myself constantly drawn back to the world of puzzles.
            </p>
            <p>
              My journey started early, playing Ghost and Scrabble with my dad. That competitive spark never left. 
              I'm now rated <strong>1800 ELO on Woogles</strong> and have racked up over <strong>10,000 wins on Word Hunt</strong>.
            </p>
            <p>
              I don't just play; I analyze. I'm a daily reader of Rex Parker's crossword reviews and deeply appreciate the craft of construction. 
              I believe puzzles are more than just games—they're a medium for connection, wit, and unexpected delight.
            </p>
          </section>

          {/* Plain White Card - No Texture */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border-l-8 border-connections-yellow">
            <h2 className="text-2xl font-display font-bold mb-4 text-gray-900">Why NYT Games?</h2>
            <p className="text-gray-700">
              Being a Puzzle Editor is my dream job. I have the technical chops from my data science background, 
              the critical eye from my philosophy studies, and an obsession with wordplay that dates back to childhood. 
              I want to help shape the products that millions of people start their day with.
            </p>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Profile Card */}
          <div className="relative h-64 rounded-2xl overflow-hidden shadow-md group">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${bgImage})` }}
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <p className="font-display font-bold text-2xl">Jacob Klausner</p>
              <p className="opacity-90">Puzzle Creator</p>
            </div>
          </div>

          {/* Stats Grid - Plain White */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-400 uppercase tracking-wider text-xs mb-6">By The Numbers</h3>
            <div className="space-y-6">
              <div>
                <div className="text-3xl font-display font-bold text-pink-500">10,000+</div>
                <div className="text-sm text-gray-500 font-bold">Word Hunt Wins</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-connections-yellow">1800</div>
                <div className="text-sm text-gray-500 font-bold">Woogles ELO</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-connections-blue">2:30</div>
                <div className="text-sm text-gray-500 font-bold">NYT Monday Record</div>
              </div>
            </div>
          </div>

          {/* Technical Skills - Plain White */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-400 uppercase tracking-wider text-xs mb-4">Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {['Data Science', 'React', 'Python', 'Philosophy', 'Game Design', 'Wiki APIs'].map((skill, i) => (
                <span 
                  key={skill} 
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    i % 3 === 0 ? 'bg-pink-100 text-pink-700' : 
                    i % 3 === 1 ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-blue-100 text-blue-700'
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
