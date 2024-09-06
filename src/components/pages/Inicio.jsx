import React from 'react';
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import CardProductos from '../fragments/CardProductos';
import Carousel from '../helpers/Carousel';
/* import {Divider} from "@nextui-org/react"; */
// Importa los estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ropa1 from '../../img/1.png';
import ropa2 from '../../img/2.png';
import ropa3 from '../../img/3.png';

const Inicio = () => {
  return (
    <>
    <Swiper
      // Instala los módulos de Swiper
      modules={[Navigation, Pagination, Scrollbar, Autoplay]}
      spaceBetween={50}
      slidesPerView={1} // Cambia a 1 slide por vista
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      autoplay={{
        delay: 5000, // Tiempo en milisegundos entre cambios de slide
        disableOnInteraction: false, // No detener la reproducción automática al interactuar
      }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide className='bg-black'>
        <img src={ropa1} alt="Ropa 1" className="w-full h-[300px] object-cover" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={ropa2} alt="Ropa 2" className="w-full h-[300px] object-cover" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={ropa3} alt="Ropa 3" className="w-full h-[300px] object-cover" />
      </SwiperSlide>
  
    </Swiper>
   <Carousel></Carousel>
   {/*  <Divider className="my-4" /> */}
    <CardProductos></CardProductos>
    </>
  );
};

export default Inicio;
