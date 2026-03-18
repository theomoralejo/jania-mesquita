import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export function AvaliacaoCTA() {
  const benefits = [
    '5 perguntas rápidas sobre sua operação',
    'Diagnóstico personalizado em minutos',
    'Identificação do nível de maturidade',
    'Recomendações práticas para evolução'
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#385443] to-[#4a6655] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10 px-6 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
              <ClipboardCheck className="w-4 h-4" />
              <span className="text-xs tracking-[0.1em] font-medium uppercase">
                Diagnóstico Gratuito
              </span>
            </div>

            <h2 className="text-4xl text-white/90  md:text-5xl font-serif mb-6 leading-tight">
              Descubra em que Nível
              <br />
              <span className="text-[#B6CBBE]">está sua Clínica</span>
            </h2>

            <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed">
              Responda nosso questionário de maturidade operacional e receba um
              diagnóstico personalizado sobre a governança e escalabilidade da sua operação.
            </p>

            <div className="space-y-3 mb-10">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#B6CBBE] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-white/90">{benefit}</span>
                </div>
              ))}
            </div>

            <Link
              to="/avaliacao"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#385443] rounded-lg font-bold hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <span>Iniciar Avaliação Gratuita</span>
              <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
            </Link>

            <p className="mt-4 text-sm text-white/60">
              Sem custo. Sem compromisso. Resultado imediato.
            </p>
          </div>

          {/* Right Column - Visual Element */}
          <div className="mt-12 lg:mt-0 block">
            <div className="relative">
              {/* Card Stack Visual */}
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl transform rotate-3"></div>
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl transform -rotate-2"></div>
                <div className="relative bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-8">
                  <div className="space-y-6">
                    {/* Fake Quiz Preview */}
                    <div className="space-y-3">
                      <div className="h-3 bg-white/40 rounded-full w-3/4"></div>
                      <div className="h-3 bg-white/30 rounded-full w-full"></div>
                      <div className="h-3 bg-white/30 rounded-full w-5/6"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="h-16 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg flex items-center justify-center"
                        >
                          <div className="text-white font-serif text-2xl">{i}</div>
                        </div>
                      ))}
                    </div>

                    <div className="h-12 bg-[#B6CBBE]/50 backdrop-blur-sm border border-white/30 rounded-lg flex items-center justify-center">
                      <div className="flex items-center gap-2 text-white font-medium">
                        <span>Ver Resultado</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-white text-[#385443] px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                5 min
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
