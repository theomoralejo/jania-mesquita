import { AlertCircle, TrendingDown, Clock, Users } from 'lucide-react';

export function ProblemSection() {
  const problems = [
    {
      icon: AlertCircle,
      title: 'Dono Gargalo',
      description: 'Você foi treinado para a excelência clínica, não para governança empresarial. Cada decisão depende de você, cada processo está na sua cabeça.',
      metric: '87%',
      metricLabel: 'dos proprietários'
    },
    {
      icon: TrendingDown,
      title: 'Estagnação da Margem',
      description: 'A receita cresce, mas o lucro não acompanha. Você contrata mais, mas a eficiência cai. O caos operacional consome sua margem.',
      metric: '-32%',
      metricLabel: 'margem EBITDA'
    },
    {
      icon: Clock,
      title: 'Escravo da Operação',
      description: 'Você não comanda uma empresa. Você é refém de uma estrutura artesanal que exige sua presença constante para não entrar em colapso.',
      metric: '70h',
      metricLabel: 'semanais no operacional'
    },
    {
      icon: Users,
      title: 'Maturidade Operacional Nível 1',
      description: 'Sem processos documentados, sem métricas de gestão, sem visibilidade de pipeline. Sua clínica opera no modo "apagar incêndios".',
      metric: '0',
      metricLabel: 'processos mapeados'
    }
  ];

  return (
    <section className="py-16 md:section-padding bg-[#F9F9F9] relative overflow-hidden px-6">
      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#B6A689 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="max-w-4xl mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#DFDCD4] rounded-full mb-6 md:mb-8">
            <span className="text-xs tracking-[0.1em] font-bold text-[#78877E] uppercase">Diagnóstico</span>
          </div>
          
          <h2 className="font-serif text-3xl md:text-5xl lg:text-7xl mb-6 md:mb-10 leading-[1.05] text-[#232323]">
            O Diagnóstico que
            <br />
            <span className="italic text-[#385443]">Ninguém te Deu</span>
          </h2>
          
          <p className="text-lg md:text-2xl text-[#696969] leading-relaxed max-w-3xl font-light">
            Médicos e donos de clínicas são treinados para resolver problemas clínicos complexos, mas nunca receberam formação em{' '}
            <span className="text-[#232323] font-semibold">arquitetura empresarial</span>.
          </p>
        </div>
        
        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 md:mb-20">
          {problems.map((problem, index) => (
            <div 
              key={index} 
              className="group bg-white border border-[#DFDCD4] rounded-[9px] p-6 md:p-10 hover:border-[#B6CBBE] hover:shadow-lg transition-all duration-300"
            >
              {/* Header with Icon and Metric */}
              <div className="flex items-start justify-between mb-6 md:mb-8">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#F2EFE8] rounded-[7px] flex items-center justify-center group-hover:bg-[#385443] transition-colors duration-300">
                  <problem.icon className="w-5 h-5 md:w-6 md:h-6 text-[#385443] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                </div>
                
                <div className="text-right">
                  <div className="font-serif text-2xl md:text-3xl font-light text-[#232323] mb-1 tracking-tight">{problem.metric}</div>
                  <div className="text-[10px] md:text-xs text-[#78877E] uppercase tracking-wide font-bold">{problem.metricLabel}</div>
                </div>
              </div>
              
              {/* Title */}
              <h3 className="font-serif text-xl md:text-2xl font-light mb-4 text-[#232323]">{problem.title}</h3>
              
              {/* Description */}
              <p className="text-sm md:text-base text-[#696969] leading-relaxed font-light">{problem.description}</p>
            </div>
          ))}
        </div>
        
        {/* Quote Section */}
        <div className="relative p-8 md:p-16 bg-[#385443] text-white rounded-[9px] overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#4D6657] rounded-full blur-3xl opacity-50 translate-x-1/3 -translate-y-1/3"></div>
          
          <div className="relative z-10 max-w-4xl bg-[rgba(255,255,255,0)] text-white">
            {/* Quote Mark */}
            <div className="mb-6 md:mb-8 opacity-30">
              <svg width="32" height="26" viewBox="0 0 60 48" fill="currentColor" className="md:w-[48px] md:h-[40px]">
                <path d="M0 48V27.2C0 12.8 6.4 3.2 19.2 0L22.4 5.6C16 8 12.8 12.8 12.8 19.2H25.6V48H0ZM34.4 48V27.2C34.4 12.8 40.8 3.2 53.6 0L56.8 5.6C50.4 8 47.2 12.8 47.2 19.2H60V48H34.4Z"/>
              </svg>
            </div>
            
            {/* Quote Text */}
            <p className="font-serif text-2xl md:text-4xl font-light mb-8 md:mb-10 leading-tight text-white">
              Você não precisa de mais técnica. Você precisa de um sistema de governança que funcione{' '}
              <span className="italic text-[rgb(234,234,234)]">sem você</span>.
            </p>
            
            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="h-px w-8 md:w-12 bg-[#B6A689]"></div>
              <div>
                <div className="font-bold tracking-tight text-[#F9F9F9] text-sm md:text-base">Jania Mesquita</div>
                <div className="text-[#B6CBBE] text-xs md:text-sm font-light">Executive Mentor & Business Architect</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}