import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // ===========================
  // 1. USUÁRIO ADMIN
  // ===========================
  console.log('👤 Criando usuário admin...');
  const admin = await prisma.user.upsert({
    where: { email: 'admin@janiamesquita.com.br' },
    update: {},
    create: {
      email: 'admin@janiamesquita.com.br',
      password: await bcrypt.hash('admin123', 10),
      name: 'Administrador',
      role: 'ADMIN',
    },
  });
  console.log('✅ Usuário admin criado:', admin.email);

  // ===========================
  // 2. BLOG CATEGORIES
  // ===========================
  console.log('\n📂 Criando categorias de blog...');
  const catLideranca = await prisma.blogCategory.upsert({
    where: { slug: 'lideranca' },
    update: {},
    create: { slug: 'lideranca', label: 'Liderança' },
  });

  const catGestao = await prisma.blogCategory.upsert({
    where: { slug: 'gestao' },
    update: {},
    create: { slug: 'gestao', label: 'Gestão' },
  });

  const catGovernanca = await prisma.blogCategory.upsert({
    where: { slug: 'governanca' },
    update: {},
    create: { slug: 'governanca', label: 'Governança' },
  });

  const catDesenvolvimento = await prisma.blogCategory.upsert({
    where: { slug: 'desenvolvimento' },
    update: {},
    create: { slug: 'desenvolvimento', label: 'Desenvolvimento' },
  });

  console.log('✅ 4 categorias criadas');

  // ===========================
  // 3. BLOG POSTS
  // ===========================
  console.log('\n📝 Criando posts do blog...');

  await prisma.blogPost.upsert({
    where: { slug: 'da-medicina-a-gestao' },
    update: {},
    create: {
      slug: 'da-medicina-a-gestao',
      title: 'Da Medicina à Gestão: Uma Jornada de Transformação',
      excerpt: 'Como médicos podem desenvolver habilidades de liderança e gestão para transformar suas clínicas em negócios de sucesso.',
      content: `<p>A transição da medicina para a gestão é um dos maiores desafios que médicos empreendedores enfrentam. Durante anos, somos treinados para salvar vidas, diagnosticar doenças e cuidar de pacientes. Mas quando decidimos abrir nossa própria clínica, percebemos que precisamos de um conjunto completamente diferente de habilidades.</p>

<h2>O Desafio da Dupla Identidade</h2>
<p>Ser médico e gestor ao mesmo tempo exige que você desenvolva uma dupla identidade. De um lado, você precisa manter a excelência técnica e o cuidado com o paciente. Do outro, precisa pensar em fluxo de caixa, processos operacionais e desenvolvimento de equipe.</p>

<h2>As Principais Competências de Gestão</h2>
<p>Ao longo da minha jornada, identifiquei cinco competências essenciais que todo médico gestor precisa desenvolver:</p>
<ul>
  <li><strong>Visão Estratégica:</strong> Pensar além do dia a dia e planejar o futuro da clínica</li>
  <li><strong>Gestão Financeira:</strong> Entender números e tomar decisões baseadas em dados</li>
  <li><strong>Liderança de Pessoas:</strong> Desenvolver e engajar sua equipe</li>
  <li><strong>Processos e Sistemas:</strong> Criar estruturas que funcionem sem você</li>
  <li><strong>Marketing e Vendas:</strong> Atrair e reter pacientes de forma ética</li>
</ul>

<h2>A Transformação é Possível</h2>
<p>A boa notícia é que essa transformação é totalmente possível. Você não precisa abandonar a medicina para se tornar um bom gestor. Na verdade, muitas das habilidades que você já possui - como raciocínio analítico, resolução de problemas e empatia - são fundamentais para a gestão.</p>`,
      image: '/assets/img/jania_15.webp',
      readTime: '8 min',
      featured: true,
      published: true,
      publishedAt: new Date('2025-12-15'),
      categoryId: catLideranca.id,
    },
  });

  await prisma.blogPost.upsert({
    where: { slug: '5-erros-gestao-clinicas' },
    update: {},
    create: {
      slug: '5-erros-gestao-clinicas',
      title: '5 Erros Fatais na Gestão de Clínicas (e Como Evitá-los)',
      excerpt: 'Descubra os principais erros que levam clínicas ao fracasso e aprenda estratégias práticas para evitá-los.',
      content: `<p>Depois de anos consultando dezenas de clínicas médicas, identifiquei padrões claros de erros que se repetem e comprometem o sucesso dos negócios. A boa notícia? Todos eles podem ser evitados com conhecimento e ação.</p>

<h2>1. Não Separar Finanças Pessoais das Empresariais</h2>
<p>Este é talvez o erro mais comum e mais perigoso. Muitos médicos tratam a conta da clínica como extensão de sua conta pessoal. Isso torna impossível saber se a clínica é realmente lucrativa e compromete o planejamento financeiro.</p>

<h2>2. Não Precificar Corretamente os Serviços</h2>
<p>Cobrar muito barato por medo de perder pacientes ou copiar os preços da concorrência sem calcular custos. O resultado? Trabalhar muito e lucrar pouco.</p>

<h2>3. Não Investir em Marketing</h2>
<p>Acreditar que "boca a boca" é suficiente ou que marketing é antiético. Enquanto isso, clínicas com marketing estruturado crescem e se consolidam.</p>

<h2>4. Não Ter Processos Documentados</h2>
<p>Quando tudo depende do dono ou de funcionários específicos, a clínica não escala. Processos documentados permitem crescimento sustentável.</p>

<h2>5. Não Desenvolver a Equipe</h2>
<p>Contratar pelo menor preço, não treinar e esperar alta performance. Sua equipe é seu maior ativo - ou seu maior passivo.</p>`,
      image: '/assets/img/jania_4.webp',
      readTime: '6 min',
      featured: false,
      published: true,
      publishedAt: new Date('2025-11-20'),
      categoryId: catGestao.id,
    },
  });

  await prisma.blogPost.upsert({
    where: { slug: 'governanca-clinica' },
    update: {},
    create: {
      slug: 'governanca-clinica',
      title: 'Governança Clínica: O Que É e Por Que Sua Clínica Precisa',
      excerpt: 'Entenda como implementar governança clínica para garantir qualidade, segurança e sustentabilidade do seu negócio.',
      content: `<p>Governança clínica é um termo que assusta muitos gestores de clínicas pequenas e médias. Parece algo corporativo, burocrático e distante da realidade. Mas a verdade é que governança é justamente o que separa clínicas amadoras de clínicas profissionais.</p>

<h2>O Que É Governança Clínica?</h2>
<p>Governança clínica é o conjunto de sistemas, processos e comportamentos pelos quais as organizações de saúde são responsáveis pela melhoria contínua da qualidade de seus serviços e pela garantia de altos padrões de atendimento.</p>

<h2>Os Pilares da Governança</h2>
<ul>
  <li><strong>Qualidade Assistencial:</strong> Protocolos clínicos e padrões de atendimento</li>
  <li><strong>Gestão de Riscos:</strong> Identificação e mitigação de riscos clínicos e operacionais</li>
  <li><strong>Auditoria Clínica:</strong> Avaliação sistemática da prática clínica</li>
  <li><strong>Educação Continuada:</strong> Desenvolvimento constante da equipe</li>
  <li><strong>Envolvimento do Paciente:</strong> Feedback e participação ativa</li>
</ul>`,
      image: '/assets/img/jania_17.webp',
      readTime: '10 min',
      featured: false,
      published: true,
      publishedAt: new Date('2025-10-05'),
      categoryId: catGovernanca.id,
    },
  });

  await prisma.blogPost.upsert({
    where: { slug: 'lideranca-clinica' },
    update: {},
    create: {
      slug: 'lideranca-clinica',
      title: 'Liderança em Clínicas: Como Engajar Sua Equipe',
      excerpt: 'Estratégias práticas de liderança para criar uma equipe engajada e de alta performance na área da saúde.',
      content: `<p>Liderar uma equipe de saúde é um dos maiores desafios da gestão clínica. Você precisa equilibrar autonomia profissional com alinhamento organizacional, excelência técnica com eficiência operacional, e cuidado com o paciente com sustentabilidade do negócio.</p>

<h2>O Estilo de Liderança que Funciona</h2>
<p>A pesquisa mostra que o estilo de liderança mais eficaz em ambientes de saúde combina:</p>
<ul>
  <li>Clareza de direção e expectativas</li>
  <li>Apoio ao desenvolvimento profissional</li>
  <li>Reconhecimento e feedback constante</li>
  <li>Participação nas decisões importantes</li>
</ul>`,
      image: '/assets/img/jania_12.webp',
      readTime: '7 min',
      featured: false,
      published: true,
      publishedAt: new Date('2025-09-12'),
      categoryId: catLideranca.id,
    },
  });

  await prisma.blogPost.upsert({
    where: { slug: 'indicadores-performance' },
    update: {},
    create: {
      slug: 'indicadores-performance',
      title: 'Indicadores de Performance: Quais Acompanhar na Sua Clínica',
      excerpt: 'Os KPIs essenciais que todo gestor de clínica deve monitorar para tomar decisões estratégicas baseadas em dados.',
      content: `<p>Você não pode gerenciar o que não mede. Esta máxima de gestão é especialmente verdadeira em clínicas médicas, onde dados precisos podem significar a diferença entre crescimento sustentável e fechamento das portas.</p>

<h2>Indicadores Financeiros</h2>
<ul>
  <li>Faturamento mensal e anual</li>
  <li>Ticket médio por paciente</li>
  <li>Margem de contribuição por procedimento</li>
  <li>Ponto de equilíbrio financeiro</li>
  <li>Inadimplência</li>
</ul>

<h2>Indicadores Operacionais</h2>
<ul>
  <li>Taxa de ocupação da agenda</li>
  <li>Tempo médio de espera</li>
  <li>Taxa de no-show</li>
  <li>Produtividade por profissional</li>
</ul>`,
      image: '/assets/img/jania_10.webp',
      readTime: '9 min',
      featured: false,
      published: true,
      publishedAt: new Date('2025-08-18'),
      categoryId: catGestao.id,
    },
  });

  await prisma.blogPost.upsert({
    where: { slug: 'cultura-organizacional' },
    update: {},
    create: {
      slug: 'cultura-organizacional',
      title: 'Construindo uma Cultura Organizacional de Excelência',
      excerpt: 'Como desenvolver e manter uma cultura organizacional forte que impulsiona resultados e atrai talentos.',
      content: `<p>Cultura organizacional não é um quadro bonito na parede com valores da empresa. É o conjunto de comportamentos, crenças e práticas que definem como as coisas realmente funcionam na sua clínica quando ninguém está olhando.</p>

<h2>Por Que Cultura Importa</h2>
<p>Uma cultura forte e positiva:</p>
<ul>
  <li>Atrai e retém os melhores profissionais</li>
  <li>Aumenta o engajamento da equipe</li>
  <li>Melhora a experiência do paciente</li>
  <li>Reduz conflitos e retrabalho</li>
  <li>Fortalece a reputação da clínica</li>
</ul>

<h2>Como Construir Cultura na Prática</h2>
<p>Cultura não se constrói com frases motivacionais. Ela se constrói com:</p>
<ul>
  <li>Comportamentos consistentes da liderança</li>
  <li>Processos de seleção alinhados aos valores</li>
  <li>Rituais e celebrações significativas</li>
  <li>Consequências claras para comportamentos desalinhados</li>
</ul>`,
      image: '/assets/img/jania_12.webp',
      readTime: '8 min',
      featured: false,
      published: true,
      publishedAt: new Date('2025-07-25'),
      categoryId: catDesenvolvimento.id,
    },
  });

  console.log('✅ 6 posts de blog criados');

  // ===========================
  // 4. ACERVO (PRODUTOS)
  // ===========================
  console.log('\n📚 Criando categorias e formatos de acervo...');

  const acervoCatLivros = await prisma.acervoCategory.upsert({
    where: { slug: 'livros' },
    update: {},
    create: { slug: 'livros', label: 'Livros' },
  });

  const acervoCatCursos = await prisma.acervoCategory.upsert({
    where: { slug: 'cursos' },
    update: {},
    create: { slug: 'cursos', label: 'Cursos' },
  });

  const formatFisico = await prisma.acervoFormat.upsert({
    where: { slug: 'fisico' },
    update: {},
    create: { slug: 'fisico', label: 'Livro Físico' },
  });

  const formatEbook = await prisma.acervoFormat.upsert({
    where: { slug: 'ebook' },
    update: {},
    create: { slug: 'ebook', label: 'E-book' },
  });

  const formatKindle = await prisma.acervoFormat.upsert({
    where: { slug: 'kindle' },
    update: {},
    create: { slug: 'kindle', label: 'Kindle' },
  });

  const formatOnline = await prisma.acervoFormat.upsert({
    where: { slug: 'online' },
    update: {},
    create: { slug: 'online', label: 'Curso Online' },
  });

  console.log('✅ Categorias e formatos criados');
  console.log('\n📦 Criando produtos...');

  // Produto 1
  const produto1 = await prisma.acervoProduct.upsert({
    where: { slug: 'gestao-clinica-completa' },
    update: {},
    create: {
      slug: 'gestao-clinica-completa',
      title: 'Gestão de Clínicas: Do Caos à Excelência',
      description: 'O guia completo para transformar sua clínica em um negócio sustentável e lucrativo.',
      fullContent: `<p>Este livro é o resultado de mais de 15 anos de experiência em gestão de clínicas médicas...</p>`,
      image: '/assets/img/jania_16.webp',
      price: 'R$ 89,90',
      hotmartLink: 'https://hotmart.com/exemplo',
      published: true,
      order: 1,
      categoryId: acervoCatLivros.id,
      formatId: formatFisico.id,
    },
  });

  await prisma.acervoTag.createMany({
    data: [
      { name: 'Gestão', productId: produto1.id },
      { name: 'Liderança', productId: produto1.id },
      { name: 'Estratégia', productId: produto1.id },
    ],
  });

  await prisma.acervoFeature.createMany({
    data: [
      { text: 'Mais de 300 páginas de conteúdo prático', productId: produto1.id },
      { text: 'Cases reais de clínicas brasileiras', productId: produto1.id },
      { text: 'Templates e ferramentas prontas', productId: produto1.id },
    ],
  });

  await prisma.acervoBenefit.createMany({
    data: [
      { text: 'Aprenda a estruturar processos eficientes', productId: produto1.id },
      { text: 'Desenvolva visão estratégica de negócio', productId: produto1.id },
      { text: 'Construa uma equipe de alta performance', productId: produto1.id },
    ],
  });

  console.log('✅ 1 produto criado com tags, features e benefits');

  // ===========================
  // 5. PALESTRAS
  // ===========================
  console.log('\n🎤 Criando dados de palestras...');

  for (const item of [
    { title: 'Liderança Médica', question: 'Como desenvolver liderança autêntica na medicina?', icon: 'Users', order: 1 },
    { title: 'Gestão Estratégica', question: 'Como transformar sua clínica em um negócio sustentável?', icon: 'TrendingUp', order: 2 },
    { title: 'Governança Clínica', question: 'Como garantir qualidade e segurança assistencial?', icon: 'Shield', order: 3 },
  ]) {
    await prisma.palestraVertente.upsert({
      where: { title: item.title } as any,
      update: {},
      create: item,
    });
  }

  for (const item of [
    { title: 'Palestra Keynote', subtitle: '45-60 min', desc: 'Apresentação inspiradora e estratégica para grandes audiências', order: 1 },
    { title: 'Workshop Prático', subtitle: '3-4 horas', desc: 'Capacitação hands-on com ferramentas e metodologias aplicáveis', order: 2 },
    { title: 'Treinamento In-Company', subtitle: '1-2 dias', desc: 'Programa customizado para desenvolvimento de lideranças', order: 3 },
  ]) {
    await prisma.palestraFormato.upsert({
      where: { title: item.title } as any,
      update: {},
      create: item,
    });
  }

  for (const item of [
    { value: '50+', label: 'Eventos', order: 1 },
    { value: '5.000+', label: 'Profissionais Impactados', order: 2 },
    { value: '15+', label: 'Anos de Experiência', order: 3 },
    { value: '98%', label: 'Satisfação', order: 4 },
  ]) {
    await prisma.palestraEstatistica.upsert({
      where: { label: item.label } as any,
      update: {},
      create: item,
    });
  }

  console.log('✅ Dados de palestras criados');

  // ===========================
  // 6. DEPOIMENTOS
  // ===========================
  console.log('\n💬 Criando depoimentos...');

  for (const item of [
    {
      name: 'Carlos S.', role: 'Diretor Médico', event: '',
      quote: 'A palestra da Jania transformou completamente minha visão sobre gestão de clínicas. Implementei as estratégias e em 6 meses aumentei meu faturamento em 40%.',
      image: '/assets/img/jania_13.webp', published: true, order: 1,
    },
    {
      name: 'Ana P.', role: 'Proprietária de Clínica', event: '',
      quote: 'O programa de mentoria me deu clareza e ferramentas práticas. Hoje tenho processos estruturados e uma equipe engajada. Recomendo para todo médico gestor!',
      image: '/assets/img/jania_9.webp', published: true, order: 2,
    },
    {
      name: 'Roberto M.', role: 'Gestor Hospitalar', event: '',
      quote: 'Conteúdo de altíssima qualidade com aplicação prática imediata. A Jania tem uma capacidade única de traduzir conceitos complexos em ações concretas.',
      published: true, order: 3,
    },
  ]) {
    await prisma.depoimento.upsert({
      where: { name: item.name } as any,
      update: {},
      create: item,
    });
  }

  console.log('✅ 3 depoimentos criados');

  // ===========================
  // 7. NA MÍDIA
  // ===========================
  console.log('\n📰 Criando dados de mídia...');

  await prisma.mediaFeatured.upsert({
    where: { outlet_title: { outlet: 'Harvard Business Review Brasil', title: 'A Nova Era da Gestão em Saúde' } } as any,
    update: {},
    create: {
      type: 'Revista',
      outlet: 'Harvard Business Review Brasil',
      title: 'A Nova Era da Gestão em Saúde',
      date: 'Dezembro 2025',
      description: 'Artigo sobre transformação digital e liderança em organizações de saúde.',
      image: '/assets/img/jania_15.webp',
      link: 'https://hbr.com.br/exemplo',
    },
  });

  for (const item of [
    { type: 'TV', icon: 'Tv', outlet: 'Globo News', title: 'Gestão de Clínicas no Pós-Pandemia', date: 'Nov 2025', link: 'https://globonews.com/exemplo', order: 1 },
    { type: 'Podcast', icon: 'Mic', outlet: 'Saúde Business', title: 'Liderança Médica na Prática', date: 'Out 2025', link: 'https://podcast.com/exemplo', order: 2 },
  ]) {
    await prisma.mediaItem.upsert({
      where: { outlet_title: { outlet: item.outlet, title: item.title } } as any,
      update: {},
      create: item,
    });
  }

  await prisma.mediaBook.upsert({
    where: { title: 'Gestão de Clínicas: Do Caos à Excelência' } as any,
    update: {},
    create: { title: 'Gestão de Clínicas: Do Caos à Excelência', year: '2024', publisher: 'Editora Saúde', description: 'O guia definitivo para gestão de clínicas médicas', order: 1 },
  });

  for (const item of [
    { outlet: 'Folha de S.Paulo', mentions: 12, order: 1 },
    { outlet: 'O Globo', mentions: 8, order: 2 },
    { outlet: 'Valor Econômico', mentions: 15, order: 3 },
  ]) {
    await prisma.mediaPress.upsert({
      where: { outlet: item.outlet } as any,
      update: {},
      create: item,
    });
  }

  console.log('✅ Dados de mídia criados');

  // ===========================
  // 8. GALERIA
  // ===========================
  console.log('\n📸 Criando galeria de fotos...');

  for (const item of [
    { src: '/assets/img/palestra.webp', alt: 'Palestra em São Paulo', title: 'Workshop de Liderança - SP', order: 1 },
    { src: '/assets/img/jania_10.webp', alt: 'Congresso Nacional', title: 'Congresso de Gestão em Saúde', order: 2 },
    { src: '/assets/img/jania_12.webp', alt: 'Treinamento in-company', title: 'Treinamento Corporativo', order: 3 },
  ]) {
    await prisma.galeriaFoto.upsert({
      where: { src: item.src } as any,
      update: {},
      create: item,
    });
  }

  console.log('✅ 3 fotos de galeria criadas');

  // ===========================
  // 9. SOCIAL PROOF
  // ===========================
  console.log('\n📊 Criando estatísticas de social proof...');

  for (const item of [
    { value: '200+', label: 'Clínicas Transformadas', order: 1 },
    { value: '15 anos', label: 'de Experiência', order: 2 },
    { value: '5.000+', label: 'Profissionais Capacitados', order: 3 },
    { value: '98%', label: 'de Satisfação', order: 4 },
  ]) {
    await prisma.socialProofStat.upsert({
      where: { label: item.label } as any,
      update: {},
      create: item,
    });
  }

  console.log('✅ Estatísticas criadas');

  console.log('\n✅ Seed concluído com sucesso!');
  console.log('\n📊 Resumo:');
  console.log('   - 1 usuário admin');
  console.log('   - 4 categorias de blog');
  console.log('   - 6 posts de blog');
  console.log('   - 2 categorias de acervo');
  console.log('   - 4 formatos de acervo');
  console.log('   - 1 produto');
  console.log('   - 3 vertentes de palestra');
  console.log('   - 3 formatos de palestra');
  console.log('   - 4 estatísticas de palestra');
  console.log('   - 3 depoimentos');
  console.log('   - 1 featured media');
  console.log('   - 2 media items');
  console.log('   - 1 livro');
  console.log('   - 3 press mentions');
  console.log('   - 3 fotos de galeria');
  console.log('   - 4 estatísticas de social proof');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
