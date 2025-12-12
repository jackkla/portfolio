import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import PuzzlesHub from './pages/PuzzlesHub';
import Poetry from './pages/Poetry';

const Layout = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  return (
    // Force full viewport height and prevent scrolling on home
    <div className={`flex flex-col min-h-screen font-body bg-puzzle-bg text-puzzle-text ${isHome ? 'h-screen overflow-hidden' : 'overflow-x-hidden'}`}>
      <Header />
      {/* Home page takes full height absolute-like positioning, others normal flow */}
      <main className={isHome ? "h-full w-full" : "flex-grow pt-4"}>
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
