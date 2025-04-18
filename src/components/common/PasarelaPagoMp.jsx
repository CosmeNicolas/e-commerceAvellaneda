// src/components/common/PasarelaPagoMp.jsx
import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import clienteAxios, { configHeaders } from "../../helpers/axios";
import "../../css/PasarelaPagoMp.css";
const PasarelaPagoMp = ({ producto }) => {
  const [preferenceId, setPreferenceId] = useState(null); // Estado para almacenar el preference_id de Mercado Pago

  useEffect(() => {
    // Crear la preferencia de pago al cargar el componente
    const crearPreferencia = async () => {
      try {
        const response = await clienteAxios.post(
          "/pagos/crear-pago", // Endpoint donde se crea la preferencia
          {
            userId: "test_user_123", // ID del usuario (si tienes autenticación, pon aquí el ID real)
            items: [
              {
                nombre: producto.nombreProducto,
                precio: producto.precio,
                cantidad: 1
              }
            ]
          },
          configHeaders
        );

        const { id } = response.data; // Obtenemos el ID de la preferencia
        if (id) {
          setPreferenceId(id); // Establecemos el ID de la preferencia
        } else {
          console.error("No se recibió un ID de preferencia de pago.");
        }
      } catch (error) {
        console.error("Error al crear la preferencia de pago:", error);
      }
    };

    if (producto) {
      crearPreferencia(); // Solo crear la preferencia si tenemos un producto
    }
  }, [producto]);

  const handlePagar = () => {
    if (preferenceId) {
      // Redirige al usuario a la pasarela de pago de Mercado Pago
      window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?preference_id=${preferenceId}`;
    } else {
      console.error("No se pudo obtener el ID de la preferencia.");
    }
  };

  return (
    <div>
      {preferenceId ? (
        <Button className="mercadoPagoButton" color="primary" onClick={handlePagar}>
          Comprar ahora
        </Button>
      ) : (
        <p>Cargando la pasarela de pago...</p>
      )}
    </div>
  );
};

export default PasarelaPagoMp;
