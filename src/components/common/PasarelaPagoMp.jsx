// src/components/common/PasarelaPagoMp.jsx
import clienteAxios, { configHeaders } from "../../config/axios";
import "../../css/PasarelaPagoMp.css";
import mpLogo from "../../img/mercadopagoLogo.svg";
import { useEffect, useState } from "react";
import { useCart } from "../helpers/CartContexts";

const PasarelaPagoMp = ({ producto }) => {
  const [preferenceId, setPreferenceId] = useState(null);
  const { carrito } = useCart();

  useEffect(() => {
    const crearPreferencia = async () => {
      try {
        let items = [];

        if (producto.nombreProducto !== "Compra desde carrito") {
          items = [
            {
              nombre: producto.nombreProducto,
              precio: Number(producto.precio),
              cantidad: 1,
            },
          ];

          // Guardamos individual en localStorage
          localStorage.setItem(
            "carritoTemporal",
            JSON.stringify([
              {
                _id: producto._id,
                nombreProducto: producto.nombreProducto,
                precio: producto.precio,
                cantidad: 1,
                talleSeleccionado: producto.talleSeleccionado || "UNICO",
              },
            ])
          );
        } else {
          // Desde carrito
          items = carrito.map((item) => ({
            nombre: item.nombreProducto,
            precio: Number(item.precio),
            cantidad: Number(item.cantidad),
          }));

          localStorage.setItem("carritoTemporal", JSON.stringify(carrito));
        }

        const response = await clienteAxios.post(
          "/pagos/crear-pago",
          {
            userId: "test_user_123",
            items,
          },
          configHeaders
        );

        const { id } = response.data;
        if (id) {
          setPreferenceId(id);
        } else {
          console.error("No se recibió un ID de preferencia de pago.");
        }
      } catch (error) {
        console.error("Error al crear la preferencia de pago:", error);
      }
    };

    if (producto) {
      crearPreferencia();
    }
  }, [producto, carrito]);

  const handlePagar = () => {
    if (preferenceId) {
      window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?preference_id=${preferenceId}`;
    } else {
      console.error("No se pudo obtener el ID de la preferencia.");
    }
  };

  return (
    <div className="flex justify-center items-center">
      {preferenceId ? (
        <button
          onClick={handlePagar}
          className="flex items-center gap-3 bg-[#009EE3] hover:bg-[#00B4FF] text-white font-bold py-2 px-4 md:py-3 md:px-6 rounded-lg shadow-md transform transition-transform hover:-translate-y-1 hover:shadow-lg"
        >
          <img src={mpLogo} alt="Mercado Pago" className="w-14 h-10" />
          <span className="text-sm md:text-base">Pagar con Mercado Pago</span>
        </button>
      ) : (
        <p className="text-center text-gray-500">
          Cargando la pasarela de pago...
        </p>
      )}
    </div>
  );
};

export default PasarelaPagoMp;
