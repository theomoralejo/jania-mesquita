import { Shield, Lock, Eye, Database, UserCheck, FileText, Mail } from 'lucide-react';

export default function PrivacidadePage() {
  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="section-padding bg-black text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" strokeWidth={1.5} />
              </div>
              <h1 className="text-6xl text-white">Política de Privacidade</h1>
            </div>
            <p className="text-xl text-gray-300">
              Última atualização: 11 de dezembro de 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Intro */}
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
              <p className="text-lg text-gray-600 leading-relaxed">
                A <strong>Jania Mesquita Consultoria</strong> está comprometida em proteger a privacidade e os dados pessoais de nossos clientes, prospects e visitantes do site. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018).
              </p>
            </div>

            {/* Section 1 */}
            <div>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Database className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-3xl mb-3 text-black">1. Dados Coletados</h2>
                  <p className="text-gray-600 mb-4">Coletamos as seguintes categorias de dados pessoais:</p>
                </div>
              </div>
              
              <div className="pl-16 space-y-4">
                <div className="border-l-2 border-gray-200 pl-6">
                  <h3 className="text-xl mb-2 text-black">Dados de Identificação</h3>
                  <p className="text-gray-600">Nome completo, CPF/CNPJ, data de nascimento, cargo/função.</p>
                </div>
                <div className="border-l-2 border-gray-200 pl-6">
                  <h3 className="text-xl mb-2 text-black">Dados de Contato</h3>
                  <p className="text-gray-600">E-mail, telefone, endereço comercial.</p>
                </div>
                <div className="border-l-2 border-gray-200 pl-6">
                  <h3 className="text-xl mb-2 text-black">Dados Profissionais</h3>
                  <p className="text-gray-600">Nome da clínica, especialidade médica, faturamento, número de funcionários.</p>
                </div>
                <div className="border-l-2 border-gray-200 pl-6">
                  <h3 className="text-xl mb-2 text-black">Dados de Navegação</h3>
                  <p className="text-gray-600">Endereço IP, tipo de navegador, páginas visitadas, tempo de permanência.</p>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-3xl mb-3 text-black">2. Finalidade do Tratamento</h2>
                  <p className="text-gray-600 mb-4">Utilizamos seus dados para:</p>
                </div>
              </div>
              
              <div className="pl-16 space-y-3 text-gray-600">
                <p className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  <span>Processar sua aplicação para a Mentoria Executiva</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  <span>Realizar diagnóstico estratégico da sua clínica</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  <span>Enviar materiais educacionais e conteúdo do acervo digital</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  <span>Comunicar informações sobre eventos, palestras e novos produtos</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  <span>Melhorar a experiência do usuário em nosso site</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  <span>Cumprir obrigações legais e regulatórias</span>
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-3xl mb-3 text-black">3. Segurança dos Dados</h2>
                  <p className="text-gray-600">Implementamos medidas técnicas e administrativas para proteger seus dados:</p>
                </div>
              </div>
              
              <div className="pl-16 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <p className="text-black">Criptografia SSL/TLS</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <p className="text-black">Controle de acesso restrito</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <p className="text-black">Backups regulares</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <p className="text-black">Monitoramento contínuo</p>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center flex-shrink-0">
                  <UserCheck className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-3xl mb-3 text-black">4. Seus Direitos</h2>
                  <p className="text-gray-600 mb-4">De acordo com a LGPD, você tem direito a:</p>
                </div>
              </div>
              
              <div className="pl-16 space-y-3 text-gray-600">
                <p className="flex items-start gap-3">
                  <span className="text-black flex-shrink-0">✓</span>
                  <span>Confirmar a existência de tratamento de seus dados</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-black flex-shrink-0">✓</span>
                  <span>Acessar seus dados pessoais</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-black flex-shrink-0">✓</span>
                  <span>Corrigir dados incompletos, inexatos ou desatualizados</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-black flex-shrink-0">✓</span>
                  <span>Solicitar a anonimização, bloqueio ou eliminação de dados</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-black flex-shrink-0">✓</span>
                  <span>Revogar o consentimento a qualquer momento</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-black flex-shrink-0">✓</span>
                  <span>Obter informações sobre compartilhamento de dados</span>
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <div>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-3xl mb-3 text-black">5. Compartilhamento de Dados</h2>
                  <p className="text-gray-600">Seus dados podem ser compartilhados apenas com:</p>
                </div>
              </div>
              
              <div className="pl-16 space-y-3 text-gray-600">
                <p className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  <span>Prestadores de serviços essenciais (plataforma de e-mail, CRM, pagamentos)</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  <span>Autoridades governamentais quando exigido por lei</span>
                </p>
              </div>
              
              <div className="pl-16 mt-4 bg-yellow-50 border border-yellow-200 p-6 rounded-xl">
                <p className="text-gray-600">
                  <strong className="text-black">Importante:</strong> Não vendemos, alugamos ou compartilhamos seus dados pessoais para fins comerciais de terceiros.
                </p>
              </div>
            </div>

            {/* Section 6 */}
            <div>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-3xl mb-3 text-black">6. Contato do Encarregado (DPO)</h2>
                  <p className="text-gray-600">Para exercer seus direitos ou esclarecer dúvidas sobre esta política:</p>
                </div>
              </div>
              
              <div className="pl-16 bg-black text-white p-8 rounded-2xl">
                <div className="space-y-3">
                  <p><strong>E-mail:</strong> privacidade@janiamesquita.com.br</p>
                  <p><strong>Telefone:</strong> +55 (11) 99999-9999</p>
                  <p className="text-sm text-gray-300 pt-4 border-t border-white/10">
                    Responderemos sua solicitação em até 15 dias corridos.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Info */}
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
              <h3 className="text-xl mb-4 text-black">Alterações nesta Política</h3>
              <p className="text-gray-600 mb-4">
                Podemos atualizar esta Política de Privacidade periodicamente. Alterações significativas serão comunicadas por e-mail ou através de aviso destacado em nosso site.
              </p>
              <p className="text-sm text-gray-500">
                Recomendamos que você revise esta página regularmente para se manter informado sobre como protegemos seus dados.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}