import React from 'react';

import { Building2, Users, Award, TrendingUp } from 'lucide-react';

export function SocialProofHome() {
  const stats = [
    {
      icon: Building2,
      value: '200+',
      label: 'Clínicas Transformadas',
      description: 'Operações escaláveis em todo Brasil'
    },
    {
      icon: Users,
      value: '+100mil',
      label: 'Profissionais Impactados',
      description: 'Através de mentoria e capacitação'
    },
    {
      icon: Award,
      value: '98%',
      label: 'Taxa de Satisfação',
      description: 'Mentorados recomendam o programa'
    },
    {
      icon: TrendingUp,
      value: 'R$ 500M+',
      label: 'Valor Gerado',
      description: 'Impacto em faturamento de clínicas mentoradas*'
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-[#F2EFE8] relative overflow-hidden border-y border-[#DFDCD4]">
      {/* Geometric Line */}
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#DFDCD4] to-transparent opacity-60"></div>

      <div className="max-w-[1218px] mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-3 mb-4 md:mb-6">
            <div className="w-8 h-px bg-[#42331C]"></div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#42331C]">
              Resultados Comprovados
            </span>
            <div className="w-8 h-px bg-[#42331C]"></div>
          </div>
          
          <h2 className="font-serif text-3xl md:text-[42px] mb-4 leading-[1.1] tracking-tight text-[#232323]">
            Números que falam por{' '}
            <span className="italic text-[#385443]">si mesmos</span>
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white border border-[#DFDCD4] rounded-[7px] p-4 md:p-6 hover:border-[#385443] hover:shadow-lg transition-all duration-300 text-center"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#F2EFE8] border border-[#DFDCD4] rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-[#385443]" strokeWidth={1.5} />
              </div>
              <div className="font-serif text-2xl md:text-4xl text-[#385443] mb-1 md:mb-2">{stat.value}</div>
              <div className="text-xs md:text-sm font-bold text-[#232323] mb-1 md:mb-2 tracking-wide uppercase">
                {stat.label}
              </div>
              <div className="text-[10px] md:text-xs text-[#696969] leading-relaxed hidden md:block">
                {stat.description}
              </div>
              {/* Mobile description (optional, or keep hidden if too dense? User said 'readability'. Let's keep it but small) */}
              <div className="text-[10px] text-[#696969] leading-tight md:hidden">
                 {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}