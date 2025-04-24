import FormularioRegistro from "../fragments/FormularioRegistro";
import { motion } from "framer-motion";
import "../../css/index.css";

const LoginPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-negroMate to-[#2A2342] flex items-center justify-center p-4"
    >
      {/* Efectos de fondo decorativos */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-rosa/10 blur-xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-lila/10 blur-xl"></div>
        <div className="absolute top-1/3 right-1/3 w-28 h-28 rounded-full bg-fucsia/10 blur-xl"></div>
      </div>

      {/* Contenedor del formulario */}
      <div className="relative z-10 w-full max-w-md">
        <FormularioRegistro idPage="login" />
        
        {/* Enlace adicional */}
        <p className="mt-6 text-center text-blanco/80">
          ¿No tienes cuenta?{' '}
          <a 
            href="/registro" 
            className="text-rosa hover:text-fucsia underline transition-colors"
          >
            Regístrate aquí
          </a>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginPage;