import React from 'react';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'Todos os artigos' },
    { value: 'lideranca', label: 'Liderança' },
    { value: 'gestao', label: 'Gestão' },
    { value: 'governanca', label: 'Governança' },
    { value: 'desenvolvimento', label: 'Desenvolvimento Pessoal' }
  ];

  const blogPosts = [
    {
      slug: 'da-medicina-a-gestao',
      title: 'Da Medicina à Gestão: Uma Jornada de Transformação',
      category: 'lideranca',
      categoryLabel: 'Liderança',
      excerpt: 'Como médicos podem desenvolver habilidades de liderança sem abandonar sua essência clínica. Uma reflexão sobre o papel estratégico do médico-gestor.',
      image: 'https://images.unsplash.com/photo-1659353888906-adb3e0041693?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwbGVhZGVyc2hpcCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3Njc3MjI5NjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      date: '15 de Dezembro, 2025',
      readTime: '8 min',
      featured: true
    },
    {
      slug: 'os-tres-pilares-da-governanca-clinica',
      title: 'Os 3 Pilares da Governança Clínica Sustentável',
      category: 'governanca',
      categoryLabel: 'Governança',
      excerpt: 'Qualidade assistencial, segurança do paciente e eficiência operacional: o tripé que sustenta instituições de saúde de excelência.',
      image: 'https://images.unsplash.com/photo-1765438869297-6fa4b627906a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHN0cmF0ZWd5JTIwcGxhbm5pbmd8ZW58MXx8fHwxNzY3NjA4NTIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      date: '8 de Dezembro, 2025',
      readTime: '12 min',
      featured: false
    },
    {
      slug: 'cultura-organizacional-em-saude',
      title: 'Construindo Cultura Organizacional em Saúde',
      category: 'gestao',
      categoryLabel: 'Gestão',
      excerpt: 'Valores, crenças e práticas que transformam equipes clínicas em times de alta performance. O papel da cultura no sucesso institucional.',
      image: 'https://images.unsplash.com/photo-1765985818966-ad060896cb6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwbWFuYWdlbWVudCUyMHRlYW18ZW58MXx8fHwxNzY3NzIyOTYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      date: '1 de Dezembro, 2025',
      readTime: '10 min',
      featured: false
    },
    {
      slug: 'escalabilidade-com-proposito',
      title: 'Escalabilidade com Propósito: Crescer sem Perder a Alma',
      category: 'gestao',
      categoryLabel: 'Gestão',
      excerpt: 'Estratégias para expandir sua operação mantendo os valores que tornaram sua prática única. Crescimento intencional e sustentável.',
      image: 'https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzY3NzE0MTMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      date: '24 de Novembro, 2025',
      readTime: '9 min',
      featured: false
    },
    {
      slug: 'lideranca-emocional',
      title: 'Liderança Emocional: O Equilíbrio Entre Mente e Coração',
      category: 'desenvolvimento',
      categoryLabel: 'Desenvolvimento Pessoal',
      excerpt: 'Por que a inteligência emocional é a competência mais crítica para médicos-líderes. Estratégia e sensibilidade andando juntas.',
      image: 'https://images.unsplash.com/photo-1643297654395-d6375d07215c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcHJvZmVzc2lvbmFsJTIwc3VjY2Vzc3xlbnwxfHx8fDE3Njc3MjI5NjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      date: '17 de Novembro, 2025',
      readTime: '11 min',
      featured: false
    },
    {
      slug: 'metricas-que-importam',
      title: 'Métricas que Importam: Além do Faturamento',
      category: 'gestao',
      categoryLabel: 'Gestão',
      excerpt: 'Indicadores estratégicos para medir o que realmente impacta a sustentabilidade e a qualidade do seu negócio em saúde.',
      image: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGdyb3d0aCUyMGNoYXJ0fGVufDF8fHx8MTc2NzcwMDYzMXww&ixlib=rb-4.1.0&q=80&w=1080',
      date: '10 de Novembro, 2025',
      readTime: '7 min',
      featured: false
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <main className="min-h-screen bg-[#F2EFE8]">
      {/* Hero Section - Editorial Minimalista */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-[#F2EFE8] to-white/40">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#385443] blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#42331C] blur-3xl"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="editorial-label mb-8">
              Blog
            </div>
            
            <h1 className="font-serif text-5xl md:text-7xl mb-8 leading-[1.05] tracking-tight text-[#42331C]">
              Reflexões sobre <span className="italic font-light text-[#385443]">Liderança</span> e <span className="italic font-light text-[#385443]">Gestão</span>
            </h1>
            
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light text-[#696969]">
              Insights estratégicos para médicos que desejam transformar sua prática clínica em negócios sustentáveis e de alto impacto.
            </p>

            {/* Search Bar */}
            <div className="relative w-full max-w-2xl mx-auto group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B6A689] group-hover:text-[#42331C] transition-colors" strokeWidth={1.5} />
              <input
                type="text"
                placeholder="Buscar artigos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white/80 backdrop-blur-sm border border-[#DFDCD4] focus:border-[#385443] outline-none placeholder-[#B6A689] text-[#42331C] transition-all font-serif italic rounded-[7px] shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-20 z-40 bg-white/95 backdrop-blur-sm border-y border-[#DFDCD4] py-6">
        <div className="container-custom">
          <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0 no-scrollbar justify-center">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-5 py-2 rounded-full border transition-all whitespace-nowrap text-sm tracking-wide font-medium ${ 
                  selectedCategory === category.value
                    ? 'bg-[#385443] border-[#385443] text-[#F2EFE8] shadow-md'
                    : 'border-[#DFDCD4] text-[#696969] hover:border-[#385443] hover:text-[#42331C]'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section className="section-padding bg-white border-b border-[#DFDCD4]">
          <div className="container-custom">
            <div className="editorial-label mb-12 text-center">
              Artigo em Destaque
            </div>
            
            <Link to={`/blog/${featuredPost.slug}`} className="group block">
              <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#EBEBEB] rounded-[7px]">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 saturate-50 group-hover:saturate-100"
                  />
                  <div className="absolute top-4 left-4 bg-[#385443] px-4 py-2 rounded-full">
                    <span className="text-xs tracking-[0.2em] uppercase font-bold text-white">
                      Featured
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-xs tracking-widest uppercase font-bold text-[#B6A689]">
                    <span>{featuredPost.categoryLabel}</span>
                    <span>•</span>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      {featuredPost.date}
                    </div>
                  </div>

                  <h2 className="font-serif text-4xl md:text-5xl leading-tight text-[#42331C] group-hover:text-[#385443] transition-colors">
                    {featuredPost.title}
                  </h2>

                  <p className="text-lg text-[#696969] font-light leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center gap-4 pt-4">
                    <div className="flex items-center gap-2 text-sm text-[#B6A689]">
                      <Clock className="w-4 h-4" strokeWidth={1.5} />
                      {featuredPost.readTime} de leitura
                    </div>
                  </div>

                  <div className="pt-4 flex items-center gap-2 text-sm tracking-widest uppercase font-bold text-[#385443] group-hover:translate-x-2 transition-transform duration-500">
                    Ler artigo completo
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16 max-w-7xl mx-auto">
            {regularPosts.map((post, index) => (
              <Link
                key={index}
                to={`/blog/${post.slug}`}
                className="group block"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] mb-6 overflow-hidden bg-[#EBEBEB] rounded-[7px]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 saturate-50 group-hover:saturate-100"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#DFDCD4]">
                    <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#385443]">
                      {post.categoryLabel}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs text-[#B6A689]">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" strokeWidth={1.5} />
                      {post.date}
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3" strokeWidth={1.5} />
                      {post.readTime}
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl leading-tight text-[#42331C] group-hover:text-[#385443] transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-[#696969] font-light leading-relaxed line-clamp-3 text-sm">
                    {post.excerpt}
                  </p>

                  <div className="pt-2 flex items-center gap-2 text-xs tracking-widest uppercase font-bold text-[#385443] group-hover:translate-x-2 transition-transform duration-500">
                    Ler mais
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-24 border-t border-[#DFDCD4]">
              <BookOpen className="w-16 h-16 text-[#B6A689] mx-auto mb-6" strokeWidth={1} />
              <h3 className="font-serif text-3xl mb-4 text-[#42331C]">Nenhum artigo encontrado</h3>
              <p className="text-[#696969]">Tente buscar por outros termos ou categorias.</p>
              <button 
                onClick={() => {setSearchQuery(''); setSelectedCategory('all');}}
                className="mt-8 text-[#385443] underline underline-offset-4 hover:text-[#42331C] transition-colors"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 bg-gradient-to-br from-[#385443] to-[#42331C] text-[#F2EFE8] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[rgba(243,243,243,0.11.01)] bg-[rgb(236,236,236)]">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-white blur-3xl"></div>
        </div>
        
        <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-8 h-8 text-[#F2EFE8]" strokeWidth={1.5} />
          </div>
          
          <h2 className="font-serif text-4xl md:text-5xl mb-6 text-[#F2EFE8]">
            Receba Novos Artigos por E-mail
          </h2>
          
          <p className="text-lg text-[#DFDCD4] mb-10 font-light leading-relaxed">
            Insights semanais sobre liderança médica, gestão estratégica e governança clínica direto na sua caixa de entrada.
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 focus:border-white/40 outline-none placeholder-[#DFDCD4]/60 text-white transition-all rounded-[7px]"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-white text-[#385443] rounded-[7px] hover:bg-[#F2EFE8] transition-all font-bold tracking-wide shadow-lg whitespace-nowrap"
            >
              Assinar Newsletter
            </button>
          </form>

          <p className="text-xs text-[#DFDCD4]/70 mt-6">
            Sem spam. Cancele a qualquer momento.
          </p>
        </div>
      </section>
    </main>
  );
}
