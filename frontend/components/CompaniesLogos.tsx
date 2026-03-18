import React from 'react';

// Import logo components
import FleuryLogo from '../imports/Fleury321';
import SirioLibanesLogo from '../imports/HospitalSirioLibanesSeeklogo1';
import MaterDeiLogo from '../imports/Hmd001621CLogoMaterDeiRedeDeSaudeHRgb1';
import RedeDorLogo from '../imports/LogoRedeDor213315941';
import UnimedLogo from '../imports/Unimed221';
import HapvidaLogo from '../imports/Hapvida';
import PreventSeniorLogo from '../imports/PreventSenior';
import NotreDameLogo from '../imports/NotreName';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function CompaniesLogos() {
  const featuredLogos = [
    { name: 'Fleury', component: FleuryLogo },
    { name: 'Hospital Sírio-Libanês', component: SirioLibanesLogo },
    { name: 'Mater Dei', component: MaterDeiLogo },
    { name: 'Rede D\'Or', component: RedeDorLogo },
    { name: 'Unimed', component: UnimedLogo },
    { name: 'Hapvida', component: HapvidaLogo },
    { name: 'Prevent Senior', component: PreventSeniorLogo },
    { name: 'Notre Dame', component: NotreDameLogo }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false
        }
      }
    ]
  };

  return (
    <section className="py-8 md:py-[64px] border-y border-[#DFDCD4] bg-[#F2EFE8] overflow-hidden px-4 md:px-[20px]">
      <div className="container-custom">
        <p className="text-center text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-[#B6A689] mb-6 md:mb-12">
          Clínicas que confiam na metodologia
        </p>
        
        {/* Featured Real Logos */}
        <div className="max-w-7xl mx-auto">
          <Slider {...settings} className="companies-slider">
            {featuredLogos.map((logo, index) => {
              const LogoComponent = logo.component;
              return (
                <div key={index} className="px-2 md:px-4">
                  <div className="group relative">
                    <div className="relative w-full h-[80px] md:h-[100px] flex items-center justify-center p-3 md:p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/80 shadow-sm hover:shadow-md hover:bg-white transition-all duration-300 hover:-translate-y-1 px-[12px] md:px-[16px] py-[6px] overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 [&>div]:max-h-[50px] [&>div]:max-w-[140px] [&>div]:md:max-h-[65px] [&>div]:md:max-w-[170px] [&_img]:max-h-[50px] [&_img]:md:max-h-[65px] [&_img]:w-auto">
                        <LogoComponent />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
      <style>{`
        .companies-slider .slick-dots li button:before {
          color: #B6A689;
        }
        .companies-slider .slick-dots li.slick-active button:before {
          color: #42331C;
        }
      `}</style>
    </section>
  );
}