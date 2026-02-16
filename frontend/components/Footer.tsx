import React from 'react';

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Mail, Minus, Instagram, Linkedin } from 'lucide-react';
import Logo from '../imports/Logo1';

export function Footer() {
  const location = useLocation();
  const showApplicationForm = location.pathname === '/' || location.pathname === '/mentoria';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    clinic: '',
    revenue: '',
    tier: 'Premium'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Aplicação enviada:', formData);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <footer className="bg-white">
      {/* Application Section (Conditional) */}
      {showApplicationForm && (
        <section id="aplicar" className="section-padding bg-[#F2EFE8] relative overflow-hidden border-t border-[#DFDCD4]">
          {/* Geometric Lines */}
          <div className="absolute top-0 left-1/4 w-px h-full bg-[#DFDCD4] opacity-60"></div>
          <div className="absolute top-0 right-1/3 w-px h-full bg-[#DFDCD4] opacity-40"></div>
          
          <div className="container-custom relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
              <div>
                <div className="inline-flex items-center gap-3 mb-8 lg:mb-16">
                  <div className="w-8 h-px bg-[#42331C]"></div>
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#42331C]">
                    Processo Seletivo
                  </span>
                </div>

                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 lg:mb-12 leading-tight tracking-tight text-[#232323]">
                  Aplicar para a
                  <br />
                  <span className="italic text-[#385443]">Mentoria</span>
                </h2>
                
                <p className="text-lg md:text-xl mb-10 lg:mb-16 leading-relaxed font-light text-[#414141]">
                  A mentoria é limitada a <span className="bg-[#DFDCD4] px-1 font-medium text-[#232323]">15 clínicas por turma</span> para garantir atenção individualizada e resultados concretos.
                </p>
                
                <div className="space-y-12">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <Minus className="w-5 h-5 text-[#B6A689]" strokeWidth={1} />
                      <h3 className="text-base font-bold tracking-[0.15em] uppercase text-[#B6A689]">
                        Perfil Ideal
                      </h3>
                    </div>
                    <ul className="space-y-5 border-l border-[#DFDCD4] pl-8">
                      {[
                        "Médicos donos ou gestores de clínicas",
                        "Faturamento mínimo R$ 50k/mês",
                        "Comprometimento com transformação sistêmica",
                        "Disponibilidade para implementação"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 mt-2 bg-[#385443] rounded-full opacity-60"></div>
                          <span className="font-light leading-relaxed text-[#414141]">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-[#DFDCD4] pt-12">
                    <div className="flex items-center gap-3 mb-6">
                      <Minus className="w-5 h-5 text-[#B6A689]" strokeWidth={1} />
                      <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-[#B6A689]">
                        Processo
                      </h3>
                    </div>
                    <div className="space-y-4 border-l border-[#DFDCD4] pl-8 font-light text-[#414141]">
                      <p className="leading-relaxed">1. Aplicação online</p>
                      <p className="leading-relaxed">2. Análise de perfil (48h)</p>
                      <p className="leading-relaxed">3. Entrevista estratégica</p>
                      <p className="leading-relaxed">4. Confirmação de vaga</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="bg-white border border-[#DFDCD4] p-6 lg:p-8 space-y-6 rounded-[9px] shadow-[var(--shadow-lg)]">
                    <div>
                      <label className="block text-xs font-bold tracking-[0.1em] uppercase mb-2 text-[#78877E]">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#DFDCD4] rounded-[7px] focus:border-[#385443] focus:outline-none transition-colors"
                        placeholder="Seu nome"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-[0.1em] uppercase mb-2 text-[#78877E]">
                        E-mail Profissional *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#DFDCD4] rounded-[7px] focus:border-[#385443] focus:outline-none transition-colors"
                        placeholder="seu@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-[0.1em] uppercase mb-2 text-[#78877E]">
                        Telefone/WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#DFDCD4] rounded-[7px] focus:border-[#385443] focus:outline-none transition-colors"
                        placeholder="(00) 00000-0000"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-[0.1em] uppercase mb-2 text-[#78877E]">
                        Nome da Clínica *
                      </label>
                      <input
                        type="text"
                        name="clinic"
                        required
                        value={formData.clinic}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#DFDCD4] rounded-[7px] focus:border-[#385443] focus:outline-none transition-colors"
                        placeholder="Nome da sua clínica"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-[0.1em] uppercase mb-2 text-[#78877E]">
                        Faturamento Mensal *
                      </label>
                      <select
                        name="revenue"
                        required
                        value={formData.revenue}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#DFDCD4] rounded-[7px] focus:border-[#385443] focus:outline-none transition-colors bg-white"
                      >
                        <option value="">Selecione...</option>
                        <option value="50-100k">R$ 50k - 100k</option>
                        <option value="100-300k">R$ 100k - 300k</option>
                        <option value="300-500k">R$ 300k - 500k</option>
                        <option value="500k+">R$ 500k+</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-[0.1em] uppercase mb-2 text-[#78877E]">
                        Tier Preferido *
                      </label>
                      <select
                        name="tier"
                        required
                        value={formData.tier}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#DFDCD4] rounded-[7px] focus:border-[#385443] focus:outline-none transition-colors bg-white"
                      >
                        <option value="Basic">Basic</option>
                        <option value="Premium">Premium</option>
                        <option value="VIP">VIP</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full px-8 py-4 bg-[#385443] text-white rounded-[7px] hover:bg-[#42331C] transition-all duration-500 flex items-center justify-center gap-3 group font-bold text-lg shadow-[var(--shadow-md)]"
                    >
                      Enviar Aplicação
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                    </button>

                    <p className="text-xs text-center font-light text-[#B6A689]">
                      Ao enviar, você concorda com nossa política de privacidade
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
                    <p className="text-sm font-light text-[#78877E]">
                      Confirmação enviada para {formData.email}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Footer Links - Dark Brown Theme from ID */}
      <div className="bg-[#31230D] text-[#F9F9F9]">
        <div className="container-custom px-[20px] py-[60px] md:py-20 md:px-[20px] pt-[80px] pr-[20px] pb-[30px] pl-[20px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 mb-[20px] border-b border-[#4D412F] pb-[20px]">
            {/* Logo & Description */}
            <div className="md:col-span-4">
              <Link to="/" className="inline-block mb-4 w-32 md:w-40">
                <Logo />
              </Link>
              <p className="text-xs font-light leading-relaxed mb-4 text-[rgb(215,215,215)] max-w-sm">
                Mentoria Executiva para Transformação de Clínicas de Saúde. Metodologia proprietária para construir governança e escalabilidade.
              </p>
              <div className="flex items-center gap-3">
                <a href="#" className="w-7 h-7 flex items-center justify-center border border-[#E8E5DD]/40 rounded-full hover:bg-[#F9F9F9] hover:text-[#31230D] transition-all text-[#E8E5DD]">
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a href="#" className="w-7 h-7 flex items-center justify-center border border-[#E8E5DD]/40 rounded-full hover:bg-[#F9F9F9] hover:text-[#31230D] transition-all text-[#E8E5DD]">
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
                <a href="mailto:contato@janiamesquita.com.br" className="text-xs font-light hover:underline text-[#E8E5DD] hover:text-[#FFFFFF] ml-2 transition-colors">
                  contato@janiamesquita.com.br
                </a>
              </div>
            </div>
            
            {/* Navigation Links */}
            <div className="md:col-span-2 md:col-start- bg-[rgba(223,220,220,0)]">
              <h4 className="text-[10px] font-bold tracking-[0.15em] uppercase text-[rgb(228,228,228)] mb-4">
                Serviços
              </h4>
              <ul className="space-y-2 text-xs font-light text-[#E8E5DD]">
                <li><Link to="/mentoria" className="hover:text-[#FFFFFF] transition-colors">Mentoria Executiva</Link></li>
                <li><Link to="/palestras" className="hover:text-[#FFFFFF] transition-colors">Palestras</Link></li>
                <li><Link to="/acervo" className="hover:text-[#FFFFFF] transition-colors">Acervo</Link></li>
                <li><Link to="/avaliacao" className="hover:text-[#FFFFFF] transition-colors">Avaliação Gratuita</Link></li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-[10px] font-bold tracking-[0.15em] uppercase text-[rgb(228,228,228)] mb-4">
                Institucional
              </h4>
              <ul className="space-y-2 text-xs font-light text-[#E8E5DD]">
                <li><Link to="/sobre" className="hover:text-[#FFFFFF] transition-colors">Sobre</Link></li>
                <li><Link to="/palestras" className="hover:text-[#FFFFFF] transition-colors">Palestras</Link></li>
                <li><Link to="/acervo" className="hover:text-[#FFFFFF] transition-colors">Acervo</Link></li>
                <li><Link to="/contato" className="hover:text-[#FFFFFF] transition-colors">Contato</Link></li>
                <li><Link to="/links" className="hover:text-[#FFFFFF] transition-colors">Links</Link></li>
                <li><Link to="/privacidade" className="hover:text-[#FFFFFF] transition-colors">Privacidade</Link></li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="text-[10px] font-bold tracking-[0.15em] uppercase text-[rgb(228,228,228)] mb-4">
                Newsletter
              </h4>
              <p className="text-xs font-light mb-4 leading-relaxed text-[rgb(215,215,215)]">
                Insights sobre governança e gestão de clínicas direto no seu e-mail.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="flex-1 px-3 py-2 bg-[#4D412F]/50 border border-[#6B5D47] text-[#FFFFFF] rounded-[5px] text-xs focus:border-[#E8E5DD] focus:outline-none transition-colors placeholder:text-[#C9B896]"
                />
                <button className="px-4 py-2 bg-[#E8E5DD] text-[#31230D] rounded-[5px] hover:bg-[#FFFFFF] transition-colors font-bold">
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-light text-[#C9B896]">
            <p className="flex flex-col md:flex-row items-center gap-1 text-center md:text-left">
              <span className="text-[rgb(215,215,215)]">CNPJ: 46.568.777/0001-58</span>
              <span className="hidden md:inline mx-2">|</span>
              <span className="text-[rgb(215,215,215)]">MM Mesquita Servicos de Administracao LTDA</span>
            </p>
            <div className="flex items-center gap-6">
              <p className="text-[rgb(215,215,215)]">© {new Date().getFullYear()} Jania Mesquita</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}