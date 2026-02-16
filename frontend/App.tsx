import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import MentoriaPage from './pages/MentoriaPage';
import PalestrasPage from './pages/PalestrasPage';
import AcervoPage from './pages/AcervoPage';
import AcervoSinglePage from './pages/AcervoSinglePage';
import ContatoPage from './pages/ContatoPage';
import SobrePage from './pages/SobrePage';
import BlogPage from './pages/BlogPage';
import BlogSinglePage from './pages/BlogSinglePage';
import NaMidiaPage from './pages/NaMidiaPage';
import PrivacidadePage from './pages/PrivacidadePage';
import NotFoundPage from './pages/NotFoundPage';
import LinksPage from './pages/LinksPage';
import AvaliacaoPage from './pages/AvaliacaoPage';

function AppContent() {
  const location = useLocation();
  const hideNavigation = location.pathname === '/avaliacao';

  return (
    <div className="min-h-screen">
      {!hideNavigation && <Navigation />}
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mentoria" element={<MentoriaPage />} />
          <Route path="/palestras" element={<PalestrasPage />} />
          <Route path="/acervo" element={<AcervoPage />} />
          <Route path="/acervo/:slug" element={<AcervoSinglePage />} />
          <Route path="/contato" element={<ContatoPage />} />
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogSinglePage />} />
          <Route path="/na-midia" element={<NaMidiaPage />} />
          <Route path="/privacidade" element={<PrivacidadePage />} />
          <Route path="/links" element={<LinksPage />} />
          <Route path="/avaliacao" element={<AvaliacaoPage />} />
          <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}