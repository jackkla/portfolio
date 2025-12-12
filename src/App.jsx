import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import PuzzlesHub from './pages/PuzzlesHub';
import Poetry from './pages/Poetry';
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
      <Header />
      {/* Add top padding to account for absolute header on non-home pages */}
      <main className={isHome ? "h-full w-full" : "flex-grow pt-24"}>
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
          <Route path="/about" element={<About />} />
          <Route path="/puzzles" element={<PuzzlesHub />} />
          <Route path="/poetry" element={<Poetry />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
