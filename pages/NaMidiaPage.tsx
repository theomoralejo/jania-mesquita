import { Newspaper, Tv, Mic, BookOpen, ExternalLink, Calendar } from 'lucide-react';

export default function NaMidiaPage() {
  const featured = {
    type: 'Revista',
    outlet: 'Harvard Business Review Brasil',
    title: 'Como Transformar Clínicas em Empresas Escaláveis',
    date: 'Dezembro 2025',
    image: '/placeholder-hbr.jpg',
    description: 'Artigo principal sobre metodologia proprietária e a transformação de clínicas médicas em negócios sustentáveis.',
    link: '#'
  };

  const mediaItems = [
    {
      type: 'TV',
      icon: Tv,
      outlet: 'Globo News',
      title: 'Entrevista: O Futuro da Gestão de Clínicas no Brasil',
      date: 'Novembro 2025',
      link: '#'
    },
    {
      type: 'Podcast',
      icon: Mic,
      outlet: 'Café com ADM',
      title: 'Governança Corporativa na Área da Saúde',
      date: 'Outubro 2025',
      link: '#'
    },
    {
      type: 'Revista',
      icon: Newspaper,
      outlet: 'Revista Exame',
      title: 'Top 10 Consultoras em Saúde de 2024',
      date: 'Setembro 2025',
      link: '#'
    },
    {
      type: 'Artigo',
      icon: BookOpen,
      outlet: 'Valor Econômico',
      title: 'A Profissionalização das Clínicas Médicas',
      date: 'Agosto 2025',
      link: '#'
    },
    {
      type: 'Podcast',
      icon: Mic,
      outlet: 'HealthTech BR',
      title: 'Tecnologia e Gestão: O Novo Modelo de Clínicas',
      date: 'Julho 2025',
      link: '#'
    },
    {
      type: 'TV',
      icon: Tv,
      outlet: 'Band News',
      title: 'Desafios da Gestão em Tempos de Crise',
      date: 'Junho 2025',
      link: '#'
    },
    {
      type: 'Revista',
      icon: Newspaper,
      outlet: 'Forbes Brasil',
      title: 'Mulheres que Transformam o Setor de Saúde',
      date: 'Maio 2025',
      link: '#'
    },
    {
      type: 'Artigo',
      icon: BookOpen,
      outlet: 'Época Negócios',
      title: 'Metodologia Revolucionária para Clínicas',
      date: 'Abril 2025',
      link: '#'
    }
  ];

  const books = [
    {
      title: 'Do Consultório à Empresa: Guia Prático',
      year: '2024',
      publisher: 'Editora Gente',
      description: 'Manual completo para médicos que desejam transformar suas práticas em negócios escaláveis.'
    },
    {
      title: 'Governança em Clínicas de Saúde',
      year: '2022',
      publisher: 'Campus Elsevier',
      description: 'Metodologias executivas aplicadas ao contexto de clínicas médicas de alto faturamento.'
    },
    {
      title: 'Governança em Clínicas: 5 Pilares',
      year: '2020',
      publisher: 'Autoral',
      description: 'Apresentação detalhada do framework proprietário de transformação de clínicas.'
    }
  ];

  const press = [
    { outlet: 'Folha de S.Paulo', mentions: 15 },
    { outlet: 'O Globo', mentions: 12 },
    { outlet: 'Estadão', mentions: 10 },
    { outlet: 'Valor Econômico', mentions: 18 }
  ];

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="section-padding bg-black text-white">
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
      <section className="section-padding">
        <div className="container-custom">
          <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-video lg:aspect-auto bg-gray-300 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Newspaper className="w-16 h-16 mx-auto mb-4" strokeWidth={1.5} />
                  <div className="text-sm">Imagem da publicação</div>
                </div>
              </div>
              <div className="p-12 flex flex-col justify-center">
                <div className="inline-block px-4 py-2 bg-black text-white rounded-xl text-sm mb-4 w-fit">
                  DESTAQUE
                </div>
                <div className="text-sm text-gray-600 mb-2">{featured.outlet}</div>
                <h2 className="text-4xl mb-4 text-black">{featured.title}</h2>
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
                  className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition-all w-fit group"
                >
                  Ler Artigo Completo
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-5xl mb-12 text-black">Todas as Aparições</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mediaItems.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-black hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <div className="flex-grow">
                    <div className="text-sm text-gray-600 mb-2">{item.outlet}</div>
                    <h3 className="text-xl mb-3 text-black group-hover:text-gray-600 transition-colors">
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
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" strokeWidth={1.5} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Books */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-5xl mb-12 text-black">Livros Publicados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {books.map((book, index) => (
              <div key={index} className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-black hover:shadow-xl transition-all duration-300">
                <div className="aspect-[3/4] bg-gray-100 rounded-xl mb-6 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-gray-400" strokeWidth={1.5} />
                </div>
                <div className="text-sm text-gray-600 mb-2">{book.publisher} • {book.year}</div>
                <h3 className="text-2xl mb-4 text-black">{book.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{book.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Stats */}
      <section className="section-padding bg-black text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-5xl mb-6 text-white">Presença na Imprensa</h2>
            <p className="text-xl text-gray-300">Menções em grandes veículos de comunicação</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {press.map((item, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all">
                <div className="text-5xl mb-3 text-white">{item.mentions}</div>
                <div className="text-gray-300">{item.outlet}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-5xl mb-6 text-black">Assessoria de Imprensa</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Para entrevistas, pautas ou solicitações de mídia, entre em contato com nossa assessoria.
          </p>
          <a href="/contato" className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-xl hover:bg-gray-900 transition-all">
            Solicitar Entrevista
            <ExternalLink className="w-5 h-5" strokeWidth={1.5} />
          </a>
        </div>
      </section>
    </main>
  );
}