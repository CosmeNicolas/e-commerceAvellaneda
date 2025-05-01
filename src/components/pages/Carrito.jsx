// src/components/pages/Carrito.jsx
import { useCart } from "../helpers/CartContexts";
import PasarelaPagoMp from "../common/PasarelaPagoMp";

const Carrito = () => {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useCart();

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Carrito de Compras</h1>
      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          {carrito.map((item) => (
            <div key={item._id} className="flex justify-between mb-2">
              <span>{item.nombreProducto}</span>
              <span>${item.precio}</span>
              <button onClick={() => eliminarDelCarrito(item._id)}>❌</button>
            </div>
          ))}
          <p className="font-bold mt-4">Total: ${total}</p>
          <PasarelaPagoMp producto={{ nombreProducto: "Compra desde carrito", precio: total }} />
          <button onClick={vaciarCarrito} className="mt-4 text-red-500">Vaciar carrito</button>
        </div>
      )}
    </div>
  );
};

export default Carrito;
