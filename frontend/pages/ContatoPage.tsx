import React from 'react';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle2 } from 'lucide-react';

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contato enviado:', formData);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="section-padding bg-[#42331C] text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-6xl mb-6 text-white">Entre em Contato</h1>
            <p className="text-xl text-gray-300">
              Estamos aqui para ajudar na transformação da sua clínica. Escolha a melhor forma de começarmos esta jornada juntos.
            </p>
          </div>
        </div>
      </section>

      {/* Contato Info + Form */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Informações de Contato */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-2xl mb-8 text-[#42331C]">Informações</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#42331C] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">E-mail</div>
                      <a href="mailto:contato@janiamesquita.com.br" className="text-[#42331C] hover:text-gray-600 transition-colors">
                        contato@janiamesquita.com.br
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#42331C] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Telefone</div>
                      <a href="tel:+5511999999999" className="text-[#42331C] hover:text-gray-600 transition-colors">
                        +55 (11) 99999-9999
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#42331C] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Localização</div>
                      <p className="text-[#42331C]">São Paulo, SP<br />Brasil</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#42331C] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Horário</div>
                      <p className="text-[#42331C]">Seg - Sex: 9h às 18h</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                <h3 className="text-lg mb-3 text-[#42331C]">Tempo de Resposta</h3>
                <p className="text-gray-600 text-sm">
                  Respondemos todas as mensagens em até 48 horas úteis. Para assuntos urgentes, utilize nosso WhatsApp.
                </p>
              </div>
            </div>

            {/* Formulário */}
            <div className="lg:col-span-2">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="bg-white border-2 border-gray-200 rounded-2xl p-8">
                  <h2 className="text-3xl mb-8 text-[#42331C]">Envie sua Mensagem</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm mb-2 text-[#42331C]">Nome Completo *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                        placeholder="João Silva"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm mb-2 text-[#42331C]">E-mail *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                        placeholder="joao@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm mb-2 text-[#42331C]">Telefone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm mb-2 text-[#42331C]">Assunto *</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                      >
                        <option value="">Selecione...</option>
                        <option value="mentoria">Mentoria Executiva</option>
                        <option value="palestras">Palestras</option>
                        <option value="acervo">Acervo Digital</option>
                        <option value="parcerias">Parcerias</option>
                        <option value="outros">Outros Assuntos</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm mb-2 text-[#42331C]">Mensagem *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors resize-none"
                      placeholder="Conte-nos sobre seu desafio ou interesse..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#42331C] text-white py-4 rounded-xl hover:bg-gray-900 transition-all flex items-center justify-center gap-2 group"
                  >
                    Enviar Mensagem
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                  </button>
                </form>
              ) : (
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-12 text-center">
                  <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-6" strokeWidth={1.5} />
                  <h3 className="text-3xl mb-4 text-[#42331C]">Mensagem Enviada!</h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    Obrigado pelo contato, {formData.name}. Recebemos sua mensagem e responderemos em até 48 horas úteis.
                  </p>
                  <p className="text-sm text-gray-500">
                    Confirmação enviada para {formData.email}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}