import React from 'react';

import { Award, Users, TrendingUp, Target, BookOpen, Briefcase } from 'lucide-react';
// import imgJaniaMesquita from 'figma:asset/ec80bb3e3c57326b8068234761e68d2524ebbcb0.png';
const imgJaniaMesquita = '/assets/img/jania_13.webp';

export default function SobrePage() {
  const stats = [
    { number: '15+', label: 'Anos de Experiência' },
    { number: '200+', label: 'Clínicas Transformadas' },
    { number: 'R$ 500M+', label: 'em Valor Gerado' },
    { number: '98%', label: 'Taxa de Satisfação' }
  ];

  const values = [
    {
      icon: Target,
      title: 'Foco em Resultados',
      description: 'Métricas concretas e business case em cada decisão estratégica.'
    },
    {
      icon: Users,
      title: 'Governança Humanizada',
      description: 'Estrutura executiva sem perder a essência do cuidado com pessoas.'
    },
    {
      icon: TrendingUp,
      title: 'Escalabilidade Real',
      description: 'Transformação que permite crescimento sustentável e previsível.'
    },
    {
      icon: BookOpen,
      title: 'Educação Contínua',
      description: 'Conhecimento técnico-operacional aplicável e mensurável.'
    }
  ];

  const journey = [
    {
      year: '2008',
      title: 'Início da Jornada',
      description: 'Início da atuação em gestão de saúde e vivência dos desafios operacionais do setor.'
    },
    {
      year: '2012',
      title: 'Primeira Transformação',
      description: 'Primeiras implementações de governança corporativa em operações de saúde.'
    },
    {
      year: '2016',
      title: 'Mentoria Executiva',
      description: 'Início da mentoria para médicos e donos de clínicas.'
    },
    {
      year: '2020',
      title: 'Metodologia Própria',
      description: 'Desenvolvimento do framework proprietário de transformação.'
    },
    {
      year: '2025',
      title: 'Expansão Nacional',
      description: 'Consolidação como referência em gestão de clínicas de alto faturamento.'
    }
  ];

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="py-[58px] bg-[#F2EFE8] px-[0px] pt-[18px] pr-[0px] pb-[58px] pl-[0px]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="px-[20px] py-[0px]">
              <div className="mb-4">
                <div className="w-16 h-[2px] bg-[#385443]"></div>
              </div>
              <h1 className="text-7xl mb-[12px] text-[#385443] tracking-tight leading-[0.95] mt-[0px] mr-[0px] ml-[0px]">Jania Mesquita</h1>
              <div className="text-3xl text-[#385443]/70 mb-[18px] font-light mt-[0px] mr-[0px] ml-[0px]">
                Governança e liderança na saúde
              </div>
              <p className="text-lg text-[#385443]/80 leading-relaxed mb-[18px] max-w-lg mt-[0px] mr-[0px] ml-[0px]">
                Especialista em governança corporativa para clínicas de saúde, com foco em transformar práticas médicas artesanais em empresas escaláveis e sustentáveis.
              </p>
              <div className="space-y-2 text-sm text-[#385443]/60 font-light">
                <div>Gestão de Clínicas</div>
                <div>Governança Corporativa</div>
                <div>Escalabilidade</div>
                <div>Mentoria Executiva</div>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden h-[700px] shadow-2xl">
              <img 
                src={imgJaniaMesquita} 
                alt="Jania Mesquita" 
                className="w-full h-full object-cover object-top p-[0px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="container-custom">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stats-item">
                <div className="stats-number">{stat.number}</div>
                <div className="stats-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl mb-6 text-[#42331C]">Missão e Propósito</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Minha missão é capacitar líderes e gestores de clínicas a construírem operações sustentáveis, escaláveis e com governança — permitindo foco no cuidado estratégico e no crescimento inteligente da organização.
              </p>
            </div>

            <div className="bg-[#42331C] text-white p-12 rounded-2xl p-[28px]">
              <h3 className="text-3xl mb-6 text-white">Por Que Este Trabalho?</h3>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                Após anos vivenciando os desafios da gestão em saúde, ficou claro que o maior obstáculo das clínicas não é técnico, mas estratégico: a falta de governança corporativa adaptada à realidade do setor.
              </p>
              <p className="text-xl text-gray-300 leading-relaxed">
                Hoje, além de atuar no mercado de saúde, dedico-me a traduzir conceitos executivos para a linguagem prática das clínicas, criando sistemas de governança que funcionam de forma autônoma.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-5xl mb-16 text-center text-[#42331C]">Valores Fundamentais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-black hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#42331C] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl mb-4 text-[#42331C]">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-5xl mb-16 text-center text-[#42331C]">Trajetória</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {journey.map((item, index) => (
              <div key={index} className="flex gap-8 items-start group">
                <div className="flex-shrink-0 w-20 text-right">
                  <div className="inline-block px-4 py-2 bg-[#42331C] text-white rounded-xl group-hover:scale-110 transition-transform duration-300">
                    {item.year}
                  </div>
                </div>
                <div className="flex-grow pb-8 border-l-2 border-gray-200 pl-8 group-hover:border-black transition-colors duration-300">
                  <div className="absolute w-4 h-4 bg-[#42331C] rounded-full -ml-[41px] mt-2"></div>
                  <h3 className="text-2xl mb-3 text-[#42331C]">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="section-padding bg-[#42331C] text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h2 className="text-3xl text-white">Formação</h2>
              </div>
              <ul className="space-y-4 text-gray-300">
                <li className="pl-6 border-l-2 border-white/20">MBA em Gestão de Negócios - FGV</li>
                <li className="pl-6 border-l-2 border-white/20">Especialização em Governança Corporativa - IBGC</li>
                <li className="pl-6 border-l-2 border-white/20">Certificação em Healthcare Management - Harvard</li>
                <li className="pl-6 border-l-2 border-white/20">Gestão Estratégica de Clínicas - Stanford</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h2 className="text-3xl text-white">Reconhecimentos</h2>
              </div>
              <ul className="space-y-4 text-gray-300">
                <li className="pl-6 border-l-2 border-white/20">Top 10 Consultoras em Saúde - Revista Exame 2024</li>
                <li className="pl-6 border-l-2 border-white/20">Prêmio Inovação em Gestão de Clínicas 2023</li>
                <li className="pl-6 border-l-2 border-white/20">Speaker em Healthcare Congress Internacional</li>
                <li className="pl-6 border-l-2 border-white/20">Autora de artigos em periódicos especializados</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl mb-6 text-[#42331C]">Vamos Conversar?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Se você está pronto para transformar sua clínica em uma empresa escalável, vamos agendar uma conversa estratégica.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/mentoria" className="px-8 py-4 bg-white text-[#385443] border-2 border-[#385443] rounded-xl hover:bg-[#385443] hover:text-white transition-all">
                Conhecer a Mentoria
              </a>
              <a href="/contato" className="px-8 py-4 border-2 border-black text-[#42331C] rounded-xl hover:bg-[#42331C] hover:text-white transition-all text-center">
                Agendar Conversa
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}