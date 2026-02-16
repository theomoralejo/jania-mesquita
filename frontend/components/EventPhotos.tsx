import React from 'react';

import { ImageWithFallback } from './figma/ImageWithFallback';
// Figma imports commented out - using placeholders
const janiaPhoto1 = '/assets/img/jania_4.webp';
const janiaPhoto2 = '/assets/img/jania_12.webp';
const janiaPhoto3 = '/assets/img/jania_10.webp';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function EventPhotos() {
  const photos = [
    {
      src: janiaPhoto1,
      alt: "Jania Mesquita em palestra corporativa"
    },
    {
      src: janiaPhoto2,
      alt: "Sessão de mentoria estratégica"
    },
    {
      src: janiaPhoto3,
      alt: "Workshop de transformação médica"
    }
  ];

  // Re-evaluating infinite for 3 items with 1.5 view. 
  // If infinite=false, we see 1.5, then scroll to see the rest.
  
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1.25, // 1.25 or 1.5 depending on how "1 e meia" interprets. usually 1.5
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          infinite: false,
          dots: true
        }
      }
    ]
  };

  return (
    <section className="py-12 md:section-padding bg-[#F5F3F0] overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-8 md:mb-[50px] mt-[0px] mr-[0px] ml-[0px]">
          <h2 className="font-serif text-3xl md:text-5xl mb-4 md:mb-6 text-[#232323]">Janía em Ação</h2>
          <p className="text-base md:text-xl text-[#696969]">Momentos de transformação e aprendizado</p>
        </div>
        
        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <div key={index} className="aspect-[3/4] rounded-[7px] overflow-hidden border border-[#385443]/10 group relative">
              <div className="absolute inset-0 bg-[#385443]/5 group-hover:bg-transparent transition-all duration-500 z-10" />
              <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-700">
                <ImageWithFallback 
                  src={photo.src} 
                  alt={photo.alt}
                  className={`w-full h-full object-cover ${index === 1 ? 'object-top' : ''}`}
                  style={index === 0 ? { objectPosition: 'center 20%' } : undefined}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden -mr-6"> {/* Negative margin to allow slider to touch right edge */}
          <Slider {...sliderSettings} className="event-photos-slider">
            {photos.map((photo, index) => (
              <div key={index} className="pr-4"> {/* Padding right to create gap between slides */}
                <div className="aspect-[3/4] rounded-[7px] overflow-hidden border border-[#385443]/10 relative">
                   {/* Removed hover effects for mobile as they are less relevant */}
                  <div className="w-full h-full">
                    <ImageWithFallback 
                      src={photo.src} 
                      alt={photo.alt}
                      className={`w-full h-full object-cover ${index === 1 ? 'object-top' : ''}`}
                      style={index === 0 ? { objectPosition: 'center 20%' } : undefined}
                    />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <style>{`
        .event-photos-slider .slick-dots {
          bottom: -25px;
        }
        .event-photos-slider .slick-dots li button:before {
          color: #B6A689;
          font-size: 8px;
        }
        .event-photos-slider .slick-dots li.slick-active button:before {
          color: #42331C;
        }
      `}</style>
    </section>
  );
}