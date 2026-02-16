import React from 'react';

import { useState } from 'react';
import { ArrowRight, CheckCircle2, Compass, Lightbulb, Users2, MessageCircle, Target, Sparkles, Anchor, MapPin } from 'lucide-react';
import { CompaniesLogos } from '../components/CompaniesLogos';
import { EventPhotos } from '../components/EventPhotos';
import { PalestrasHeroImage } from '../components/PalestrasHeroImage';

export default function PalestrasPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    eventType: '',
    attendees: '',
    date: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Solicitação enviada:', formData);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const vertentes = [
    {
      icon: Users2,
      title: 'Liderança e Posicionamento',
      question: 'Como você lidera quando o desafio não tem protocolo?'
    },
    {
      icon: Target,
      title: 'Gestão, Performance e Resultados',
      question: 'Por que sua operação ainda depende só de você?'
    },
    {
      icon: Sparkles,
      title: 'Desenvolvimento Humano e Emocional',
      question: 'Qual é o custo de não desenvolver sua equipe?'
    },
    {
      icon: MessageCircle,
      title: 'Comunicação, Influência e Clareza',
      question: 'Sua equipe entende aonde você quer chegar?'
    },
    {
      icon: Compass,
      title: 'Propósito, Valores e Decisão',
      question: 'O que você quer que sua organização represente?'
    },
    {
      icon: Lightbulb,
      title: 'Legado e Sustentabilidade',
      question: 'O que vai continuar depois de você?'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Roberto Machado',
      role: 'Presidente da ABCM',
      event: 'Congresso Nacional de Clínicas 2024',
      quote: 'A palestra da Jania transformou a forma como enxergamos gestão de clínicas. Conteúdo denso, prático e extremamente aplicável.'
    },
    {
      name: 'Ana Paula Costa',
      role: 'Diretora de Eventos - SINDHOSP',
      event: 'Healthcare Summit 2024',
      quote: 'Melhor avaliação do evento. Os participantes saíram com planos de ação concretos e resultados mensuráveis.'
    },
    {
      name: 'Dr. Fernando Lima',
      role: 'Coordenador Acadêmico - FGV Saúde',
      event: 'MBA Gestão em Saúde',
      quote: 'Jania consegue traduzir conceitos complexos de governança para a linguagem prática do dia a dia das clínicas.'
    }
  ];

  return (
    <main className="pt-24 bg-[#F2EFE8]">
      {/* Hero Section - Mais humano e estratégico */}
      <section className="relative min-h-[85vh] flex items-center bg-[#F2EFE8] overflow-hidden">
        {/* Geometric Accents - Linhas sutis sugerindo jornada */}
        <div className="absolute top-20 left-1/4 w-px h-48 bg-gradient-to-b from-transparent via-[#385443]/20 to-transparent"></div>
        <div className="absolute bottom-32 right-1/3 w-px h-64 bg-gradient-to-t from-transparent via-[#385443]/20 to-transparent"></div>
        
        <div className="w-full max-w-[1218px] mx-auto px-6 md:px-12 py-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="max-w-2xl">
              {/* Editorial Label */}
              <div className="inline-flex items-center gap-3 mb-10">
                <div className="w-12 h-px bg-[#385443]"></div>
                <span className="text-xs font-bold tracking-[0.22em] uppercase text-[#385443]">
                  Palestras Personalizadas
                </span>
              </div>
              
              {/* Main Heading */}
              <h1 className="font-serif text-[42px] md:text-[52px] mb-10 leading-[1.05] tracking-tight text-[#232323]">
                Transformação real não vem de{' '}
                <span className="italic text-[#385443]">conteúdo genérico</span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg md:text-xl mb-6 leading-relaxed text-[#42331C] max-w-xl">
                Cada palestra é construída a partir da sua realidade. Desenhada para o seu contexto. 
                Porque liderança não se ensina com fórmulas prontas.
              </p>

              <p className="text-base mb-12 leading-relaxed text-[#42331C]/80 max-w-xl">
                Nenhuma palestra é igual à outra. O tema é definido em contato direto com você, 
                respeitando o momento da sua organização e os desafios do seu público.
              </p>
              
              {/* CTA Buttons - Stack vertical */}
              <div className="flex flex-col gap-5 mb-20">
                <a 
                  href="#contato"
                  className="group px-10 py-5 bg-[#385443] text-[#F2EFE8] rounded-[7px] transition-all duration-300 hover:bg-[#4a6655] hover:shadow-lg hover:-translate-y-0.5 font-medium tracking-wide flex items-center justify-center gap-3"
                >
                  <span>Vamos conversar sobre seu evento</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
                </a>
                
                <a 
                  href="#trajetoria"
                  className="px-10 py-5 border border-[#385443] text-[#385443] rounded-[7px] transition-all duration-300 hover:bg-[#DFDCD4] hover:-translate-y-0.5 font-medium tracking-wide flex items-center justify-center gap-2"
                >
                  <span>Conheça a trajetória</span>
                </a>
              </div>

              {/* Stats - mais compacto */}
              <div className="grid grid-cols-4 gap-6 pt-10 border-t border-[#385443]/20">
                <div>
                  <div className="font-serif text-3xl text-[#385443] mb-1">50+</div>
                  <div className="text-[10px] font-bold tracking-[0.15em] text-[#42331C] uppercase">Eventos</div>
                </div>
                <div>
                  <div className="font-serif text-3xl text-[#385443] mb-1">10k+</div>
                  <div className="text-[10px] font-bold tracking-[0.15em] text-[#42331C] uppercase">Pessoas</div>
                </div>
                <div>
                  <div className="font-serif text-3xl text-[#385443] mb-1">4.9</div>
                  <div className="text-[10px] font-bold tracking-[0.15em] text-[#42331C] uppercase">Avaliação</div>
                </div>
                <div>
                  <div className="font-serif text-3xl text-[#385443] mb-1">98%</div>
                  <div className="text-[10px] font-bold tracking-[0.15em] text-[#42331C] uppercase">Recomendação</div>
                </div>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative lg:block hidden">
              <div className="aspect-[4/5] relative overflow-hidden rounded-[3px]">
                <PalestrasHeroImage />
              </div>
              {/* Accent Border */}
              <div className="absolute -bottom-6 -right-6 w-full h-full border border-[#385443]/30 -z-10 rounded-[3px]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section - Player de vídeo */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-px h-64 bg-gradient-to-b from-transparent via-[#385443]/10 to-transparent"></div>
        
        <div className="max-w-[1218px] mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="w-12 h-px bg-[#385443]"></div>
                <span className="text-xs font-bold tracking-[0.22em] uppercase text-[#385443]">
                  Veja na prática
                </span>
                <div className="w-12 h-px bg-[#385443]"></div>
              </div>
              
              <h2 className="font-serif text-[42px] md:text-[52px] mb-6 leading-[1.05] tracking-tight text-[#232323]">
                Jania em{' '}
                <span className="italic text-[#385443]">ação</span>
              </h2>
              
              <p className="text-lg leading-relaxed text-[#42331C] max-w-2xl mx-auto">
                Assista um trecho de palestra e veja como conteúdo estratégico se transforma em transformação real
              </p>
            </div>

            {/* Video Player Container */}
            <div className="relative group">
              {/* Accent border effect */}
              <div className="absolute -inset-4 bg-gradient-to-br from-[#385443]/5 to-transparent rounded-[12px] -z-10"></div>
              
              {/* Video wrapper */}
              <div className="relative aspect-video rounded-[7px] overflow-hidden bg-[#232323] shadow-2xl border border-[#385443]/20">
                {/* Placeholder - Substitua o src pelo link real do vídeo do YouTube/Vimeo */}
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Jania Mesquita - Palestra"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              
              {/* Decorative corner accent */}
              <div className="absolute -bottom-3 -right-3 w-24 h-24 border-r-2 border-b-2 border-[#385443]/20 rounded-br-[7px] -z-10"></div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 text-center">
              <p className="text-base text-[#42331C] mb-6">
                Quer levar esse impacto para o seu evento?
              </p>
              <a 
                href="#contato"
                className="inline-flex items-center gap-2 text-[#385443] hover:text-[#4a6655] transition-colors duration-300 group"
              >
                <span className="font-medium tracking-wide">Solicitar orçamento</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trajetória Section - Nova seção sobre contexto e história */}
      <section id="trajetoria" className="py-20 bg-[rgb(242,239,232)] text-[#F2EFE8] relative overflow-hidden">
        {/* Elementos sutis de navegação */}
        <div className="absolute top-1/4 right-20 opacity-10">
          <Anchor className="w-32 h-32 text-[#F2EFE8]" strokeWidth={0.5} />
        </div>
        
        <div className="max-w-[1218px] mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-16 text-center">
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="w-12 h-px bg-[#B6A689]"></div>
                <span className="text-xs font-bold tracking-[0.22em] uppercase text-[#B6A689]">
                  Trajetória
                </span>
                <div className="w-12 h-px bg-[#B6A689]"></div>
              </div>
              
              <h2 className="font-serif text-[48px] md:text-[58px] mb-8 leading-[1.05] tracking-tight text-white">
                De onde falo quando falo de{' '}
                <span className="italic text-[#B6A689]">liderança</span>
              </h2>
            </div>

            {/* Narrative */}
            <div className="space-y-6 text-lg leading-relaxed text-[#F2EFE8]/90">
              <p>
                Minha trajetória não começou em salas de diretoria. Começou com trabalho duro, 
                responsabilidade cedo demais e a certeza de que, para ir além, seria preciso esforço, 
                disciplina e constância.
              </p>

              <p>
                Entrei na enfermagem não por vocação romântica, mas por necessidade. E foi ali, 
                entre plantões, processos e emergências, que aprendi o que é liderar sob pressão real. 
                Não a pressão de planilhas, mas a de vida e morte.
              </p>

              <p>
                Subi degrau por degrau. Gestão de equipes. Direção de hospitais. Operações de hemodinâmica 
                em uma das maiores redes de saúde do país. Liderei milhares de pessoas. Tomei decisões que 
                pesavam. E aprendi que liderança não é cargo: é compromisso.
              </p>

              <p>
                Mas chegou o momento de uma escolha. Quando os valores da organização não conversavam mais 
                com os meus, fiz a transição mais difícil: sair do topo para reconstruir do zero, 
                desta vez, alinhada com o que eu acredito.
              </p>

              <p className="text-[#B6A689] font-medium">
                Foi dessa vivência — da enfermagem à alta gestão, da superação à escolha consciente — 
                que nasceu o método que uso hoje. Um método de seis etapas baseado na metáfora da navegação: 
                onde você está, para onde quer ir, quem vai com você, e como liderar essa jornada sem perder 
                a si mesmo no processo.
              </p>
            </div>

            {/* Bottom Statement */}
            <div className="mt-20 pt-12 border-t border-[#B6A689]/30 text-center">
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Hoje, cada palestra que construo carrega essa experiência. Não é teoria de manual. 
                É vivência de quem liderou de verdade. E é isso que entrego ao seu público.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Por que personalizado - Nova seção estratégica */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* Linhas sutis sugerindo direção */}
        <div className="absolute top-1/3 left-1/4 w-px h-80 bg-gradient-to-b from-transparent via-[#385443]/10 to-transparent"></div>
        <div className="absolute bottom-1/4 right-1/3 w-px h-64 bg-gradient-to-t from-transparent via-[#385443]/10 to-transparent"></div>
        
        <div className="max-w-[1218px] mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-20">
              <div className="inline-flex items-center gap-3 mb-10">
                <div className="w-8 h-px bg-[#385443]"></div>
                <span className="text-xs font-bold tracking-[0.22em] uppercase text-[#385443]">
                  Abordagem
                </span>
              </div>
              
              <h2 className="font-serif text-[48px] md:text-[58px] mb-10 leading-[1.05] tracking-tight text-[#232323]">
                Por que nenhuma palestra{' '}
                <span className="italic text-[#385443]">é igual à outra</span>
              </h2>
              
              <p className="text-xl leading-relaxed text-[#42331C] max-w-3xl">
                Porque cada organização está em um momento diferente. Cada público carrega desafios únicos. 
                E conteúdo genérico não transforma ninguém.
              </p>
            </div>

            {/* Grid 2 colunas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
              {/* Item 1 */}
              <div className="group">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F2EFE8] border border-[#385443]/20">
                    <span className="text-sm font-serif text-[#385443]">01</span>
                  </div>
                  <h3 className="text-2xl text-[#232323]">
                    Escuta antes da entrega
                  </h3>
                </div>
                <p className="text-base leading-relaxed text-[#42331C] pl-13">
                  Antes de definir o tema, eu escuto. Qual é o momento da organização? 
                  Quais são os desafios reais? O que o público precisa ouvir — não o que 
                  é bonito dizer.
                </p>
              </div>

              {/* Item 2 */}
              <div className="group">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F2EFE8] border border-[#385443]/20">
                    <span className="text-sm font-serif text-[#385443]">02</span>
                  </div>
                  <h3 className="text-2xl text-[#232323]">
                    Construção sob medida
                  </h3>
                </div>
                <p className="text-base leading-relaxed text-[#42331C] pl-13">
                  A palestra é desenhada do zero. Não existe slide reciclado. Cada narrativa 
                  é construída para ressoar com o contexto específico do seu evento.
                </p>
              </div>

              {/* Item 3 */}
              <div className="group">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F2EFE8] border border-[#385443]/20">
                    <span className="text-sm font-serif text-[#385443]">03</span>
                  </div>
                  <h3 className="text-2xl text-[#232323]">
                    Profundidade sem academicismo
                  </h3>
                </div>
                <p className="text-base leading-relaxed text-[#42331C] pl-13">
                  Conteúdo denso, mas acessível. Eu não ensino conceitos: eu mostro 
                  como aplicá-los no dia seguinte. A transformação começa na saída da sala.
                </p>
              </div>

              {/* Item 4 */}
              <div className="group">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F2EFE8] border border-[#385443]/20">
                    <span className="text-sm font-serif text-[#385443]">04</span>
                  </div>
                  <h3 className="text-2xl text-[#232323]">
                    Método autoral em seis etapas
                  </h3>
                </div>
                <p className="text-base leading-relaxed text-[#42331C] pl-13">
                  Baseado na metáfora da navegação: saber onde está, definir para onde vai, 
                  entender quem vai com você, e liderar essa jornada com clareza, coragem e coerência.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-16 border-t border-[#DFDCD4] text-center">
              <p className="text-xl text-[#232323] mb-8 max-w-2xl mx-auto">
                Os temas não são públicos. A palestra é definida em contato direto. 
                <span className="block mt-3 text-[#385443] font-medium">
                  Vamos construir juntos o conteúdo ideal para você.
                </span>
              </p>
              <a 
                href="#contato"
                className="inline-flex items-center gap-2 text-[#385443] hover:text-[#4a6655] transition-colors duration-300 group"
              >
                <span className="font-medium tracking-wide">Iniciar conversa</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Vertentes Section - Apenas título + pergunta provocativa */}
      <section className="py-32 bg-[#F2EFE8] relative overflow-hidden">
        {/* Linha vertical sutil */}
        <div className="absolute top-1/4 right-1/4 w-px h-80 bg-gradient-to-b from-transparent via-[#385443]/10 to-transparent"></div>
        
        <div className="max-w-[1218px] mx-auto px-6 md:px-12 relative z-10">
          {/* Header */}
          <div className="max-w-3xl mb-24">
            <div className="inline-flex items-center gap-3 mb-10">
              <div className="w-8 h-px bg-[#385443]"></div>
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-[#385443]">
                Vertentes
              </span>
            </div>
            
            <h2 className="font-serif text-[48px] md:text-[58px] mb-12 leading-[1.05] tracking-tight text-[#232323]">
              Temas que constroem{' '}
              <span className="italic text-[#385443]">trajetórias</span>
            </h2>
            
            <p className="text-xl leading-relaxed text-[#42331C]">
              As palestras partem de vertentes amplas que se entrelaçam com a sua realidade. 
              Cada uma delas pode ser o ponto de partida para a palestra personalizada do seu evento.
            </p>
          </div>

          {/* Vertentes Grid - Minimalista */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {vertentes.map((vertente, index) => (
              <div 
                key={index}
                className="group pb-8 border-b border-[#DFDCD4] hover:border-[#385443] transition-all duration-300"
              >
                {/* Icon + Title */}
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-[#385443]/20 group-hover:bg-[#385443] group-hover:border-[#385443] transition-all duration-300 flex-shrink-0">
                    <vertente.icon className="w-5 h-5 text-[#385443] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl text-[#232323] group-hover:text-[#385443] transition-colors duration-300 leading-tight pt-2">
                    {vertente.title}
                  </h3>
                </div>

                {/* Question - elemento de impacto */}
                <p className="text-base italic text-[#385443] pl-4 border-l-2 border-[#385443]/30 leading-relaxed">
                  {vertente.question}
                </p>
              </div>
            ))}
          </div>

          {/* CTA após vertentes */}
          <div className="mt-24 pt-16 border-t border-[#DFDCD4] text-center">
            <p className="text-xl text-[#232323] mb-8 max-w-2xl mx-auto">
              Essas vertentes se combinam de formas únicas para criar{' '}
              <span className="text-[#385443] font-medium">a palestra ideal para seu contexto</span>
            </p>
            <a 
              href="#contato"
              className="inline-flex items-center gap-2 text-[#385443] hover:text-[#4a6655] transition-colors duration-300 group"
            >
              <span className="font-medium tracking-wide">Vamos definir juntos</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
            </a>
          </div>
        </div>
      </section>

      {/* Formatos Section */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-px h-64 bg-gradient-to-b from-transparent via-[#385443]/10 to-transparent"></div>
        
        <div className="max-w-[1218px] mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl mb-20">
            <div className="inline-flex items-center gap-3 mb-10">
              <div className="w-8 h-px bg-[#385443]"></div>
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-[#385443]">
                Formatos
              </span>
            </div>
            
            <h2 className="font-serif text-[48px] md:text-[58px] mb-10 leading-[1.05] tracking-tight text-[#232323]">
              Adaptável ao seu{' '}
              <span className="italic text-[#385443]">momento</span>
            </h2>
            
            <p className="text-lg leading-relaxed text-[#42331C]">
              De keynotes inspiracionais a imersões profundas. 
              O formato se ajusta ao objetivo que você deseja alcançar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { title: 'Speed Talk', subtitle: '18-30 min', desc: 'Impacto rápido e direto para eventos dinâmicos' },
              { title: 'Keynote', subtitle: '45-60 min', desc: 'Inspiração estratégica para grandes audiências' },
              { title: 'Workshop', subtitle: '3-4 horas', desc: 'Aplicação prática com exercícios e planos de ação' },
              { title: 'Masterclass', subtitle: 'Dia completo', desc: 'Imersão com diagnóstico personalizado' },
              { title: 'Painel', subtitle: '60-90 min', desc: 'Debate e troca de perspectivas' }
            ].map((format, index) => (
              <div key={index} className="group">
                <h3 className="text-xl mb-3 text-[#232323] group-hover:text-[#385443] transition-colors duration-300">
                  {format.title}
                </h3>
                <div className="text-sm text-[#385443] mb-4 font-medium">
                  {format.subtitle}
                </div>
                <p className="text-sm leading-relaxed text-[#42331C]">
                  {format.desc}
                </p>
                <div className="w-full h-px bg-[#385443]/20 mt-6 group-hover:bg-[#385443] transition-colors duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-[#F2EFE8] relative overflow-hidden">
        <div className="absolute bottom-1/3 right-0 w-px h-80 bg-gradient-to-t from-transparent via-[#385443]/10 to-transparent"></div>
        
        <div className="max-w-[1218px] mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl mb-20">
            <div className="inline-flex items-center gap-3 mb-10">
              <div className="w-8 h-px bg-[#385443]"></div>
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-[#385443]">
                Depoimentos
              </span>
            </div>
            
            <h2 className="font-serif text-[48px] md:text-[58px] mb-10 leading-[1.05] tracking-tight text-[#232323]">
              O que dizem os{' '}
              <span className="italic text-[#385443]">organizadores</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group bg-white p-8 rounded-[7px] border border-[#DFDCD4] hover:border-[#385443]/40 transition-all duration-300">
                <p className="text-[#42331C] mb-8 leading-relaxed italic text-base">
                  "{testimonial.quote}"
                </p>
                <div className="pt-6 border-t border-[#DFDCD4]">
                  <div className="text-[#232323] mb-1 font-medium">{testimonial.name}</div>
                  <div className="text-sm text-[#385443] mb-1">{testimonial.role}</div>
                  <div className="text-xs text-[#42331C]/70">{testimonial.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Logos */}
      <CompaniesLogos />

      {/* Event Photos */}
      <EventPhotos />

      {/* Form Section - CTA estratégico */}
      <section id="contato" className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-1/3 left-0 w-px h-96 bg-gradient-to-b from-transparent via-[#385443]/10 to-transparent"></div>
        
        <div className="max-w-[1218px] mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-20">
              {/* Left Column */}
              <div className="lg:col-span-2">
                <div className="inline-flex items-center gap-3 mb-10">
                  <div className="w-8 h-px bg-[#385443]"></div>
                  <span className="text-xs font-bold tracking-[0.22em] uppercase text-[#385443]">
                    Vamos começar
                  </span>
                </div>
                
                <h2 className="font-serif text-[42px] md:text-[48px] mb-10 leading-[1.1] tracking-tight text-[#232323]">
                  Construa a palestra{' '}
                  <span className="italic text-[#385443]">ideal</span>{' '}
                  para você
                </h2>
                
                <p className="text-lg leading-relaxed text-[#42331C] mb-6">
                  Conte-me sobre seu evento, seu público e seus objetivos. 
                </p>

                <p className="text-base leading-relaxed text-[#42331C]/80 mb-12">
                  O tema da palestra será definido em conversa direta com você, 
                  respeitando o contexto da sua organização e as necessidades específicas 
                  do seu público.
                </p>

                <div className="space-y-5 pt-8 border-t border-[#DFDCD4]">
                  <div className="text-xs font-bold tracking-[0.22em] uppercase text-[#385443] mb-6">
                    O que está incluído
                  </div>
                  {[
                    'Conteúdo 100% customizado',
                    'Material de apoio completo',
                    'Sessão de Q&A',
                    'Autorização de gravação'
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#385443]" strokeWidth={1.5} />
                      <span className="text-[#42331C]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="lg:col-span-3">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-8 bg-[#F2EFE8] p-7 rounded-[7px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-sm mb-3 text-[#385443] font-medium tracking-wide">Nome Completo *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-[10px] py-[12px] border-0 border-b-2 border-[#385443]/30 bg-transparent focus:border-[#385443] focus:outline-none transition-colors text-[#232323] placeholder:text-[#42331C]/40"
                          placeholder="Seu nome"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-3 text-[#385443] font-medium tracking-wide">E-mail *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-[10px] py-[12px] border-0 border-b-2 border-[#385443]/30 bg-transparent focus:border-[#385443] focus:outline-none transition-colors text-[#232323] placeholder:text-[#42331C]/40"
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-sm mb-3 text-[#385443] font-medium tracking-wide">Telefone *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-[10px] py-[12px] border-0 border-b-2 border-[#385443]/30 bg-transparent focus:border-[#385443] focus:outline-none transition-colors text-[#232323] placeholder:text-[#42331C]/40"
                          placeholder="(00) 00000-0000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-3 text-[#385443] font-medium tracking-wide">Empresa/Instituição *</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          required
                          className="w-full px-[10px] py-[12px] border-0 border-b-2 border-[#385443]/30 bg-transparent focus:border-[#385443] focus:outline-none transition-colors text-[#232323] placeholder:text-[#42331C]/40"
                          placeholder="Nome da organização"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-sm mb-3 text-[#385443] font-medium tracking-wide">Formato desejado</label>
                        <select
                          name="eventType"
                          value={formData.eventType}
                          onChange={handleChange}
                          className="w-full px-[10px] py-[12px] border-0 border-b-2 border-[#385443]/30 bg-transparent focus:border-[#385443] focus:outline-none transition-colors text-[#232323]"
                        >
                          <option value="">Selecione...</option>
                          <option value="keynote">Keynote</option>
                          <option value="workshop">Workshop</option>
                          <option value="masterclass">Masterclass</option>
                          <option value="painel">Painel</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm mb-3 text-[#385443] font-medium tracking-wide">Número de participantes</label>
                        <input
                          type="text"
                          name="attendees"
                          value={formData.attendees}
                          onChange={handleChange}
                          className="w-full px-[10px] py-[12px] border-0 border-b-2 border-[#385443]/30 bg-transparent focus:border-[#385443] focus:outline-none transition-colors text-[#232323] placeholder:text-[#42331C]/40"
                          placeholder="Ex: 100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm mb-3 text-[#385443] font-medium tracking-wide">Data pretendida</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-[10px] py-[12px] border-0 border-b-2 border-[#385443]/30 bg-transparent focus:border-[#385443] focus:outline-none transition-colors text-[#232323]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-3 text-[#385443] font-medium tracking-wide">Conte sobre seu evento</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full px-[10px] py-[12px] border-0 border-b-2 border-[#385443]/30 bg-transparent focus:border-[#385443] focus:outline-none transition-colors resize-none text-[#232323] placeholder:text-[#42331C]/40"
                        placeholder="Objetivos do evento, perfil do público, desafios que gostaria de abordar..."
                      />
                    </div>

                    <div className="pt-6">
                      <button
                        type="submit"
                        className="group w-full px-10 py-5 bg-[#385443] text-[#F2EFE8] rounded-[7px] transition-all duration-300 hover:bg-[#4a6655] hover:shadow-lg hover:-translate-y-0.5 font-medium tracking-wide flex items-center justify-center gap-3"
                      >
                        <span>Solicitar Orçamento</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="bg-[#F2EFE8] p-16 rounded-[7px] text-center">
                    <div className="w-16 h-16 bg-[#385443] rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle2 className="w-8 h-8 text-[#F2EFE8]" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif text-3xl mb-6 text-[#232323]">Solicitação enviada com sucesso!</h3>
                    <p className="text-lg text-[#42331C] mb-8">
                      Retornaremos em até 48 horas com uma proposta personalizada para o seu evento.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-[#385443] hover:text-[#4a6655] font-medium transition-colors duration-300"
                    >
                      Enviar nova solicitação
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}