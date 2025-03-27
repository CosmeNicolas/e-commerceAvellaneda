/* import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import HashLoader from "react-spinners/HashLoader";

const CardProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controlar el loading

  const axiosProductos = async () => {
    try {
      setLoading(true); // Activar loading al iniciar la petición
      const resultado = await axios.get('http://localhost:3001/api/productos');
      console.log("Datos recibidos:", resultado.data);
      setProductos(resultado.data.productos);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    } finally {
      setLoading(false); // Desactivar loading cuando termine la petición
    }
  };

  useEffect(() => {
    axiosProductos();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 }
  };

  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.2 });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <HashLoader color="#3B82F6" size={80} />
      </div>
    );
  }

  return (
    <div className="container mx-auto flex justify-center min-h-screen px-4 bg-cover bg-center">
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {productos.map((producto) => (
          <motion.div
            key={producto._id}
            ref={ref1}
            initial="hidden"
            animate={inView1 ? "visible" : "hidden"}
            variants={cardVariants}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Card className="p-2 h-[350px] sm:h-[400px] lg:h-[450px] m-2" shadow="sm" isPressable>
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={producto.nombreProducto}
                  className="w-full object-cover h-[140px]"
                  src={producto.imagen}
                />
                <p className="mt-2">{producto.descripcion}</p>
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>{producto.nombreProducto}</b>
                <p className="text-default-500">${producto.precio}</p>
                <Button as={Link} to={`/detalleProducto/${producto._id}`} color="secondary">
                  Ver Detalles
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CardProductos; */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import axios from 'axios';
import HashLoader from "react-spinners/HashLoader";

const CardProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const axiosProductos = async () => {
    try {
      setLoading(true);
      const url = `${import.meta.env.VITE_URL_BACK_LOCAL}api/productos`;
      console.log("URL de petición:", url); // Debug
      const resultado = await axios.get(url);
      
      // Adapta esto según la respuesta real de tu backend
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
        <HashLoader color="#3B82F6" size={80} />
      </div>
    );
  }

  return (
    <div className="container mx-auto flex justify-center min-h-screen px-4 bg-cover bg-center">
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {productos.map((producto) => (
          <div key={producto._id}>
            <Card className="p-2 h-[350px] sm:h-[400px] lg:h-[450px] m-2" shadow="sm" isPressable>
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={producto.nombreProducto}
                  className="w-full object-cover h-[140px]"
                  src={producto.imagen}
                />
                <p className="mt-2">{producto.descripcion}</p>
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>{producto.nombreProducto}</b>
                <p className="text-default-500">${producto.precio}</p>
                <Button as={Link} to={`/detalleProducto/${producto._id}`} color="secondary">
                  Ver Detalles
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardProductos;