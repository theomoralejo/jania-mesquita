import { ExternalLink, Instagram, Linkedin, Mail, Youtube, BookOpen, Mic, GraduationCap, Calendar } from 'lucide-react';
import Logo from '../imports/Logo1';

export default function LinksPage() {
  const links = [
    {
      icon: GraduationCap,
      title: 'Mentoria Executiva',
      description: 'Transforme sua clínica com metodologia proprietária',
      url: '/mentoria',
      external: false
    },
    {
      icon: Mic,
      title: 'Palestras Personalizadas',
      description: 'Conteúdo estratégico para o seu evento',
      url: '/palestras',
      external: false
    },
    {
      icon: BookOpen,
      title: 'Acervo Digital',
      description: 'Artigos e materiais sobre gestão de clínicas',
      url: '/acervo',
      external: false
    },
    {
      icon: Calendar,
      title: 'Agende uma Conversa',
      description: 'Diagnóstico gratuito da sua operação',
      url: '/contato',
      external: false
    },
    {
      icon: Instagram,
      title: 'Instagram',
      description: '@janiamesquita',
      url: 'https://instagram.com/janiamesquita',
      external: true
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      description: 'Conecte-se no LinkedIn',
      url: 'https://linkedin.com/in/janiamesquita',
      external: true
    },
    {
      icon: Youtube,
      title: 'YouTube',
      description: 'Assista nossos conteúdos',
      url: 'https://youtube.com/@janiamesquita',
      external: true
    },
    {
      icon: Mail,
      title: 'E-mail',
      description: 'contato@janiamesquita.com.br',
      url: 'mailto:contato@janiamesquita.com.br',
      external: true
    }
  ];

  return (
    <main className="min-h-screen bg-[#F2EFE8] pt-24 pb-20">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-32 mx-auto mb-8">
            <Logo />
          </div>
          
          <h1 className="font-serif text-[42px] md:text-[52px] mb-6 leading-[1.05] tracking-tight text-[#232323]">
            Jania Mesquita
          </h1>
          
          <p className="text-lg leading-relaxed text-[#42331C] max-w-xl mx-auto mb-8">
            Mentoria Executiva para Transformação de Clínicas de Saúde
          </p>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <a 
              href="https://instagram.com/janiamesquita" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center border border-[#385443]/40 rounded-full hover:bg-[#385443] hover:text-white transition-all text-[#385443]"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://linkedin.com/in/janiamesquita" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center border border-[#385443]/40 rounded-full hover:bg-[#385443] hover:text-white transition-all text-[#385443]"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="https://youtube.com/@janiamesquita" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center border border-[#385443]/40 rounded-full hover:bg-[#385443] hover:text-white transition-all text-[#385443]"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>

          <div className="w-24 h-px bg-[#385443]/30 mx-auto"></div>
        </div>

        {/* Links Grid */}
        <div className="space-y-4">
          {links.map((link, index) => {
            const Icon = link.icon;
            const LinkComponent = link.external ? 'a' : 'a';
            const linkProps = link.external 
              ? { href: link.url, target: '_blank', rel: 'noopener noreferrer' }
              : { href: link.url };

            return (
              <LinkComponent
                key={index}
                {...linkProps}
                className="group block bg-white border border-[#385443]/20 rounded-[7px] p-6 hover:border-[#385443] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#385443]/5 group-hover:bg-[#385443] rounded-full flex items-center justify-center transition-colors duration-300">
                    <Icon className="w-6 h-6 text-[#385443] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-[#232323] group-hover:text-[#385443] transition-colors duration-300 mb-1">
                      {link.title}
                    </h3>
                    <p className="text-sm text-[#42331C]/70">
                      {link.description}
                    </p>
                  </div>
                  
                  {link.external && (
                    <ExternalLink className="w-4 h-4 text-[#385443]/40 group-hover:text-[#385443] group-hover:translate-x-1 transition-all duration-300" strokeWidth={2} />
                  )}
                </div>
              </LinkComponent>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-16">
          <p className="text-sm text-[#42331C]/60">
            © {new Date().getFullYear()} Jania Mesquita - Todos os direitos reservados
          </p>
        </div>
      </div>
    </main>
  );
}
