import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CardProductos = () => {
  const [productos, setProductos] = useState([]);

  const fetchProductos = async () => {
    try {
      const resultado = await fetch('https://fakestoreapi.com/products?limit=8');
      const respuesta = await resultado.json(); // Esperar a que el resultado sea un JSON
      setProductos(respuesta); // Actualizar el estado con los productos obtenidos
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  useEffect(() => {
    fetchProductos(); // Llamar a la función para obtener los productos cuando el componente se monte
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 }
  };

  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div className="container mx-auto flex justify-center min-h-screen error404 max-w-max px-4 bg-cover bg-center">
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* Mapear los productos obtenidos de la API */}
        {productos.map((producto) => (
          <motion.div
            key={producto.id}
            ref={ref1}
            initial="hidden"
            animate={inView1 ? "visible" : "hidden"}
            variants={cardVariants}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Card
              className="p-2 h-[350px] sm:h-[400px] lg:h-[450px] m-2"
              shadow="sm"
              isPressable
              onPress={() => console.log("item pressed")}
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={producto.title}
                  className="w-full object-cover h-[140px]"
                  src={producto.image}
                />
                <p className="mt-2">{producto.description}</p>
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>{producto.title}</b>
                <p className="text-default-500">${producto.price}</p>
                <Button as={Link} to={`/detalleProducto/${producto.id}`} color="secondary">
                  Comprar
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CardProductos;


