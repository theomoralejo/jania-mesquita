import { Minus, ArrowRight, Check } from 'lucide-react';

export function PricingSection() {
  const tiers = [
    {
      name: 'Basic',
      tagline: 'Fundamentos de Governança',
      description: 'Para clínicas que estão começando a estruturação e precisam dos pilares essenciais de governança.',
      features: [
        'Metodologia completa (5 pilares)',
        '9 semanas de mentoria em grupo',
        'Aulas ao vivo semanais',
        'Plataforma de conteúdo vitalício',
        'Auditoria operacional inicial',
        'Templates e ferramentas de gestão',
        'Comunidade exclusiva de membros',
        'Suporte via plataforma'
      ],
      highlight: false
    },
    {
      name: 'Premium',
      tagline: 'Implementação Acelerada',
      description: 'Para clínicas que querem implementação rápida com acompanhamento personalizado e suporte direto.',
      features: [
        'Tudo do Basic, mais:',
        '4 sessões individuais de estratégia',
        'Análise personalizada de métricas e KPIs',
        'Revisão customizada de processos',
        'Dashboard executivo personalizado',
        'Acesso prioritário à mentora',
        'Sessões de Q&A exclusivas',
        'Suporte via WhatsApp prioritário',
        'Acompanhamento pós-mentoria (30 dias)'
      ],
      highlight: true
    },
    {
      name: 'VIP',
      tagline: 'Transformação Completa',
      description: 'Para clínicas que querem aceleração máxima com implementação presencial e consultoria estratégica completa.',
      features: [
        'Tudo do Premium, mais:',
        '2 dias de consultoria presencial na clínica',
        'Implementação hands-on com sua equipe',
        'Auditoria operacional completa in loco',
        'Workshop presencial com líderes',
        'Construção assistida de business case',
        'Mentoria estendida (12 semanas)',
        '8 sessões individuais de estratégia',
        'Suporte ilimitado via WhatsApp',
        'Acompanhamento pós-mentoria (90 dias)',
        'Acesso vitalício a atualizações'
      ],
      highlight: false
    }
  ];

  return (
    <section id="investimento" className="section-padding bg-[#F2EFE8] relative overflow-hidden">
      {/* Geometric Lines */}
      <div className="absolute top-1/3 left-0 w-px h-96 bg-gradient-to-b from-transparent via-[#B6A689] to-transparent opacity-30"></div>
      <div className="absolute bottom-1/3 right-0 w-px h-80 bg-gradient-to-t from-transparent via-[#B6A689] to-transparent opacity-30"></div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="max-w-4xl mb-32">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-[#42331C]"></div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#42331C]">
              Investimento
            </span>
          </div>
          
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-12 leading-[1.05] tracking-tight text-[#232323]">
            Três Níveis de <span className="italic text-[#385443]">Transformação</span>
          </h2>
          
          <p className="text-lg md:text-xl leading-relaxed max-w-3xl text-[#414141] font-light">
            Escolha o tier com diferentes níveis de suporte e implementação. O investimento se paga em{' '}
            <span className="bg-[#DFDCD4] px-1 text-[#232323] font-medium">eficiência operacional</span> e{' '}
            <span className="bg-[#DFDCD4] px-1 text-[#232323] font-medium">aumento de margem</span> nos primeiros 6 meses.
          </p>
        </div>

        {/* Pricing Grid - Editorial */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
          {tiers.map((tier, index) => (
            <div 
              key={index}
              className={`bg-white p-10 relative group transition-all duration-500 rounded-[9px] border ${
                tier.highlight 
                  ? 'border-[#385443] shadow-xl lg:-mt-8 lg:mb-8 lg:z-10' 
                  : 'border-[#DFDCD4] hover:border-[#B6A689] hover:shadow-md'
              }`}
            >
              {/* Most Popular Badge */}
              {tier.highlight && (
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#385443] rounded-t-[9px]"></div>
              )}

              {/* Name */}
              <div className="mb-8">
                <h3 className="font-serif text-3xl font-light mb-2 tracking-tight text-[#232323]">
                  {tier.name}
                </h3>
                <div className="flex items-center gap-3">
                  <Minus className="w-4 h-4 text-[#B6A689]" strokeWidth={1} />
                  <span className="text-xs tracking-wide font-bold uppercase text-[#78877E]">
                    {tier.tagline}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-8 pb-8 border-b border-[#DFDCD4]">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-serif text-5xl font-light tracking-tight text-[#385443]">
                    {tier.price}
                  </span>
                </div>
                <p className="text-sm font-light text-[#78877E]">
                </p>
              </div>

              {/* Description */}
              <p className="text-sm font-light leading-relaxed mb-10 text-[#414141]">
                {tier.description}
              </p>

              {/* Features */}
              <div className="space-y-4">
                {tier.features.map((feature, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-start gap-3 ${
                      feature.includes('Tudo do') ? 'mt-6 pt-6 border-t border-[#DFDCD4]' : ''
                    }`}
                  >
                    <Check className="w-4 h-4 text-[#385443] mt-0.5" strokeWidth={1.5} />
                    <span className={`text-sm font-light leading-relaxed text-[#696969] ${
                      feature.includes('Tudo do') ? 'font-medium text-[#232323]' : ''
                    }`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Single CTA Button */}
        <div className="text-center">
          <button 
            onClick={() => {
              const element = document.getElementById('aplicar');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-12 py-5 bg-[#385443] text-white border border-[#385443] rounded-[7px] transition-all duration-500 hover:bg-[#42331C] flex items-center justify-center gap-3 font-bold text-base tracking-wide uppercase mx-auto group"
          >
            <span>Quero Transformar Minha Clínica</span>
            <ArrowRight 
              className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
              strokeWidth={2} 
            />
          </button>
          <p className="text-sm text-[#78877E] mt-6 font-light">
            Preencha a aplicação e nossa equipe entrará em contato para discutir o melhor tier para sua clínica
          </p>
        </div>
      </div>
    </section>
  );
}
