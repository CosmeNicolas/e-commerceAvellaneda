import img404 from '../../img/404.svg'
import logo from '../../img/favicon-moda.png'
import { FaCircleArrowLeft } from "react-icons/fa6";
import {Card, CardHeader, CardBody, CardFooter, Divider, Image, Button} from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";

const Error404 = () => {
  const location = useLocation();
  return (
    <section className="flex justify-center items-center py-4 min-h-screen bg-cover bg-center error404">
      
      <Card className="max-w-[400px] backdrop-blur-md bg-white/80 border border-gray-200">
      <CardHeader className="flex gap-3 ">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src={logo}
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">Luz Bel </p>
          <p className="text-small text-default-500">Tienda Mayorista</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
      <div>
    <Image
      width={300}
      alt="NextUI hero Image"
      src={img404}
    />
    </div>
      </CardBody>
      <Divider/>
      <CardFooter className='flex justify-center'>
          <Link to='/' >
          <Button  color="secondary"><FaCircleArrowLeft />Volver Al Inicio </Button>
          </Link>
      </CardFooter>
    </Card>
   
    </section>
  )
}

export default Error404