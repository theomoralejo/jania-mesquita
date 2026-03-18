import React from 'react';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowRight, BookOpen } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { acervoApi, resolveImageUrl } from '../lib/api';

export default function AcervoPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [resources, setResources] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([
    { value: 'all', label: 'Todos' }
  ]);
  const [formats, setFormats] = useState<any[]>([
    { value: 'all', label: 'Todos os Formatos', icon: Filter }
  ]);
  const [loading, setLoading] = useState(true);

  // Buscar produtos, categorias e formatos da API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Buscar produtos
        const products = await acervoApi.getProducts();

        // Transformar dados da API para o formato do componente
        const transformedProducts = products.map((product: any) => ({
          slug: product.slug,
          title: product.title,
          category: product.category.slug,
          format: product.format.slug,
          type: product.format.label,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          description: product.description,
          tags: product.features?.map((f: any) => f.text).slice(0, 2) || [],
          featured: product.featured
        }));

        setResources(transformedProducts);

        // Buscar categorias
        const categoriesData = await acervoApi.getCategories();
        const transformedCategories = [
          { value: 'all', label: 'Todos' },
          ...categoriesData.map((cat: any) => ({
            value: cat.slug,
            label: cat.label
          }))
        ];
        setCategories(transformedCategories);

        // Buscar formatos
        const formatsData = await acervoApi.getFormats();
        const transformedFormats = [
          { value: 'all', label: 'Todos os Formatos', icon: Filter },
          ...formatsData.map((format: any) => {
            const IconComponent = (LucideIcons as any)[format.icon || 'BookOpen'] || LucideIcons.BookOpen;
            return {
              value: format.slug,
              label: format.label,
              icon: IconComponent
            };
          })
        ];
        setFormats(transformedFormats);

      } catch (error) {
        console.error('Erro ao buscar dados do acervo:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesFormat = selectedFormat === 'all' || resource.format === selectedFormat;
    
    return matchesSearch && matchesCategory && matchesFormat;
  });

  const featuredResource = filteredResources.find(resource => resource.featured);
  const regularResources = filteredResources.filter(resource => !resource.featured);

  // Loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-[#F2EFE8] flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-[#385443] mx-auto mb-4 animate-pulse" />
          <p className="text-[#696969] text-lg">Carregando produtos...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F2EFE8]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#DFDCD4]/20 -z-10"></div>
        <div className="container-custom px-6 md:px-0 relative z-10">
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
        <div className="container-custom px-6 md:px-0">
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

      {/* Featured Resource */}
      {featuredResource && (
        <section className="pt-12 pb-6 bg-[#F2EFE8] border-b border-[#DFDCD4]">
          <div className="container-custom px-6 md:px-0">
            <div className="editorial-label mb-12 text-center">
              Destaque do Acervo
            </div>
            
            <Link to={`/acervo/${featuredResource.slug}`} className="group block mb-12">
              <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-transparent rounded-[7px]">
                  <img
                    src={resolveImageUrl(featuredResource.image)}
                    alt={featuredResource.title}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-[#385443] px-4 py-2 rounded-full shadow-lg">
                    <span className="text-xs tracking-[0.2em] uppercase font-bold text-[#F2EFE8]">
                      Destaque
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <div className="flex justify-between items-start border-b border-[#DFDCD4] pb-4">
                    <span className="text-xs font-bold tracking-widest text-[#B6A689] uppercase">
                      {featuredResource.category}
                    </span>
                    <span className="font-serif text-2xl text-[#385443]">
                      {featuredResource.price?.startsWith('R$') ? featuredResource.price : `R$ ${featuredResource.price}`}
                    </span>
                  </div>

                  <h2 className="font-serif text-4xl md:text-5xl leading-tight text-[#42331C] group-hover:text-[#385443] transition-colors">
                    {featuredResource.title}
                  </h2>

                  <p className="text-lg text-[#696969] font-light leading-relaxed line-clamp-3">
                    {featuredResource.description}
                  </p>

                  <div className="pt-4 flex items-center gap-2 text-sm tracking-widest uppercase font-bold text-[#385443] group-hover:translate-x-2 transition-transform duration-500">
                    Ver Detalhes
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Results Grid */}
      <section className="section-padding">
        <div className="container-custom px-6 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {regularResources.map((resource, index) => (
              <Link
                key={index}
                to={`/acervo/${resource.slug}`}
                className="group block"
              >
                {/* Image Aspect Ratio */}
                <div className="relative aspect-[3/4] mb-8 overflow-hidden bg-transparent">
                  <img
                    src={resolveImageUrl(resource.image)}
                    alt={resource.title}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
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
                      {resource.price?.startsWith('R$') ? resource.price : `R$ ${resource.price}`}
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
      <section className="py-32 bg-[#42331C] text-[#F9F9F9] relative overflow-hidden px-4 md:px-0">
        <div className="absolute inset-0 opacity-10 lines-pattern"></div>
        <div className="container-custom relative z-10 text-center bg-[rgb(242,239,232)] px-[20px] py-[50px] rounded-[30px]">
          <span className="block text-xs font-bold tracking-[0.2em] uppercase text-[#D4C5A8] mb-6">
            Mentoria Executiva
          </span>
          <h2 className="font-serif text-4xl md:text-6xl mb-8 text-[#42331C]">
            Acesso Completo ao Acervo
          </h2>
          <p className="text-xl text-[#696969] mb-12 max-w-2xl mx-auto font-light leading-relaxed">
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