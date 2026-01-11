import { useState } from 'react';
import { Target, Users, Settings, BarChart3, TrendingUp, Minus, ArrowRight } from 'lucide-react';

export function MethodologySection() {
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      icon: Target,
      number: '01',
      title: 'Estratégia',
      subtitle: 'Clareza de Negócio',
      description: 'Definição do modelo de negócio, posicionamento competitivo e arquitetura de valor. Você vai entender sua clínica como um ativo, não como uma prática artesanal.',
      outcomes: [
        'Modelo de negócio documentado',
        'Posicionamento estratégico definido',
        'Proposta de valor quantificada',
        'Roadmap de evolução empresarial'
      ]
    },
    {
      icon: Users,
      number: '02',
      title: 'Liderança',
      subtitle: 'Estrutura Organizacional',
      description: 'Construção de estrutura organizacional escalável, delegação efetiva e desenvolvimento de líderes operacionais que substituem o "dono gargalo".',
      outcomes: [
        'Organograma funcional e escalável',
        'Protocolos de delegação e autonomia',
        'Sistema de desenvolvimento de líderes',
        'Cultura organizacional codificada'
      ]
    },
    {
      icon: Settings,
      number: '03',
      title: 'Processos',
      subtitle: 'Implementação Operacional',
      description: 'Mapeamento, otimização e documentação de processos críticos. Transformação do conhecimento tácito em ativos operacionais replicáveis.',
      outcomes: [
        'Processos core documentados',
        'Fluxos otimizados e padronizados',
        'Manuais operacionais implementados',
        'Sistema de qualidade estabelecido'
      ]
    },
    {
      icon: BarChart3,
      number: '04',
      title: 'Métricas',
      subtitle: 'Governança por Dados',
      description: 'Implementação de KPIs estratégicos, dashboards de gestão e sistema de inteligência de negócio que permite decisões baseadas em dados, não em intuição.',
      outcomes: [
        'Dashboard executivo implementado',
        'KPIs estratégicos definidos e monitorados',
        'Sistema de análise de margem e rentabilidade',
        'Previsibilidade financeira estabelecida'
      ]
    },
    {
      icon: TrendingUp,
      number: '05',
      title: 'Expansão',
      subtitle: 'Crescimento Sustentável',
      description: 'Desenvolvimento de tese de crescimento, modelagem de escalabilidade e preparação para múltiplas unidades ou exit estratégico.',
      outcomes: [
        'Tese de crescimento validada',
        'Modelo de expansão desenhado',
        'Valuation e preparação para M&A',
        'Estratégia de escala definida'
      ]
    }
  ];

  return (
    <section id="metodologia" className="py-12 md:py-24 bg-white relative overflow-hidden px-6 md:px-[24px]">
      {/* Geometric Accents */}
      <div className="absolute top-1/4 left-0 w-px h-96 bg-gradient-to-b from-transparent via-[#DFDCD4] to-transparent opacity-60"></div>
      <div className="absolute bottom-1/4 right-0 w-px h-80 bg-gradient-to-t from-transparent via-[#DFDCD4] to-transparent opacity-60"></div>
      
      <div className="container-custom relative z-10">
        {/* Header - Editorial */}
        <div className="max-w-4xl mb-12 md:mb-20">
          <div className="inline-flex items-center gap-3 mb-6 md:mb-8">
            <div className="w-8 h-px bg-[#42331C]"></div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#42331C]">
              Metodologia Proprietária
            </span>
          </div>
          
          <h2 className="font-serif text-3xl md:text-5xl lg:text-7xl mb-6 md:mb-[28px] leading-[1.05] tracking-tight text-[#232323]">
            Cinco Pilares <span className="italic text-[#385443]">Integrados</span>
          </h2>
          
          <p className="text-lg md:text-xl leading-relaxed max-w-3xl text-[#414141] font-light">
            Metodologia proprietária de transformação empresarial para clínicas de saúde.{' '}
            <span className="bg-[#F2EFE8] px-1 text-[#385443] font-medium">5 pilares integrados</span> que cobrem toda a jornada do modelo artesanal ao escalável.
          </p>
        </div>

        {/* Pillars Grid - Horizontal Scroll on Mobile */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-5 gap-4 md:gap-px bg-transparent md:bg-[#DFDCD4] mb-12 md:mb-24 pb-4 md:pb-0 md:border md:border-[#DFDCD4]">
          {pillars.map((pillar, index) => (
            <button
              key={index}
              onClick={() => setActivePillar(index)}
              className={`relative p-6 md:p-10 transition-all duration-700 group text-left min-w-[280px] md:min-w-0 rounded-[7px] md:rounded-none border md:border-none border-[#DFDCD4] ${
                activePillar === index
                  ? 'bg-[#385443] text-[#F9F9F9]'
                  : 'bg-white text-[#232323] hover:bg-[#F2EFE8]'
              }`}
            >
              {/* Icon */}
              <div className={`w-8 h-8 md:w-10 md:h-10 mb-6 md:mb-8 transition-all duration-700 ${
                activePillar === index 
                  ? 'text-[#F9F9F9]' 
                  : 'text-[#385443] opacity-80 group-hover:opacity-100'
              }`}>
                <pillar.icon className="w-full h-full" strokeWidth={1.5} />
              </div>
              
              {/* Number */}
              <div className={`font-serif text-4xl md:text-5xl font-light mb-4 tracking-tight transition-all duration-700 ${
                activePillar === index 
                  ? 'opacity-100' 
                  : 'opacity-20 group-hover:opacity-40'
              }`}>
                {pillar.number}
              </div>
              
              {/* Title */}
              <div className={`text-sm font-bold mb-1 tracking-wide transition-all duration-700 uppercase ${
                activePillar === index 
                  ? 'opacity-100' 
                  : 'opacity-60 group-hover:opacity-100'
              }`}>
                {pillar.title}
              </div>
              
              {/* Subtitle */}
              <div className={`text-xs font-light tracking-wide transition-all duration-700 ${
                activePillar === index 
                  ? 'opacity-80' 
                  : 'opacity-40 group-hover:opacity-60'
              }`}>
                {pillar.subtitle}
              </div>

              {/* Active Indicator (Desktop only) */}
              {activePillar === index && (
                <div className="hidden md:block absolute bottom-0 left-0 right-0 h-1.5 bg-[#42331C]"></div>
              )}
            </button>
          ))}
        </div>

        {/* Active Pillar Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 mb-12 md:mb-24">
          {/* Description */}
          <div className="lg:col-span-7 space-y-8 md:space-y-12">
            {/* Label */}
            <div className="flex items-center gap-4">
              <Minus className="w-5 h-5 text-[#B6A689]" strokeWidth={1} />
              <span className="text-xs font-bold tracking-[0.15em] uppercase text-[#B6A689]">
                Pilar {pillars[activePillar].number}
              </span>
            </div>

            <div>
              <h3 className="font-serif text-3xl md:text-5xl font-light mb-4 md:mb-8 leading-tight tracking-tight text-[#232323]">
                {pillars[activePillar].title}
                <span className="block text-xl md:text-2xl mt-3 text-[#614D35] font-sans font-light">
                  {pillars[activePillar].subtitle}
                </span>
              </h3>
              
              <p className="text-base md:text-xl leading-relaxed text-[#414141] font-light">
                {pillars[activePillar].description}
              </p>
            </div>

            {/* Progress */}
            <div className="relative">
              <div className="h-px bg-[#DFDCD4]"></div>
              <div 
                className="absolute top-0 left-0 h-px bg-[#385443] transition-all duration-1000"
                style={{ width: `${((activePillar + 1) / pillars.length) * 100}%` }}
              ></div>
              <div className="mt-4 flex items-center justify-between text-xs text-[#78877E] uppercase tracking-wider font-bold">
                <span>{activePillar + 1} de {pillars.length}</span>
                <button 
                  onClick={() => setActivePillar((activePillar + 1) % pillars.length)}
                  className="flex items-center gap-2 hover:gap-3 transition-all duration-300 hover:text-[#385443]"
                >
                  Próximo
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>

          {/* Outcomes - Minimal List */}
          <div className="lg:col-span-5">
            <div className="bg-[#F2EFE8] p-6 md:p-10 rounded-[9px] border border-[#DFDCD4]">
              <div className="text-xs font-bold tracking-[0.15em] uppercase mb-6 md:mb-8 text-[#614D35]">
                Entregas Concretas
              </div>
              
              <div className="space-y-4 md:space-y-6">
                {pillars[activePillar].outcomes.map((outcome, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-1.5 h-1.5 mt-2 bg-[#385443] rounded-full opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0"></div>
                    <span className="leading-relaxed font-light text-[#414141] text-sm md:text-base">
                      {outcome}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}