import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import CardProductos from '../fragments/CardProductos';
import Carousel from '../helpers/Carousel';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ropa1 from '../../img/1.png';
import ropa2 from '../../img/2.png';
import ropa3 from '../../img/3.png';
import WhatsAppButton from '../common/WhatsAppButton';

const Inicio = () => {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Main Product Slider */}
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="rounded-lg shadow-xl overflow-hidden"
      >
        <SwiperSlide>
          <div className="relative">
            <img 
              src={ropa1} 
              alt="Colección de temporada" 
              className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover" 
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h2 className="text-white text-xl md:text-3xl font-bold">Nueva Colección Otoño/Invierno</h2>
              <p className="text-rosa text-sm md:text-lg">Descuentos especiales para mayoristas</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img 
              src={ropa2} 
              alt="Ofertas especiales" 
              className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover" 
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h2 className="text-white text-xl md:text-3xl font-bold">Ofertas Exclusivas Mayoristas</h2>
              <p className="text-lila text-sm md:text-lg">Pedidos mínimos con descuentos</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img 
              src={ropa3} 
              alt="Métodos de pago" 
              className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover" 
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h2 className="text-white text-xl md:text-3xl font-bold">Beneficios por Transferencia</h2>
              <p className="text-fucsia text-sm md:text-lg">30% de descuento en todo el catálogo</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Promotions Carousel */}
      <Carousel />

      {/* Featured Products */}
      <div className="px-2 sm:px-4 md:px-6">
        <h2 className="text-negroMate text-2xl md:text-3xl font-bold mb-4">Productos Destacados</h2>
        <CardProductos />
      </div>
      <WhatsAppButton />
    </div>
    
  );
};

export default Inicio;