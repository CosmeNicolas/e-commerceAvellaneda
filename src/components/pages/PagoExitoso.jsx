import { useEffect } from "react";
import { useCart } from "../helpers/CartContexts";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import checkIcon from "../../img/checked.png"; // Asegurate de tener un ícono apropiado en tu carpeta img

const PagoExitoso = () => {
  const { vaciarCarrito } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmarCompra = async () => {
      try {
        const carritoTemporal = JSON.parse(localStorage.getItem("carritoTemporal"));

        if (!carritoTemporal || carritoTemporal.length === 0) {
          throw new Error("No hay información de carrito en localStorage.");
        }

        const response = await clienteAxios.post("/pagos/confirmar-compra", {
          carrito: carritoTemporal
        });

        if (response.status === 200) {
          Swal.fire({
            title: "✅ Compra confirmada",
            text: "Tu compra fue registrada y el stock actualizado.",
            icon: "success",
            confirmButtonColor: "#FB2576",
            background: "#191825",
            color: "#FAF1E6",
            iconColor: "#E966A0"
          });

          vaciarCarrito();
          localStorage.removeItem("carritoTemporal");
        }
      } catch (error) {
        console.error("❌ Error al confirmar compra:", error);
        Swal.fire({
          title: "Error",
          text: "Ocurrió un problema al registrar tu compra.",
          icon: "error",
          confirmButtonColor: "#E966A0",
          background: "#191825",
          color: "#FAF1E6",
          iconColor: "#FB2576"
        });
      }
    };

    confirmarCompra();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#1e1b2e] text-white px-4 text-center">
      <img src={checkIcon} alt="Éxito" className="w-20 h-20 mb-6" />
      <h1 className="text-2xl font-bold text-green-400 mb-4">¡Pago aprobado con éxito!</h1>
      <p className="mb-4 text-lg">Gracias por tu compra. Pronto nos pondremos en contacto contigo.</p>
      <Link
        to="/"
        className="mt-4 inline-block bg-gradient-to-r from-rosa to-fucsia text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:brightness-110 transition"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default PagoExitoso;
