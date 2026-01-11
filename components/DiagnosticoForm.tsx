import { useState } from 'react';
import { CheckCircle2, Calendar, Clock } from 'lucide-react';
import { FormInput, FormSelect, FormTextarea, FormButton, FormSuccessMessage } from './shared';

export function DiagnosticoForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    clinic: '',
    revenue: '',
    mainChallenge: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Diagnóstico solicitado:', formData);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const revenueOptions = [
    { value: '50-100k', label: 'R$ 50k - 100k' },
    { value: '100-300k', label: 'R$ 100k - 300k' },
    { value: '300-500k', label: 'R$ 300k - 500k' },
    { value: '500k+', label: 'Acima de R$ 500k' }
  ];

  return (
    <section id="diagnostico" className="py-12 md:py-24 bg-[rgb(255,255,255)] text-white relative overflow-hidden">
      {/* Geometric Accent */}
      <div className="absolute top-1/4 right-1/4 w-px h-96 bg-gradient-to-b from-transparent via-[#B6A689] to-transparent opacity-40"></div>

      <div className="max-w-[1218px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left Column - Info */}
          <div className="lg:col-span-2">
            <div className="inline-flex items-center gap-3 mb-6 md:mb-8">
              <div className="w-12 h-px bg-[#B6A689]"></div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#B6A689]">
                Diagnóstico Gratuito
              </span>
            </div>
            
            <h2 className="font-serif text-3xl md:text-[48px] mb-6 leading-[1.1] tracking-tight text-[#232323]">
              Descubra os <span className="italic text-[#385443]">gargalos</span> da sua operação
            </h2>
            
            <p className="text-base md:text-lg text-[#696969] leading-relaxed mb-8">
              Em uma sessão estratégica de 45 minutos, vamos mapear os principais desafios 
              da sua clínica e desenhar um plano de ação personalizado.
            </p>

            {/* O que está incluído */}
            <div className="space-y-6 mb-8 md:mb-10 pb-10 border-b border-[#6B5D47]/20">
              <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#B6A689] mb-4">
                O que você recebe:
              </div>
              {[
                'Análise completa da sua operação',
                'Identificação de gargalos críticos',
                'Plano de ação preliminar',
                'Recomendação de próximos passos'
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#385443]" strokeWidth={1.5} />
                  <span className="text-[#414141]">{item}</span>
                </div>
              ))}
            </div>

            {/* Detalhes */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-[#696969]">
                <Clock className="w-5 h-5 text-[#B6A689]" strokeWidth={1.5} />
                <span className="">45 minutos via videochamada</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#696969]">
                <Calendar className="w-5 h-5 text-[#B6A689]" strokeWidth={1.5} />
                <span className="">Retorno em até 48h úteis</span>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-3 bg-[#F2EFE8] rounded-[10px] border border-[#DFDCD4]">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    label="Nome Completo"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Seu nome"
                  />

                  <FormInput
                    label="E-mail Profissional"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    label="Telefone/WhatsApp"
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(00) 00000-0000"
                  />

                  <FormInput
                    label="Nome da Clínica"
                    type="text"
                    name="clinic"
                    required
                    value={formData.clinic}
                    onChange={handleChange}
                    placeholder="Nome da sua clínica"
                  />
                </div>

                <FormSelect
                  label="Faturamento Mensal Aproximado"
                  name="revenue"
                  required
                  value={formData.revenue}
                  onChange={handleChange}
                  options={revenueOptions}
                />

                <FormTextarea
                  label="Qual seu principal desafio hoje?"
                  name="mainChallenge"
                  value={formData.mainChallenge}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Ex: Dependência do fundador, falta de processos, dificuldade em escalar..."
                />

                <div className="pt-4">
                  <FormButton type="submit">
                    Agendar Diagnóstico Gratuito
                  </FormButton>
                </div>

                <p className="text-xs text-center text-[#385443]/70 pt-2">
                  Ao enviar, você concorda com nossa{' '}
                  <a href="/privacidade" className="underline hover:text-[#385443]">política de privacidade</a>
                </p>
              </form>
            ) : (
              <FormSuccessMessage
                title="Solicitação Recebida!"
                message="Nossa equipe entrará em contato em até 48h úteis para agendar seu diagnóstico estratégico."
                email={formData.email}
                onReset={() => setSubmitted(false)}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}