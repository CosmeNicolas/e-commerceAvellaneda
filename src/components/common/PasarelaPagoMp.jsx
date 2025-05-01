// src/components/common/PasarelaPagoMp.jsx
import { useState, useEffect } from "react";
import clienteAxios, { configHeaders } from "../../helpers/axios";
import "../../css/PasarelaPagoMp.css";



const PasarelaPagoMp = ({ producto }) => {
  const [preferenceId, setPreferenceId] = useState(null);
  
  useEffect(() => {
    const crearPreferencia = async () => {
      try {
        const response = await clienteAxios.post(
          "/pagos/crear-pago",
          {
            userId: "test_user_123",
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
