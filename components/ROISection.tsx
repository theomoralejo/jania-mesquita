import React from 'react';

import { TrendingUp, Shield, Target, Zap, ArrowRight } from 'lucide-react';

export function ROISection() {
  const roiMetrics = [
    {
      icon: TrendingUp,
      metric: '15-30%',
      title: 'Ganho de Margem Operacional',
      description: 'Identificação e eliminação de vazamentos, otimização de processos e melhoria de eficiência operacional. Em uma clínica que fatura R$ 200k/mês, isso representa R$ 30-60k/mês adicionais de lucro.'
    },
    {
      icon: Shield,
      metric: '40-60h',
      title: 'Recuperação de Tempo do Fundador',
      description: 'Delegação efetiva, processos sistematizados e autonomia operacional liberam o dono de tarefas táticas. Custo de oportunidade: seu tempo vale quanto por hora?'
    },
    {
      icon: Target,
      metric: '3-5x',
      title: 'Aumento no Valuation',
      description: 'Clínicas com governança estruturada, processos documentados e independência do fundador valem 3-5x mais em um processo de exit ou busca por investidores.'
    },
    {
      icon: Zap,
      metric: '90 dias',
      title: 'Payback Médio',
      description: 'Com base em ganhos de margem e eficiência, o investimento se paga em média em 90 dias. A partir daí, é lucro operacional adicional recorrente.'
    }
  ];

  return (
    <section className="section-padding bg-gray-50 relative overflow-hidden px-6">
      <div className="absolute inset-0 lines-pattern opacity-100"></div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full mb-6 md:mb-8">
            <TrendingUp className="w-4 h-4 text-gray-700" strokeWidth={2} />
            <span className="text-xs tracking-[0.1em] font-medium text-gray-700 uppercase">Retorno do Investimento</span>
          </div>
          
          <h2 className="font-serif text-3xl md:text-5xl lg:text-7xl mb-6 md:mb-10 leading-[1.05] text-gray-900">
            ROI: Proteção de Margem e
            <br />
            <span className="text-gradient">Lucro Operacional</span>
          </h2>
          
          <p className="text-lg md:text-2xl text-gray-600 leading-relaxed">
            A mentoria não é um custo de capacitação. É um{' '}
            <span className="text-gray-900 font-semibold">investimento em arquitetura empresarial</span> que gera retorno mensurável em margem, eficiência e valuation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 md:mb-20">
          {roiMetrics.map((item, index) => (
            <div 
              key={index} 
              className="group bg-white border border-gray-200 rounded-2xl p-6 md:p-10 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-900 rounded-xl flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-5 h-5 md:w-6 md:h-6 text-white" strokeWidth={2} />
              </div>
              
              <div className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 md:mb-5 tracking-tight">{item.metric}</div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 md:mb-5">{item.title}</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
        
        {/* Case Study */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="p-6 md:p-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full mb-6 md:mb-8">
              <span className="text-xs tracking-[0.1em] font-semibold text-gray-700 uppercase">Case Study</span>
            </div>

            <h3 className="font-serif text-3xl md:text-5xl font-semibold mb-8 md:mb-12 text-gray-900">
              Caso Exemplo: Clínica Dermatológica
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 bg-red-50 border border-red-200 rounded-full mb-4">
                  <span className="text-xs tracking-wide font-semibold text-red-700 uppercase">Antes da Mentoria</span>
                </div>
                
                <ul className="space-y-4 text-gray-600 text-sm md:text-base">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Faturamento: R$ 250k/mês</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Margem operacional: 18% (R$ 45k)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Dono trabalhando 70h/semana</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Sem processos documentados</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Decisões centralizadas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Zero visibilidade de métricas</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 bg-green-50 border border-green-200 rounded-full mb-4">
                  <span className="text-xs tracking-wide font-semibold text-green-700 uppercase">Após 9 Semanas</span>
                </div>
                
                <ul className="space-y-4 text-gray-900 font-medium text-sm md:text-base">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Faturamento: R$ 250k/mês (mantido)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Margem operacional: 28% (R$ 70k) → <span className="text-green-600">+R$ 25k/mês</span></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Dono trabalhando 35h/semana</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                    <span>15 processos críticos documentados</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                    <span>3 líderes operacionais com autonomia</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Dashboard executivo ativo</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 md:mt-12 bg-gray-50 border border-gray-200 rounded-xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-900 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-white" strokeWidth={2} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900 mb-2">Resultado Financeiro</div>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Ganho de R$ 25k/mês = R$ 300k/ano em lucro adicional. Com investimento de R$ 24k (tier Premium), o ROI é de <span className="font-bold text-gray-900">1.150% no primeiro ano</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}