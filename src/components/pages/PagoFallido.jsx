import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import errorIcon from "../../img/x-button.png"; // Podés cambiarlo por uno de error si tenés

const PagoFallido = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/carrito");
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#1e1b2e] text-white px-4 text-center">
      <img src={errorIcon} alt="Pago fallido" className="w-20 h-20 mb-6" />
      <h1 className="text-2xl font-bold text-red-500 mb-4">Pago fallido</h1>
      <p className="mb-4 text-lg">Ocurrió un problema al procesar tu pago. Podés intentarlo nuevamente o modificar los datos ingresados.</p>
      <Link
        to="/carrito"
        className="mt-4 inline-block bg-gradient-to-r from-fucsia to-rosa text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:brightness-110 transition"
      >
        Volver al carrito
      </Link>
    </div>
  );
};

export default PagoFallido;
