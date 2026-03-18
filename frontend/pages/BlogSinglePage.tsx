import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Clock, Share2, BookOpen } from 'lucide-react';
import { blogApi, resolveImageUrl } from '../lib/api';

export default function BlogSinglePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Buscar post da API
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(false);

        if (!slug) {
          setError(true);
          return;
        }

        const postData = await blogApi.getPostBySlug(slug);

        // Transformar dados da API para o formato do componente
        const transformedPost = {
          slug: postData.slug,
          title: postData.title,
          category: postData.category.slug,
          categoryLabel: postData.category.label,
          excerpt: postData.excerpt,
          image: resolveImageUrl(postData.image) ?? '',
          date: new Date(postData.publishedAt).toLocaleDateString('pt-BR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }),
          readTime: postData.readTime,
          content: postData.content
        };

        setPost(transformedPost);
      } catch (error) {
        console.error('Erro ao buscar post:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-[#F2EFE8] flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-[#385443] mx-auto mb-4 animate-pulse" />
          <p className="text-[#696969] text-lg">Carregando artigo...</p>
        </div>
      </main>
    );
  }

  // Error or post not found
  if (error || !post) {
    return (
      <main className="min-h-screen bg-[#F2EFE8] flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <BookOpen className="w-16 h-16 text-[#B6A689] mx-auto mb-4" />
          <h2 className="font-serif text-3xl mb-4 text-[#42331C]">Artigo não encontrado</h2>
          <p className="text-[#696969] mb-8">O artigo que você procura não existe ou foi removido.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[#385443] hover:text-[#42331C] font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o blog
          </Link>
        </div>
      </main>
    );
  }

  // Posts relacionados (por enquanto array vazio - pode ser implementado futuramente)
  const relatedPosts: any[] = [];

  return (
    <main className="min-h-screen bg-[#F2EFE8]">
      {/* Header */}
      <section className="pt-32 pb-12 bg-[#F2EFE8]">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back Button */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[#42331C] hover:text-[#385443] transition-colors mb-8 group font-medium"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Voltar para o blog
          </Link>

          {/* Category */}
          <div className="inline-block px-4 py-1.5 bg-[#B6A689] text-[#42331C] rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            {post.categoryLabel}
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl md:text-5xl text-[#42331C] mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-[#696969] text-sm font-medium">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} de leitura</span>
            </div>
            <button className="flex items-center gap-2 hover:text-[#42331C] transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Compartilhar</span>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="max-w-5xl mx-auto px-6 -mt-8">
        <div className="aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        <div
          className="prose prose-lg prose-headings:font-serif prose-headings:text-[#42331C] prose-p:text-[#414141] prose-p:leading-relaxed prose-a:text-[#385443] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#42331C] prose-ul:text-[#414141] prose-ol:text-[#414141]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-16 border-t border-[#DFDCD4]">
          <h2 className="font-serif text-3xl text-[#42331C] mb-8">
            Artigos Relacionados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                to={`/blog/${relatedPost.slug}`}
                className="group"
              >
                <div className="aspect-video mb-4 rounded-xl overflow-hidden">
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="text-xs text-[#B6A689] uppercase tracking-wider mb-2 font-bold">
                  {relatedPost.categoryLabel}
                </div>
                <h3 className="font-serif text-xl text-[#42331C] mb-2 group-hover:text-[#385443] transition-colors">
                  {relatedPost.title}
                </h3>
                <p className="text-sm text-[#696969]">{relatedPost.readTime} de leitura</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#385443] text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <BookOpen className="w-12 h-12 mx-auto mb-6 opacity-80" />
          <h2 className="font-serif text-3xl mb-4 text-white">
            Quer aprofundar seus conhecimentos em governança clínica?
          </h2>
          <p className="text-lg mb-8 text-white/90">
            Conheça nossa mentoria executiva e transforme sua clínica em uma operação escalável
          </p>
          <Link
            to="/mentoria"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#385443] rounded-lg font-bold hover:bg-[#F2EFE8] transition-colors"
          >
            Conhecer Mentoria
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
