import React from 'react';

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Instagram, Linkedin, Mail, MapPin } from 'lucide-react';
import Logo from '../imports/Logo1';

export function FooterRefined() {
  const location = useLocation();
  const showApplicationForm = location.pathname === '/' || location.pathname === '/mentoria';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    clinic: '',
    revenue: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

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

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter:', newsletterEmail);
    setNewsletterSubmitted(true);
    setTimeout(() => {
      setNewsletterSubmitted(false);
      setNewsletterEmail('');
    }, 3000);
  };

  return (
    <footer className="bg-white">
      {/* Application Section (Conditional) */}
      {showApplicationForm && (
        <section id="aplicar" className="py-20 bg-[#F2EFE8] relative overflow-hidden border-t border-[#DFDCD4]">
          {/* Geometric Lines */}
          <div className="absolute top-0 left-1/4 w-px h-full bg-[#DFDCD4] opacity-60"></div>
          <div className="absolute top-0 right-1/3 w-px h-full bg-[#DFDCD4] opacity-40"></div>

          <div className="max-w-[1218px] mx-auto px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div>
                <div className="inline-flex items-center gap-3 mb-12">
                  <div className="w-8 h-px bg-[#42331C]"></div>
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#42331C]">
                    Diagnóstico Gratuito
                  </span>
                </div>

                <h2 className="font-serif text-5xl md:text-6xl mb-8 leading-tight tracking-tight text-[#232323]">
                  Agende uma sessão{' '}
                  <span className="italic text-[#385443]">estratégica</span>
                </h2>

                <p className="text-lg md:text-xl mb-12 leading-relaxed text-[#414141]">
                  45 minutos para mapear os desafios da sua clínica e receber um plano
                  de ação personalizado. Limitado a{' '}
                  <span className="bg-[#DFDCD4] px-2 py-0.5 font-medium text-[#232323]">15 clínicas por mês</span>.
                </p>

                <div className="space-y-8">
                  <div>
                    <div className="text-xs font-bold tracking-[0.15em] uppercase text-[#B6A689] mb-4">
                      O que você recebe:
                    </div>
                    <ul className="space-y-3 border-l-2 border-[#385443] pl-6">
                      {[
                        'Mapeamento completo da operação',
                        'Identificação de gargalos críticos',
                        'Plano de ação preliminar',
                        'Recomendação de próximos passos'
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 mt-2 bg-[#385443] rounded-full"></div>
                          <span className="leading-relaxed text-[#414141]">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="bg-white border-2 border-[#DFDCD4] p-8 space-y-6 rounded-[7px] shadow-xl">
                    <div>
                      <label className="block text-xs font-bold tracking-[0.1em] uppercase mb-2 text-[#696969]">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-[#DFDCD4] rounded-[7px] focus:border-[#385443] focus:outline-none transition-colors text-[#232323]"
                        placeholder="Seu nome"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-[0.1em] uppercase mb-2 text-[#696969]">
                        E-mail Profissional *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-[#DFDCD4] rounded-[7px] focus:border-[#385443] focus:outline-none transition-colors text-[#232323]"
                        placeholder="seu@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-[0.1em] uppercase mb-2 text-[#696969]">
                        Telefone/WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-[#DFDCD4] rounded-[7px] focus:border-[#385443] focus:outline-none transition-colors text-[#232323]"
                        placeholder="(00) 00000-0000"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-[0.1em] uppercase mb-2 text-[#696969]">
                        Nome da Clínica *
                      </label>
                      <input
                        type="text"
                        name="clinic"
                        required
                        value={formData.clinic}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-[#DFDCD4] rounded-[7px] focus:border-[#385443] focus:outline-none transition-colors text-[#232323]"
                        placeholder="Nome da sua clínica"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-[0.1em] uppercase mb-2 text-[#696969]">
                        Faturamento Mensal Aproximado *
                      </label>
                      <select
                        name="revenue"
                        required
                        value={formData.revenue}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-[#DFDCD4] rounded-[7px] focus:border-[#385443] focus:outline-none transition-colors bg-white text-[#232323]"
                      >
                        <option value="">Selecione...</option>
                        <option value="50-100k">R$ 50k - 100k</option>
                        <option value="100-300k">R$ 100k - 300k</option>
                        <option value="300-500k">R$ 300k - 500k</option>
                        <option value="500k+">Acima de R$ 500k</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full px-8 py-4 bg-[#385443] text-white rounded-[7px] hover:bg-[#4a6655] hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group font-bold text-lg"
                    >
                      Agendar Diagnóstico Gratuito
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                    </button>

                    <p className="text-xs text-center text-[#696969]">
                      Ao enviar, você concorda com nossa{' '}
                      <Link to="/privacidade" className="underline hover:text-[#385443]">política de privacidade</Link>
                    </p>
                  </form>
                ) : (
                  <div className="bg-white border-2 border-[#385443] p-10 text-center rounded-[7px] shadow-xl">
                    <div className="w-20 h-20 bg-[#385443] rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle2 className="w-10 h-10 text-white" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif text-3xl mb-6 tracking-tight text-[#232323]">
                      Solicitação Recebida!
                    </h3>
                    <p className="text-lg leading-relaxed text-[#414141] mb-6">
                      Nossa equipe entrará em contato em até{' '}
                      <span className="font-bold text-[#385443]">48h úteis</span>{' '}
                      para agendar sua sessão estratégica.
                    </p>
                    <p className="text-sm text-[#696969]">
                      Confirmação enviada para <span className="font-medium text-[#232323]">{formData.email}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer Links - Refined Dark Theme */}
      <div className="bg-[#2A1F14] text-white">
        <div className="max-w-[1218px] mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12 pb-12 border-b border-[#4D3E2F]">
            {/* Logo & Brand - Mais destaque */}
            <div className="md:col-span-5">
              <Link to="/" className="inline-block mb-6">
                <div className="w-56">
                  <Logo />
                </div>
              </Link>

              <h3 className="text-lg font-medium mb-4 text-white">
                Jania Mesquita
              </h3>

              <p className="text-base leading-relaxed mb-8 text-[#D4C5B0] max-w-md">
                Mentoria executiva para transformação de clínicas de saúde.
                Governança, processos e liderança que escalam.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-8">
                <a
                  href="mailto:contato@janiamesquita.com.br"
                  className="flex items-center gap-3 text-[#D4C5B0] hover:text-white transition-colors group"
                >
                  <Mail className="w-5 h-5 text-[#B8976A]" strokeWidth={1.5} />
                  <span className="text-sm">contato@janiamesquita.com.br</span>
                </a>
                <div className="flex items-center gap-3 text-[#D4C5B0]">
                  <MapPin className="w-5 h-5 text-[#B8976A]" strokeWidth={1.5} />
                  <span className="text-sm">São Paulo, Brasil</span>
                </div>
              </div>

              {/* Social Icons - Maiores e mais destaque */}
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center border-2 border-[#4D3E2F] rounded-full hover:bg-white hover:text-[#2A1F14] hover:border-white transition-all duration-300 text-[#D4C5B0]"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" strokeWidth={1.5} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center border-2 border-[#4D3E2F] rounded-full hover:bg-white hover:text-[#2A1F14] hover:border-white transition-all duration-300 text-[#D4C5B0]"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" strokeWidth={1.5} />
                </a>
              </div>
            </div>

            {/* Serviços */}
            <div className="md:col-span-2">
              <h4 className="text-sm font-bold tracking-[0.12em] uppercase text-white mb-6">
                Serviços
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/mentoria"
                    className="text-base text-[#D4C5B0] hover:text-white transition-colors duration-200 inline-block"
                  >
                    Mentoria Executiva
                  </Link>
                </li>
                <li>
                  <Link
                    to="/mentoria-lpv"
                    className="text-base text-[#D4C5B0] hover:text-white transition-colors duration-200 inline-block"
                  >
                    Mentoria LPV
                  </Link>
                </li>
                <li>
                  <Link
                    to="/palestras"
                    className="text-base text-[#D4C5B0] hover:text-white transition-colors duration-200 inline-block"
                  >
                    Palestras
                  </Link>
                </li>
                <li>
                  <Link
                    to="/acervo"
                    className="text-base text-[#D4C5B0] hover:text-white transition-colors duration-200 inline-block"
                  >
                    Acervo Digital
                  </Link>
                </li>
              </ul>
            </div>

            {/* Institucional */}
            <div className="md:col-span-2">
              <h4 className="text-sm font-bold tracking-[0.12em] uppercase text-white mb-6">
                Institucional
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/sobre"
                    className="text-base text-[#D4C5B0] hover:text-white transition-colors duration-200 inline-block"
                  >
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link
                    to="/na-midia"
                    className="text-base font-medium text-[#B8976A] hover:text-white transition-colors duration-200 inline-block"
                  >
                    Na Mídia ✦
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contato"
                    className="text-base text-[#D4C5B0] hover:text-white transition-colors duration-200 inline-block"
                  >
                    Contato
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacidade"
                    className="text-sm text-[#8B7355] hover:text-[#D4C5B0] transition-colors duration-200 inline-block"
                  >
                    Privacidade
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter - CTA Estratégico */}
            <div className="md:col-span-3">
              <h4 className="text-sm font-bold tracking-[0.12em] uppercase text-white mb-6">
                Newsletter Executiva
              </h4>
              <p className="text-base leading-relaxed mb-6 text-[#D4C5B0]">
                Receba insights sobre governança e liderança direto da minha experiência
                com +100 mil funcionários.
              </p>

              {!newsletterSubmitted ? (
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    placeholder="seu@email.com"
                    className="w-full px-4 py-3 bg-[#3D2F20] border-2 border-[#4D3E2F] text-white rounded-[7px] text-sm focus:border-[#B8976A] focus:outline-none transition-colors placeholder:text-[#8B7355]"
                  />
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-[#B8976A] text-[#2A1F14] rounded-[7px] hover:bg-[#D4C5B0] transition-all duration-300 font-bold text-sm flex items-center justify-center gap-2 group"
                  >
                    <span>Inscrever-se</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                  </button>
                </form>
              ) : (
                <div className="bg-[#3D2F20] border-2 border-[#B8976A] rounded-[7px] p-4 text-center">
                  <CheckCircle2 className="w-6 h-6 text-[#B8976A] mx-auto mb-2" />
                  <p className="text-sm text-[#D4C5B0]">Inscrição confirmada!</p>
                </div>
              )}

              <p className="text-xs text-[#8B7355] mt-3 leading-relaxed">
                Sem spam. Conteúdo estratégico quinzenal. Cancele quando quiser.
              </p>
            </div>
          </div>

          {/* Bottom Bar - Mais discreto */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-[10px] md:text-xs text-[#8B7355] order-2 md:order-1">
              © {new Date().getFullYear()} Jania Mesquita. Todos os direitos reservados.
            </p>
            <p className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-[10px] md:text-xs text-[#8B7355] order-1 md:order-2">
              <span>CNPJ: 46.568.777/0001-58</span>
              <span className="hidden md:inline">|</span>
              <span>MM Mesquita Serviços de Administração LTDA</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
