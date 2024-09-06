import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Cambia la velocidad de cambio
    arrows: false, // Oculta las flechas de navegación si no las necesitas
    dots: true, // Muestra los puntos de navegación si los necesitas
  };

  return (
    <Slider {...settings}>
      <div>
        <h1 className='text-center  text-2xl bg-negroMate text-white font-sans'>20% OFF</h1>
      </div>
      <div>
        <h1 className='text-center  text-2xl bg-negroMate text-white font-sans'>50% OFF</h1>
      </div>
      <div>
        <h1 className='text-center  text-2xl bg-negroMate text-white font-sans'>70% OFF</h1>
      </div>
      {/* Agrega más slides si es necesario */}
    </Slider>
  );
}

export default Carousel;
