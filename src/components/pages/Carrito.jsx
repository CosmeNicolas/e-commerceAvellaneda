import { useCart } from "../helpers/CartContexts";
import PasarelaPagoMp from "../common/PasarelaPagoMp";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

const Carrito = () => {
  const {
    carrito,
    eliminarDelCarrito,
    vaciarCarrito,
    aumentarCantidad,
    disminuirCantidad,
  } = useCart();

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6 text-center text-fucsia">
        Carrito de Compras
      </h1>

      {carrito.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600 mb-4">El carrito está vacío.</p>
          <Button as={Link} to="/productos" color="secondary">
            Ver productos
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {carrito.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 border-b border-white/10 pb-4"
              >
                <img
                  src={item.imagen}
                  alt={item.nombreProducto}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-semibold text-white">
                    {item.nombreProducto}
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => disminuirCantidad(item._id)}
                      className="text-white bg-fucsia/70 hover:bg-fucsia px-2 rounded-full"
                    >
                      -
                    </button>
                    <span className="text-white font-medium">
                      {item.cantidad}
                    </span>
                    <button
                      onClick={() => aumentarCantidad(item._id)}
                      className="text-white bg-rosa/70 hover:bg-rosa px-2 rounded-full"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-sm text-rosa/90 mt-1">
                    Subtotal: ${(item.precio * item.cantidad).toFixed(2)}
                  </p>
                  <Link
                    to={`/detalleProducto/${item._id}`}
                    className="text-xs text-rosa/70 hover:text-fucsia underline underline-offset-2 transition"
                  >
                    Ver detalle
                  </Link>
                </div>
                <Button
                  size="sm"
                  color="danger"
                  onClick={() => eliminarDelCarrito(item._id)}
                >
                  Eliminar
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-6 text-right">
            <p className="text-xl font-bold mb-4 text-fucsia">
              Total: ${total.toFixed(2)}
            </p>

            <div className="flex justify-end mb-4">
              <PasarelaPagoMp
                producto={{
                  nombreProducto: "Compra desde carrito",
                  precio: total,
                }}
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-4">
              <Button
                as={Link}
                to="/productos"
                className="bg-white/10 border border-rosa/40 text-white hover:bg-white/20"
              >
                Seguir comprando
              </Button>

              <Button color="danger" variant="bordered" onClick={vaciarCarrito}>
                Vaciar carrito
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
