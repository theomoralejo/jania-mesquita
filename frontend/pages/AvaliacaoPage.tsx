import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { formulariosApi } from '../lib/api';

export default function AvaliacaoPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<'quiz' | 'form' | 'result'>('quiz');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cargo: '',
    faturamento: '',
    numeroFuncionarios: '',
    tempoOperacao: ''
  });

  const questions = [
    {
      id: 1,
      question: 'Como estão documentados os processos da sua clínica?',
      options: [
        { value: 1, label: 'Não temos processos documentados', description: 'Tudo está na cabeça das pessoas' },
        { value: 2, label: 'Alguns processos informais', description: 'Anotações básicas e WhatsApp' },
        { value: 3, label: 'Processos principais documentados', description: 'Documentação dos fluxos core' },
        { value: 4, label: 'Todos processos otimizados', description: 'Documentação completa e atualizada' },
        { value: 5, label: 'Melhoria contínua sistêmica', description: 'Processos revisados e otimizados constantemente' }
      ]
    },
    {
      id: 2,
      question: 'Como funciona a gestão do seu tempo na clínica?',
      options: [
        { value: 1, label: 'Dependência total do dono', description: 'Todas decisões passam por mim' },
        { value: 2, label: 'Apagar incêndios é rotina', description: 'Vivo resolvendo crises diárias' },
        { value: 3, label: 'Delegação funcional estabelecida', description: 'Time consegue operar sem mim em algumas áreas' },
        { value: 4, label: 'Liderança operacional capacitada', description: 'Time opera de forma autônoma' },
        { value: 5, label: 'Múltiplas unidades viáveis', description: 'Estrutura permite expansão' }
      ]
    },
    {
      id: 3,
      question: 'Que tipo de métricas você acompanha regularmente?',
      options: [
        { value: 1, label: 'Sem métricas de gestão', description: 'Decisões por intuição' },
        { value: 2, label: 'Métricas básicas (faturamento)', description: 'Apenas controle financeiro básico' },
        { value: 3, label: 'Dashboard com KPIs básicos', description: 'Acompanhamento de indicadores principais' },
        { value: 4, label: 'Sistema de BI implementado', description: 'Análise avançada de dados' },
        { value: 5, label: 'Valuation claro', description: 'Métricas de valor empresarial' }
      ]
    },
    {
      id: 4,
      question: 'Como é o planejamento estratégico da clínica?',
      options: [
        { value: 1, label: 'Não temos planejamento', description: 'Vamos tocando o dia a dia' },
        { value: 2, label: 'Planejamento informal', description: 'Ideias soltas sem estrutura' },
        { value: 3, label: 'Planejamento trimestral', description: 'Metas definidas por período' },
        { value: 4, label: 'Planejamento estratégico anual', description: 'Estratégia estruturada de longo prazo' },
        { value: 5, label: 'Exit strategy definida', description: 'Planejamento de crescimento e saída' }
      ]
    },
    {
      id: 5,
      question: 'Como está a previsibilidade financeira da operação?',
      options: [
        { value: 1, label: 'Margem imprevisível', description: 'Não sei quanto vou lucrar mês a mês' },
        { value: 2, label: 'Lucro existe, mas instável', description: 'Varia muito de mês para mês' },
        { value: 3, label: 'Margem previsível', description: 'Consigo prever resultados com razoável precisão' },
        { value: 4, label: 'Crescimento sustentável', description: 'Crescimento consistente e previsível' },
        { value: 5, label: 'Inovação estruturada', description: 'Investimento programado em crescimento' }
      ]
    }
  ];

  const faturamentoOptions = [
    'Até R$ 50 mil/mês',
    'R$ 50-100 mil/mês',
    'R$ 100-300 mil/mês',
    'R$ 300-500 mil/mês',
    'R$ 500 mil - R$ 1 milhão/mês',
    'Acima de R$ 1 milhão/mês'
  ];

  const funcionariosOptions = [
    '1-5 funcionários',
    '6-10 funcionários',
    '11-20 funcionários',
    '21-50 funcionários',
    'Acima de 50 funcionários'
  ];

  const tempoOptions = [
    'Menos de 1 ano',
    '1-3 anos',
    '3-5 anos',
    '5-10 anos',
    'Mais de 10 anos'
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const handleQuizAnswer = (questionId: number, value: number) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: value }));

    // Auto-advance to next question after a short delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Last question answered, go to form
        setCurrentStep('form');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 300);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const calculateLevel = () => {
    const values = Object.values(quizAnswers);
    const average = values.reduce((a, b) => a + b, 0) / values.length;
    return Math.round(average);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const level = calculateLevel();
    const levelInfo = getLevelInfo(level);

    try {
      await formulariosApi.submitAvaliacao({
        name: formData.nome,
        email: formData.email,
        phone: formData.telefone,
        position: formData.cargo,
        revenue: formData.faturamento,
        employees: formData.numeroFuncionarios,
        operationTime: formData.tempoOperacao,
        quizAnswers,
        totalScore: level,
        maturityLevel: levelInfo.title,
      });
    } catch (err) {
      console.error('Erro ao enviar avaliação:', err);
    }

    setCurrentStep('result');
    window.scrollTo(0, 0);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getLevelInfo = (level: number) => {
    const levels = [
      { title: 'Caótico', subtitle: 'Operação Artesanal', description: 'Sua clínica funciona, mas é refém do seu conhecimento. Cada decisão exige sua presença. Crescimento significa mais caos.' },
      { title: 'Reativo', subtitle: 'Gestão por Crise', description: 'Existe alguma estrutura, mas a operação ainda depende fortemente de intervenções constantes. Previsibilidade baixa.' },
      { title: 'Estruturado', subtitle: 'Processos Definidos', description: 'A operação tem estrutura. Processos core funcionam sem intervenção direta. Você começa a trabalhar ON e não apenas IN.' },
      { title: 'Gerenciado', subtitle: 'Governança Ativa', description: 'Governança plena. A clínica opera de forma autônoma. Decisões baseadas em dados. Escalabilidade real.' },
      { title: 'Otimizado', subtitle: 'Ativo Escalável', description: 'A clínica é um ativo empresarial maduro. Pronta para expansão, M&A ou exit. Você é CEO estratégico.' }
    ];
    return levels[level - 1];
  };

  if (currentStep === 'result') {
    const level = calculateLevel();
    const levelInfo = getLevelInfo(level);

    return (
      <main className="min-h-screen bg-gradient-to-br from-[#F2EFE8] to-white">
        <div className="container-custom py-24 px-6 md:px-0">
          <div className="max-w-4xl mx-auto">
            {/* Success Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#385443] rounded-full mb-6">
                <Check className="w-10 h-10 text-white" strokeWidth={2} />
              </div>
              <h1 className="text-4xl md:text-5xl font-serif mb-4 text-[#385443]">
                Diagnóstico Concluído, {formData.nome.split(' ')[0]}!
              </h1>
              <p className="text-xl text-gray-600">
                Sua clínica está no <span className="font-bold text-[#385443]">Nível {level}</span>
              </p>
            </div>

            {/* Result Card */}
            <div className="bg-white rounded-2xl border-2 border-[#385443] p-8 md:p-12 mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#385443] rounded-xl flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">{level}</span>
                </div>
                <div>
                  <h2 className="text-3xl font-serif text-[#385443] mb-1">{levelInfo.title}</h2>
                  <p className="text-gray-600">{levelInfo.subtitle}</p>
                </div>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {levelInfo.description}
              </p>

              <div className="bg-[#F2EFE8] rounded-xl p-6">
                <h3 className="font-bold text-[#385443] mb-3">O que isso significa para você:</h3>
                <ul className="space-y-2 text-gray-700">
                  {level <= 2 && (
                    <>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-[#385443] flex-shrink-0 mt-0.5" />
                        <span>Você está trabalhando IN (dentro) da operação, não ON (sobre) ela</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-[#385443] flex-shrink-0 mt-0.5" />
                        <span>Crescer agora significa apenas multiplicar problemas operacionais</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-[#385443] flex-shrink-0 mt-0.5" />
                        <span>Sua margem está sendo consumida por ineficiências estruturais</span>
                      </li>
                    </>
                  )}
                  {level === 3 && (
                    <>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-[#385443] flex-shrink-0 mt-0.5" />
                        <span>Você tem base, mas falta governança para crescer de forma sustentável</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-[#385443] flex-shrink-0 mt-0.5" />
                        <span>Processos existem, mas não são otimizados para escalabilidade</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-[#385443] flex-shrink-0 mt-0.5" />
                        <span>Métricas básicas impedem visão estratégica completa</span>
                      </li>
                    </>
                  )}
                  {level >= 4 && (
                    <>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-[#385443] flex-shrink-0 mt-0.5" />
                        <span>Você está no caminho certo para uma operação escalável</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-[#385443] flex-shrink-0 mt-0.5" />
                        <span>Foco agora é otimização contínua e expansão estratégica</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-[#385443] flex-shrink-0 mt-0.5" />
                        <span>Sua clínica pode se tornar um ativo de alto valor</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-[#385443] rounded-2xl p-8 md:p-12 text-white text-center">
              <h3 className="text-2xl md:text-3xl font-serif mb-4 text-white">
                Quer saber como evoluir para o próximo nível?
              </h3>
              <p className="text-lg mb-8 text-white/90">
                {formData.nome.split(' ')[0]}, vamos conversar sobre como a mentoria executiva pode transformar
                a governança da sua clínica.
              </p>
              <a
                href="/mentoria"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#385443] rounded-lg font-bold hover:shadow-lg transition-all duration-300"
              >
                Conhecer a Mentoria
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (currentStep === 'form') {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#F2EFE8] to-white">
        <div className="container-custom py-24 px-6 md:px-0">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-serif mb-4 text-[#385443]">
                Quase lá!
              </h1>
              <p className="text-xl text-gray-600">
                Preencha seus dados para receber seu diagnóstico personalizado
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nome}
                    onChange={(e) => handleInputChange('nome', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#385443] focus:border-transparent"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#385443] focus:border-transparent"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefone/WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.telefone}
                    onChange={(e) => handleInputChange('telefone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#385443] focus:border-transparent"
                    placeholder="(00) 00000-0000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Seu Cargo/Função *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cargo}
                    onChange={(e) => handleInputChange('cargo', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#385443] focus:border-transparent"
                    placeholder="Ex: Médico(a) Proprietário(a), Gestor(a), etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Faturamento Mensal Aproximado *
                  </label>
                  <select
                    required
                    value={formData.faturamento}
                    onChange={(e) => handleInputChange('faturamento', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#385443] focus:border-transparent"
                  >
                    <option value="">Selecione uma faixa</option>
                    {faturamentoOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Número de Funcionários *
                  </label>
                  <select
                    required
                    value={formData.numeroFuncionarios}
                    onChange={(e) => handleInputChange('numeroFuncionarios', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#385443] focus:border-transparent"
                  >
                    <option value="">Selecione</option>
                    {funcionariosOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tempo de Operação da Clínica *
                  </label>
                  <select
                    required
                    value={formData.tempoOperacao}
                    onChange={(e) => handleInputChange('tempoOperacao', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#385443] focus:border-transparent"
                  >
                    <option value="">Selecione</option>
                    {tempoOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-[#385443] text-white rounded-lg font-bold hover:bg-[#4a6655] transition-all duration-300 flex items-center justify-center gap-2"
              >
                Ver Meu Diagnóstico
                <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-xs text-gray-500 text-center">
                Seus dados estão protegidos e serão usados apenas para enviar seu diagnóstico e conteúdos relevantes sobre gestão de clínicas.
              </p>
            </form>
          </div>
        </div>
      </main>
    );
  }

  // Quiz Step - One Question at a Time
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F2EFE8] to-white">
      <div className="container-custom py-24 px-6 md:px-0">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full mb-6">
              <ChevronRight className="w-4 h-4 text-[#385443]" strokeWidth={2} />
              <span className="text-xs tracking-[0.1em] font-medium text-[#385443] uppercase">
                Diagnóstico Gratuito
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 text-[#385443]">
              Descubra o Nível de Maturidade
              <br />
              <span className="text-gray-700">da Sua Clínica</span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Responda 5 perguntas rápidas sobre a governança da sua operação
            </p>
          </div>

          {/* Progress */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-gray-700">
                Pergunta {currentQuestionIndex + 1} de {questions.length}
              </span>
              <span className="text-sm text-gray-600">
                {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% completo
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#385443] transition-all duration-500"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Current Question */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
              {currentQuestion.question}
            </h2>

            <div className="space-y-4">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleQuizAnswer(currentQuestion.id, option.value)}
                  className={`w-full p-5 rounded-xl border-2 transition-all duration-300 text-left ${
                    quizAnswers[currentQuestion.id] === option.value
                      ? 'border-[#385443] bg-[#385443]/5 shadow-md'
                      : 'border-gray-200 hover:border-[#385443]/30 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      quizAnswers[currentQuestion.id] === option.value
                        ? 'border-[#385443] bg-[#385443]'
                        : 'border-gray-300'
                    }`}>
                      {quizAnswers[currentQuestion.id] === option.value && (
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 mb-1 text-lg">
                        {option.label}
                      </div>
                      <div className="text-sm text-gray-600">
                        {option.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          {currentQuestionIndex > 0 && (
            <div className="flex justify-center">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-[#385443] transition-colors duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                Voltar para pergunta anterior
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
