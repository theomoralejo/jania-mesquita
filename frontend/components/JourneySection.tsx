import React from 'react';

import { Minus } from 'lucide-react';

export function JourneySection() {
  const phases = [
    {
      week: '01—02',
      phase: 'Auditoria Operacional',
      transformation: 'Da intuição aos dados',
      description: 'Diagnóstico completo da operação: mapeamento de processos, análise de margem, identificação de gargalos e perdas invisíveis.',
      deliverables: [
        'Relatório de auditoria operacional',
        'Mapa de processos críticos',
        'Análise de rentabilidade por serviço',
        'Identificação de vazamentos de margem'
      ]
    },
    {
      week: '03—04',
      phase: 'Arquitetura de Governança',
      transformation: 'Do caos à estrutura',
      description: 'Construção do modelo de governança: organograma funcional, protocolos de delegação, sistema de decisões e definição de KPIs estratégicos.',
      deliverables: [
        'Estrutura organizacional escalável',
        'Sistema de delegação e autonomia',
        'KPIs estratégicos definidos',
        'Protocolos de tomada de decisão'
      ]
    },
    {
      week: '05—06',
      phase: 'Implementação de Processos',
      transformation: 'Do tácito ao sistêmico',
      description: 'Documentação e otimização dos processos core: atendimento, operações, financeiro. O conhecimento se torna ativo operacional.',
      deliverables: [
        'Manuais operacionais implementados',
        'Fluxos otimizados e documentados',
        'Sistema de qualidade estabelecido',
        'Checklists e SOPs críticos'
      ]
    },
    {
      week: '07—08',
      phase: 'Dashboard de Inteligência',
      transformation: 'Da reação à previsibilidade',
      description: 'Implementação de sistema de métricas e inteligência de negócio. Dashboards executivos que permitem decisões estratégicas baseadas em dados reais.',
      deliverables: [
        'Dashboard executivo operacional',
        'Sistema de análise de margem',
        'Previsibilidade financeira estruturada',
        'Alertas de performance e desvios'
      ]
    },
    {
      week: '09',
      phase: 'Estratégia de Escala',
      transformation: 'Do operacional ao estratégico',
      description: 'Planejamento de crescimento sustentável: tese de expansão, modelagem financeira para escala, preparação para múltiplas unidades ou exit.',
      deliverables: [
        'Tese de crescimento validada',
        'Modelo de expansão desenhado',
        'Valuation e preparação para M&A',
        'Plano estratégico 12-24 meses'
      ]
    }
  ];

  return (
    <section id="jornada" className="section-padding bg-white relative overflow-hidden">
      {/* Geometric Accents */}
      <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-[#DFDCD4] to-transparent opacity-40"></div>
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#DFDCD4] to-transparent opacity-30"></div>
      
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="max-w-4xl mb-32">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-[#42331C]"></div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#42331C]">
              Jornada de 9 Semanas
            </span>
          </div>
          
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-12 leading-[1.05] tracking-tight text-[#232323]">
            A Transformação <span className="italic text-[#385443]">Progressiva</span>
          </h2>
          
          <p className="text-lg md:text-xl leading-relaxed max-w-3xl text-[#414141] font-light">
            Cada fase constrói sobre a anterior, criando uma <span className="bg-[#F2EFE8] px-1 text-[#385443] font-medium">jornada estruturada</span> do diagnóstico à estratégia de escala.
          </p>
        </div>

        {/* Phases - Editorial Timeline */}
        <div className="space-y-24">
          {phases.map((phase, index) => (
            <div 
              key={index} 
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 group"
            >
              {/* Week Number - Left Column */}
              <div className="lg:col-span-2">
                <div className="sticky top-32">
                  <div className="font-serif text-5xl mb-4 text-[#DFDCD4] group-hover:text-[#385443] transition-colors duration-700">
                    {phase.week}
                  </div>
                  <div className="flex items-center gap-3">
                    <Minus className="w-4 h-4 text-[#B6A689]" strokeWidth={1} />
                    <span className="text-xs font-bold tracking-[0.15em] uppercase text-[#B6A689]">
                      Semanas
                    </span>
                  </div>
                </div>
              </div>

              {/* Content - Right Column */}
              <div className="lg:col-span-10 border-l border-[#DFDCD4] pl-12 group-hover:border-[#385443] transition-colors duration-500">
                {/* Phase Title */}
                <h3 className="font-serif text-3xl md:text-4xl font-light mb-6 tracking-tight text-[#232323]">
                  {phase.phase}
                </h3>

                {/* Transformation Label */}
                <div className="inline-block mb-8 px-6 py-2 border border-[#DFDCD4] rounded-[7px] text-[#78877E] group-hover:border-[#385443] group-hover:text-[#385443] transition-colors">
                  <span className="text-xs tracking-wide font-bold uppercase">
                    {phase.transformation}
                  </span>
                </div>

                {/* Description */}
                <p className="text-lg font-light leading-relaxed mb-12 max-w-3xl text-[#414141]">
                  {phase.description}
                </p>

                {/* Deliverables */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Minus className="w-4 h-4 text-[#B6A689]" strokeWidth={1} />
                    <span className="text-xs font-bold tracking-[0.15em] uppercase text-[#B6A689]">
                      Entregas
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
                    {phase.deliverables.map((deliverable, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 mt-2 bg-[#385443] rounded-full opacity-40 group-hover:opacity-100 transition-opacity"></div>
                        <span className="text-sm font-light leading-relaxed text-[#696969]">
                          {deliverable}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="section-divider mt-32 mb-16 h-px bg-gradient-to-r from-transparent via-[#DFDCD4] to-transparent"></div>
        <div className="text-center">
          <p className="text-sm font-light text-[#78877E]">
            Implementação progressiva com{' '}
            <span className="font-bold text-[#385443]">acompanhamento semanal ao vivo</span>
          </p>
        </div>
      </div>
    </section>
  );
}
