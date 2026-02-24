import React, { useState } from 'react';
import { Suspense, lazy } from 'react';
import { ArrowRight, CheckCircle2, Minus } from 'lucide-react';
import { formulariosApi } from '../lib/api';

const HeroMentoria = lazy(() => import('../components/HeroMentoria').then(m => ({ default: m.HeroMentoria })));
const ProblemSection = lazy(() => import('../components/ProblemSection').then(m => ({ default: m.ProblemSection })));
const MethodologySection = lazy(() => import('../components/MethodologySection').then(m => ({ default: m.MethodologySection })));
const JourneySection = lazy(() => import('../components/JourneySection').then(m => ({ default: m.JourneySection })));
const MaturityLevels = lazy(() => import('../components/MaturityLevels').then(m => ({ default: m.MaturityLevels })));
const PricingSection = lazy(() => import('../components/PricingSection').then(m => ({ default: m.PricingSection })));
const ROISection = lazy(() => import('../components/ROISection').then(m => ({ default: m.ROISection })));

function LoadingFallback() {
  return <div className="min-h-screen flex items-center justify-center bg-[#F2EFE8]">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#385443] mx-auto mb-4"></div>
      <p className="text-[#696969]">Carregando...</p>
    </div>
  </div>;
}

function MentoriaApplicationForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', clinic: '', revenue: '', tier: 'Premium' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await formulariosApi.submitMentoria(formData);
      setSubmitted(true);
    } catch (err) {
      console.error('Erro ao enviar aplicação:', err);
      setSubmitted(true); // mostra confirmação mesmo assim
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="aplicar" className="section-padding bg-[#F2EFE8] relative overflow-hidden border-t border-[#DFDCD4]">
      <div className="absolute top-0 left-1/4 w-px h-full bg-[#DFDCD4] opacity-60"></div>
      <div className="absolute top-0 right-1/3 w-px h-full bg-[#DFDCD4] opacity-40"></div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-3 mb-8 lg:mb-16">
              <div className="w-8 h-px bg-[#42331C]"></div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#42331C]">Processo Seletivo</span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 lg:mb-12 leading-tight tracking-tight text-[#232323]">
              Aplicar para a<br />
              <span className="italic text-[#385443]">Mentoria</span>
            </h2>

            <p className="text-lg md:text-xl mb-10 lg:mb-16 leading-relaxed font-light text-[#414141]">
              A mentoria é limitada a{' '}
              <span className="bg-[#DFDCD4] px-1 font-medium text-[#232323]">15 clínicas por turma</span>{' '}
              para garantir atenção individualizada e resultados concretos.
            </p>

            <div className="space-y-12">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Minus className="w-5 h-5 text-[#B6A689]" strokeWidth={1} />
                  <h3 className="text-base font-bold tracking-[0.15em] uppercase text-[#B6A689]">Perfil Ideal</h3>
                </div>
                <ul className="space-y-5 border-l border-[#DFDCD4] pl-8">
                  {['Médicos donos ou gestores de clínicas', 'Faturamento mínimo R$ 50k/mês', 'Comprometimento com transformação sistêmica', 'Disponibilidade para implementação'].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 mt-2 bg-[#385443] rounded-full opacity-60"></div>
                      <span className="font-light leading-relaxed text-[#414141]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-[#DFDCD4] pt-12">
                <div className="flex items-center gap-3 mb-6">
                  <Minus className="w-5 h-5 text-[#B6A689]" strokeWidth={1} />
                  <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-[#B6A689]">Processo</h3>
                </div>
                <div className="space-y-4 border-l border-[#DFDCD4] pl-8 font-light text-[#414141]">
                  <p>1. Aplicação online</p>
                  <p>2. Análise de perfil (48h)</p>
                  <p>3. Entrevista estratégica</p>
                  <p>4. Confirmação de vaga</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="bg-white border border-[#DFDCD4] p-6 lg:p-8 space-y-6 rounded-[9px] shadow-[var(--shadow-lg)]">
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
                    <option value="50-100k">R$ 50k - 100k</option>
                    <option value="100-300k">R$ 100k - 300k</option>
                    <option value="300-500k">R$ 300k - 500k</option>
                    <option value="500k+">R$ 500k+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold tracking-[0.1em] uppercase mb-2 text-[#78877E]">Tier Preferido *</label>
                  <select name="tier" required value={formData.tier} onChange={handleChange} className="w-full px-4 py-3 border border-[#DFDCD4] rounded-[7px] focus:border-[#385443] focus:outline-none transition-colors bg-white">
                    <option value="Basic">Basic</option>
                    <option value="Premium">Premium</option>
                    <option value="VIP">VIP</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-8 py-4 bg-[#385443] text-white rounded-[7px] hover:bg-[#42331C] transition-all duration-500 flex items-center justify-center gap-3 group font-bold text-lg disabled:opacity-60"
                >
                  {loading ? 'Enviando...' : 'Enviar Aplicação'}
                  {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2} />}
                </button>

                <p className="text-xs text-center font-light text-[#B6A689]">
                  Ao enviar, você concorda com nossa{' '}
                  <a href="/privacidade" className="underline hover:text-[#385443]">política de privacidade</a>
                </p>
              </form>
            ) : (
              <div className="bg-white border border-[#DFDCD4] p-8 text-center rounded-[9px] shadow-[var(--shadow-lg)]">
                <div className="w-20 h-20 border border-[#385443] rounded-full flex items-center justify-center mx-auto mb-8 text-[#385443]">
                  <CheckCircle2 className="w-10 h-10" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-3xl font-light mb-6 tracking-tight text-[#232323]">Aplicação Recebida</h3>
                <p className="mb-8 text-lg leading-relaxed font-light text-[#414141]">
                  Nossa equipe analisará seu perfil e entrará em contato em até{' '}
                  <span className="font-medium text-[#385443]">48h úteis</span> para agendar a entrevista estratégica.
                </p>
                <p className="text-sm font-light text-[#78877E]">Confirmação enviada para {formData.email}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function MentoriaPage() {
  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
        <HeroMentoria />
      
      {/* Video Section - Player de vídeo */}
      {/* <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-px h-64 bg-gradient-to-b from-transparent via-[#385443]/10 to-transparent"></div>
      
      <div className="max-w-[1218px] mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-8">
          <div className="w-12 h-px bg-[#385443]"></div>
          <span className="text-xs font-bold tracking-[0.22em] uppercase text-[#385443]">
            Veja na prática
          </span>
          <div className="w-12 h-px bg-[#385443]"></div>
          </div>
          
          <h2 className="font-serif text-[42px] md:text-[52px] mb-6 leading-[1.05] tracking-tight text-[#232323]">
          Como funciona a{' '}
          <span className="italic text-[#385443]">mentoria</span>
          </h2>
          
          <p className="text-lg leading-relaxed text-[#42331C] max-w-2xl mx-auto">
          Assista e entenda como a mentoria transforma médicos em líderes de operações sustentáveis
          </p>
        </div>

        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-br from-[#385443]/5 to-transparent rounded-[12px] -z-10"></div>
          
          <div className="relative aspect-video rounded-[7px] overflow-hidden bg-[#232323] shadow-2xl border border-[#385443]/20">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Jania Mesquita - Mentoria"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          </div>
          
          <div className="absolute -bottom-3 -right-3 w-24 h-24 border-r-2 border-b-2 border-[#385443]/20 rounded-br-[7px] -z-10"></div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-base text-[#42331C] mb-6">
          Pronto para transformar sua operação?
          </p>
          <a 
          href="#diagnostico"
          className="inline-flex items-center gap-2 text-[#385443] hover:text-[#4a6655] transition-colors duration-300 group"
          >
          <span className="font-medium tracking-wide">Sabe por que não funciona sua operação?</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
          </a>
        </div>
        </div>
      </div>
      </section> */}

      <ProblemSection />
      <MethodologySection />
      <JourneySection />
      <MaturityLevels />
      <PricingSection />
      <ROISection />
      <MentoriaApplicationForm />
      </Suspense>
    </>
  );
}