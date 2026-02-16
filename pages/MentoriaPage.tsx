import React from 'react';

import { HeroMentoria } from '../components/HeroMentoria';
import { ProblemSection } from '../components/ProblemSection';
import { MethodologySection } from '../components/MethodologySection';
import { JourneySection } from '../components/JourneySection';
import { MaturityLevels } from '../components/MaturityLevels';
import { PricingSection } from '../components/PricingSection';
import { ROISection } from '../components/ROISection';
import { ArrowRight } from 'lucide-react';

export default function MentoriaPage() {
  return (
    <>
      <HeroMentoria />
      
      {/* Video Section - Player de vídeo */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-px h-64 bg-gradient-to-b from-transparent via-[#385443]/10 to-transparent"></div>
        
        <div className="max-w-[1218px] mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="w-12 h-px bg-[#385443]"></div>
                <span className="text-xs font-bold tracking-[0.22em] uppercase text-[#385443]">
                  Veja na prática
                </span>
                <div className="w-12 h-px bg-[#385443]"></div>
              </div>
              
              <h2 className="font-serif text-[42px] md:text-[52px] mb-6 leading-[1.05] tracking-tight text-[#232323]">
                Como funciona a{' '}
                <span className="italic text-[#385443]">mentoria</span>
              </h2>
              
              <p className="text-lg leading-relaxed text-[#42331C] max-w-2xl mx-auto">
                Assista e entenda como a mentoria transforma médicos em líderes de operações sustentáveis
              </p>
            </div>

            {/* Video Player Container */}
            <div className="relative group">
              {/* Accent border effect */}
              <div className="absolute -inset-4 bg-gradient-to-br from-[#385443]/5 to-transparent rounded-[12px] -z-10"></div>
              
              {/* Video wrapper */}
              <div className="relative aspect-video rounded-[7px] overflow-hidden bg-[#232323] shadow-2xl border border-[#385443]/20">
                {/* Placeholder - Substitua o src pelo link real do vídeo do YouTube/Vimeo */}
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Jania Mesquita - Mentoria"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              
              {/* Decorative corner accent */}
              <div className="absolute -bottom-3 -right-3 w-24 h-24 border-r-2 border-b-2 border-[#385443]/20 rounded-br-[7px] -z-10"></div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 text-center">
              <p className="text-base text-[#42331C] mb-6">
                Pronto para transformar sua operação?
              </p>
              <a 
                href="#diagnostico"
                className="inline-flex items-center gap-2 text-[#385443] hover:text-[#4a6655] transition-colors duration-300 group"
              >
                <span className="font-medium tracking-wide">Sabe por que não funciona sua operação?</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <ProblemSection />
      <MethodologySection />
      <JourneySection />
      <MaturityLevels />
      <PricingSection />
      <ROISection />
    </>
  );
}