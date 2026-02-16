import React from 'react';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, BookOpen, ShoppingBag, Smartphone, Book, Video, Headphones, ArrowRight } from 'lucide-react';

export default function AcervoPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');

  const categories = [
    { value: 'all', label: 'Todos' },
    { value: 'governanca', label: 'Governança' },
    { value: 'gestao', label: 'Gestão' },
    { value: 'lideranca', label: 'Liderança' },
    { value: 'marketing', label: 'Marketing' }
  ];

  const formats = [
    { value: 'all', label: 'Todos os Formatos' },
    { value: 'ebook', label: 'E-books', icon: Smartphone },
    { value: 'kindle', label: 'Kindle', icon: Book },
    { value: 'fisico', label: 'Livro Físico', icon: BookOpen },
    { value: 'produto', label: 'Produtos Digitais', icon: ShoppingBag }
  ];

  const resources = [
    {
      slug: 'livro-governanca-clinica',
      title: 'Governança Clínica: O Guia Definitivo',
      category: 'governanca',
      format: 'fisico',
      type: 'Livro Físico',
      price: 'R$ 89,90',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
      description: 'A obra de referência para médicos que desejam transformar suas clínicas em empresas de alto valor.',
      tags: ['Bestseller', 'Fundamentos']
    },
    {
      slug: 'ebook-escalabilidade',
      title: 'Escalabilidade Sem Caos',
      category: 'gestao',
      format: 'ebook',
      type: 'E-book',
      price: 'R$ 47,00',
      image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=800',
      description: 'Estratégias práticas para crescer sua operação mantendo a qualidade e a sanidade.',
      tags: ['Crescimento', 'Processos']
    },
    {
      slug: 'kindle-lideranca-medica',
      title: 'Liderança Médica na Prática',
      category: 'lideranca',
      format: 'kindle',
      type: 'Kindle',
      price: 'R$ 24,90',
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800',
      description: 'Como liderar equipes multidisciplinares e criar uma cultura de alta performance.',
      tags: ['Gestão de Pessoas', 'Cultura']
    },
    {
      slug: 'kit-gestao-financeira',
      title: 'Kit de Gestão Financeira',
      category: 'gestao',
      format: 'produto',
      type: 'Ferramenta Digital',
      price: 'R$ 197,00',
      image: 'https://images.unsplash.com/photo-1554224155-98406852d0a8?auto=format&fit=crop&q=80&w=800',
      description: 'Planilhas, dashboards e templates para controle total das finanças da sua clínica.',
      tags: ['Finanças', 'Templates']
    },
    {
      slug: 'ebook-marketing-etico',
      title: 'Marketing Ético e Eficiente',
      category: 'marketing',
      format: 'ebook',
      type: 'E-book',
      price: 'R$ 59,90',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
      description: 'Como atrair pacientes qualificados respeitando as normas do CFM e construindo autoridade.',
      tags: ['Vendas', 'Posicionamento']
    },
    {
      slug: 'livro-experiencia-paciente',
      title: 'A Jornada do Paciente',
      category: 'gestao',
      format: 'fisico',
      type: 'Livro Físico',
      price: 'R$ 79,90',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a063b36c?auto=format&fit=crop&q=80&w=800',
      description: 'Mapeando e otimizando cada ponto de contato para encantar e fidelizar.',
      tags: ['Atendimento', 'Fidelização']
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesFormat = selectedFormat === 'all' || resource.format === selectedFormat;
    
    return matchesSearch && matchesCategory && matchesFormat;
  });

  return (
    <main className="min-h-screen bg-[#F2EFE8]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#DFDCD4]/20 -z-10"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <div className="editorial-label mb-8">
              Biblioteca & Loja
            </div>
            
            <h1 className="font-serif text-5xl md:text-7xl mb-8 leading-[1.05] tracking-tight text-[#42331C]">
              Acervo <span className="italic font-light text-[#385443]">Jania Mesquita</span>
            </h1>
            
            <p className="text-lg md:text-xl max-w-2xl mb-12 leading-relaxed font-light text-[#696969]">
              Uma curadoria de conhecimento técnico e estratégico. Livros, e-books e ferramentas para acelerar a maturidade da sua gestão.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="sticky top-20 z-40 bg-[#F2EFE8]/95 backdrop-blur-sm border-b border-[#DFDCD4] py-6">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-8 md:items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B6A689] group-hover:text-[#42331C] transition-colors" strokeWidth={1.5} />
              <input
                type="text"
                placeholder="Buscar no acervo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2 bg-transparent border-b border-[#B6A689] focus:border-[#42331C] outline-none placeholder-[#B6A689] text-[#42331C] transition-colors font-serif italic"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              {formats.slice(1).map((format) => (
                <button
                  key={format.value}
                  onClick={() => setSelectedFormat(selectedFormat === format.value ? 'all' : format.value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all whitespace-nowrap text-sm tracking-wide ${
                    selectedFormat === format.value
                      ? 'bg-[#385443] border-[#385443] text-[#F2EFE8]'
                      : 'border-[#B6A689] text-[#42331C] hover:border-[#42331C]'
                  }`}
                >
                  {format.icon && <format.icon className="w-4 h-4" strokeWidth={1.5} />}
                  {format.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {filteredResources.map((resource, index) => (
              <Link
                key={index}
                to={`/acervo/${resource.slug}`}
                className="group block"
              >
                {/* Image Aspect Ratio */}
                <div className="relative aspect-[3/4] mb-8 overflow-hidden bg-[#EBEBEB]">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 saturate-50 group-hover:saturate-100"
                  />
                  
                  {/* Floating Tag */}
                  <div className="absolute top-4 left-4 bg-[#F2EFE8]/90 backdrop-blur-sm px-3 py-1.5 border border-[#DFDCD4]">
                    <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#42331C]">
                      {resource.type}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div className="flex justify-between items-start border-b border-[#DFDCD4] pb-4">
                    <span className="text-xs font-bold tracking-widest text-[#B6A689] uppercase">
                      {resource.category}
                    </span>
                    <span className="font-serif text-lg text-[#385443]">
                      {resource.price}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl leading-tight text-[#42331C] group-hover:text-[#385443] transition-colors">
                    {resource.title}
                  </h3>

                  <p className="text-[#696969] font-light leading-relaxed line-clamp-2 text-sm">
                    {resource.description}
                  </p>

                  <div className="pt-4 flex items-center gap-2 text-xs tracking-widest uppercase font-bold text-[#385443] group-hover:translate-x-2 transition-transform duration-500">
                    Ver Detalhes
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-24 border-t border-[#DFDCD4]">
              <Search className="w-16 h-16 text-[#B6A689] mx-auto mb-6" strokeWidth={1} />
              <h3 className="font-serif text-3xl mb-4 text-[#42331C]">Nenhum item encontrado</h3>
              <p className="text-[#696969]">Tente buscar por outros termos ou categorias.</p>
              <button 
                onClick={() => {setSearchQuery(''); setSelectedCategory('all'); setSelectedFormat('all');}}
                className="mt-8 text-[#385443] underline underline-offset-4 hover:text-[#42331C]"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-[#42331C] text-[#F9F9F9] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 lines-pattern"></div>
        <div className="container-custom relative z-10 text-center bg-[rgb(242,239,232)] px-[20px] py-[50px] rounded-[30px]">
          <span className="block text-xs font-bold tracking-[0.2em] uppercase text-[#D4C5A8] mb-6">
            Mentoria Executiva
          </span>
          <h2 className="font-serif text-4xl md:text-6xl mb-8 text-[#FFFFFF]">
            Acesso Completo ao Acervo
          </h2>
          <p className="text-xl text-[#E8E5DD] mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Mentorados têm acesso irrestrito a toda a biblioteca digital, ferramentas e templates, além de sessões exclusivas.
          </p>
          <div className="flex flex-col gap-6 justify-center items-center max-w-md mx-auto">
            <Link 
              to="/mentoria" 
              className="w-full px-8 py-4 bg-[#385443] text-[#FFFFFF] rounded-[7px] hover:bg-[#4D6657] transition-all shadow-lg text-lg text-center"
            >
              Aplicar para Mentoria
            </Link>
            <Link 
              to="/contato" 
              className="w-full px-8 py-4 border border-[#D4C5A8] text-[rgb(26,26,26)] rounded-[7px] hover:bg-[#F2EFE8] hover:text-[#42331C] transition-all text-lg text-center"
            >
              Falar com Consultor
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}