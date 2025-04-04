import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios, { configHeaders } from "../../helpers/axios";
import { motion } from "framer-motion";

const FormularioRegistro = ({ idPage }) => {
  const navigate = useNavigate();
  const [formRegister, setFormRegister] = useState({});
  const [formLogin, setFormLogin] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);


  const handleChangeregister = (e) => {
    setFormRegister({ ...formRegister, [e.target.name]: e.target.value });
  };

  const handleChangeLogin = (e) => {
    setFormLogin({ ...formLogin, [e.target.name]: e.target.value });
  };


 /* Registro */
 const handleClickRegister = async (e) => {
  e.preventDefault();
  setIsProcessing(true); // Mover al inicio para activar loading inmediatamente
  
  const { nombreUsuario, password, rpassword, correo } = formRegister;
  
  // Validaciones mejoradas
  if (!nombreUsuario?.trim() || !password?.trim() || !rpassword?.trim() || !correo?.trim()) {
    alert("Todos los campos son obligatorios");
    setIsProcessing(false);
    return;
  }

  if (password !== rpassword) {
    alert("Las contraseñas no coinciden");
    setIsProcessing(false);
    return;
  }

  // Validación de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    alert("Por favor ingresa un correo electrónico válido");
    setIsProcessing(false);
    return;
  }

  try {
    const response = await clienteAxios.post(
      "/usuarios", 
      {
        nombreUsuario: nombreUsuario.trim(),
        correo: correo.trim(),
        password: password.trim(),
        rol: "usuario"
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );

    if (response.status === 201) {
      alert(response.data?.msg || "Registro exitoso! Redirigiendo...");
      
      // Limpiar formulario
      setFormRegister({
        nombreUsuario: "",
        correo: "",
        password: "",
        rpassword: ""
      });
      
      // Redirección más limpia (evita recarga completa)
      navigate("/login", { replace: true });
    }
  } catch (error) {
    console.error("Error detallado:", error);
    
    // Manejo de errores mejorado
    let errorMessage = "Error al registrar";
    
    if (error.response) {
      if (error.response.data?.msg) {
        errorMessage = error.response.data.msg;
      } else if (error.response.status === 500) {
        errorMessage = "El usuario se creó pero hubo un error en la respuesta del servidor";
      }
    } else if (error.request) {
      errorMessage = "El servidor no respondió. Verifica tu conexión";
    }
    
    alert(errorMessage);
  } finally {
    setIsProcessing(false);
  }
};

   

  /* Login */
  const handleClickLogin = async (e) => {
    e.preventDefault();
    const { nombreUsuario, password } = formLogin;
    if (!nombreUsuario || !password) {
      alert("Algún campo está vacío");
      return;
    }
    try {
      const result = await clienteAxios.post('/usuarios/login', {
        nombreUsuario,
        password
      }, configHeaders);
      if (result.status === 200) {
        alert(`${result.data.msg}`);
        sessionStorage.setItem("token", JSON.stringify(result.data.token));
        sessionStorage.setItem("rol", JSON.stringify(result.data.rol));
        sessionStorage.setItem("idUsuario", JSON.stringify(result.data.idUsuario));
        if (result.data.rol === "usuario") {
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          setTimeout(() => {
            navigate("/administrador");
          }, 1000);
        }
      }
    } catch (error) {
      alert("Error al iniciar sesión");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <form className="p-8 bg-white/5 backdrop-blur-lg border border-lila/20 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-rosa to-fucsia bg-clip-text text-transparent">
          {idPage !== "login" ? "Crear Cuenta" : "Iniciar Sesión"}
        </h2>

        {/* Campo de Usuario */}
        <div className="mb-6">
          <label htmlFor="nombreUsuario" className="block text-sm font-medium mb-2 text-blanco">
            Nombre de Usuario
          </label>
          <input
            type="text"
            id="nombreUsuario"
            placeholder="Ej: usuario123"
            name="nombreUsuario"
            onChange={idPage === "login" ? handleChangeLogin : handleChangeregister}
            className="w-full px-4 py-3 bg-white/5 border border-lila/30 rounded-xl text-blanco placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rosa focus:border-transparent transition-all"
            required
          />
        </div>

        {/* Campo de Correo (solo para registro) */}
        {idPage !== "login" && (
          <div className="mb-6">
            <label htmlFor="correo" className="block text-sm font-medium mb-2 text-blanco">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="correo"
              placeholder="Ej: usuario@email.com"
              name="correo"
              onChange={handleChangeregister}
              className="w-full px-4 py-3 bg-white/5 border border-lila/30 rounded-xl text-blanco placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rosa focus:border-transparent transition-all"
              required
            />
          </div>
        )}

        {/* Campo de Contraseña */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-2 text-blanco">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            name="password"
            onChange={idPage === "login" ? handleChangeLogin : handleChangeregister}
            className="w-full px-4 py-3 bg-white/5 border border-lila/30 rounded-xl text-blanco placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rosa focus:border-transparent transition-all"
            required
          />
        </div>

        {/* Campo de Repetir Contraseña (solo para registro) */}
        {idPage !== "login" && (
          <div className="mb-8">
            <label htmlFor="rpassword" className="block text-sm font-medium mb-2 text-blanco">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="rpassword"
              placeholder="••••••••"
              name="rpassword"
              onChange={handleChangeregister}
              className="w-full px-4 py-3 bg-white/5 border border-lila/30 rounded-xl text-blanco placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rosa focus:border-transparent transition-all"
              required
            />
          </div>
        )}

        {/* Botón de Envío */}
        <button
          type="button"
          onClick={idPage === "login" ? handleClickLogin : handleClickRegister}
          disabled={isProcessing}
          className={`w-full py-3.5 px-4 bg-gradient-to-r from-rosa to-fucsia text-white font-medium rounded-xl hover:from-fucsia hover:to-rosa transition-all duration-300 shadow-lg hover:shadow-rosa/30 focus:outline-none focus:ring-2 focus:ring-rosa focus:ring-opacity-50 ${
            isProcessing ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isProcessing ? "Procesando..." : idPage !== "login" ? "Registrarse" : "Ingresar"}
        </button>

        {/* Enlace alternativo */}
        <div className="mt-6 text-center">
          <p className="text-sm text-blanco/70">
            {idPage === "login" ? (
              <>
                ¿No tienes una cuenta?{" "}
                <a href="/registro" className="font-medium text-rosa hover:text-fucsia underline transition-colors">
                  Regístrate
                </a>
              </>
            ) : (
              <>
                ¿Ya tienes cuenta?{" "}
                <a href="/login" className="font-medium text-rosa hover:text-fucsia underline transition-colors">
                  Inicia sesión
                </a>
              </>
            )}
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default FormularioRegistro;