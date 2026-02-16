import React from 'react';

import { Home, Search, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  const suggestions = [
    { label: 'Início', path: '/', icon: Home },
    { label: 'Mentoria Executiva', path: '/mentoria', icon: null },
    { label: 'Palestras', path: '/palestras', icon: null },
    { label: 'Acervo Digital', path: '/acervo', icon: null },
    { label: 'Sobre', path: '/sobre', icon: null },
    { label: 'Contato', path: '/contato', icon: null }
  ];

  return (
    <main className="pt-24 min-h-screen flex items-center">
      <div className="container-custom py-24">
        <div className="max-w-3xl mx-auto text-center">
          {/* 404 Number */}
          <div className="mb-12">
            <div className="text-[200px] leading-none text-black opacity-10 select-none">
              404
            </div>
          </div>

          {/* Content */}
          <div className="mb-12">
            <h1 className="text-6xl mb-6 text-black">Página Não Encontrada</h1>
            <p className="text-xl text-gray-600 mb-8">
              A página que você está procurando não existe ou foi movida para outro endereço.
            </p>
          </div>

          {/* Search Suggestion */}
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 mb-12">
            <div className="flex items-center gap-4 mb-6 justify-center">
              <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center">
                <Search className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl text-black">Onde Você Gostaria de Ir?</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {suggestions.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-black hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="text-center">
                    {item.icon && (
                      <item.icon className="w-6 h-6 text-black mx-auto mb-2 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                    )}
                    <div className="text-black">{item.label}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/"
              className="px-8 py-4 bg-black text-white rounded-xl hover:bg-gray-900 transition-all flex items-center gap-2"
            >
              <Home className="w-5 h-5" strokeWidth={1.5} />
              Voltar ao Início
            </Link>
            <button
              onClick={() => window.history.back()}
              className="px-8 py-4 border-2 border-black text-black rounded-xl hover:bg-black hover:text-white transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
              Página Anterior
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}