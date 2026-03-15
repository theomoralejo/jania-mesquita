import React from 'react';

import { useState, useRef } from 'react';
import { AlertTriangle, Activity, TrendingUp, Target, Award, ChevronRight, Check } from 'lucide-react';

export function MaturityLevels() {
  const [activeLevel, setActiveLevel] = useState(0);
  const detailsRef = useRef<HTMLDivElement>(null);

  const levels = [
    {
      level: 1,
      title: 'Caótico',
      subtitle: 'Operação Artesanal',
      icon: AlertTriangle,
      characteristics: [
        'Processos não documentados',
        'Dependência total do dono',
        'Sem métricas de gestão',
        'Decisões por intuição',
        'Margem imprevisível'
      ],
      description: 'A clínica funciona, mas é refém do conhecimento tácito do fundador. Cada decisão exige sua presença. Crescimento significa mais caos.'
    },
    {
      level: 2,
      title: 'Reativo',
      subtitle: 'Gestão por Crise',
      icon: Activity,
      characteristics: [
        'Alguns processos informais',
        'Delegação inconsistente',
        'Métricas básicas (faturamento)',
        'Apagar incêndios é rotina',
        'Lucro existe, mas instável'
      ],
      description: 'Existe alguma estrutura, mas a operação ainda depende fortemente de intervenções constantes. Previsibilidade baixa.'
    },
    {
      level: 3,
      title: 'Estruturado',
      subtitle: 'Processos Definidos',
      icon: TrendingUp,
      characteristics: [
        'Processos principais documentados',
        'Delegação funcional estabelecida',
        'Dashboard com KPIs básicos',
        'Planejamento trimestral',
        'Margem previsível'
      ],
      description: 'A operação tem estrutura. Processos core funcionam sem intervenção direta. O dono começa a trabalhar ON e não apenas IN.'
    },
    {
      level: 4,
      title: 'Gerenciado',
      subtitle: 'Governança Ativa',
      icon: Target,
      characteristics: [
        'Todos processos otimizados',
        'Liderança operacional capacitada',
        'Sistema de BI implementado',
        'Planejamento estratégico anual',
        'Crescimento sustentável'
      ],
      description: 'Governança plena. A clínica opera de forma autônoma. Decisões baseadas em dados. Escalabilidade real.'
    },
    {
      level: 5,
      title: 'Otimizado',
      subtitle: 'Ativo Escalável',
      icon: Award,
      characteristics: [
        'Melhoria contínua sistêmica',
        'Inovação estruturada',
        'Múltiplas unidades viáveis',
        'Valuation claro',
        'Exit strategy definida'
      ],
      description: 'A clínica é um ativo empresarial maduro. Pronta para expansão, M&A ou exit. O dono é CEO estratégico.'
    }
  ];

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute inset-0 dots-pattern opacity-100"></div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full mb-8">
            <ChevronRight className="w-4 h-4 text-gray-700" strokeWidth={2} />
            <span className="text-xs tracking-[0.1em] font-medium text-gray-700 uppercase">Níveis de Maturidade</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl mb-10 leading-[1.05] text-[#385443]">
            Em que Nível está
            <br />
            <span className="text-gradient">Sua Clínica?</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
            Modelo de maturidade operacional desenvolvido especificamente para clínicas de saúde.{' '}
            <span className="text-[#385443] font-semibold">A maioria está no nível 1 ou 2</span>.
          </p>
        </div>

        {/* Level Selector */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16">
          {levels.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveLevel(index);
                if (window.innerWidth < 1024 && detailsRef.current) {
                  setTimeout(() => {
                    detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 50);
                }
              }}
              className={`relative p-6 rounded-xl transition-all duration-300 text-left border-2 ${
                activeLevel === index
                  ? 'bg-[#385443] text-white border-[#385443] shadow-lg'
                  : 'bg-white text-[#385443] border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                activeLevel === index ? 'bg-white/20' : 'bg-gray-100'
              }`}>
                <item.icon className={`w-5 h-5 ${activeLevel === index ? 'text-white' : 'text-[#385443]'}`} strokeWidth={2} />
              </div>
              
              <div className={`text-3xl font-bold mb-2 tracking-tight ${activeLevel === index ? 'text-white' : 'text-[#385443]'}`}>
                {item.level}
              </div>
              
              <div className={`text-sm font-semibold mb-1 ${activeLevel === index ? 'text-gray-50' : 'text-[#385443]'}`}>
                {item.title}
              </div>
              
              <div className={`text-xs ${activeLevel === index ? 'text-gray-300' : 'text-gray-500'}`}>
                {item.subtitle}
              </div>
            </button>
          ))}
        </div>

        {/* Active Level Details */}
        <div ref={detailsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8 lg:mt-0 pt-8 lg:pt-0 scroll-mt-24 lg:scroll-mt-0">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-[#385443] rounded-xl flex items-center justify-center">
                {(() => {
                  const Icon = levels[activeLevel].icon;
                  return <Icon className="w-7 h-7 text-white" strokeWidth={2} />;
                })()}
              </div>
              <div>
                <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">Nível {levels[activeLevel].level}</div>
                <h3 className="text-2xl font-bold text-[#385443]">{levels[activeLevel].title}</h3>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">
              {levels[activeLevel].description}
            </p>

            <div className="h-px bg-gray-200 mb-8"></div>

            <h4 className="text-xs tracking-[0.1em] font-semibold text-gray-700 uppercase mb-5">
              Características
            </h4>
            
            <div className="space-y-3">
              {levels[activeLevel].characteristics.map((char, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#385443] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm">{char}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Progression Path */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-[#385443] mb-8">
              Caminho de Evolução
            </h3>

            {levels.map((item, index) => (
              <div 
                key={index}
                onClick={() => setActiveLevel(index)}
                className={`relative flex items-center gap-4 p-5 rounded-xl transition-all duration-300 cursor-pointer ${
                  index === activeLevel 
                    ? 'bg-[#385443] text-white border-2 border-[#385443]'
                    : index < activeLevel
                    ? 'bg-gray-100 border border-gray-200 opacity-50'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  index === activeLevel
                    ? 'bg-white text-[#385443]'
                    : index < activeLevel
                    ? 'bg-gray-300 text-gray-600'
                    : 'bg-gray-100 text-[#385443]'
                }`}>
                  <span className="font-bold">{item.level}</span>
                </div>
                
                <div className="flex-1">
                  <div className={`text-sm font-semibold ${index === activeLevel ? 'text-white' : 'text-[#385443]'}`}>{item.title}</div>
                  <div className={`text-xs ${index === activeLevel ? 'text-white/70' : 'text-gray-500'}`}>{item.subtitle}</div>
                </div>

                {index === activeLevel && (
                  <div className="text-xs px-3 py-1 bg-white text-[#385443] rounded-full font-semibold">
                    Você está aqui
                  </div>
                )}

                {index < levels.length - 1 && (
                  <div className="absolute left-[2.25rem] top-full w-[2px] h-6 bg-gray-200"></div>
                )}
              </div>
            ))}

            <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-xl">
              <p className="text-sm text-gray-600 leading-relaxed">
                <span className="text-[#385443] font-semibold">A mentoria executiva</span> foi desenhada para levar clínicas do nível 1-2 para o nível 4 em 9 semanas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}