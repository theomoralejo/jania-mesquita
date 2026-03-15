import React from 'react';
import { ArrowRight, Instagram, Linkedin, Facebook, Link as LinkIcon, Youtube, Users, Mic, ClipboardCheck } from 'lucide-react';

export default function LinksPage() {
  const links = [
    {
      icon: ClipboardCheck,
      title: 'Diagnóstico Gratuito',
      url: 'https://janiamesquita.com.br/avaliacao#/avaliacao',
      external: true
    },
    {
      icon: Users,
      title: 'Mentoria',
      url: '/mentoria',
      external: false
    },
    {
      icon: Mic,
      title: 'Palestra',
      url: '/palestras',
      external: false
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      url: 'https://www.linkedin.com/in/j%C3%A2nia-mesquita-51423a132/',
      external: true
    },
    {
      icon: LinkIcon,
      title: 'Website',
      url: 'https://janiamesquita.com.br',
      external: true
    },
    {
      icon: Facebook,
      title: 'Facebook',
      url: 'https://www.facebook.com/jania.mesquita.3',
      external: true
    },
    {
      icon: Youtube,
      title: 'YouTube',
      url: 'https://www.youtube.com/@janiamesquita',
      external: true
    }
  ];

  return (
    <main className="min-h-screen bg-[#F2EFE8] py-12 px-4 sm:px-6 flex justify-center items-start">
      <div className="w-full max-w-[480px] bg-white rounded-[24px] shadow-lg overflow-hidden mt-4 sm:mt-10">

        {/* Cover Image */}
        <div className="w-full h-56 sm:h-64 relative">
          <img
            src="/assets/img/jania_10.webp"
            alt="Jania Mesquita"
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Card Content */}
        <div className="px-6 py-8 sm:px-8">

          {/* Header Info (Optional, keeping it clean depending on screenshot) */}
          <div className="text-center mb-8 hidden">
            <h1 className="font-serif text-[32px] font-medium text-[#232323] mb-1">Jania Mesquita</h1>
            <p className="text-[#42331C] text-sm">Mentoria Executiva para Clínicas</p>
          </div>

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
                  className="group flex items-center bg-white border border-[#385443] rounded-[16px] p-2 pr-4 hover:bg-[#385443]/5 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-[#385443] rounded-[12px] flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>

                  <div className="flex-1 ml-4 text-left">
                    <span className="font-bold text-[17px] text-[#232323]">{link.title}</span>
                  </div>

                  <div className="flex items-center text-[#385443] text-sm font-semibold">
                    <span className="mr-2 hidden sm:inline-block">Saber mais</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </LinkComponent>
              );
            })}
          </div>

          {/* Footer Note */}
          <div className="text-center mt-12">
            <p className="text-sm text-[#42331C]/50 font-medium">
              © {new Date().getFullYear()} Jania Mesquita
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
