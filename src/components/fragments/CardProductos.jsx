import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import ropa1 from '../../img/1.png';
import ropa2 from '../../img/2.png';
import ropa3 from '../../img/3.png';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CardProductos = () => {
  // Configuración de las variantes para la animación
  const cardVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 }
  };

  // Usa el hook useInView para detectar cuando una card está en el viewport
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref4, inView4] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto flex justify-center min-h-screen error404 max-w-max px-4 bg-cover bg-center">
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {/* Primera tarjeta */}
            <motion.div
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
                    alt="titulo"
                    className="w-full object-cover h-[140px]"
                    src={ropa1}
                  />
                  <p className="mt-2">
                    Make beautiful websites regardless of your design experience.
                  </p>
                </CardBody>
                <CardFooter className="text-small justify-between">
                  <b>titulo</b>
                  <p className="text-default-500">$100</p>
                  <Button as={Link} to="/detalleProducto" color="secondary">
                    Comprar
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Segunda tarjeta */}
            <motion.div
              ref={ref2}
              initial="hidden"
              animate={inView2 ? "visible" : "hidden"}
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
                    alt="titulo"
                    className="w-full object-cover h-[140px]"
                    src={ropa3}
                  />
                  <p className="mt-2">
                    Make beautiful websites regardless of your design experience.
                  </p>
                </CardBody>
                <CardFooter className="text-small justify-between">
                  <b>titulo</b>
                  <p className="text-default-500">$100</p>
                  <Button as={Link} to="/error404" color="secondary">
                    Comprar
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Tercera tarjeta */}
            <motion.div
              ref={ref3}
              initial="hidden"
              animate={inView3 ? "visible" : "hidden"}
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
                    alt="titulo"
                    className="w-full object-cover h-[140px]"
                    src={ropa2}
                  />
                  <p className="mt-2">
                    Make beautiful websites regardless of your design experience.
                  </p>
                </CardBody>
                <CardFooter className="text-small justify-between">
                  <b>titulo</b>
                  <p className="text-default-500">$100</p>
                  <Button as={Link} to="/error404" color="secondary">
                    Comprar
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Cuarta tarjeta */}
            <motion.div
              ref={ref4}
              initial="hidden"
              animate={inView4 ? "visible" : "hidden"}
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
                    alt="titulo"
                    className="w-full object-cover h-[140px]"
                    src={ropa2}
                  />
                  <p className="mt-2">
                    Make beautiful websites regardless of your design experience.
                  </p>
                </CardBody>
                <CardFooter className="text-small justify-between">
                  <b>titulo</b>
                  <p className="text-default-500">$100</p>
                  <Button as={Link} to="/error404" color="secondary">
                    Comprar
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CardProductos;

