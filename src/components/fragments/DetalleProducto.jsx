import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Button,
  Image,
} from "@nextui-org/react";

const DetalleProducto = () => {
  return (
    <section className="container flex flex-col lg:flex-row justify-center p-8 bg-cover bg-center error404 min-w-full min-h-screen">
      <Card isFooterBlurred className="col-span-12 lg:col-span-7 ">
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            Your day your way
          </p>
          <h4 className="text-white/90 font-medium text-xl">
            Your checklist for better sleep
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover rounded-b-none "
          src="https://nextui.org/images/card-example-5.jpeg"
        />
        <CardBody>
          <p>Make beautiful websites regardless of your design experience.</p>
          <p>Make beautiful websites regardless of your design experience.</p>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button as={Link} to="/detalleProducto" color="secondary">
            Agregar al Carrito
          </Button>
        </CardFooter>
      </Card>

      {/*   <Card className="bg-[#00000087] rounded-s-none rounded-t-lg lg:rounded-l-none lg:mt-0">
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            width={40}
          />
          <div className="flex flex-col text-white">
            <p className="text-md">NextUI</p>
            <p className="text-small text-default-500">nextui.org</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className='font-semibold text-white'>
          <p>Make beautiful websites regardless of your design experience.</p>
        </CardBody>
        <Divider />
        <CardFooter>
          <Link
            isExternal
            showAnchorIcon
            href="https://github.com/nextui-org/nextui"
          >
            Visit source code on GitHub.
          </Link>
        </CardFooter>
      </Card> */}
    </section>
  );
};

export default DetalleProducto;
