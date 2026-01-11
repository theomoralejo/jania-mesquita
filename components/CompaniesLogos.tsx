import imgFleury from "figma:asset/5a7f33ea681b6f9ec00711255fe25972ce2079ab.png";
import imgSirioLibanes from "figma:asset/103123d5f53230c40c1b2d0e2f3fedf32db0fe98.png";
import imgMaterDei from "figma:asset/b89e30551de791d01c8ec6e2b626e2f4f722b816.png";
import imgRedeDor from "figma:asset/76a5b2d61b1fce391e9d66688eadb75f03fc7e06.png";
import imgUnimed from "figma:asset/b07e35ef6cf22026a4df43b9e594e936d1a141e9.png";
import imgPreventSenior from "figma:asset/b652c07434bbd7fea0a18c245043c2351f26ef5b.png";
import imgNotreDame from "figma:asset/7cc991b358f403e7604b712d3b2b8fa4acabf50a.png";
import imgHapvida from "figma:asset/ddad1c317568798a3c8ad8d0cfca2e9467f361ea.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function CompaniesLogos() {
  const featuredLogos = [
    { name: 'Fleury', image: imgFleury },
    { name: 'Hospital Sírio-Libanês', image: imgSirioLibanes },
    { name: 'Mater Dei', image: imgMaterDei },
    { name: 'Rede D\'Or', image: imgRedeDor },
    { name: 'Unimed', image: imgUnimed },
    { name: 'Prevent Senior', image: imgPreventSenior },
    { name: 'NotreDame Intermédica', image: imgNotreDame },
    { name: 'Hapvida', image: imgHapvida }
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
          slidesToShow: 1,
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
          Empresas que confiam em nossa metodologia
        </p>
        
        {/* Featured Real Logos */}
        <div className="max-w-7xl mx-auto">
          <Slider {...settings} className="companies-slider">
            {featuredLogos.map((logo, index) => (
              <div key={index} className="px-2 md:px-4">
                <div className="group relative">
                  <div className="relative w-full h-[80px] md:h-[100px] flex items-center justify-center p-3 md:p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/80 shadow-sm hover:shadow-md hover:bg-white transition-all duration-300 hover:-translate-y-1 px-[12px] md:px-[16px] py-[6px]">
                    <img 
                      src={logo.image} 
                      alt={logo.name}
                      className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
            ))}
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