import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import infoIcon from "../../img/box.png"; // Puedes cambiar este ícono si tenés uno específico para pendiente

const PagoPendiente = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/productos");
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#1e1b2e] text-white px-4 text-center">
      <img src={infoIcon} alt="Pago pendiente" className="w-20 h-20 mb-6" />
      <h1 className="text-2xl font-bold text-yellow-400 mb-4">Pago pendiente</h1>
      <p className="mb-4 text-lg">Tu pago está siendo procesado. Una vez impactada la compra, nos estaremos comunicando contigo.</p>
      <Link
        to="/"
        className="mt-4 inline-block bg-gradient-to-r from-rosa to-fucsia text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:brightness-110 transition"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default PagoPendiente;
