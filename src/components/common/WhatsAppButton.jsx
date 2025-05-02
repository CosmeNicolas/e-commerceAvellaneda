import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const phoneNumber = "5491134259004"; // Número sin espacios ni guiones
  const message = "Hola, estoy interesado/a en sus productos mayoristas. ¿Podrían brindarme más información?";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl"
        aria-label="Contactar por WhatsApp"
      >
        {/* Efecto de pulso */}
        <div className="absolute inset-0 rounded-full pulse bg-green-500 opacity-20"></div>

        <FaWhatsapp className="text-white text-3xl relative z-10" />
        <span className="sr-only">WhatsApp</span>
      </a>

      {/* Animación pulse */}
      <style>{`
        .pulse {
          animation: pulse-animation 2s infinite;
        }
        @keyframes pulse-animation {
          0% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(37, 211, 102, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default WhatsAppButton;
