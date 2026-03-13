import React from 'react';

import { Link } from 'react-router-dom';
import { Instagram, Linkedin } from 'lucide-react';
import Logo from '../imports/Logo1';

export function Footer() {
  return (
    <footer className="bg-white">

      {/* Footer Links - Dark Brown Theme from ID */}
      <div className="bg-[#31230D] text-[#F9F9F9]">
        <div className="container-custom px-[20px] py-[60px] md:py-20 md:px-[20px] pt-[80px] pr-[20px] pb-[30px] pl-[20px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 mb-[20px] border-b border-[#4D412F] pb-[20px]">
            {/* Logo & Description */}
            <div className="md:col-span-4">
              <Link to="/" className="inline-block mb-4 w-32 md:w-40">
                <Logo />
              </Link>
              <p className="text-sm font-light leading-relaxed mb-4 text-[rgb(215,215,215)] max-w-sm">
                Mentoria Executiva para Transformação de Clínicas de Saúde. Metodologia proprietária para construir governança e escalabilidade.
              </p>
              <div className="flex items-center gap-3">
                <a href="https://www.instagram.com/jania.mesquita" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center border border-[#E8E5DD]/40 rounded-full hover:bg-[#F9F9F9] hover:text-[#31230D] transition-all text-[#E8E5DD]">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://www.linkedin.com/in/j%C3%A2nia-mesquita-51423a132/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center border border-[#E8E5DD]/40 rounded-full hover:bg-[#F9F9F9] hover:text-[#31230D] transition-all text-[#E8E5DD]">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="mailto:contato@janiamesquita.com.br" className="text-xs font-light hover:underline text-[#E8E5DD] hover:text-[#FFFFFF] ml-2 transition-colors">
                  contato@janiamesquita.com.br
                </a>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="md:col-span-2 md:col-start- bg-[rgba(223,220,220,0)]">
              <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-[rgb(228,228,228)] mb-5">
                Serviços
              </h4>
              <ul className="space-y-3 text-sm font-light text-[#E8E5DD]">
                <li><Link to="/mentoria" className="hover:text-[#FFFFFF] transition-colors">Mentoria Executiva</Link></li>
                <li><Link to="/palestras" className="hover:text-[#FFFFFF] transition-colors">Palestras</Link></li>
                <li><Link to="/acervo" className="hover:text-[#FFFFFF] transition-colors">Acervo</Link></li>
                <li><Link to="/avaliacao" className="hover:text-[#FFFFFF] transition-colors">Avaliação Gratuita</Link></li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-[rgb(228,228,228)] mb-5">
                Institucional
              </h4>
              <ul className="space-y-3 text-sm font-light text-[#E8E5DD]">
                <li><Link to="/sobre" className="hover:text-[#FFFFFF] transition-colors">Sobre</Link></li>
                <li><Link to="/palestras" className="hover:text-[#FFFFFF] transition-colors">Palestras</Link></li>
                <li><Link to="/acervo" className="hover:text-[#FFFFFF] transition-colors">Acervo</Link></li>
                <li><Link to="/contato" className="hover:text-[#FFFFFF] transition-colors">Contato</Link></li>
                <li><Link to="/links" className="hover:text-[#FFFFFF] transition-colors">Links</Link></li>
                <li><Link to="/privacidade" className="hover:text-[#FFFFFF] transition-colors">Privacidade</Link></li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-[rgb(228,228,228)] mb-5">
                Newsletter
              </h4>
              <p className="text-xs font-light mb-4 leading-relaxed text-[rgb(215,215,215)]">
                Insights sobre governança e gestão de clínicas direto no seu e-mail.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="flex-1 px-3 py-2 bg-[#4D412F]/50 border border-[#6B5D47] text-[#FFFFFF] rounded-[5px] text-xs focus:border-[#E8E5DD] focus:outline-none transition-colors placeholder:text-[#C9B896]"
                />
                <button className="px-4 py-2 bg-[#E8E5DD] text-[#31230D] rounded-[5px] hover:bg-[#FFFFFF] transition-colors font-bold text-xs">
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs font-light text-[#C9B896]">
            <p className="flex flex-col md:flex-row items-center gap-1 text-center md:text-left">
              <span className="text-[rgb(215,215,215)]">CNPJ: 46.568.777/0001-58</span>
              <span className="hidden md:inline mx-2">|</span>
              <span className="text-[rgb(215,215,215)] text-center">MM Mesquita Servicos de Administracao LTDA</span>
            </p>
            <div className="flex items-center gap-6 mt-2 md:mt-0">
              <p className="text-[rgb(215,215,215)]">© {new Date().getFullYear()} Jania Mesquita</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}