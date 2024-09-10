import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ropa2 from "../../img/2.png";

const Contacto = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <section className=" mx-auto">
        
        <div className="relative w-full">
    <img
      alt="NextUI hero Image with delay"
      src={ropa2}
      className="w-full h-auto max-h-[500px] object-cover"
    />

    {/* Título superpuesto sobre la imagen */}
    <div className="absolute inset-0 flex items-center justify-center">
      <h1 className="text-3xl font-bold text-white text-center shadow-lg bg-black bg-opacity-50 px-4 py-2 rounded-md">
        ¡Gracias por elegirnos🛍️!
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
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          {/* contenedor ubicacion e iframe */}
          <div className="lg:w-1/2 mt-5">
            {/* Titulo e icono */}
            <div className="flex justify-center">
              <FaLocationDot className="ms-7 mt-[0.30rem]" />
              <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
                Av. Avellaneda 3142, Cidudad. Autónoma de Buenos Aires
              </h2>
            </div>

            {/* iframe */}
            <div className="mt-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.080106118724!2d-58.474794!3d-34.62741589999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc99270b3f65b%3A0xa4947956d429b31c!2sAv.%20Avellaneda%203142%2C%20C1406%20FZQ%2C%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1725834705783!5m2!1ses!2sar"
                loading="lazy"
                className="w-full h-[400px] border-0"
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              />
            </div>
          </div>

          {/* FORMULARIO */}
          <div className="lg:w-1/2 p-8 mt-8 lg:mt-0">
            <form className="bg-slate-600 p-4 rounded-md">
              <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="firstName"
                  >
                    Nombre
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>

                <div>
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="lastName"
                  >
                    Apellido
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="consulta"
                  >
                    Consulta
                  </label>
                  <textarea
                    id="consulta"
                    rows="4"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                  Enviar
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
