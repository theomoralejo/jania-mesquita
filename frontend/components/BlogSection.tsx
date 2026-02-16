import React from 'react';

import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

export function BlogSection() {
  const posts = [
    {
      id: 1,
      slug: 'nova-era-governanca',
      title: 'A Nova Era da Governança Clínica',
      excerpt: 'Por que a gestão intuitiva não é mais suficiente para clínicas que buscam escala e perpetuidade no mercado atual.',
      category: 'Governança',
      date: '12 Dez 2025',
      readTime: '5 min',
      image: 'https://images.unsplash.com/photo-1747727568150-444573cd705a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwb2ZmaWNlJTIwYXJjaGl0ZWN0dXJlJTIwYWJzdHJhY3R8ZW58MXx8fHwxNzY1ODI4MzM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 2,
      slug: 'escalar-sem-perder-qualidade',
      title: 'Como Escalar sem Perder a Qualidade',
      excerpt: 'O paradoxo do crescimento médico: estratégias para manter o padrão de excelência enquanto multiplica a operação.',
      category: 'Estratégia',
      date: '08 Dez 2025',
      readTime: '7 min',
      image: 'https://images.unsplash.com/photo-1634245482616-ea3ae51b82d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBlZGl0b3JpYWwlMjBtaW5pbWFsaXN0fGVufDF8fHx8MTc2NTgyODMzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 3,
      slug: 'papel-ceo-medico',
      title: 'O Papel do CEO Médico',
      excerpt: 'A transição de especialista técnico para líder executivo: as competências essenciais que ninguém ensina na faculdade.',
      category: 'Liderança',
      date: '01 Dez 2025',
      readTime: '6 min',
      image: 'https://images.unsplash.com/photo-1570105954248-fa0c1376edfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZXhlY3V0aXZlJTIwbWluaW1hbGlzdCUyMG9mZmljZXxlbnwxfHx8fDE3NjU4MjgzMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  return (
    <section className="py-[48px] md:section-padding bg-[#F2EFE8] border-t border-[#DFDCD4] px-[20px]">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-10 md:mb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 mb-4 md:mb-8">
              <div className="w-8 h-px bg-[#42331C]"></div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#42331C]">
                Acervo Digital
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-[#232323]">
              Insights e <span className="italic text-[#385443]">Estratégia</span>
            </h2>
          </div>

          <Link 
            to="/acervo"
            className="group flex items-center gap-3 text-sm tracking-widest uppercase font-bold border-b border-[#385443] pb-1 text-[#385443] hover:text-[#42331C] hover:border-[#42331C] transition-colors self-start md:self-auto"
          >
            Ver Todo o Acervo
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post) => (
            <Link 
              key={post.id} 
              to={`/acervo/${post.slug}`}
              className="bg-white group relative h-full flex flex-col rounded-[9px] overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500 border border-[#DFDCD4]"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/2] md:aspect-[4/2] overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-[#F2EFE8]/90 backdrop-blur-sm px-[8px] py-[4px] md:px-3 rounded-[3px] pt-[3px] pr-[8px] pb-[5px] pl-[8px]">
                  <span className="text-[8px] md:text-[10px] tracking-widest uppercase font-bold text-[#614D35]">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 md:p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-3 md:gap-4 text-[10px] md:text-xs text-[#78877E] mb-3 md:mb-6 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                  </div>
                  <div className="w-px h-3 bg-[#DFDCD4]"></div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="font-serif text-lg md:text-xl leading-tight mb-2 md:mb-4 text-[#232323] group-hover:text-[#385443] transition-colors">
                  {post.title}
                </h3>

                <p className="text-xs md:text-sm text-[#696969] font-light leading-relaxed mb-4 md:mb-8 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="mt-auto flex items-center gap-2 text-[10px] md:text-xs tracking-widest uppercase font-bold text-[#385443] group-hover:translate-x-2 transition-transform duration-500">
                  Ler Artigo
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
