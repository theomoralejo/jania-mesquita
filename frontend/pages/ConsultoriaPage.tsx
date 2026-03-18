import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Minus, Stethoscope, Target, TrendingUp, Clock, Shield, Users, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { formulariosApi } from '../lib/api';

// ——————————————————————————
// FORM COMPONENT (Hero)
// ——————————————————————————
function ConsultoriaForm({ formId }: { formId?: string }) {
  const [formStep, setFormStep] = useState(1); // 1 = Form, 2 = Price Reveal, 3 = Success
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', clinic: '', revenue: '', mainChallenge: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmitStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Step 1 Submission: Captures the lead BEFORE showing the price
      await formulariosApi.submitConsultoria({
         ...formData,
         mainChallenge: `(PASSO 1) ${formData.mainChallenge}`
      });
      // Move to Price Reveal
      setFormStep(2);
      // Removed scrolling here because it caused jumping between the two forms on the page
    } catch (err) {
      console.error('Erro ao enviar solicitação passo 1:', err);
      // Failsafe: move forward anyway to not block user flow
      setFormStep(2);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitStep2 = async () => {
    setLoading(true);
    try {
      // Step 2 Submission: Hot Lead marked
      await formulariosApi.submitConsultoria({
        ...formData,
        mainChallenge: `[LEAD QUENTE - ACEITOU O VALOR] ${formData.mainChallenge}`
      });
      setFormStep(3);
    } catch (err) {
      console.error('Erro ao enviar solicitação passo 2:', err);
      setFormStep(3);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (formStep === 3) {
    return (
      <div className="bg-white border border-[#DFDCD4] p-8 text-center rounded-[9px] shadow-[var(--shadow-lg)]">
        <div className="w-20 h-20 border border-[#385443] rounded-full flex items-center justify-center mx-auto mb-8 text-[#385443]">
          <CheckCircle2 className="w-10 h-10" strokeWidth={1.5} />
        </div>
        <h3 className="font-serif text-3xl font-light mb-6 tracking-tight text-[#232323]">Solicitação Confirmada!</h3>
        <p className="mb-8 text-lg leading-relaxed font-light text-[#414141]">
          Nossa equipe analisará sua aplicação e entrará em contato em até{' '}
          <span className="font-medium text-[#385443]">24h úteis</span> para os próximos passos.
        </p>
        <p className="text-sm font-light text-[#78877E]">Confirmação enviada para {formData.email}</p>
      </div>
    );
  }



  if (formStep === 2) {
    return (
      <div className="bg-white border border-[#DFDCD4] p-8 text-center rounded-[9px] shadow-[var(--shadow-lg)] space-y-8 flex flex-col min-h-[400px] justify-center text-left">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#385443]/10 text-[#385443] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-3xl font-light mb-2 tracking-tight text-[#232323]">Informações Recebidas</h3>
          <p className="text-[15px] leading-relaxed font-light text-[#696969]">
            Para finalizar sua aplicação, confira o valor do investimento abaixo.
          </p>
        </div>

        <div className="bg-[#F2EFE8] border border-[#DFDCD4] rounded-[9px] p-6 text-center w-full shadow-inner relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#385443]"></div>
          <div className="text-xs font-bold tracking-[0.1em] uppercase text-[#B6A689] mb-3">Investimento da Sessão</div>
          <div className="text-[#385443] font-serif flex flex-col items-center justify-center gap-1 mb-2">
            <div className="text-5xl font-bold tracking-tight">R$ 1.000</div>
            <div className="text-base text-[#696969] font-light font-sans mt-2">ou parcelado em até 5x de R$ 200 no cartão</div>
          </div>
        </div>

        <button
          onClick={handleSubmitStep2}
          disabled={loading}
          className="w-full py-5 bg-[#385443] text-white rounded-[7px] hover:bg-[#2A4032] transition-all shadow-lg flex items-center justify-center gap-2 font-bold text-xl mb-2 group shadow-[#385443]/20 disabled:opacity-60"
        >
          {loading ? 'Confirmando...' : 'Confirmar Solicitação de Vaga'}
          {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />}
        </button>
        <p className="text-xs text-center font-light text-[#B6A689]">
          Ao confirmar, nossa equipe entrará em contato para o agendamento real da sessão.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmitStep1} className="bg-white border border-[#DFDCD4] p-6 lg:p-8 space-y-5 rounded-[9px] shadow-[var(--shadow-lg)] relative">
      <div className="text-center mb-6">
        <h3 className="font-serif text-3xl text-[#232323] mb-2">Aplicação para Consultoria</h3>
        <p className="text-sm text-[#696969] font-light">Preencha os dados abaixo para avançar e descobrir o valor do investimento.</p>
      </div>

      {[
        { label: 'Nome Completo', name: 'name', type: 'text', placeholder: 'Seu nome' },
        { label: 'E-mail Profissional', name: 'email', type: 'email', placeholder: 'seu@email.com' },
        { label: 'Telefone/WhatsApp', name: 'phone', type: 'tel', placeholder: '(00) 00000-0000' },
        { label: 'Nome da Clínica', name: 'clinic', type: 'text', placeholder: 'Nome da sua clínica' },
      ].map(({ label, name, type, placeholder }) => (
        <div key={name}>
          <label className="block text-xs font-bold tracking-[0.1em] uppercase mb-2 text-[#78877E]">{label} *</label>
          <input
            type={type}
            name={name}
            required
            value={(formData as any)[name]}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-full px-4 py-3 border border-[#DFDCD4] rounded-[7px] focus:border-[#385443] focus:outline-none transition-colors"
          />
        </div>
      ))}

      <div>
        <label className="block text-xs font-bold tracking-[0.1em] uppercase mb-2 text-[#78877E]">Faturamento Mensal *</label>
        <select name="revenue" required value={formData.revenue} onChange={handleChange} className="w-full px-4 py-3 border border-[#DFDCD4] rounded-[7px] focus:border-[#385443] focus:outline-none transition-colors bg-white">
          <option value="">Selecione...</option>
          <option value="Até R$ 50k">Até R$ 50k</option>
          <option value="R$ 50k - 100k">R$ 50k - 100k</option>
          <option value="R$ 100k - 300k">R$ 100k - 300k</option>
          <option value="R$ 300k - 500k">R$ 300k - 500k</option>
          <option value="R$ 500k+">R$ 500k+</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold tracking-[0.1em] uppercase mb-2 text-[#78877E]">Maior Desafio Atual</label>
        <textarea
          name="mainChallenge"
          value={formData.mainChallenge}
          onChange={handleChange}
          placeholder="Descreva brevemente o principal desafio da sua clínica..."
          rows={3}
          className="w-full px-4 py-3 border border-[#DFDCD4] rounded-[7px] focus:border-[#385443] focus:outline-none transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-8 py-4 bg-[#385443] text-white rounded-[7px] hover:bg-[#42331C] transition-all duration-500 flex items-center justify-center gap-3 group font-bold text-lg disabled:opacity-60"
      >
        {loading ? 'Consultando...' : 'Consultar Investimento'}
        {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2} />}
      </button>

      <div className="flex items-center justify-center gap-2 mt-4 text-[#B6A689] text-xs font-medium">
        <Shield className="w-3 h-3" />
        Seus dados estão seguros e esta ação não gera cobrança.
      </div>
      <p className="text-xs text-center font-light text-[#B6A689]">
        Ao enviar, você concorda com nossa{' '}
        <a href="/privacidade" className="underline hover:text-[#385443]">política de privacidade</a>
      </p>
    </form>
  );
}

// ——————————————————————————
// FAQ COMPONENT
// ——————————————————————————
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#DFDCD4]">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-6 text-left group">
        <span className="font-serif text-lg text-[#232323] pr-4">{question}</span>
        {open ? <ChevronUp className="w-5 h-5 text-[#385443] flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-[#B6A689] flex-shrink-0" />}
      </button>
      {open && (
        <div className="pb-6 text-[#696969] font-light leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

// ——————————————————————————
// MAIN PAGE
// ——————————————————————————
export default function ConsultoriaPage() {
  const faqs = [
    {
      question: 'Quanto tempo dura a sessão de consultoria?',
      answer: 'A sessão de consultoria tem duração de 1 hora, conduzida diretamente por Jania Mesquita. Nesse tempo, fazemos um diagnóstico profundo da sua operação e traçamos um plano de ação imediato.',
    },
    {
      question: 'Qual a diferença entre consultoria e mentoria?',
      answer: 'A consultoria é um engajamento focado e pontual: diagnóstico, plano de ação e direcionamento estratégico em uma sessão. A mentoria é um programa de acompanhamento contínuo (meses) para implementar mudanças sistêmicas na sua clínica. A consultoria é ideal como primeiro passo.',
    },
    {
      question: 'Como faço para agendar?',
      answer: 'Preencha o formulário nesta página. Nossa equipe entrará em contato em até 24h para agendar o melhor dia e horário para sua sessão.',
    },
    {
      question: 'O investimento pode ser parcelado?',
      answer: 'Sim! Oferecemos opções de parcelamento em até 5x no cartão de crédito.',
    },
    {
      question: 'E se eu quiser continuar após a consultoria?',
      answer: 'Muitos clientes migram para a mentoria após a consultoria. Se for o seu caso, o valor da consultoria pode ser abatido do investimento na mentoria.',
    },
    {
      question: 'Para quem é indicada a consultoria?',
      answer: 'Para médicos e gestores de clínicas que querem um diagnóstico profissional da operação, com plano de ação claro para escalar resultados — sem compromisso de longo prazo.',
    },
  ];

  const steps = [
    {
      icon: <Stethoscope className="w-7 h-7" />,
      title: 'Diagnóstico Completo',
      desc: 'Mapeamos os gargalos da sua operação: processos, equipe, financeiro e governança. Você sai da sessão sabendo exatamente onde estão as oportunidades.',
    },
    {
      icon: <Target className="w-7 h-7" />,
      title: 'Plano de Ação Estratégico',
      desc: 'Com base no diagnóstico, traçamos um plano de ação personalizado com prioridades claras, metas e prazos realistas para os próximos 90 dias.',
    },
    {
      icon: <TrendingUp className="w-7 h-7" />,
      title: 'Implementação Direcionada',
      desc: 'Você sai com um mapa prático para implementar mudanças imediatas na clínica. Se precisar de acompanhamento, pode evoluir para a mentoria.',
    },
  ];

  const painPoints = [
    'Sua clínica cresce, mas o lucro não acompanha',
    'Você trabalha mais horas do que deveria como gestor',
    'Não consegue delegar sem perder controle da qualidade',
    'Falta de processos claros gera retrabalho constante',
    'A equipe depende de você para cada decisão',
    'Não tem visibilidade financeira real da operação',
  ];

  return (
    <main className="bg-[#F2EFE8]">

      {/* ═══════════════════════════════════════
        1. HERO — Form na primeira dobra
      ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#F2EFE8] pt-32 pb-20 lg:pt-40 lg:pb-28">
        {/* Decorative Lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-[#DFDCD4] opacity-60"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-[#DFDCD4] opacity-40"></div>

        <div className="max-w-[1218px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left — Copy */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="w-8 h-px bg-[#42331C]"></div>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#42331C]">Consultoria Estratégica</span>
              </div>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 leading-[1.05] tracking-tight text-[#232323]">
                Transforme sua clínica<br />
                <span className="italic text-[#385443]">em uma empresa</span>
              </h1>

              <p className="text-lg md:text-xl mb-8 leading-relaxed font-light text-[#414141] max-w-xl">
                Sessão diagnóstica individual com Jania Mesquita. Em 1 hora, identifique os gargalos da sua operação e receba um plano de ação personalizado para escalar.
              </p>

              {/* Quick Benefits */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  { icon: <Clock className="w-4 h-4" />, text: '1 hora de sessão individual' },
                  { icon: <Target className="w-4 h-4" />, text: 'Diagnóstico personalizado' },
                  { icon: <Shield className="w-4 h-4" />, text: 'Plano de ação imediato' },
                  { icon: <Users className="w-4 h-4" />, text: 'Direto com Jania Mesquita' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-[#414141]">
                    <span className="text-[#385443]">{item.icon}</span>
                    <span className="font-light">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Pricing Preview */}
              <div className="bg-white/60 border border-[#DFDCD4] rounded-[9px] p-5 inline-block">
                <div className="text-xs font-bold tracking-[0.15em] uppercase text-[#B6A689] mb-1">Aplicação Restrita</div>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-2xl text-[#385443]">Investimento sob Consulta</span>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="order-1 lg:order-2">
              <ConsultoriaForm formId="hero-form" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
        2. PROBLEMA — Pain Points
      ═══════════════════════════════════════ */}
      <section className="section-padding bg-[#42331C] text-[#F2EFE8] relative overflow-hidden">
        <div className="absolute top-20 left-0 w-72 h-72 border border-[#B6A689]/20 rounded-full -translate-x-1/2"></div>
        <div className="absolute bottom-20 right-0 w-96 h-96 border border-[#B6A689]/20 rounded-full translate-x-1/2"></div>

        <div className="max-w-[1218px] mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-[#B6A689]"></div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#B6A689]">Soa familiar?</span>
              <div className="w-8 h-px bg-[#B6A689]"></div>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-[1.05] text-white">
              A maioria dos médicos gestores<br />
              <span className="italic text-[#B6A689]">enfrenta os mesmos desafios</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {painPoints.map((point, i) => (
              <div key={i} className="flex items-start gap-4 bg-[#F2EFE8]/5 border border-[#B6A689]/20 rounded-[7px] p-5 hover:bg-[#F2EFE8]/10 transition-colors">
                <div className="w-6 h-6 bg-[#B6A689] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#42331C] text-xs font-bold">{i + 1}</span>
                </div>
                <p className="text-[#F2EFE8]/90 font-light leading-relaxed">{point}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <p className="text-lg text-[#B6A689] font-light mb-6">Se você se identificou com pelo menos 2 desses pontos...</p>
            <button
              onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#B6A689] text-[#42331C] rounded-[7px] hover:bg-[#F2EFE8] transition-all font-bold text-lg group"
            >
              Agendar Consultoria
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
        3. COMO FUNCIONA — 3 Etapas
      ═══════════════════════════════════════ */}
      <section className="section-padding bg-[#F2EFE8] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-px h-64 bg-gradient-to-b from-transparent via-[#385443]/10 to-transparent"></div>

        <div className="max-w-[1218px] mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-12 h-px bg-[#385443]"></div>
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-[#385443]">Como Funciona</span>
              <div className="w-12 h-px bg-[#385443]"></div>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-[1.05] tracking-tight text-[#232323]">
              Três etapas para{' '}
              <span className="italic text-[#385443]">transformar</span>
            </h2>

            <p className="text-lg leading-relaxed text-[#42331C] max-w-2xl mx-auto font-light">
              Uma metodologia comprovada que transforma visão médica em gestão estratégica
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, i) => (
              <div key={i} className="relative bg-white p-8 rounded-[9px] border border-[#DFDCD4] shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-shadow group">
                {/* Step Number */}
                <div className="absolute -top-4 left-8">
                  <div className="w-8 h-8 bg-[#385443] rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-sm font-bold">{i + 1}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="w-14 h-14 bg-[#F2EFE8] rounded-[7px] flex items-center justify-center text-[#385443] mb-6 group-hover:bg-[#385443] group-hover:text-white transition-colors">
                    {step.icon}
                  </div>

                  <h3 className="font-serif text-xl text-[#232323] mb-3">{step.title}</h3>
                  <p className="text-[#696969] font-light leading-relaxed text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
        4. INVESTIMENTO / PRICING
      ═══════════════════════════════════════ */}
      <section className="section-padding bg-white relative overflow-hidden border-y border-[#DFDCD4]">
        <div className="max-w-[1218px] mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left — Value Props */}
              <div>
                <div className="inline-flex items-center gap-3 mb-8">
                  <div className="w-8 h-px bg-[#42331C]"></div>
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#42331C]">Investimento</span>
                </div>

                <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-[1.05] tracking-tight text-[#232323]">
                  Um investimento que<br />
                  <span className="italic text-[#385443]">se paga rapidamente</span>
                </h2>

                <p className="text-lg mb-8 leading-relaxed font-light text-[#414141]">
                  Um único ajuste identificado na consultoria pode economizar milhares de reais mensais na operação da sua clínica.
                </p>

                <ul className="space-y-4">
                  {[
                    'Sessão individual de 1 hora com Jania Mesquita',
                    'Diagnóstico completo da operação',
                    'Plano de ação personalizado em PDF',
                    'Direcionamento estratégico para os próximos 90 dias',
                    'Possibilidade de evolução para mentoria',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#385443] mt-0.5 flex-shrink-0" />
                      <span className="text-[#414141] font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right — Price Card */}
              <div className="text-center bg-[#F2EFE8] p-8 md:p-10 rounded-[12px] border border-[#DFDCD4] shadow-xl">
                <div className="text-xs text-[#B6A689] uppercase tracking-widest font-bold mb-4">Como funciona</div>
                <div className="flex items-baseline justify-center gap-1 text-[#385443] font-serif mb-2">
                  <span className="text-4xl md:text-5xl font-bold leading-tight">Destrave sua empresa</span>
                </div>
                <div className="text-sm text-[#696969] mb-6 font-light">Escale resultados na sua clínica.</div>

                <button
                  onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full py-4 bg-[#385443] text-white rounded-[7px] hover:bg-[#2A4032] transition-all shadow-lg flex items-center justify-center gap-2 font-bold text-lg mb-4 group"
                >
                  Ver Investimento e Aplicar
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-[#696969] opacity-70">
                  <Shield className="w-3 h-3" />
                  Contato sem compromisso
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
        5. FOR WHOM + PROCESS
      ═══════════════════════════════════════ */}
      <section className="section-padding bg-[#F2EFE8] relative overflow-hidden">
        <div className="max-w-[1218px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Left — Para Quem */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Minus className="w-5 h-5 text-[#B6A689]" strokeWidth={1} />
                <h3 className="text-base font-bold tracking-[0.15em] uppercase text-[#B6A689]">Para Quem É</h3>
              </div>
              <ul className="space-y-5 border-l border-[#DFDCD4] pl-8">
                {[
                  'Médicos donos ou gestores de clínicas',
                  'Líderes que querem estruturar processos',
                  'Profissionais buscando diagnóstico rápido e assertivo',
                  'Gestores que querem escalar sem perder qualidade',
                  'Quem quer testar a metodologia antes da mentoria',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 mt-2 bg-[#385443] rounded-full opacity-60"></div>
                    <span className="font-light leading-relaxed text-[#414141]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — O que acontece */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Minus className="w-5 h-5 text-[#B6A689]" strokeWidth={1} />
                <h3 className="text-base font-bold tracking-[0.15em] uppercase text-[#B6A689]">Processo</h3>
              </div>
              <div className="space-y-4 border-l border-[#DFDCD4] pl-8 font-light text-[#414141]">
                <p>1. Preencha o formulário nesta página</p>
                <p>2. Nossa equipe entra em contato em até 24h</p>
                <p>3. Agendamos sua sessão de consultoria</p>
                <p>4. Sessão diagnóstica de 1 hora com Jania</p>
                <p>5. Receba seu plano de ação personalizado</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
        6. FAQ
      ═══════════════════════════════════════ */}
      <section className="section-padding bg-white border-t border-[#DFDCD4]">
        <div className="max-w-[800px] mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-6">
              <MessageCircle className="w-5 h-5 text-[#385443]" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#385443]">Dúvidas Frequentes</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#232323] leading-tight">
              Perguntas sobre a consultoria
            </h2>
          </div>

          <div className="border-t border-[#DFDCD4]">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
        7. FINAL CTA + FORM REPETIDO
      ═══════════════════════════════════════ */}
      <section id="formulario" className="section-padding bg-[#F2EFE8] relative overflow-hidden border-t border-[#DFDCD4]">
        <div className="absolute top-0 left-1/4 w-px h-full bg-[#DFDCD4] opacity-60"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-[#DFDCD4] opacity-40"></div>

        <div className="max-w-[1218px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-3 mb-8 lg:mb-16">
                <div className="w-8 h-px bg-[#42331C]"></div>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#42331C]">Próximo Passo</span>
              </div>

              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 lg:mb-12 leading-tight tracking-tight text-[#232323]">
                Pronto para<br />
                <span className="italic text-[#385443]">transformar?</span>
              </h2>

              <p className="text-lg md:text-xl mb-10 leading-relaxed font-light text-[#414141]">
                Preencha o formulário e dê o primeiro passo para sair da operação artesanal e entrar na{' '}
                <span className="bg-[#DFDCD4] px-1 font-medium text-[#232323]">gestão estratégica</span>.
              </p>

              <div className="space-y-12">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Minus className="w-5 h-5 text-[#B6A689]" strokeWidth={1} />
                    <h3 className="text-base font-bold tracking-[0.15em] uppercase text-[#B6A689]">O que você ganha</h3>
                  </div>
                  <ul className="space-y-5 border-l border-[#DFDCD4] pl-8">
                    {[
                      'Diagnóstico profundo da sua operação',
                      'Mapa de oportunidades com prioridades',
                      'Plano de ação para os próximos 90 dias',
                      'Acesso direto à expertise de Jania Mesquita',
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 mt-2 bg-[#385443] rounded-full opacity-60"></div>
                        <span className="font-light leading-relaxed text-[#414141]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div>
              <ConsultoriaForm formId="footer-form" />
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
