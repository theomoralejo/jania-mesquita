import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share2, BookOpen } from 'lucide-react';

export default function BlogSinglePage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Blog posts data (same as BlogPage)
  const blogPosts = [
    {
      slug: 'da-medicina-a-gestao',
      title: 'Da Medicina à Gestão: Uma Jornada de Transformação',
      category: 'lideranca',
      categoryLabel: 'Liderança',
      excerpt: 'Como médicos podem desenvolver habilidades de liderança sem abandonar sua essência clínica.',
      image: '/assets/img/jania_14.webp',
      date: '15 de Dezembro, 2025',
      readTime: '8 min',
      content: `
        <p>A transição da medicina para a gestão é um dos desafios mais complexos enfrentados por profissionais de saúde. Durante anos, fomos treinados para diagnosticar, tratar e curar. Nossa formação é técnica, científica, baseada em evidências. Mas e quando o desafio não é mais apenas clínico, mas organizacional?</p>

        <h2>O Choque de Realidade</h2>
        <p>Lembro-me claramente do primeiro dia em que assumi uma posição de liderança. Eu tinha toda a competência técnica do mundo, mas me vi diante de desafios completamente diferentes: orçamentos, gestão de pessoas, conflitos interpessoais, decisões estratégicas que afetavam dezenas de colaboradores.</p>

        <p>Foi aí que percebi: ser um excelente médico não me preparou automaticamente para ser um excelente gestor. São competências distintas, que exigem desenvolvimento intencional.</p>

        <h2>Os Três Pilares da Transição</h2>
        <p>Ao longo dos anos, identifiquei três pilares fundamentais para essa transição bem-sucedida:</p>

        <h3>1. Visão Estratégica</h3>
        <p>A medicina nos treina para o diagnóstico imediato. A gestão exige visão de longo prazo. É preciso aprender a olhar além do paciente na sua frente e enxergar sistemas, processos, tendências de mercado.</p>

        <h3>2. Liderança de Pessoas</h3>
        <p>Liderar uma equipe médica é diferente de liderar um procedimento. Exige empatia, comunicação, capacidade de inspirar e desenvolver talentos. É sobre criar uma cultura, não apenas seguir protocolos.</p>

        <h3>3. Governança Corporativa</h3>
        <p>Estruturas de tomada de decisão, processos claros, métricas de desempenho, sustentabilidade financeira. Estes são conceitos que precisamos dominar para construir instituições que funcionem além da nossa presença.</p>

        <h2>Mantendo a Essência</h2>
        <p>O mais importante nessa jornada é não perder de vista por que entramos na medicina. Nossa sensibilidade ao cuidado, nossa busca por excelência, nosso compromisso com vidas — tudo isso pode e deve ser traduzido para a gestão.</p>

        <p>Um bom gestor na saúde não deixa de ser médico. Ele expande seu campo de atuação, aplicando os mesmos princípios éticos e rigor científico à construção de organizações sustentáveis.</p>

        <h2>Conclusão</h2>
        <p>A transformação de médico a gestor não é uma traição à medicina. É uma evolução natural para quem deseja impactar mais pessoas, de forma mais sistêmica e duradoura. É sobre multiplicar o cuidado através de estruturas que funcionem.</p>

        <p>E isso, fundamentalmente, continua sendo medicina. Só que em uma escala maior.</p>
      `
    },
    {
      slug: 'os-tres-pilares-da-governanca-clinica',
      title: 'Os 3 Pilares da Governança Clínica Sustentável',
      category: 'governanca',
      categoryLabel: 'Governança',
      excerpt: 'Qualidade assistencial, segurança do paciente e eficiência operacional.',
      image: '/assets/img/jania_14.webp',
      date: '8 de Dezembro, 2025',
      readTime: '12 min',
      content: `
        <p>Governança clínica não é um conceito abstrato ou apenas burocracia corporativa. É o sistema que garante que sua instituição de saúde entregue excelência de forma consistente, sustentável e escalável.</p>

        <h2>Pilar 1: Qualidade Assistencial</h2>
        <p>O primeiro pilar da governança clínica é a qualidade. Não a qualidade subjetiva, baseada em impressões, mas a qualidade mensurável, rastreável, melhorável.</p>
        
        <p>Isso significa ter protocolos clínicos bem definidos, baseados em evidências científicas atualizadas. Significa ter processos de auditorias internas e externas. Significa criar uma cultura onde a melhoria contínua não é apenas um slogan, mas uma prática diária.</p>

        <h2>Pilar 2: Segurança do Paciente</h2>
        <p>O segundo pilar é a segurança. Em uma instituição de saúde, erros podem custar vidas. Por isso, a governança clínica estabelece sistemas robustos de prevenção, detecção e correção de falhas.</p>

        <p>Isso inclui desde a higienização adequada até sistemas de dupla checagem em procedimentos críticos. Inclui cultura de reporte de eventos adversos sem medo de punição. Inclui aprendizado sistemático com erros.</p>

        <h2>Pilar 3: Eficiência Operacional</h2>
        <p>O terceiro pilar é a eficiência. Uma instituição que não é financeiramente sustentável não consegue manter qualidade e segurança no longo prazo. Governança clínica também é sobre usar recursos de forma inteligente.</p>

        <p>Isso significa processos enxutos, eliminação de desperdícios, gestão eficaz de suprimentos, otimização de fluxos. Não por ganância, mas por responsabilidade com a continuidade do cuidado.</p>

        <h2>A Interconexão dos Pilares</h2>
        <p>O mais importante: esses três pilares não funcionam isoladamente. Eles são interdependentes. Qualidade sem eficiência é insustentável. Segurança sem qualidade é ilusória. Eficiência sem segurança é perigosa.</p>

        <p>Uma governança clínica efetiva equilibra os três pilares constantemente, fazendo trade-offs conscientes e medindo resultados de forma objetiva.</p>

        <h2>Implementação Prática</h2>
        <p>Para implementar esses pilares na sua instituição, comece por:</p>
        <ul>
          <li>Mapear seus processos críticos</li>
          <li>Definir indicadores claros para cada pilar</li>
          <li>Criar comitês multidisciplinares de governança</li>
          <li>Estabelecer rotinas de revisão e melhoria</li>
          <li>Investir em capacitação contínua das equipes</li>
        </ul>

        <p>Governança clínica é um investimento de longo prazo. Mas é o investimento que diferencia instituições amadoras de instituições profissionais.</p>
      `
    },
    {
      slug: 'cultura-organizacional-em-saude',
      title: 'Construindo Cultura Organizacional em Saúde',
      category: 'gestao',
      categoryLabel: 'Gestão',
      excerpt: 'Valores, crenças e práticas que transformam equipes clínicas em times de alta performance.',
      image: '/assets/img/jania_14.webp',
      date: '1 de Dezembro, 2025',
      readTime: '10 min',
      content: `
        <p>Cultura organizacional é o DNA invisível da sua instituição. É o que acontece quando ninguém está olhando. É como as pessoas se comportam, decidem, se relacionam — mesmo na ausência de regras explícitas.</p>

        <h2>O Que É Cultura na Saúde?</h2>
        <p>Na saúde, cultura é ainda mais crítica porque lidamos com vidas. Uma cultura forte de segurança pode salvar pacientes. Uma cultura de excelência pode elevar padrões. Uma cultura tóxica pode destruir equipes inteiras.</p>

        <p>Mas cultura não se constrói com frases bonitas na parede. Ela se constrói com ações consistentes, liderança pelo exemplo, e reforço positivo de comportamentos desejados.</p>

        <h2>Os Elementos da Cultura</h2>
        <p>Toda cultura organizacional se sustenta em alguns elementos fundamentais:</p>

        <h3>Valores Declarados vs. Valores Vividos</h3>
        <p>Muitas instituições têm valores lindos no papel: excelência, respeito, inovação. Mas o que realmente importa são os valores vividos no dia a dia. Se você diz que valoriza equilíbrio, mas glorifica quem trabalha 16 horas por dia, seus valores declarados são mentira.</p>

        <h3>Rituais e Símbolos</h3>
        <p>Como você celebra conquistas? Como você lida com erros? Quem são seus heróis organizacionais? Esses rituais e símbolos comunicam muito mais sobre sua cultura do que qualquer manual de valores.</p>

        <h3>Histórias e Narrativas</h3>
        <p>Quais histórias são contadas nos corredores? São histórias de coragem, inovação e cuidado? Ou são histórias de política, medo e mediocridade? As narrativas dominantes moldam a cultura.</p>

        <h2>Construindo Cultura Intencional</h2>
        <p>Para construir uma cultura forte e positiva na saúde, você precisa:</p>

        <ol>
          <li><strong>Definir valores claros e não-negociáveis</strong> — Poucos, mas absolutos</li>
          <li><strong>Contratar por fit cultural</strong> — Competência técnica não compensa valores incompatíveis</li>
          <li><strong>Liderar pelo exemplo</strong> — Líderes são os guardiões da cultura</li>
          <li><strong>Reforçar comportamentos positivos</strong> — Reconheça publicamente quem vive os valores</li>
          <li><strong>Corrigir desvios rapidamente</strong> — Tolerar comportamentos tóxicos destrói cultura</li>
        </ol>

        <h2>O Papel da Liderança</h2>
        <p>Cultura não é responsabilidade do RH. É responsabilidade da liderança. Cada decisão que você toma como líder — a quem você promove, o que você tolera, como você se comunica — está construindo ou destruindo cultura.</p>

        <p>E em saúde, onde as pessoas são o ativo mais importante, cultura não é um luxo. É a diferença entre uma organização que prospera e uma que apenas sobrevive.</p>
      `
    },
    {
      slug: 'escalabilidade-com-proposito',
      title: 'Escalabilidade com Propósito: Crescer sem Perder a Alma',
      category: 'gestao',
      categoryLabel: 'Gestão',
      excerpt: 'Estratégias para expandir sua operação mantendo os valores que tornaram sua prática única.',
      image: '/assets/img/jania_14.webp',
      date: '24 de Novembro, 2025',
      readTime: '9 min',
      content: `
        <p>O maior medo de todo médico-empreendedor é crescer e perder a essência. Ver sua prática, que começou com tanto cuidado e atenção pessoal, se tornar apenas mais uma clínica impessoal, focada em números.</p>

        <p>Mas escalabilidade não precisa ser sinônimo de despersonalização. É possível crescer mantendo propósito, valores e qualidade. Só exige intencionalidade.</p>

        <h2>O Mito da Escala</h2>
        <p>Muitos acreditam que escalar significa necessariamente:</p>
        <ul>
          <li>Abrir mão da qualidade</li>
          <li>Padronizar tudo ao ponto da robotização</li>
          <li>Contratar qualquer um que aceite o salário</li>
          <li>Focar só em lucro</li>
        </ul>

        <p>Isso não é escalabilidade. Isso é crescimento irresponsável. Verdadeira escalabilidade é multiplicar impacto positivo de forma sustentável.</p>

        <h2>Os Pilares da Escalabilidade com Propósito</h2>

        <h3>1. Processos que Preservam Valores</h3>
        <p>Padronização não significa despersonalização. Significa garantir que todo paciente receba o mesmo nível de excelência, não importa quem o atenda.</p>

        <p>Você pode ter protocolos claros E espaço para personalização. A chave é definir o que é não-negociável (segurança, respeito, qualidade) e o que é flexível (estilo de comunicação, abordagem pessoal).</p>

        <h3>2. Contratação Seletiva</h3>
        <p>À medida que você cresce, sua equipe carrega sua cultura. Contratar rápido demais ou por desespero é o jeito mais rápido de destruir o que você construiu.</p>

        <p>Contrate devagar. Seja exigente. Priorize fit cultural sobre currículo impressionante. Uma pessoa tecnicamente competente mas culturalmente incompatível é mais destrutiva que uma vaga aberta.</p>

        <h3>3. Liderança Replicável</h3>
        <p>Você não consegue estar em todos os lugares ao mesmo tempo. Por isso, precisa desenvolver líderes que pensem como você, ajam como você, decidam como você decidiria.</p>

        <p>Isso exige investimento pesado em desenvolvimento de lideranças. Mas é o único jeito de escalar sem perder controle de qualidade.</p>

        <h3>4. Métricas Além do Financeiro</h3>
        <p>Se você só mede faturamento, vai otimizar apenas para dinheiro. Mas se você também mede satisfação do paciente, engajamento da equipe, qualidade clínica, e impacto comunitário — você otimiza para propósito.</p>

        <p>O que você mede é o que você obtém. Escolha suas métricas com cuidado.</p>

        <h2>Crescimento Intencional</h2>
        <p>Antes de abrir uma nova unidade, contratar 10 pessoas novas, ou lançar um novo serviço, pergunte-se:</p>
        <ol>
          <li>Isso está alinhado com nosso propósito original?</li>
          <li>Conseguimos manter nosso padrão de qualidade?</li>
          <li>Temos liderança suficiente para sustentar isso?</li>
          <li>Isso serve nossos pacientes ou só nosso ego?</li>
        </ol>

        <p>Se a resposta para qualquer dessas perguntas for "não" ou "não sei", você não está pronto para crescer. E está tudo bem. Crescimento lento e sólido supera expansão rápida e frágil.</p>

        <h2>Conclusão</h2>
        <p>Escalar com propósito é mais difícil que apenas crescer. Exige disciplina, paciência, e constante vigilância sobre valores. Mas no final, você constrói algo que não apenas dura, mas que realmente importa.</p>

        <p>Porque o objetivo nunca foi apenas ter a maior clínica. Era ter a clínica que mais impacta positivamente as vidas que toca.</p>
      `
    },
    {
      slug: 'lideranca-emocional',
      title: 'Liderança Emocional: O Equilíbrio Entre Mente e Coração',
      category: 'desenvolvimento',
      categoryLabel: 'Desenvolvimento Pessoal',
      excerpt: 'Por que a inteligência emocional é a competência mais crítica para médicos-líderes.',
      image: '/assets/img/jania_14.webp',
      date: '17 de Novembro, 2025',
      readTime: '11 min',
      content: `
        <p>Durante toda minha formação médica, fui ensinada a ser racional, objetiva, baseada em evidências. Emoções eram vistas como ruído, algo a ser controlado ou ignorado. Mas quando assumi posições de liderança, descobri uma verdade inconveniente: a razão sozinha não move pessoas.</p>

        <h2>O Despertar Emocional</h2>
        <p>Lembro de um momento específico. Eu tinha acabado de apresentar um plano estratégico perfeito — dados impecáveis, lógica irrefutável, projeções conservadoras. Esperava adesão imediata. Em vez disso, encontrei resistência, silêncio, e até sabotagem passiva.</p>

        <p>O problema não era o plano. Era que eu havia ignorado completamente o lado humano da equação. Medo de mudança, insegurança sobre novos papéis, luto pelo "jeito antigo de fazer as coisas" — nada disso aparecia na minha planilha.</p>

        <p>Foi aí que entendi: liderança efetiva é 20% estratégia e 80% inteligência emocional.</p>

        <h2>As Dimensões da Inteligência Emocional</h2>

        <h3>Autoconsciência</h3>
        <p>Antes de liderar outros, você precisa se entender. Quais são seus gatilhos? Quando você toma decisões por ego e não por estratégia? Como seu estado emocional afeta sua equipe?</p>

        <p>Líderes inconscientes emocionalmente espalham caos. Líderes conscientes criam estabilidade, mesmo em crises.</p>

        <h3>Autorregulação</h3>
        <p>Sentir emoções é humano. Agir impulsivamente sobre elas é destrutivo. A capacidade de sentir raiva sem gritar, frustração sem punir, medo sem paralisar — isso é autorregulação.</p>

        <p>Não significa suprimir emoções. Significa processá-las de forma madura.</p>

        <h3>Empatia</h3>
        <p>Como médicos, aprendemos empatia clínica — entender o sofrimento do paciente. Como líderes, precisamos de empatia organizacional — entender medos, aspirações, e motivações da equipe.</p>

        <p>Empatia não é concordar com tudo. É entender profundamente antes de decidir.</p>

        <h3>Habilidades Sociais</h3>
        <p>Influenciar sem autoridade formal, negociar conflitos, construir coalizões, comunicar visões inspiradoras — tudo isso são habilidades sociais. E nenhuma delas nos foi ensinada na faculdade de medicina.</p>

        <h2>O Paradoxo do Médico-Líder</h2>
        <p>Aqui está o desafio: fomos treinados para ser emocionalmente controlados no ambiente clínico (e isso é correto), mas precisamos ser emocionalmente expressivos no ambiente de liderança.</p>

        <p>Quando você está operando, emoções controladas são cruciais. Quando você está liderando, vulnerabilidade e autenticidade emocional são fundamentais.</p>

        <p>Saber alternar entre esses dois modos é a marca do médico-líder maduro.</p>

        <h2>Desenvolvendo Inteligência Emocional</h2>
        <p>A boa notícia: inteligência emocional não é inata. É desenvolvível. Algumas práticas:</p>

        <ul>
          <li><strong>Journaling</strong> — Processar emoções por escrito aumenta autoconsciência</li>
          <li><strong>Feedback 360°</strong> — Pergunte como seu comportamento afeta outros</li>
          <li><strong>Pause Before Response</strong> — Entre estímulo e resposta, escolha consciente</li>
          <li><strong>Mentoria/Coaching</strong> — Tenha alguém que te desafie emocionalmente</li>
          <li><strong>Prática de Escuta Ativa</strong> — Ouça para entender, não para responder</li>
        </ul>

        <h2>O Equilíbrio</h2>
        <p>Liderança emocional não significa ser frouxo ou indeciso. Significa tomar decisões racionais com sensibilidade humana. Significa ser firme e empático. Exigente e compreensivo. Estratégico e conectado.</p>

        <p>É sobre reconhecer que você não lidera planilhas. Você lidera pessoas. E pessoas não respondem apenas à lógica. Elas respondem a líderes que as fazem sentir vistas, ouvidas, e valorizadas.</p>

        <p>Isso não é ser "soft". Isso é ser inteligente.</p>
      `
    },
    {
      slug: 'metricas-que-importam',
      title: 'Métricas que Importam: Além do Faturamento',
      category: 'gestao',
      categoryLabel: 'Gestão',
      excerpt: 'Indicadores estratégicos para medir o que realmente impacta a sustentabilidade.',
      image: '/assets/img/jania_14.webp',
      date: '10 de Novembro, 2025',
      readTime: '7 min',
      content: `
        <p>Se você gerencia apenas olhando para o faturamento, está dirigindo olhando pelo retrovisor. Faturamento é um indicador tardio — ele te diz o que já aconteceu, não o que está por vir.</p>

        <p>Para construir uma clínica sustentável, você precisa de um dashboard balanceado de métricas que capturem saúde financeira, operacional, e estratégica.</p>

        <h2>As 4 Dimensões de Métricas</h2>

        <h3>1. Financeiras (Lagging Indicators)</h3>
        <p>Sim, financeiro importa. Mas vá além do faturamento bruto:</p>
        <ul>
          <li><strong>Margem EBITDA</strong> — Lucro operacional real</li>
          <li><strong>Fluxo de Caixa</strong> — Liquidez, não apenas lucro no papel</li>
          <li><strong>CAC (Custo de Aquisição de Cliente)</strong> — Quanto custa trazer um paciente novo</li>
          <li><strong>LTV (Lifetime Value)</strong> — Valor total que um paciente gera ao longo do tempo</li>
        </ul>

        <h3>2. Operacionais (Leading Indicators)</h3>
        <p>Essas métricas preveem resultados futuros:</p>
        <ul>
          <li><strong>Taxa de Ocupação</strong> — Sua capacidade está sendo usada?</li>
          <li><strong>Taxa de No-Show</strong> — Eficiência da agenda</li>
          <li><strong>Tempo Médio de Espera</strong> — Experiência do paciente</li>
          <li><strong>Produtividade por Profissional</strong> — Eficiência da equipe</li>
        </ul>

        <h3>3. Estratégicas (Qualitativas)</h3>
        <p>O que não é facilmente quantificável, mas é crítico:</p>
        <ul>
          <li><strong>NPS (Net Promoter Score)</strong> — Satisfação e lealdade do paciente</li>
          <li><strong>eNPS (Employee NPS)</strong> — Engajamento da equipe</li>
          <li><strong>Taxa de Retenção de Pacientes</strong> — Eles voltam?</li>
          <li><strong>Taxa de Turnover</strong> — Você está perdendo talentos?</li>
        </ul>

        <h3>4. Qualidade Clínica</h3>
        <p>O que mantém você acordado à noite:</p>
        <ul>
          <li><strong>Taxa de Eventos Adversos</strong> — Segurança do paciente</li>
          <li><strong>Taxa de Readmissão</strong> — Qualidade do tratamento</li>
          <li><strong>Adesão a Protocolos</strong> — Consistência clínica</li>
          <li><strong>Satisfação com Resultado Clínico</strong> — Efetividade real</li>
        </ul>

        <h2>O Dashboard Executivo</h2>
        <p>Você não pode acompanhar 50 métricas. Escolha 10-12 que realmente importam para seu contexto específico. Organize-as em um dashboard que você revisa semanalmente.</p>

        <p>E o mais importante: defina metas claras para cada uma. Métrica sem meta é apenas número.</p>

        <h2>Armadilhas Comuns</h2>

        <h3>Armadilha 1: Medir o Fácil, Não o Importante</h3>
        <p>É fácil contar procedimentos. É difícil medir qualidade de vida do paciente. Mas o segundo importa mais.</p>

        <h3>Armadilha 2: Métricas de Vaidade</h3>
        <p>Seguidores no Instagram são legais, mas não pagam as contas. Foque em métricas que realmente movem o negócio.</p>

        <h3>Armadilha 3: Paralisia por Análise</h3>
        <p>Dados sem ação são desperdício. Use métricas para tomar decisões, não para adiar decisões.</p>

        <h2>Cultura Data-Driven</h2>
        <p>Mais importante que ter métricas é criar uma cultura onde decisões são baseadas em dados, não em feeling ou política.</p>

        <p>Isso significa:</p>
        <ol>
          <li>Transparência — compartilhe números chave com a equipe</li>
          <li>Responsabilização — cada métrica tem um dono</li>
          <li>Revisão regular — análise semanal/mensal com liderança</li>
          <li>Experimentos controlados — teste, mede, aprende, ajusta</li>
        </ol>

        <h2>Conclusão</h2>
        <p>Você não consegue melhorar o que não mede. Mas também não pode medir tudo. A arte da gestão está em escolher as métricas certas e acompanhá-las com disciplina.</p>

        <p>Faturamento ainda importa. Mas é apenas uma peça do quebra-cabeça. Uma clínica verdadeiramente saudável é financeiramente sólida, operacionalmente eficiente, estrategicamente posicionada, e clinicamente excelente.</p>

        <p>E todas essas dimensões precisam ser medidas.</p>
      `
    }
  ];

  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    navigate('/blog');
    return null;
  }

  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[#F2EFE8]">
      {/* Header */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-[#42331C] to-[#42331C]/95">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back Button */}
          <Link 
            to="/blog"
            className="inline-flex items-center gap-2 text-[#F2EFE8] hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Voltar para o blog
          </Link>

          {/* Category */}
          <div className="inline-block px-4 py-1.5 bg-[#B6A689] text-[#42331C] rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            {post.categoryLabel}
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl md:text-5xl text-[#F2EFE8] mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-[#F2EFE8]/80 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} de leitura</span>
            </div>
            <button className="flex items-center gap-2 hover:text-white transition-colors">
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
          <h2 className="font-serif text-3xl mb-4">
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
