import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
  const hideNavigation = location.pathname === '/avaliacao' || location.pathname === '/links';

  useEffect(() => {
    // Buscar scripts globais (Pixels, Analytics) do backend
    const apiBase = import.meta.env.VITE_API_URL || 'https://janiamesquita.com.br/api';
    fetch(`${apiBase}/config/scripts`)
      .then(res => res.json())
      .then(data => {
        if (data && data.value) {
          const params = typeof data.value === 'string' ? JSON.parse(data.value) : data.value;

          if (params.head && !document.querySelector('[data-config="head"]')) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = params.head;
            Array.from(tempDiv.childNodes).forEach(node => {
              if (node.nodeType === 1) {
                const el = node as Element;
                el.setAttribute('data-config', 'head');
                if (el.tagName === 'SCRIPT') {
                  const scriptEl = document.createElement('script');
                  Array.from(el.attributes).forEach(attr => scriptEl.setAttribute(attr.name, attr.value));
                  scriptEl.innerHTML = el.innerHTML;
                  scriptEl.setAttribute('data-config', 'head');
                  document.head.appendChild(scriptEl);
                } else {
                  document.head.appendChild(node.cloneNode(true));
                }
              }
            });
          }

          if (params.body && !document.querySelector('[data-config="body"]')) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = params.body;
            Array.from(tempDiv.childNodes).forEach(node => {
              if (node.nodeType === 1) {
                const el = node as Element;
                el.setAttribute('data-config', 'body');
                if (el.tagName === 'SCRIPT') {
                  const scriptEl = document.createElement('script');
                  Array.from(el.attributes).forEach(attr => scriptEl.setAttribute(attr.name, attr.value));
                  scriptEl.innerHTML = el.innerHTML;
                  scriptEl.setAttribute('data-config', 'body');
                  document.body.appendChild(scriptEl);
                } else {
                  document.body.appendChild(node.cloneNode(true));
                }
              }
            });
          }
        }
      })
      .catch(err => console.error('Erro ao injetar scripts globais:', err));
  }, []);

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