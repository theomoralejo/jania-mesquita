import React from 'react';

import { Home, Search, ArrowLeft, Users, Mic, BookOpen, Info, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  const suggestions = [
    { label: 'Início', path: '/', icon: Home },
    { label: 'Mentoria Executiva', path: '/mentoria', icon: Users },
    { label: 'Palestras', path: '/palestras', icon: Mic },
    { label: 'Acervo Digital', path: '/acervo', icon: BookOpen },
    { label: 'Sobre', path: '/sobre', icon: Info },
    { label: 'Contato', path: '/contato', icon: Phone }
  ];

  return (
    <main className="pt-24 min-h-screen flex items-center">
      <div className="container-custom py-24">
        <div className="max-w-3xl mx-auto text-center">
          {/* 404 Number */}
          <div className="mb-12">
            <div className="text-[200px] leading-none text-[#42331C] opacity-10 select-none">
              404
            </div>
          </div>

          {/* Content */}
          <div className="mb-12">
            <h1 className="text-6xl mb-6 text-[#42331C]">Página Não Encontrada</h1>
            <p className="text-xl text-gray-600 mb-8">
              A página que você está procurando não existe ou foi movida para outro endereço.
            </p>
          </div>

          {/* Search Suggestion */}
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 mb-12">
            <div className="flex items-center gap-4 mb-6 justify-center">
              <div className="w-12 h-12 bg-[#42331C] rounded-2xl flex items-center justify-center">
                <Search className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl text-[#42331C]">Onde Você Gostaria de Ir?</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {suggestions.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-[#385443] hover:shadow-lg transition-all duration-300 group flex flex-col items-center justify-center min-h-[120px]"
                >
                  <div className="text-center">
                    {item.icon && (
                      <item.icon className="w-8 h-8 text-[#42331C] group-hover:text-[#385443] mx-auto mb-3 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                    )}
                    <div className="text-[#42331C] font-semibold">{item.label}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => window.history.back()}
              className="px-8 py-4 border-2 border-[#42331C] text-[#42331C] rounded-xl hover:bg-[#42331C] hover:text-white transition-all flex items-center gap-2 font-bold"
            >
              <ArrowLeft className="w-5 h-5" strokeWidth={2} />
              Página Anterior
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
