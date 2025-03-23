import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Image } from "@nextui-org/react";
import clienteAxios, { configHeaders } from "../../helpers/axios";

const DetalleProducto = () => {
  const { idProducto } = useParams(); // 📌 Obtener el parámetro de la URL
  const [producto, setProducto] = useState(null); // Inicializar como null
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const resultado = await clienteAxios.get(`productos/${idProducto}`, configHeaders);
        console.log("Respuesta de la API:", resultado.data);

        // 📌 Verifica si el producto está en la respuesta
        if (resultado.data && resultado.data.producto) {
          setProducto(resultado.data.producto); // Usar resultado.data.producto
        } else {
          setError("El producto no se encontró.");
        }
      } catch (err) {
        console.error("Error al obtener el producto:", err);
        setError("No se pudo cargar el producto.");
      } finally {
        setLoading(false); // Finalizar la carga, independientemente del resultado
      }
    };

    obtenerProducto();
  }, [idProducto]);

  // 📌 Mostrar un mensaje de carga mientras se obtiene el producto
  if (loading) return <p>Cargando...</p>;

  // 📌 Mostrar un mensaje de error si ocurrió un problema
  if (error) return <p className="text-red-500">{error}</p>;

  // 📌 Verificar si el producto está definido antes de renderizar
  if (!producto) return <p>No se encontró el producto.</p>;

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
          <Button color="primary" className="ml-4">
            Agregar al Carrito
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default DetalleProducto;