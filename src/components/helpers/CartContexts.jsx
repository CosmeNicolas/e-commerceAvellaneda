import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    const existe = carrito.find((p) => p._id === producto._id);
    if (existe) {
      setCarrito(
        carrito.map((p) =>
          p._id === producto._id ? { ...p, cantidad: p.cantidad + 1 } : p
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((p) => p._id !== id));
  };

  const vaciarCarrito = () => setCarrito([]);

  const aumentarCantidad = (id) => {
    setCarrito((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  const disminuirCantidad = (id) => {
    setCarrito((prev) =>
      prev.map((item) =>
        item._id === id && item.cantidad > 1
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        aumentarCantidad,
        disminuirCantidad,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
