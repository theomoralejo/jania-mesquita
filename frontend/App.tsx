import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

// Pages
import HomePage from './pages/HomePage';

// Lazy Loaded Sub-Pages for Performance
const MentoriaPage = React.lazy(() => import('./pages/MentoriaPage'));
const PalestrasPage = React.lazy(() => import('./pages/PalestrasPage'));
const AcervoPage = React.lazy(() => import('./pages/AcervoPage'));
const AcervoSinglePage = React.lazy(() => import('./pages/AcervoSinglePage'));
const ContatoPage = React.lazy(() => import('./pages/ContatoPage'));
const SobrePage = React.lazy(() => import('./pages/SobrePage'));
const BlogPage = React.lazy(() => import('./pages/BlogPage'));
const BlogSinglePage = React.lazy(() => import('./pages/BlogSinglePage'));
const NaMidiaPage = React.lazy(() => import('./pages/NaMidiaPage'));
const PrivacidadePage = React.lazy(() => import('./pages/PrivacidadePage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));
const LinksPage = React.lazy(() => import('./pages/LinksPage'));
const AvaliacaoPage = React.lazy(() => import('./pages/AvaliacaoPage'));

import { Suspense } from 'react';
import { PageLoader } from './components/PageLoader';

function AppContent() {
  const location = useLocation();
  const hideNavigation = location.pathname === '/avaliacao' || location.pathname === '/links';

  useEffect(() => {
    // Buscar scripts globais (Pixels, Analytics) do backend
    const apiBase = import.meta.env.VITE_API_URL || 'https://janiamesquita.com.br/api';
    fetch(`${apiBase}/config/scripts`)
      .then(res => res.json())
      .then(data => {
        // Limpar scripts injetados anteriormente
        document.querySelectorAll('[data-config="head"]').forEach(el => el.remove());
        document.querySelectorAll('[data-config="body"]').forEach(el => el.remove());

        if (data && data.value) {
          const params = typeof data.value === 'string' ? JSON.parse(data.value) : data.value;

          if (params.head) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = params.head;
            Array.from(tempDiv.childNodes).forEach(node => {
              if (node.nodeType === 1) {
                const el = node as Element;
                if (el.tagName === 'SCRIPT') {
                  const scriptEl = document.createElement('script');
                  Array.from(el.attributes).forEach(attr => scriptEl.setAttribute(attr.name, attr.value));
                  scriptEl.innerHTML = el.innerHTML;
                  scriptEl.setAttribute('data-config', 'head');
                  document.head.appendChild(scriptEl);
                } else {
                  const cloned = node.cloneNode(true) as Element;
                  cloned.setAttribute('data-config', 'head');
                  document.head.appendChild(cloned);
                }
              }
            });
          }

          if (params.body) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = params.body;
            Array.from(tempDiv.childNodes).forEach(node => {
              if (node.nodeType === 1) {
                const el = node as Element;
                if (el.tagName === 'SCRIPT') {
                  const scriptEl = document.createElement('script');
                  Array.from(el.attributes).forEach(attr => scriptEl.setAttribute(attr.name, attr.value));
                  scriptEl.innerHTML = el.innerHTML;
                  scriptEl.setAttribute('data-config', 'body');
                  document.body.appendChild(scriptEl);
                } else {
                  const cloned = node.cloneNode(true) as Element;
                  cloned.setAttribute('data-config', 'body');
                  document.body.appendChild(cloned);
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
      <ScrollToTop />
      {!hideNavigation && <Navigation />}
      <Suspense fallback={<PageLoader />}>
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
      </Suspense>
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