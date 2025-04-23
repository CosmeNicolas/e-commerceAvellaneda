import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion';

const Carousel = () => {
  const settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    dots: true,
    pauseOnHover: true,
    cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    customPaging: i => (
      <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-rosa opacity-50 transition-all duration-300 hover:opacity-100" />
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          dots: true,
          speed: 600
        }
      },
      {
        breakpoint: 480,
        settings: {
          dots: true,
          speed: 500
        }
      }
    ]
  };

  const promotions = [
    {
      title: "20% OFF en Camperas",
      subtitle: "Colección Premium Otoño/Invierno 2025",
      bgColor: "bg-negroMate",
      textColor: "text-rosa",
      highlightColor: "text-lila",
      cta: "Ver colección",
      highlightWords: ["20%"]
    },
    {
      title: "50% DESCUENTO MAYORISTAS",
      subtitle: "Pedidos superiores a 10 unidades",
      bgColor: "bg-fucsia",
      textColor: "text-blanco",
      highlightColor: "text-negroMate",
      cta: "Solicitar catálogo",
      highlightWords: ["50%", "MAYORISTAS"]
    },
    {
      title: "30% BONIFICACIÓN",
      subtitle: "Pago por transferencia bancaria",
      bgColor: "bg-lila",
      textColor: "text-negroMate",
      highlightColor: "text-fucsia",
      cta: "Ver condiciones",
      highlightWords: ["30%"]
    },
  ];

  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      } 
    }
  };

  return (
    <div className="relative overflow-hidden rounded-lg md:rounded-xl shadow-lg md:shadow-2xl my-3 md:my-6 mx-2 sm:mx-4 lg:mx-0">
      <Slider {...settings}>
        {promotions.map((promo, index) => (
          <div 
            key={index} 
            className={`${promo.bgColor} p-4 sm:p-6 md:p-8 lg:p-12 h-52 sm:h-64 md:h-80 lg:h-96 flex flex-col justify-center items-center relative overflow-hidden`}
          >
            {/* Responsive background elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-1/4 -left-10 sm:-left-16 w-20 sm:w-32 h-20 sm:h-32 rounded-full bg-lila mix-blend-overlay"></div>
              <div className="absolute bottom-1/4 -right-10 sm:-right-16 w-24 sm:w-40 h-24 sm:h-40 rounded-full bg-fucsia mix-blend-overlay"></div>
            </div>

            <motion.div 
              className="text-center max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto relative z-10 px-2 sm:px-0"
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              <motion.h1 
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold sm:font-extrabold mb-2 sm:mb-3 md:mb-4 ${promo.textColor} font-sans leading-snug sm:leading-tight`}
                transition={{ staggerChildren: 0.05 }}
              >
                {promo.title.split(' ').map((word, i) => (
                  <motion.span 
                    key={i} 
                    className={`inline-block mr-1 sm:mr-2 ${promo.highlightWords.includes(word) ? promo.highlightColor : ''}`}
                    variants={textVariants}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>
              
              <motion.p 
                className={`text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl ${promo.textColor} opacity-95 mb-4 sm:mb-5 md:mb-6 lg:mb-8 max-w-xs sm:max-w-md md:max-w-lg mx-auto`}
                variants={textVariants}
              >
                {promo.subtitle}
              </motion.p>
              
              <motion.button 
                className={`mt-2 sm:mt-3 md:mt-4 lg:mt-6 px-4 sm:px-6 md:px-8 lg:px-10 py-2 sm:py-3 md:py-4 rounded-full font-semibold sm:font-bold text-xs sm:text-sm md:text-base lg:text-lg ${promo.highlightColor} bg-white hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 sm:hover:-translate-y-1`}
                variants={textVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {promo.cta}
              </motion.button>
            </motion.div>
          </div>
        ))}
      </Slider>

      {/* Custom dots styling */}
      <style jsx>{`
        :global(.slick-dots) {
          bottom: 12px !important;
        }
        :global(.slick-dots li) {
          margin: 0 4px;
          width: auto;
          height: auto;
        }
        :global(.slick-dots li button:before) {
          display: none;
        }
        :global(.slick-dots li.slick-active div) {
          background-color: #E966A0 !important;
          opacity: 1 !important;
          transform: scale(1.15);
        }
        @media (min-width: 640px) {
          :global(.slick-dots) {
            bottom: 16px !important;
          }
        }
        @media (min-width: 768px) {
          :global(.slick-dots) {
            bottom: 20px !important;
          }
          :global(.slick-dots li) {
            margin: 0 6px;
          }
        }
        @media (min-width: 1024px) {
          :global(.slick-dots) {
            bottom: 24px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Carousel;