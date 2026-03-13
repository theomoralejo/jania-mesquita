import React, { useState, useEffect } from 'react';

import { Newspaper, Tv, Mic, BookOpen, ExternalLink, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mediaApi, acervoApi, resolveImageUrl, type MediaFeatured, type MediaItem, type MediaPress, type AcervoProduct } from '../lib/api';
import { EventPhotos } from '../components/EventPhotos';

const ICON_MAP: Record<string, React.ElementType> = {
  Tv, Mic, Newspaper, BookOpen,
};

export default function NaMidiaPage() {
  const [featured, setFeatured] = useState<MediaFeatured | null>(null);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [livros, setLivros] = useState<AcervoProduct[]>([]);
  const [press, setPress] = useState<MediaPress[]>([]);

  useEffect(() => {
    mediaApi.getFeatured().then(data => { if (data[0]) setFeatured(data[0]); }).catch(() => { });
    mediaApi.getItems().then(setMediaItems).catch(() => { });
    mediaApi.getPress().then(setPress).catch(() => { });
    // Livros vêm do acervo filtrados pelo formato "fisico"
    acervoApi.getProducts({ format: 'fisico' })
      .then(data => setLivros(data))
      .catch(() => { });
  }, []);

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="section-padding bg-[#42331C] text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-6xl mb-6 text-white">Na Mídia</h1>
            <p className="text-xl text-gray-300">
              Cobertura nacional sobre gestão de clínicas, governança corporativa e transformação digital na saúde.
            </p>
          </div>
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section className="section-padding">
          <div className="container-custom">
            <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-video lg:aspect-auto bg-gray-300 flex items-center justify-center overflow-hidden">
                  {featured.image ? (
                    <img
                      src={resolveImageUrl(featured.image) ?? ''}
                      alt={featured.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-gray-500">
                      <Newspaper className="w-16 h-16 mx-auto mb-4" strokeWidth={1.5} />
                      <div className="text-sm">Imagem da publicação</div>
                    </div>
                  )}
                </div>
                <div className="p-12 flex flex-col justify-center">
                  <div className="inline-block px-4 py-2 bg-[#42331C] text-white rounded-xl text-sm mb-4 w-fit">
                    DESTAQUE
                  </div>
                  <div className="text-sm text-gray-600 mb-2">{featured.outlet}</div>
                  <h2 className="text-4xl mb-4 text-[#42331C]">{featured.title}</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">{featured.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" strokeWidth={1.5} />
                      {featured.date}
                    </div>
                    <div className="px-3 py-1 bg-gray-200 rounded-lg">{featured.type}</div>
                  </div>
                  <a
                    href={featured.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#42331C] text-white rounded-xl hover:bg-gray-900 transition-all w-fit group"
                  >
                    Ler Artigo Completo
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Media Grid */}
      {mediaItems.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <h2 className="text-5xl mb-12 text-[#42331C]">Todas as Aparições</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mediaItems.map((item) => {
                const IconComp = ICON_MAP[item.icon] ?? Newspaper;
                return (
                  <a
                    key={item.id}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-black hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-12 h-12 bg-[#42331C] rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <IconComp className="w-6 h-6 text-white" strokeWidth={1.5} />
                      </div>
                      <div className="flex-grow">
                        <div className="text-sm text-gray-600 mb-2">{item.outlet}</div>
                        <h3 className="text-xl mb-3 text-[#42331C] group-hover:text-gray-600 transition-colors">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="flex items-center gap-2 text-gray-500">
                            <Calendar className="w-4 h-4" strokeWidth={1.5} />
                            {item.date}
                          </div>
                          <div className="px-3 py-1 bg-gray-100 rounded-lg text-gray-600">
                            {item.type}
                          </div>
                        </div>
                      </div>
                      <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-[#42331C] transition-colors" strokeWidth={1.5} />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Livros Publicados — vindos do Acervo (formato: Livro Físico) */}
      {livros.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="text-5xl mb-12 text-[#42331C]">Livros Publicados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {livros.map((livro) => (
                <Link
                  key={livro.id}
                  to={`/acervo/${livro.slug}`}
                  className="group bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#42331C] hover:shadow-xl transition-all duration-300 block"
                >
                  <div className="aspect-[3/4] bg-[#F2EFE8] rounded-xl mb-6 flex items-center justify-center overflow-hidden">
                    {livro.image ? (
                      <img
                        src={resolveImageUrl(livro.image) ?? ''}
                        alt={livro.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <BookOpen className="w-16 h-16 text-gray-400" strokeWidth={1.5} />
                    )}
                  </div>
                  <div className="text-sm text-[#B6A689] mb-2 font-medium">{livro.price}</div>
                  <h3 className="text-2xl mb-3 text-[#42331C] group-hover:text-[#385443] transition-colors">{livro.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{livro.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Press Stats */}
      {press.length > 0 && (
        <section className="section-padding bg-[#42331C] text-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-5xl mb-6 text-white">Presença na Imprensa</h2>
              <p className="text-xl text-gray-300">Menções em grandes veículos de comunicação</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {press.map((item) => (
                <div key={item.id} className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all">
                  <div className="text-5xl mb-3 text-white">{item.mentions}</div>
                  <div className="text-gray-300">{item.outlet}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Galeria de Fotos */}
      <EventPhotos />

      {/* CTA */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-5xl mb-6 text-[#42331C]">Assessoria de Imprensa</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Para entrevistas, pautas ou solicitações de mídia, entre em contato com nossa assessoria.
          </p>
          <a href="/contato" className="inline-flex items-center gap-2 px-8 py-4 bg-[#42331C] text-white rounded-xl hover:bg-gray-900 transition-all">
            Solicitar Entrevista
            <ExternalLink className="w-5 h-5" strokeWidth={1.5} />
          </a>
        </div>
      </section>
    </main>
  );
}
