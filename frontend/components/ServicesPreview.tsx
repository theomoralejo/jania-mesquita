import React from 'react';

import { ArrowRight, Users, Mic, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ServicesPreview() {
  const services = [
    {
      icon: Users,
      title: 'Mentoria Executiva',
      description: 'Transforme sua clínica em uma operação escalável. Governança, liderança e processos que funcionam sem você presente.',
      highlights: ['Diagnóstico completo', 'Acompanhamento semanal', '3 níveis personalizados'],
      link: '/mentoria',
      badge: 'Mais procurado'
    },
    {
      icon: Mic,
      title: 'Palestras Corporativas',
      description: 'Conteúdo personalizado para eventos, congressos e treinamentos. Liderança e superação aplicados ao setor de saúde.',
      highlights: ['100% customizado', 'Keynotes e workshops', 'Material incluso'],
      link: '/palestras',
      badge: null
    },
    {
      icon: BookOpen,
      title: 'Acervo Digital',
      description: 'E-books, templates e ferramentas práticas para gestão de clínicas. Do diagnóstico à implementação.',
      highlights: ['Conteúdo gratuito e pago', 'Ferramentas prontas', 'Aplicação imediata'],
      link: '/acervo',
      badge: null
    }
  ];

  return (
    <section className="py-12 md:py-24 bg-white relative overflow-hidden px-6">
      {/* Geometric Lines */}
      <div className="absolute top-1/3 left-1/4 w-px h-80 bg-gradient-to-b from-transparent via-[#DFDCD4] to-transparent"></div>
      <div className="absolute bottom-1/4 right-1/3 w-px h-64 bg-gradient-to-t from-transparent via-[#DFDCD4] to-transparent"></div>

      <div className="max-w-[1218px] mx-auto relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="inline-flex items-center gap-3 mb-6 md:mb-8">
            <div className="w-12 h-px bg-[#42331C]"></div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#42331C]">
              Como posso ajudar
            </span>
          </div>

          <h2 className="font-serif text-3xl md:text-[48px] mb-6 leading-[1.1] tracking-tight text-[#232323]">
            Soluções para cada{' '}
            <span className="italic text-[#385443]">estágio da jornada</span>
          </h2>

          <p className="text-lg text-[#696969] leading-relaxed">
            Seja você um médico fundador, gestor de clínica ou líder de equipe,
            existe um caminho estruturado para transformar sua operação.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-[#F2EFE8] border border-[#DFDCD4] rounded-[7px] p-6 md:p-8 hover:border-[#385443] hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Icon + Badge */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white border border-[#DFDCD4] rounded-full flex items-center justify-center group-hover:bg-[#385443] group-hover:border-[#385443] transition-all duration-300">
                  <service.icon className="w-5 h-5 md:w-6 md:h-6 text-[#385443] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                </div>
                {service.badge && (
                  <span className="text-[9px] font-bold tracking-widest uppercase bg-[#42331C] text-[#F2EFE8] px-2 py-1 rounded-full">
                    {service.badge}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl mb-4 text-[#232323] group-hover:text-[#385443] transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm md:text-base text-[#696969] leading-relaxed mb-6 flex-grow">
                {service.description}
              </p>

              {/* Highlights */}
              <ul className="space-y-3 mb-8 pb-6 border-b border-[#DFDCD4]">
                {service.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-[#414141]">
                    <div className="w-1.5 h-1.5 bg-[#385443] rounded-full"></div>
                    {highlight}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                to={service.link}
                className="inline-flex items-center gap-2 text-[#385443] hover:text-[#4a6655] font-medium transition-colors duration-300 group/link"
              >
                <span>Saber mais</span>
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" strokeWidth={2} />
              </Link>
            </div>
          ))}
        </div>

        {/* CTA Bottom */}
        <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-[#DFDCD4] text-center">
          <p className="text-base md:text-lg text-[#232323] mb-6 max-w-2xl mx-auto">
            Não sabe por onde começar?{' '}
            <span className="text-[#385443] font-medium">Agende um diagnóstico gratuito</span>{' '}
            e descubra qual caminho faz mais sentido para você.
          </p>
          <button
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('diagnostico');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.href = '/#/?scrollTo=diagnostico';
                setTimeout(() => {
                  document.getElementById('diagnostico')?.scrollIntoView({ behavior: 'smooth' });
                }, 500);
              }
            }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#385443] text-white rounded-[7px] hover:bg-[#4a6655] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 font-bold w-full md:w-auto justify-center cursor-pointer border-none"
          >
            <span>Agendar Diagnóstico Gratuito</span>
            <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
}