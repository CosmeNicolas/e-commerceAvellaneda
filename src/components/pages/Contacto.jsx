import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ropa2 from "../../img/2.png";
import { FaRegHeart } from "react-icons/fa6";

const Contacto = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <section className=" mx-auto">
      {/* Fondo sólido en lugar de imagen */}
      {/* Título centrado con márgenes seguros */}
      <div className="flex justify-center items-center p-4">
        <div className="bg-blanco dark:bg-gray-600 rounded-lg px-6 py-4 flex ">
        
          <h1 className="text-3xl md:text-4xl text-center text-gray-800 dark:text-white font-">
            ¡Gracias por elegirnos!🩷 
          </h1>
         
      
        </div>
      </div>

      {/* Flex container que cambia de columna a fila en dispositivos más grandes */}
      <motion.div
        ref={ref1}
        initial="hidden"
        animate={inView1 ? "visible" : "hidden"}
        variants={cardVariants}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex flex-col lg:flex-row lg:space-x-8 lg:items-start">
          {/* contenedor ubicacion e iframe */}
          <div className="lg:w-1/2 mt-5 lg:mt-8 lg:ps-8">
            {/* Titulo e icono */}
            <div className="flex justify-center lg:justify-start items-center space-x-3 bg-negroMate/80 backdrop-blur-sm p-4 rounded-lg border border-lila/20 shadow-inner">
              <FaLocationDot className="text-rosa text-xl" />
              <h2 className="text-lg font-semibold bg-gradient-to-r from-rosa to-fucsia bg-clip-text text-transparent">
                Av. Avellaneda 3142, Ciudad Autónoma de Buenos Aires
              </h2>
            </div>

            {/* iframe */}
            <div className="mt-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.080106118724!2d-58.474794!3d-34.62741589999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc99270b3f65b%3A0xa4947956d429b31c!2sAv.%20Avellaneda%203142%2C%20C1406%20FZQ%2C%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1725834705783!5m2!1ses!2sar"
                loading="lazy"
                className="w-full h-[400px] border-0 "
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              />
            </div>
          </div>

          {/* FORMULARIO */}
          <div className="lg:w-1/2 p-8 mt-8 lg:mt-8">
            {" "}
            {/* Mismo mt-8 en desktop */}
            <form className="bg-negroMate p-6 rounded-lg shadow-xl">
              <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                {/* Campos del formulario */}
                <div>
                  <label
                    className="block text-rosa font-medium"
                    htmlFor="firstName"
                  >
                    Nombre
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    className="block w-full px-4 py-3 mt-2 text-gray-800 bg-white border  rounded-lg focus:border-fucsia focus:ring-2 focus:ring-rosa focus:ring-opacity-50 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label
                    className="block text-rosa font-medium"
                    htmlFor="lastName"
                  >
                    Apellido
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    className="block w-full px-4 py-3 mt-2 text-gray-800 bg-white border  rounded-lg focus:border-fucsia focus:ring-2 focus:ring-rosa focus:ring-opacity-50 focus:outline-none transition-all"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    className="block text-rosa font-medium"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="block w-full px-4 py-3 mt-2 text-gray-800 bg-white border  rounded-lg focus:border-fucsia focus:ring-2 focus:ring-rosa focus:ring-opacity-50 focus:outline-none transition-all"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    className="block text-rosa font-medium"
                    htmlFor="consulta"
                  >
                    Consulta
                  </label>
                  <textarea
                    id="consulta"
                    rows="4"
                    className="block w-full px-4 py-3 mt-2 text-gray-800 bg-white border border-lila rounded-lg focus:border-fucsia focus:ring-2 focus:ring-rosa focus:ring-opacity-50 focus:outline-none transition-all"
                  ></textarea>
                </div>
              </div>

              {/* Botón de enviar */}
              <div className="flex justify-end mt-8">
                <button className="px-8 py-3 font-bold text-white bg-gradient-to-r from-fucsia to-rosa rounded-lg hover:from-rosa hover:to-lila transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-rosa focus:ring-opacity-50 shadow-lg">
                  Enviar Consulta
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contacto;
