import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Image } from "@nextui-org/react";
import clienteAxios, { configHeaders } from "../../helpers/axios";
import PasarelaPagoMp from "../common/PasarelaPagoMp"; // Importamos el componente de pago

const DetalleProducto = () => {
  const { idProducto } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const resultado = await clienteAxios.get(`productos/${idProducto}`, configHeaders);
        if (resultado.data && resultado.data.producto) {
          setProducto(resultado.data.producto);
        } else {
          setError("El producto no se encontró.");
        }
      } catch (err) {
        setError("No se pudo cargar el producto.");
      } finally {
        setLoading(false);
      }
    };
    obtenerProducto();
  }, [idProducto]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section className="container flex flex-col lg:flex-row justify-center p-8 bg-cover bg-center min-w-full min-h-screen">
      <Card isFooterBlurred className="col-span-12 lg:col-span-7">
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">Producto en detalle</p>
          <h4 className="text-white/90 font-medium text-xl">{producto.nombreProducto}</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt={producto.nombreProducto}
          className="z-0 w-full h-full object-cover rounded-b-none"
          src={producto.imagen}
        />
        <CardBody>
          <p className="font-medium text-lg">{producto.descripcion}</p>
          <p className="text-xl font-bold mt-2">${producto.precio}</p>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button as={Link} to="/" color="secondary">
            Volver
          </Button>
          {/* Pasarela de pago integrada aquí */}
          <PasarelaPagoMp producto={producto} />
        </CardFooter>
      </Card>
    </section>
  );
};

export default DetalleProducto;