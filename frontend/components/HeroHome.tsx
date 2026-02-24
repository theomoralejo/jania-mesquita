import React from 'react';

import { ArrowRight, Award } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import janiaImage from 'figma:asset/c456985b525ef9ca7d753f8d9c92aac5e84db191.png';
const janiaImage = `${import.meta.env.BASE_URL}assets/img/jania_9.webp`;

export function HeroHome() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center bg-[#F2EFE8] overflow-hidden">
      {/* Geometric Accent Lines */}
      <div className="absolute top-0 left-1/4 w-px h-64 bg-gradient-to-b from-transparent via-[#B6A689] to-transparent opacity-30"></div>
      <div className="absolute top-1/3 right-1/3 w-px h-96 bg-gradient-to-b from-transparent via-[#B6A689] to-transparent opacity-20"></div>
      <div className="absolute bottom-0 left-2/3 w-px h-80 bg-gradient-to-t from-transparent via-[#B6A689] to-transparent opacity-20"></div>
      
      {/* Subtle Warm Glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-white/60 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-[1218px] mx-auto relative z-10 px-[24px] md:px-12 py-[48px] md:py-24 pt-[98px] pr-[24px] pb-[48px] pl-[24px]">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Left Column - Text Content */}
          <div>
            {/* Editorial Label com Badge */}
            <div 
              className={`mb-6 md:mb-8 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex items-center gap-4 flex-wrap">
                <div className="inline-flex items-center gap-3">
                  <div className="w-12 h-px bg-[#42331C]"></div>
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#42331C]">
                    Jania Mesquita
                  </span>
                </div>
                {/* Best Seller Badge */}
                <div className="bg-[#42331C] text-[#F2EFE8] text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border border-[#B6A689] flex items-center gap-2">
                  <Award className="w-3 h-3" />
                  Best Seller
                </div>
              </div>
            </div>
            
            {/* Main Heading - DOR do Cliente */}
            <h1 
              className={`font-serif text-3xl md:text-[48px] lg:text-[56px] mb-6 leading-[1.05] tracking-tight text-[#232323] transition-all duration-1000 delay-150 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Por que sua clínica ainda{' '}
              <span className="italic text-[#385443]">depende só de você?</span>
            </h1>
            
            {/* Subtitle - Autoridade */}
            <p 
              className={`text-lg md:text-xl max-w-xl mb-4 leading-relaxed text-[#414141] transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Transforme sua operação de artesanal para escalável. Liderança, governança e processos 
              que funcionam sem você presente.
            </p>

            <p
              className={`text-base max-w-xl mb-8 md:mb-10 leading-relaxed text-[#696969] transition-all duration-1000 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Mais de 15 anos de experiência em gestão e governança na saúde. Autora best-seller e mentora de líderes que transformam clínicas em operações escaláveis.
            </p>
            
            {/* CTA Buttons - Foco em Diagnóstico */}
            <div 
              className={`flex flex-col gap-4 mb-12 md:mb-16 transition-all duration-1000 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <Link
                to="/avaliacao"
                className="group px-10 py-5 bg-[#385443] text-[#FFFFFF] rounded-[7px] transition-all duration-300 hover:bg-[#4a6655] hover:shadow-xl hover:-translate-y-1 font-bold tracking-wide flex items-center justify-center gap-3 text-center"
              >
                <span>Faça seu Diagnóstico Gratuito</span>
                <ArrowRight 
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                  strokeWidth={2.5} 
                />
              </Link>
              
              <Link 
                to="/sobre"
                className="px-10 py-4 border-2 border-[#385443] text-[#385443] rounded-[7px] transition-all duration-300 hover:bg-[#385443] hover:text-[#FFFFFF] font-medium tracking-wide flex items-center justify-center"
              >
                Conheça minha trajetória
              </Link>
            </div>

            {/* Social Proof Rápido */}
            <div 
              className={`flex items-center gap-8 text-sm text-[#696969] transition-all duration-1000 delay-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#F2EFE8] bg-[#385443] text-white flex items-center justify-center text-xs font-bold">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-[#232323] font-medium">200+ clínicas transformadas</span>
              </div>
            </div>
          </div>

          {/* Right Column - Image Placeholder */}
          <div 
            className={`relative transition-all duration-1000 delay-300 order-first lg:order-last ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            {/* Image Container com Frame Editorial */}
            <div className="relative max-w-[300px] lg:max-w-none mx-auto lg:mx-0">
              {/* Geometric Frame Accent */}
              <div className="absolute -top-6 -left-6 w-full h-full border-t-2 border-l-2 border-[#385443] opacity-20 pointer-events-none"></div>
              <div className="absolute -bottom-6 -right-6 w-full h-full border-b-2 border-r-2 border-[#42331C] opacity-20 pointer-events-none"></div>
              
              {/* Image Placeholder */}
              <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#DFDCD4] to-[#E8E5DC] flex items-center justify-center rounded-[3px]">
                <img src={janiaImage} alt="Jania Mesquita" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats - Autoridade */}
        <div 
          className={`mt-10 md:mt-24 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#B6CBBE] to-transparent mb-6 md:mb-12"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {/* Stat 1 */}
            <div className="text-center md:text-left">
              <div className="font-serif text-2xl md:text-5xl text-[#385443] mb-1 md:mb-2">+100mil</div>
              <div className="text-[10px] md:text-xs font-bold tracking-[0.15em] text-[#696969] uppercase">
                Profissionais Impactados
              </div>
            </div>

            {/* Stat 2 */}
            <div className="text-center md:text-left">
              <div className="font-serif text-2xl md:text-5xl text-[#385443] mb-1 md:mb-2">+200</div>
              <div className="text-[10px] md:text-xs font-bold tracking-[0.15em] text-[#696969] uppercase">
                Equipes Desenvolvidas
              </div>
            </div>

            {/* Stat 3 */}
            <div className="text-center md:text-left">
              <div className="font-serif text-2xl md:text-5xl text-[#385443] mb-1 md:mb-2">+15</div>
              <div className="text-[10px] md:text-xs font-bold tracking-[0.15em] text-[#696969] uppercase">
                Anos de Experiência
              </div>
            </div>

            {/* Stat 4 */}
            <div className="text-center md:text-left">
              <div className="font-serif text-2xl md:text-5xl text-[#385443] mb-1 md:mb-2">98%</div>
              <div className="text-[10px] md:text-xs font-bold tracking-[0.15em] text-[#696969] uppercase">
                Satisfação
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}