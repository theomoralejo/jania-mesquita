import React from 'react';

import { ArrowRight, Users, Target, TrendingUp, Award } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export function HeroMentoria() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const quickWins = [
    { icon: Users, text: 'Equipe autônoma em 90 dias' },
    { icon: Target, text: 'Processos claros e replicáveis' },
    { icon: TrendingUp, text: 'Operação escalável sem você' }
  ];

  return (
    <section className="relative min-h-[95vh] flex items-center bg-[#F2EFE8] overflow-hidden pt-[40px] pr-[0px] pb-[0px] pl-[0px]">
      {/* Geometric Accent Lines */}
      <div className="absolute top-0 left-1/4 w-px h-64 bg-gradient-to-b from-transparent via-[#B6A689] to-transparent opacity-30"></div>
      <div className="absolute top-1/3 right-1/3 w-px h-96 bg-gradient-to-b from-transparent via-[#B6A689] to-transparent opacity-20"></div>
      <div className="absolute bottom-0 right-1/4 w-px h-80 bg-gradient-to-t from-transparent via-[#B6A689] to-transparent opacity-20"></div>
      
      {/* Warm Glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-white/60 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-[1218px] mx-auto relative z-10 px-6 md:px-12 py-20">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column - Text (7 cols) */}
          <div className="lg:col-span-7">
            {/* Kicker com Badge */}
            <div 
              className={`mb-4 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex items-center gap-4 flex-wrap">
                <div className="inline-flex items-center gap-3">
                  <div className="w-12 h-px bg-[#42331C]"></div>
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#42331C]">
                    Mentoria Executiva
                  </span>
                </div>
                <div className="bg-[#385443] text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1.5">
                  <Award className="w-3 h-3" />
                  Vagas Limitadas
                </div>
              </div>
            </div>
            
            {/* Main Headline - DOR específica */}
            <h1 
              className={`font-serif text-[46px] md:text-[52px] lg:text-[58px] mb-4 leading-[1.05] tracking-tight text-[#232323] transition-all duration-1000 delay-150 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Transforme sua clínica em uma{' '}
              <span className="italic text-[#385443]">operação escalável</span>
            </h1>
            
            {/* Value Prop */}
            <p 
              className={`text-xl md:text-2xl max-w-2xl mb-6 leading-relaxed text-[#232323] transition-all duration-1000 delay-250 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Pare de apagar incêndios. Construa governança, processos e liderança 
              que funcionam sem você presente.
            </p>

            {/* Mobile Only: Visual Stats Card */}
            <div className={`lg:hidden mb-8 transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="relative">
                {/* Geometric Frame */}
                <div className="absolute -top-3 -left-3 w-full h-full border-t-2 border-l-2 border-[#385443] opacity-20 pointer-events-none rounded-[7px]"></div>
                <div className="absolute -bottom-3 -right-3 w-full h-full border-b-2 border-r-2 border-[#42331C] opacity-20 pointer-events-none rounded-[7px]"></div>
                
                {/* Card */}
                <div className="relative bg-white border-2 border-[#DFDCD4] rounded-[7px] p-6 shadow-xl">
                  {/* Card Header */}
                  <div className="mb-6 pb-6 border-b border-[#DFDCD4]">
                    <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B6A689] mb-2">
                      Resultados Comprovados
                    </div>
                    <h3 className="font-serif text-xl text-[#232323] leading-tight">
                      Transformação mensurável em{' '}
                      <span className="text-[#385443]">6 meses</span>
                    </h3>
                  </div>

                  {/* Stats Grid */}
                  <div className="space-y-4">
                    <div className="flex items-baseline gap-3">
                      <div className="font-serif text-4xl text-[#385443]">200+</div>
                      <div className="text-xs text-[#696969] leading-tight">
                        Clínicas transformadas
                      </div>
                    </div>
                    <div className="h-px bg-[#DFDCD4]"></div>
                    <div className="flex items-baseline gap-3">
                      <div className="font-serif text-4xl text-[#385443]">3.2x</div>
                      <div className="text-xs text-[#696969] leading-tight">
                        Crescimento (12 meses)
                      </div>
                    </div>
                    <div className="h-px bg-[#DFDCD4]"></div>
                    <div className="flex items-baseline gap-3">
                      <div className="font-serif text-4xl text-[#385443]">98%</div>
                      <div className="text-xs text-[#696969] leading-tight">
                        Implementação efetiva
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p 
              className={`text-base max-w-2xl mb-6 leading-relaxed text-[#696969] transition-all duration-1000 delay-350 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Programa de 6 meses com acompanhamento semanal. Diagnóstico completo, 
              implementação guiada e resultados mensuráveis. Apenas 15 vagas por turma.
            </p>
            
            {/* Quick Wins - Visual */}
            <div 
              className={`mb-6 pb-6 border-b border-[#DFDCD4] transition-all duration-1000 delay-450 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {quickWins.map((win, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white border border-[#DFDCD4] rounded-full flex items-center justify-center flex-shrink-0">
                      <win.icon className="w-5 h-5 text-[#385443]" strokeWidth={1.5} />
                    </div>
                    <span className="text-sm text-[#414141] leading-tight pt-2">
                      {win.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div 
              className={`flex flex-col gap-4 mb-8 transition-all duration-1000 delay-550 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <Link 
                to="#aplicar"
                className="group px-10 py-5 bg-[#385443] text-white rounded-[7px] transition-all duration-300 hover:bg-[#4a6655] hover:shadow-2xl hover:-translate-y-1 font-bold tracking-wide flex items-center justify-center gap-3"
              >
                <span>Aplicar para a Mentoria</span>
                <ArrowRight 
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                  strokeWidth={2.5} 
                />
              </Link>
              
              <Link 
                to="#como-funciona"
                className="px-10 py-4 border-2 border-[#385443] text-[#385443] rounded-[7px] transition-all duration-300 hover:bg-[#385443] hover:text-white font-medium tracking-wide flex items-center justify-center"
              >
                Como funciona o programa
              </Link>
            </div>

            {/* Trust Indicators */}
            <div 
              className={`flex flex-wrap items-center gap-6 md:gap-8 text-sm text-[#696969] transition-all duration-1000 delay-650 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#385443] rounded-full"></div>
                <span className="text-[#232323] font-medium">6 meses de acompanhamento</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#385443] rounded-full"></div>
                <span className="text-[#232323] font-medium">Sessões semanais ao vivo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#385443] rounded-full"></div>
                <span className="text-[#232323] font-medium">15 vagas/turma</span>
              </div>
            </div>
          </div>

          {/* Right Column - Stats Card (5 cols) */}
          <div 
            className={`lg:col-span-5 transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="relative">
              {/* Geometric Frame */}
              <div className="absolute -top-4 -left-4 w-full h-full border-t-2 border-l-2 border-[#385443] opacity-20 pointer-events-none rounded-[7px]"></div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border-b-2 border-r-2 border-[#42331C] opacity-20 pointer-events-none rounded-[7px]"></div>
              
              {/* Card */}
              <div className="relative bg-white border-2 border-[#DFDCD4] rounded-[7px] p-8 md:p-10 shadow-xl">
                {/* Card Header */}
                <div className="mb-8 pb-8 border-b border-[#DFDCD4]">
                  <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#B6A689] mb-3">
                    Resultados Comprovados
                  </div>
                  <h3 className="font-serif text-2xl text-[#232323] leading-tight">
                    Transformação mensurável em{' '}
                    <span className="text-[#385443]">6 meses</span>
                  </h3>
                </div>

                {/* Stats Grid */}
                <div className="space-y-6">
                  <div className="flex items-baseline gap-3">
                    <div className="font-serif text-5xl text-[#385443]">200+</div>
                    <div className="text-sm text-[#696969] leading-tight">
                      Clínicas transformadas nos últimos 5 anos
                    </div>
                  </div>

                  <div className="h-px bg-[#DFDCD4]"></div>

                  <div className="flex items-baseline gap-3">
                    <div className="font-serif text-5xl text-[#385443]">3.2x</div>
                    <div className="text-sm text-[#696969] leading-tight">
                      Crescimento médio de faturamento (12 meses)
                    </div>
                  </div>

                  <div className="h-px bg-[#DFDCD4]"></div>

                  <div className="flex items-baseline gap-3">
                    <div className="font-serif text-5xl text-[#385443]">98%</div>
                    <div className="text-sm text-[#696969] leading-tight">
                      Dos mentorados implementam processos estruturados
                    </div>
                  </div>

                  <div className="h-px bg-[#DFDCD4]"></div>

                  <div className="flex items-baseline gap-3">
                    <div className="font-serif text-5xl text-[#385443]">-67%</div>
                    <div className="text-sm text-[#696969] leading-tight">
                      Redução média de dependência do fundador
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-8 pt-6 border-t border-[#DFDCD4]">
                  <p className="text-xs text-[#696969] leading-relaxed">
                    * Média calculada com base em clínicas mentoradas entre 2020-2024. 
                    Resultados individuais podem variar conforme comprometimento e implementação.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Bar */}
        <div 
          className={`mt-20 pt-12 border-t border-[#DFDCD4] transition-all duration-1000 delay-750 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
            <div>
              <div className="text-xs font-bold tracking-[0.15em] uppercase text-[#B6A689] mb-2">
                Formato
              </div>
              <div className="text-base text-[#232323] font-medium">
                Online, presencial ou híbrido
              </div>
            </div>
            <div>
              <div className="text-xs font-bold tracking-[0.15em] uppercase text-[#B6A689] mb-2">
                Duração
              </div>
              <div className="text-base text-[#232323] font-medium">
                6 Meses Intensivos
              </div>
            </div>
            <div>
              <div className="text-xs font-bold tracking-[0.15em] uppercase text-[#B6A689] mb-2">
                Frequência
              </div>
              <div className="text-base text-[#232323] font-medium">
                Sessões Semanais
              </div>
            </div>
            <div>
              <div className="text-xs font-bold tracking-[0.15em] uppercase text-[#B6A689] mb-2">
                Limite
              </div>
              <div className="text-base text-[#232323] font-medium">
                15 Vagas/Turma
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}