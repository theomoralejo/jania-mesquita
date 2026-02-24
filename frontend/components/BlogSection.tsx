import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { blogApi, resolveImageUrl } from '../lib/api';

export function BlogSection() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    blogApi.getPosts({}).then((data: any[]) => {
      setPosts(
        data.slice(0, 3).map((post: any) => ({
          id: post.id,
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          category: post.category?.label ?? '',
          date: post.publishedAt
            ? new Date(post.publishedAt).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })
            : '',
          readTime: post.readTime ?? '5 min',
          image: resolveImageUrl(post.image) ?? '',
        }))
      );
    }).catch(() => {
      // mantém lista vazia em caso de erro de rede
    });
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="py-[48px] md:section-padding bg-[#F2EFE8] border-t border-[#DFDCD4] px-[20px]">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-10 md:mb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 mb-4 md:mb-8">
              <div className="w-8 h-px bg-[#42331C]"></div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#42331C]">
                Blog
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-[#232323]">
              Insights e <span className="italic text-[#385443]">Estratégia</span>
            </h2>
          </div>

          <Link
            to="/blog"
            className="group flex items-center gap-3 text-sm tracking-widest uppercase font-bold border-b border-[#385443] pb-1 text-[#385443] hover:text-[#42331C] hover:border-[#42331C] transition-colors self-start md:self-auto"
          >
            Ver todos os artigos
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="bg-white group relative h-full flex flex-col rounded-[9px] overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500 border border-[#DFDCD4]"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/2] md:aspect-[4/2] overflow-hidden bg-[#DFDCD4]">
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
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
