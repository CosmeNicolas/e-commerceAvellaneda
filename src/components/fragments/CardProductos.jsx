import React from 'react';
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import ropa1 from '../../img/1.png';
import ropa2 from '../../img/2.png';
import ropa3 from '../../img/3.png';

const CardProductos = () => {
  return (
    <div className="container mx-auto flex justify-center px-4">
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
            <p className="mt-2 ">Make beautiful websites regardless of your design experience.</p>
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>titulo</b>
            <p className="text-default-500">$100</p>
            <Button color="secondary">Comprar</Button>
          </CardFooter>
        </Card>

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
            <p className="mt-2 ">Make beautiful websites regardless of your design experience.</p>
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>titulo</b>
            <p className="text-default-500">$100</p>
            <Button color="secondary">Comprar</Button>
          </CardFooter>
        </Card>

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
            <p className="mt-2">Make beautiful websites regardless of your design experience.</p>
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>titulo</b>
            <p className="text-default-500">$100</p>
            <Button color="secondary">Comprar</Button>
          </CardFooter>
        </Card>

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
            <p className="mt-2">Make beautiful websites regardless of your design experience.</p>
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>titulo</b>
            <p className="text-default-500">$100</p>
            <Button color="secondary">Comprar</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CardProductos;
