import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import clienteAxios, { configHeaders } from "../../config/axios";
import { useCart } from "../helpers/CartContexts";
import { Button } from "@nextui-org/react";

const DetalleProducto = () => {
  const { idProducto } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { agregarAlCarrito } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const resultado = await clienteAxios.get(
          `productos/${idProducto}`,
          configHeaders
        );
        if (resultado.data?.producto) {
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

  if (loading) return <p className="text-white text-center">Cargando...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <section className="container mx-auto px-4 py-12 min-h-screen flex flex-col lg:flex-row gap-8 bg-[#1e1b2e] rounded-lg">
      {/* Imagen */}
      <div className="lg:w-1/2 flex justify-center">
        <img
          src={producto.imagen}
          alt={producto.nombreProducto}
          className="rounded-lg object-cover w-full max-w-md"
        />
      </div>

      {/* Detalles */}
      <div className="lg:w-1/2 flex flex-col justify-center text-white">
        <h1 className="text-3xl font-bold text-fucsia mb-2 uppercase">
          {producto.nombreProducto}
        </h1>
        <p className="text-lg text-gray-300 mb-6">{producto.descripcion}</p>

        <p className="text-2xl font-extrabold text-rosa mb-6">
          ${producto.precio.toLocaleString("es-AR")}
        </p>

        {/* Controles de acción */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            as={Link}
            to="/productos"
            className="bg-white/10 border border-white/20 text-white hover:bg-white/20"
          >
            Seguir comprando
          </Button>

          <Button
            className="bg-gradient-to-r from-rosa to-fucsia text-white shadow-md hover:brightness-110"
            onClick={() => {
              agregarAlCarrito(producto);
              navigate("/carrito");
            }}
          >
            Agregar al carrito
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DetalleProducto;
