import React from 'react';

import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ShoppingCart, Star, Clock, User, ArrowRight, BookOpen, ShieldCheck, Award } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { acervoApi, resolveImageUrl } from '../lib/api';

export default function AcervoSinglePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Buscar produto da API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(false);

        if (!slug) {
          setError(true);
          return;
        }

        const productData = await acervoApi.getProductBySlug(slug);

        // Transformar dados da API para o formato do componente
        const transformedProduct = {
          title: productData.title,
          subtitle: productData.description,
          type: productData.format.label,
          category: productData.category.label,
          price: productData.price,
          originalPrice: productData.originalPrice,
          format: productData.format.slug,
          image: productData.image,
          description: productData.description,
          hotmartLink: productData.hotmartLink,
          features: productData.features?.map((f: any) => f.text) || [],
          benefits: [], // Pode ser implementado futuramente
          fullContent: productData.fullContent || '',
          relatedResources: [], // Pode ser implementado futuramente
          tags: productData.features?.map((f: any) => f.text).slice(0, 3) || []
        };

        setProduct(transformedProduct);
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  // Mock Data Dispatcher (mantido para compatibilidade com artigos - pode ser removido se não houver artigos)
  const isArticle = false; // Por enquanto só produtos

  const articleData = {
    title: 'A Nova Era da Governança Clínica',
    type: 'Artigo',
    category: 'Governança',
    date: '12 Dez 2025',
    readTime: '5 min',
    author: 'Jania Mesquita',
    image: 'https://images.unsplash.com/photo-1747727568150-444573cd705a?auto=format&fit=crop&q=80&w=1200',
    content: `
      <p class="mb-6 text-xl leading-relaxed font-light text-[#696969]">Por que a gestão intuitiva não é mais suficiente para clínicas que buscam escala e perpetuidade no mercado atual.</p>
      <p class="mb-6">Durante décadas, a "gestão de balcão" foi suficiente para manter consultórios lucrativos. O médico era o centro, e os pacientes vinham por indicação. Mas o cenário mudou drasticamente.</p>
      <h2 class="font-serif text-3xl mt-12 mb-6 text-[#42331C]">O Fim do Amadorismo</h2>
      <p class="mb-6">Com a entrada de grandes players, redes de franquias e a profissionalização do setor, a clínica que não tiver processos claros, indicadores definidos e uma cultura forte, será engolida.</p>
      <p class="mb-6">Governança clínica não é burocracia. É liberdade. É criar um sistema que funciona independente da presença física do dono o tempo todo.</p>
      <blockquote class="border-l-4 border-[#385443] pl-6 my-10 italic text-xl text-[#42331C]">
        "Não existe escala sem padronização. E não existe padronização sem governança."
      </blockquote>
      <h3 class="font-serif text-2xl mt-8 mb-4 text-[#42331C]">Os 3 Pilares da Mudança</h3>
      <p class="mb-6">Para virar essa chave, precisamos atuar em três frentes: Pessoas, Processos e Tecnologia. Sem esse tripé, qualquer tentativa de crescimento vira caos.</p>
    `,
    relatedProduct: {
      slug: 'livro-governanca-clinica',
      title: 'Governança Clínica: O Guia Definitivo',
      type: 'Livro Recomendado',
      price: 'R$ 89,90',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
      description: 'Quer se aprofundar neste tema? Conheça o livro que detalha todo o método.'
    }
  };

  // Loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-[#F2EFE8] flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-[#385443] mx-auto mb-4 animate-pulse" />
          <p className="text-[#696969] text-lg">Carregando produto...</p>
        </div>
      </main>
    );
  }

  // Error or product not found
  if (error || !product) {
    return (
      <main className="min-h-screen bg-[#F2EFE8] flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <BookOpen className="w-16 h-16 text-[#B6A689] mx-auto mb-4" />
          <h2 className="font-serif text-3xl mb-4 text-[#42331C]">Produto não encontrado</h2>
          <p className="text-[#696969] mb-8">O produto que você procura não existe ou foi removido.</p>
          <Link
            to="/acervo"
            className="inline-flex items-center gap-2 text-[#385443] hover:text-[#42331C] font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o acervo
          </Link>
        </div>
      </main>
    );
  }

  // Select data based on simulated routing (product from API or old articleData)
  const resource = isArticle ? articleData : product;

  // --- RENDER ARTICLE VIEW ---
  if (isArticle) {
    return (
      <main className="min-h-screen bg-[#F2EFE8] pt-28 pb-20">
        <div className="container-custom px-6 md:px-0">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-6 text-sm tracking-widest uppercase text-[#B6A689] font-bold">
              <span>{resource.category}</span>
              <span className="w-1 h-1 bg-[#B6A689] rounded-full"></span>
              <span>{resource.date}</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl text-[#42331C] leading-tight mb-8">
              {resource.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-sm text-[#696969]">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {resource.author}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {resource.readTime} de leitura
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="max-w-5xl mx-auto mb-16 aspect-[21/9] overflow-hidden rounded-[3px]">
            <img src={resolveImageUrl(resource.image)} alt={resource.title} className="w-full h-full object-cover" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Article Content */}
            <div className="lg:col-span-8">
              <div 
                className="prose prose-lg prose-brown max-w-none font-light text-[#696969]"
                dangerouslySetInnerHTML={{ __html: resource.content }}
              />
            </div>

            {/* Sidebar / Related Product */}
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <div className="bg-white p-6 rounded-[7px] border border-[#DFDCD4] shadow-lg">
                  <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#385443] mb-4 flex items-center gap-2">
                    <Star className="w-4 h-4 fill-current" />
                    Recomendado para você
                  </div>
                  
                  <div className="aspect-[3/4] bg-[#EBEBEB] mb-4 rounded-[3px] overflow-hidden">
                    <img 
                      src={resource.relatedProduct.image} 
                      alt={resource.relatedProduct.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="font-serif text-xl text-[#42331C] mb-2 leading-tight">
                    {resource.relatedProduct.title}
                  </h3>
                  
                  <p className="text-sm text-[#696969] mb-4 line-clamp-2">
                    {resource.relatedProduct.description}
                  </p>

                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-lg text-[#385443]">{resource.relatedProduct.price}</span>
                  </div>

                  <Link 
                    to={`/acervo/${resource.relatedProduct.slug}`}
                    className="w-full py-3 bg-[#42331C] text-[#F2EFE8] flex items-center justify-center gap-2 rounded-[5px] hover:bg-[#385443] transition-colors font-bold text-sm uppercase tracking-wide"
                  >
                    Ver Detalhes
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Mentoria Card (Cross-sell) */}
                <div className="bg-[#385443] p-6 rounded-[7px] border border-[#2A4032] shadow-lg mt-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                  
                  <div className="relative z-10">
                    <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#d4af37] mb-4 flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Programa Exclusivo
                    </div>
                    
                    <h3 className="font-serif text-xl text-white mb-2 leading-tight">
                      Mentoria Executiva
                    </h3>
                    
                    <p className="text-sm text-[#F2EFE8]/80 mb-6 leading-relaxed">
                      Para donos de clínicas que buscam governança e liberdade operacional.
                    </p>

                    <Link 
                      to="/mentoria-lpv"
                      className="w-full py-3 bg-[#d4af37] text-[#0a2540] flex items-center justify-center gap-2 rounded-[5px] hover:bg-[#F2EFE8] transition-all font-bold text-sm uppercase tracking-wide shadow-md group-hover:translate-y-[-2px]"
                    >
                      Aplicar Agora
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // --- RENDER PRODUCT LP VIEW ---
  return (
    <main className="min-h-screen bg-[#F2EFE8]">
      
      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#DFDCD4]/20 -z-10"></div>
        <div className="container-custom px-6 md:px-0">
          <Link to="/acervo" className="inline-flex items-center gap-2 text-[#696969] hover:text-[#42331C] transition-colors text-xs tracking-widest uppercase font-bold mb-12">
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Acervo
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 px-3 py-1 bg-[#385443]/10 rounded-full border border-[#385443]/20">
                <Star className="w-3 h-3 text-[#385443] fill-current" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#385443]">Bestseller #1 em Gestão Médica</span>
              </div>
              
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-[#42331C]">
                {resource.title}
              </h1>
              
              <p className="text-xl md:text-2xl text-[#696969] font-light leading-relaxed max-w-xl">
                {resource.subtitle}
              </p>

              <div className="flex flex-col gap-4 pt-4">
                <a 
                  href={resource.hotmartLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-[#385443] text-white rounded-[7px] hover:bg-[#2A4032] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3 font-bold text-lg whitespace-nowrap"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Comprar Agora
                </a>
              </div>

              <div className="flex items-center gap-4 text-sm text-[#696969] pt-4">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#F2EFE8] bg-gray-300 overflow-hidden">
                       <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <p>Junte-se a <span className="font-bold text-[#42331C]">2.000+</span> médicos leitores</p>
              </div>
            </div>

            {/* Right Image (Book Mockup vibe) */}
            <div className="relative flex justify-center lg:justify-end">
               <div className="relative w-full max-w-md aspect-[3/4] shadow-2xl rounded-[5px] rotate-y-12 transform transition-transform hover:rotate-0 duration-700">
                  <div className="absolute inset-0 bg-[#42331C] rounded-[5px] transform translate-x-4 translate-y-4 -z-10"></div>
                  <img 
                    src={resolveImageUrl(resource.image)} 
                    alt={resource.title}
                    className="w-full h-full object-cover rounded-[5px] border border-[#DFDCD4]"
                  />
                  {/* Badge Overlay */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#385443] rounded-full flex items-center justify-center text-white font-serif text-center p-2 shadow-xl animate-pulse">
                    <span className="text-sm leading-tight">Nova Edição 2025</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SOCIAL PROOF / AUTHORITY */}
      <section className="py-20 bg-gradient-to-b from-[#F9F9F9] via-[#F2EFE8]/50 to-[#F2EFE8]">
        <div className="container-custom px-6 md:px-0">
          {/* Editorial Label */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <div className="w-16 h-[1px] bg-[#B6A689]"></div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#B6A689]">
              Reconhecimento e Confiança
            </span>
            <div className="w-16 h-[1px] bg-[#B6A689]"></div>
          </div>

          {/* Testimonials Grid - Editorial Magazine Style */}
          <div className="max-w-[1218px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Testimonial 1 - Featured Large */}
            <div className="md:col-span-2 bg-white p-8 rounded-[7px] border border-[#DFDCD4] shadow-[var(--shadow-lg)] relative">
              <div className="absolute top-6 right-6">
                <Award className="w-10 h-10 text-[#d4af37] opacity-20" />
              </div>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#385443]">
                  <img src="https://i.pravatar.cc/100?img=33" alt="Dra. Mariana" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-[#42331C] mb-1">Dra. Mariana Costa</h4>
                  <p className="text-xs text-[#B6A689] uppercase tracking-wider">Dermatologia • São Paulo</p>
                </div>
              </div>
              <p className="text-[#696969] font-light leading-relaxed italic mb-6">
                "Implementei os 4 pilares da governança e, em 6 meses, minha clínica saiu de um faturamento caótico para resultados previsíveis e crescentes. Jania não vende teoria: ela entrega método."
              </p>
              <div className="flex items-center gap-2">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-4 h-4 text-[#d4af37] fill-current" />
                ))}
              </div>
            </div>

            {/* Testimonial 2 - Compact */}
            <div className="bg-[#385443] p-8 rounded-[7px] text-[#F2EFE8] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#F2EFE8]">
                    <img src="https://i.pravatar.cc/100?img=28" alt="Dr. Ricardo" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-serif text-[#F2EFE8] mb-0">Dr. Ricardo Alves</h4>
                    <p className="text-[10px] text-[#DFDCD4] uppercase tracking-wider">Ortopedia • BH</p>
                  </div>
                </div>
                <p className="text-sm font-light leading-relaxed italic text-white">
                  "Finalmente consegui delegar sem medo. O livro me deu a estrutura que faltava."
                </p>
              </div>
              <div className="flex items-center gap-1 mt-6">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-3 h-3 text-[#d4af37] fill-current" />
                ))}
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* 3. PROBLEM / SOLUTION (STORY) */}
      <section className="section-padding">
        <div className="container-custom px-6 md:px-0">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-[#42331C] mb-6">
              A Medicina Mudou. <br/><span className="italic text-[#385443]">Sua Gestão Também Precisa Mudar.</span>
            </h2>
            <div className="w-24 h-1 bg-[#d4af37] mx-auto mb-8"></div>
            <div 
              className="prose prose-lg prose-brown mx-auto text-[#696969] font-light leading-relaxed"
              dangerouslySetInnerHTML={{ __html: resource.fullContent }}
            />
          </div>
        </div>
      </section>

      {/* 4. BENEFITS / WHAT'S INSIDE */}
      {resource.benefits && resource.benefits.length >= 4 && <section className="section-padding bg-[#42331C] text-[#F2EFE8] relative overflow-hidden">
        {/* Geometric Accent */}
        <div className="absolute top-20 left-0 w-72 h-72 border border-[#B6A689]/20 rounded-full -translate-x-1/2"></div>
        <div className="absolute bottom-20 right-0 w-96 h-96 border border-[#B6A689]/20 rounded-full translate-x-1/2"></div>
        
        <div className="container-custom px-6 md:px-0 relative z-10">
          {/* Editorial Header with Number Badge */}
          <div className="max-w-[1218px] mx-auto mb-20">
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 pb-12 border-b border-[#B6A689]/30">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-[1px] bg-[#B6A689]"></div>
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#B6A689]">
                    Conteúdo Premium
                  </span>
                </div>
                <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6 text-white leading-[1.05]">
                  O Que Você<br/>Vai Dominar
                </h2>
                <p className="text-lg text-white/90 font-light leading-relaxed max-w-2xl">
                  Não é apenas um livro. É um manual de implementação para quem não tem tempo a perder. Cada capítulo é uma alavanca de transformação para sua clínica.
                </p>
              </div>
              
              {/* Stats Badge */}
              <div className="bg-[#B6A689] rounded-[7px] p-8 text-center border-2 border-[#F2EFE8]/30 min-w-[200px] shadow-xl">
                <div className="text-5xl font-serif text-[#42331C] mb-2">320</div>
                <div className="text-xs uppercase tracking-widest text-[#42331C] font-bold">Páginas de Método Prático</div>
              </div>
            </div>
          </div>

          {/* Asymmetric Benefits Grid - Magazine Editorial Style */}
          <div className="max-w-[1218px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Large Featured Benefit - Spans 2 columns */}
            <div className="lg:col-span-7 bg-[#F2EFE8] p-12 rounded-[7px] border-2 border-[#B6A689] relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300 shadow-2xl">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#B6A689]/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#B6A689] rounded-full mb-8 shadow-lg">
                  <span className="text-2xl font-serif text-[#42331C]">01</span>
                </div>
                
                <h3 className="font-serif text-4xl text-[#42331C] mb-6 leading-tight">
                  {resource.benefits[0].title}
                </h3>
                
                <p className="text-[#42331C]/80 font-light text-lg leading-relaxed mb-8">
                  {resource.benefits[0].desc}
                </p>
                
                <div className="flex items-center gap-3 text-sm text-[#B6A689]">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="uppercase tracking-wider font-bold">Capítulos 1-3</span>
                </div>
              </div>
            </div>

            {/* Vertical Stack - 2 Compact Benefits */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              {/* Benefit 2 */}
              <div className="bg-[#F2EFE8] p-8 rounded-[7px] border-2 border-[#B6A689] hover:border-[#B6A689]/80 transition-colors shadow-lg">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#B6A689] rounded-full flex items-center justify-center shadow-md">
                      <span className="font-serif text-xl text-[#42331C]">02</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-[#42331C] mb-3 leading-tight">
                      {resource.benefits[1].title}
                    </h3>
                    <p className="text-[#42331C]/80 font-light text-sm leading-relaxed">
                      {resource.benefits[1].desc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Benefit 3 */}
              <div className="bg-[#F2EFE8] p-8 rounded-[7px] border-2 border-[#B6A689] hover:border-[#B6A689]/80 transition-colors shadow-lg">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#B6A689] rounded-full flex items-center justify-center shadow-md">
                      <span className="font-serif text-xl text-[#42331C]">03</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-[#42331C] mb-3 leading-tight">
                      {resource.benefits[2].title}
                    </h3>
                    <p className="text-[#42331C]/80 font-light text-sm leading-relaxed">
                      {resource.benefits[2].desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Full Width Benefit - Editorial Pullquote Style */}
            <div className="lg:col-span-12 relative">
              <div className="bg-[#F2EFE8] p-12 md:p-16 rounded-[7px] border-2 border-[#B6A689] shadow-2xl">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-[#B6A689] rounded-full flex items-center justify-center shadow-xl">
                      <span className="text-3xl font-serif text-[#42331C]">04</span>
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="font-serif text-3xl md:text-4xl text-[#42331C] mb-4 leading-tight">
                      {resource.benefits[3].title}
                    </h3>
                    <p className="text-[#42331C]/80 font-light text-lg leading-relaxed">
                      {resource.benefits[3].desc}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <Award className="w-16 h-16 text-[#B6A689]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="max-w-[1218px] mx-auto mt-16 text-center">
            <a 
              href={resource.hotmartLink}
              target="_blank"
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#B6A689] text-[#42331C] rounded-[7px] hover:bg-[#F2EFE8] hover:text-[#42331C] transition-all shadow-xl hover:shadow-2xl hover:scale-105 font-bold text-lg whitespace-nowrap"
            >
              Ver Sumário Completo
              <BookOpen className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>}

      {/* 5. PRICING / OFFER */}
      <section className="section-padding bg-[#F2EFE8]">
        <div className="container-custom px-6 md:px-0">
          <div className="max-w-5xl mx-auto bg-white rounded-[20px] p-6 md:p-10 border border-[#DFDCD4] shadow-[var(--shadow-xl)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#385443]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <span className="inline-block px-4 py-1 bg-[#385443] text-white text-xs font-bold tracking-widest uppercase rounded-full mb-6">
                  Oferta Especial
                </span>
                <h2 className="font-serif text-4xl text-[#42331C] mb-6">
                  Adquira o Manual Completo
                </h2>
                <ul className="space-y-4 mb-8">
                  {resource.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-[#696969]">
                      <div className="w-5 h-5 bg-[#385443]/20 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-3 h-3 text-[#385443]" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                  <li className="flex items-center gap-3 text-[#696969]">
                    <div className="w-5 h-5 bg-[#385443]/20 rounded-full flex items-center justify-center">
                      <ShieldCheck className="w-3 h-3 text-[#385443]" />
                    </div>
                    <span>Garantia de 7 dias ou seu dinheiro de volta</span>
                  </li>
                </ul>
              </div>

              <div className="text-center bg-white p-8 rounded-[10px] border border-[#DFDCD4] shadow-lg">
                <div className="text-sm text-[#696969] mb-2 font-medium">De <span className="line-through">{resource.originalPrice}</span> por apenas:</div>
                <div className="text-6xl font-serif text-[#385443] mb-2">{resource.price}</div>
                <div className="text-xs text-[#B6A689] uppercase tracking-widest font-bold mb-8">Pagamento Único</div>
                
                <a 
                  href={resource.hotmartLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-5 bg-[#385443] text-white rounded-[7px] hover:bg-[#2A4032] transition-all shadow-lg flex items-center justify-center gap-2 font-bold text-lg mb-4"
                >
                  Garantir Meu Exemplar
                  <ArrowRight className="w-5 h-5" />
                </a>
                
                <div className="flex items-center justify-center gap-2 text-[10px] text-[#696969] opacity-70">
                  <ShieldCheck className="w-3 h-3" />
                  Compra 100% Segura via Hotmart
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. AUTHOR BIO (Brief) */}
      <section className="py-24 border-t border-[#DFDCD4]">
        <div className="container-custom px-6 md:px-0">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#DFDCD4] shadow-xl flex-shrink-0">
              <img
                src={`${import.meta.env.BASE_URL}assets/img/jania_9.webp`}
                alt="Jania Mesquita"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
               <h3 className="font-serif text-2xl text-[#42331C] mb-4">Sobre a Autora</h3>
               <p className="text-[#696969] leading-relaxed max-w-2xl font-light">
                 Jania Mesquita é médica especialista em gestão e governança corporativa aplicada à saúde. Com mais de 15 anos de experiência no setor, é autora best-seller e mentora de líderes que transformam clínicas em operações escaláveis. Sua metodologia proprietária une a visão humanizada da medicina com a eficiência estratégica da gestão, tendo impactado diretamente centenas de profissionais e organizações de saúde no Brasil.
               </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}