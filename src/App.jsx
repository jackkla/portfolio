import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import PuzzlesHub from './pages/PuzzlesHub';
import Poetry from './pages/Poetry';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-body bg-puzzle-bg text-gray-900">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/puzzles" element={<PuzzlesHub />} />
            <Route path="/poetry" element={<Poetry />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
