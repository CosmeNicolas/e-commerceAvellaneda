import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import HashLoader from "react-spinners/HashLoader";

const CardProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const axiosProductos = async () => {
    try {
      setLoading(true);
      const url = `${import.meta.env.VITE_URL_BACK_LOCAL}/api/productos`;
      console.log(url)
      const resultado = await axios.get(url);
      const productosRecibidos = resultado.data.productos || resultado.data || [];
      setProductos(productosRecibidos);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      setProductos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    axiosProductos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <HashLoader color="#E966A0" size={80} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 ">
      <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productos.map((producto) => (
          <motion.div
            key={producto._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col group">
              {/* Imagen del producto */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={producto.imagen}
                  alt={producto.nombreProducto}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay sutil */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>

              {/* Contenido de la card */}
              <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-rosa transition-colors">
                  {producto.nombreProducto}
                </h3>
                <p className="text-gray-600 mt-2 line-clamp-2 flex-grow">
                  {producto.descripcion}
                </p>

                {/* Precio y botón */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-2xl font-bold text-fucsia">${producto.precio}</span>
                  <Link
                    to={`/detalleProducto/${producto._id}`}
                    className="px-4 py-2 bg-gradient-to-r from-rosa to-fucsia text-white rounded-lg hover:from-fucsia hover:to-rosa transition-all duration-300 shadow hover:shadow-md"
                  >
                    Ver detalles
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CardProductos;