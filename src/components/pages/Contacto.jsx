import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import { Button } from "@nextui-org/react";

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    mensaje: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { nombre, apellido, email, mensaje } = formData;

    if (!nombre || !apellido || !email || !mensaje) {
      setLoading(false);
      return Swal.fire({
        title: "Error",
        text: "Todos los campos son obligatorios",
        icon: "error",
        background: "#191825",
        color: "#FAF1E6",
        confirmButtonColor: "#E966A0",
        iconColor: "#FB2576",
      });
    }

    try {
      const res = await clienteAxios.post("/contacto/enviar-consulta", formData);
      if (res.status === 200) {
        Swal.fire({
          title: "¡Gracias!",
          text: "Tu mensaje fue enviado con éxito",
          icon: "success",
          background: "#191825",
          color: "#FAF1E6",
          confirmButtonColor: "#E966A0",
          iconColor: "#FB2576",
        });
        setFormData({ nombre: "", apellido: "", email: "", mensaje: "" });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al enviar tu mensaje",
        icon: "error",
        background: "#191825",
        color: "#FAF1E6",
        confirmButtonColor: "#E966A0",
        iconColor: "#FB2576",
      });
    } finally {
      setLoading(false);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="mx-auto">
      <div className="flex justify-center items-center p-4">
        <div className="bg-blanco dark:bg-gray-600 rounded-lg px-6 py-4 flex">
          <h1 className="text-3xl md:text-4xl text-center text-gray-800 dark:text-white">
            ¡Gracias por elegirnos!🩷
          </h1>
        </div>
      </div>

      <motion.div
        ref={ref1}
        initial="hidden"
        animate={inView1 ? "visible" : "hidden"}
        variants={cardVariants}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex flex-col lg:flex-row lg:space-x-8 lg:items-start">
          <div className="lg:w-1/2 mt-5 lg:mt-8 lg:ps-8">
            <div className="flex justify-center lg:justify-start items-center space-x-3 bg-negroMate/80 backdrop-blur-sm p-4 rounded-lg border border-lila/20 shadow-inner">
              <FaLocationDot className="text-rosa text-xl" />
              <h2 className="text-lg font-semibold bg-gradient-to-r from-rosa to-fucsia bg-clip-text text-transparent">
                Av. Avellaneda 3142, Ciudad Autónoma de Buenos Aires
              </h2>
            </div>

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

          <div className="lg:w-1/2 p-8 mt-8 lg:mt-8">
            <form
              className="bg-negroMate p-6 rounded-lg shadow-xl"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                  <label className="block text-rosa font-medium" htmlFor="nombre">
                    Nombre
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 mt-2 text-gray-800 bg-white border rounded-lg focus:border-fucsia focus:ring-2 focus:ring-rosa focus:ring-opacity-50 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-rosa font-medium" htmlFor="apellido">
                    Apellido
                  </label>
                  <input
                    id="apellido"
                    name="apellido"
                    type="text"
                    value={formData.apellido}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 mt-2 text-gray-800 bg-white border rounded-lg focus:border-fucsia focus:ring-2 focus:ring-rosa focus:ring-opacity-50 focus:outline-none transition-all"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-rosa font-medium" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 mt-2 text-gray-800 bg-white border rounded-lg focus:border-fucsia focus:ring-2 focus:ring-rosa focus:ring-opacity-50 focus:outline-none transition-all"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-rosa font-medium" htmlFor="mensaje">
                    Consulta
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows="4"
                    value={formData.mensaje}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 mt-2 text-gray-800 bg-white border border-lila rounded-lg focus:border-fucsia focus:ring-2 focus:ring-rosa focus:ring-opacity-50 focus:outline-none transition-all"
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <Button
                  type="submit"
                  isLoading={loading}
                  color="danger"
                  className="bg-gradient-to-r from-fucsia to-rosa hover:from-rosa hover:to-lila text-white font-bold rounded-lg shadow-lg px-8 py-3"
                >
                  {loading ? "Enviando..." : "Enviar Consulta"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contacto;
