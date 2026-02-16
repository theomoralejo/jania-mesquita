import React from 'react';

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Minus } from 'lucide-react';
import Logo from '../imports/Logo1';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#F2EFE8]/95 backdrop-blur-md shadow-sm' 
          : 'bg-transparent backdrop-blur-none'
      }`}
      style={{
        borderBottom: scrolled 
          ? '1px solid #DFDCD4' 
          : '1px solid transparent'
      }}
    >
      <div className="container-custom px-6 md:px-0">
        <div className={`flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'h-20' : 'h-24'
        }`}>
          {/* Logo */}
          <Link to="/" className="group relative z-10 block w-40 md:w-48" style={{ '--fill-0': '#42331C' } as React.CSSProperties}>
             <Logo />
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <Link 
              to="/" 
              className={`relative text-sm font-medium tracking-wide transition-colors duration-300 group ${
                isActive('/') 
                  ? 'text-[#385443]' 
                  : 'text-[#696969] hover:text-[#385443]'
              }`}
            >
              Home
              {isActive('/') && (
                <div className="absolute -bottom-2 left-0 right-0 h-px bg-[#385443]"></div>
              )}
            </Link>

            <Link 
              to="/mentoria" 
              className={`relative text-sm font-medium tracking-wide transition-colors duration-300 group ${
                isActive('/mentoria') 
                  ? 'text-[#385443]' 
                  : 'text-[#696969] hover:text-[#385443]'
              }`}
            >
              Mentoria
              {isActive('/mentoria') && (
                <div className="absolute -bottom-2 left-0 right-0 h-px bg-[#385443]"></div>
              )}
            </Link>

            <Link 
              to="/palestras" 
              className={`relative text-sm font-medium tracking-wide transition-colors duration-300 group ${
                isActive('/palestras') 
                  ? 'text-[#385443]' 
                  : 'text-[#696969] hover:text-[#385443]'
              }`}
            >
              Palestras
              {isActive('/palestras') && (
                <div className="absolute -bottom-2 left-0 right-0 h-px bg-[#385443]"></div>
              )}
            </Link>

            <Link 
              to="/acervo" 
              className={`relative text-sm font-medium tracking-wide transition-colors duration-300 group ${
                isActive('/acervo') 
                  ? 'text-[#385443]' 
                  : 'text-[#696969] hover:text-[#385443]'
              }`}
            >
              Acervo
              {isActive('/acervo') && (
                <div className="absolute -bottom-2 left-0 right-0 h-px bg-[#385443]"></div>
              )}
            </Link>

            <Link 
              to="/sobre" 
              className={`relative text-sm font-medium tracking-wide transition-colors duration-300 group ${
                isActive('/sobre') 
                  ? 'text-[#385443]' 
                  : 'text-[#696969] hover:text-[#385443]'
              }`}
            >
              Sobre
              {isActive('/sobre') && (
                <div className="absolute -bottom-2 left-0 right-0 h-px bg-[#385443]"></div>
              )}
            </Link>

            <Link 
              to="/blog" 
              className={`relative text-sm font-medium tracking-wide transition-colors duration-300 group ${
                isActive('/blog') 
                  ? 'text-[#385443]' 
                  : 'text-[#696969] hover:text-[#385443]'
              }`}
            >
              Blog
              {isActive('/blog') && (
                <div className="absolute -bottom-2 left-0 right-0 h-px bg-[#385443]"></div>
              )}
            </Link>

            <Link
              to="/na-midia"
              className={`relative text-sm font-medium tracking-wide transition-colors duration-300 group ${
                isActive('/na-midia')
                  ? 'text-[#385443]'
                  : 'text-[#696969] hover:text-[#385443]'
              }`}
            >
              Na Mídia
              {isActive('/na-midia') && (
                <div className="absolute -bottom-2 left-0 right-0 h-px bg-[#385443]"></div>
              )}
            </Link>

            <Link
              to="/avaliacao"
              className={`relative text-sm font-medium tracking-wide transition-colors duration-300 group ${
                isActive('/avaliacao')
                  ? 'text-[#385443]'
                  : 'text-[#696969] hover:text-[#385443]'
              }`}
            >
              Avaliação
              {isActive('/avaliacao') && (
                <div className="absolute -bottom-2 left-0 right-0 h-px bg-[#385443]"></div>
              )}
            </Link>

            <div className="w-px h-6 bg-[#DFDCD4] mx-2"></div>

            <Link 
              to="/contato" 
              className="px-6 py-2.5 border border-[#385443] text-[#385443] rounded-[7px] text-sm font-bold tracking-wide transition-all duration-300 hover:bg-[#385443] hover:text-white"
            >
              Contato
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors z-50 relative ${
               mobileMenuOpen ? 'text-[#232323]' : 'text-[#414141] hover:bg-[#DFDCD4]'
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" strokeWidth={1.5} />
            ) : (
              <Menu className="w-6 h-6" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden fixed inset-0 bg-[#F2EFE8] z-40 transition-all duration-700 ${
          mobileMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
          <Link 
            to="/" 
            className="font-serif text-3xl text-[#232323]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/mentoria" 
            className="font-serif text-3xl text-[#232323]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Mentoria
          </Link>
          <Link 
            to="/palestras" 
            className="font-serif text-3xl text-[#232323]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Palestras
          </Link>
          <Link 
            to="/acervo" 
            className="font-serif text-3xl text-[#232323]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Acervo
          </Link>
          <Link 
            to="/sobre" 
            className="font-serif text-3xl text-[#232323]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Sobre
          </Link>

          <Link 
            to="/blog" 
            className="font-serif text-3xl text-[#232323]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Blog
          </Link>

          <Link 
            to="/na-midia" 
            className="font-serif text-3xl text-[#232323]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Na Mídia
          </Link>

          <Link 
            to="/contato" 
            className="px-10 py-4 bg-[#385443] text-white rounded-[7px] text-lg font-bold mt-4"
            onClick={() => setMobileMenuOpen(false)}
          >
            Entre em Contato
          </Link>
        </div>
      </div>
    </nav>
  );
}