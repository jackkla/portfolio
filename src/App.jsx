import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import PuzzlesHub from './pages/PuzzlesHub';
import ConnectionsPage from './pages/ConnectionsPage';
import CrosswordPage from './pages/CrosswordPage';
import WordlePage from './pages/WordlePage';
import textureBg from './assets/images/texture_bg.png';

const Layout = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  return (
    <div 
      className={`flex flex-col min-h-screen font-body text-puzzle-text ${isHome ? 'h-screen overflow-hidden' : 'overflow-x-hidden'}`}
      style={!isHome ? {
        backgroundImage: `url(${textureBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      } : {}}
    >
      <main className={isHome ? "h-full w-full" : "flex-grow pt-8"}>
        {children}
      </main>
      {!isHome && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/puzzles" element={<PuzzlesHub />} />
          <Route path="/puzzles/connections/:id" element={<ConnectionsPage />} />
          <Route path="/puzzles/crossword" element={<CrosswordPage />} />
          <Route path="/puzzles/extreme-wordle" element={<WordlePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
