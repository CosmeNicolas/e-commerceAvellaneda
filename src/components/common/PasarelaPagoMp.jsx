// src/components/common/PasarelaPagoMp.jsx
import React, { useState, useEffect } from "react";
import clienteAxios, { configHeaders } from "../../helpers/axios";
import "../../css/PasarelaPagoMp.css";
import mpLogo from "../../img/mercadopagoLogo.svg"

const PasarelaPagoMp = ({ producto }) => {
  const [preferenceId, setPreferenceId] = useState(null); // Estado para almacenar el preference_id de Mercado Pago

  useEffect(() => {
    // Crear la preferencia de pago al cargar el componente
    const crearPreferencia = async () => {
      try {
        const response = await clienteAxios.post(
          "/pagos/crear-pago",
          {
            userId: "test_user_123",
            items: [
              {
                nombre: producto.nombreProducto,
                precio: Number(producto.precio),
                cantidad: 1
              }
            ]
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
  }, [producto]);

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
       <div className="flex justify-center items-center">
       {preferenceId ? (
         <button
           onClick={handlePagar}
           className="flex items-center gap-3 bg-[#009EE3] hover:bg-[#00B4FF] text-white font-bold py-2 px-4 md:py-3 md:px-6 rounded-lg shadow-md transform transition-transform hover:-translate-y-1 hover:shadow-lg"
         >
           <img
             src={mpLogo}
             alt="Mercado Pago"
             className="w-14 h-10"
           />
           <span className="text-sm md:text-base">Pagar con Mercado Pago</span>
         </button>
       ) : (
         <p className="text-center text-gray-500">Cargando la pasarela de pago...</p>
       )}
     </div>
     
      ) : (
        <p className="text-center text-gray-500">Cargando la pasarela de pago...</p>
      )}
    </div>
  );
};

export default PasarelaPagoMp;
