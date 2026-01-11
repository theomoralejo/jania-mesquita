import { ArrowRight, Minus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#F2EFE8] overflow-hidden">
      {/* Geometric Accent Lines - Subtle Brown/Beige */}
      <div className="absolute top-0 left-1/4 w-px h-64 bg-gradient-to-b from-transparent via-[#B6A689] to-transparent opacity-30"></div>
      <div className="absolute top-1/3 right-1/3 w-px h-96 bg-gradient-to-b from-transparent via-[#B6A689] to-transparent opacity-20"></div>
      <div className="absolute bottom-0 left-2/3 w-px h-80 bg-gradient-to-t from-transparent via-[#B6A689] to-transparent opacity-20"></div>
      
      {/* Subtle Light/Warm Glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-white/60 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-[1218px] mx-auto relative z-10 px-6 md:px-12 py-20 md:py-24 lg:py-28">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Text Content */}
          <div>
            {/* Editorial Label */}
            <div 
              className={`mb-8 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="inline-flex items-center gap-3">
                  <div className="w-12 h-px bg-[#42331C]"></div>
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#42331C]">
                    Executive Mentorship
                  </span>
                </div>
                {/* Best Seller Badge */}
                <div className="bg-[#42331C] text-[#F2EFE8] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-[#B6A689]">
                  Best Seller
                </div>
              </div>
            </div>
            
            {/* Main Heading - Sogo Font */}
            <h1 
              className={`font-serif text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-6 leading-[1.1] tracking-tight text-[#232323] transition-all duration-1000 delay-150 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Gestão e liderança <br />
              <span className="text-[#385443]">descomplicada;</span> <br />
              resultados assertivos.
            </h1>
            
            {/* Subtitle */}
            <p 
              className={`text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-light text-[#414141] transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Aprenda a destravar o engajamento e o potencial da sua equipe, através do know-how de quem trabalha há mais de 15 anos com gestão de alta performance.
            </p>
            
            {/* CTA Buttons - Green Palette */}
            <div 
              className={`flex flex-col gap-5 transition-all duration-1000 delay-450 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <Link 
                to="/mentoria-lpv"
                className="group px-8 py-4 bg-[#385443] text-[#F9F9F9] rounded-[7px] transition-all duration-300 hover:bg-[#4a6655] hover:shadow-lg hover:-translate-y-0.5 font-bold tracking-wide flex items-center justify-center gap-3"
              >
                <span className="whitespace-nowrap">Sabe por que não funciona sua operação?</span>
                <ArrowRight 
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                  strokeWidth={2} 
                />
              </Link>
              
              <Link 
                to="/sobre"
                className="px-10 py-4 border border-[#385443] text-[#385443] rounded-[7px] transition-all duration-300 hover:bg-[#DFDCD4] hover:-translate-y-0.5 font-medium tracking-wide flex items-center justify-center whitespace-nowrap"
              >
                Sobre Jania Mesquita
              </Link>
            </div>
          </div>

          {/* Right Column - Image */}
          <div 
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            {/* Image Container with Editorial Frame */}
            <div className="relative">
              {/* Geometric Frame Accent */}
              <div className="absolute -top-6 -left-6 w-full h-full border-t-2 border-l-2 border-[#385443] opacity-20 pointer-events-none"></div>
              <div className="absolute -bottom-6 -right-6 w-full h-full border-b-2 border-r-2 border-[#42331C] opacity-20 pointer-events-none"></div>
              
              {/* Image Placeholder */}
              <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#DFDCD4] to-[#E8E5DC] flex items-center justify-center">
                <div className="text-center px-8">
                  <div className="w-24 h-24 mx-auto mb-4 border-2 border-[#385443]/20 rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 bg-[#385443]/10 rounded-full"></div>
                  </div>
                  <p className="text-sm tracking-wide text-[#42331C]/40 uppercase">Imagem</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats - Below the two columns */}
        <div 
          className={`mt-32 transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#B6CBBE] to-transparent mb-16"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-[#DFDCD4] pt-12 md:border-t-0 md:pt-0">
            {/* Stat 1 */}
            <div className="group">
              <div className="font-serif text-5xl md:text-6xl text-[#614D35] mb-2">+100mil</div>
              <div className="text-sm font-bold tracking-wide text-[#614D35] uppercase">
                Funcionários Liderados
              </div>
            </div>

            {/* Stat 2 */}
            <div className="group">
              <div className="font-serif text-5xl md:text-6xl text-[#614D35] mb-2">+200</div>
              <div className="text-sm font-bold tracking-wide text-[#614D35] uppercase">
                Equipes Geridas
              </div>
            </div>

            {/* Stat 3 */}
            <div className="group">
              <div className="font-serif text-5xl md:text-6xl text-[#614D35] mb-2">+15 Anos</div>
              <div className="text-sm font-bold tracking-wide text-[#614D35] uppercase">
                Experiência em Gestão
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}