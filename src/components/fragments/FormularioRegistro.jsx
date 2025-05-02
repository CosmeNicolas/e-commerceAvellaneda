// src/components/fragments/FormularioRegistro.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios, { configHeaders } from "../../config/axios";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const FormularioRegistro = ({ idPage }) => {
  const navigate = useNavigate();
  const [formRegister, setFormRegister] = useState({
    nombreUsuario: "",
    correo: "",
    password: "",
    rpassword: "",
  });
  const [formLogin, setFormLogin] = useState({
    nombreUsuario: "",
    password: "",
  });
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
    setIsProcessing(true);

    const { nombreUsuario, password, rpassword, correo } = formRegister;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !nombreUsuario.trim() ||
      !password.trim() ||
      !rpassword.trim() ||
      !correo.trim()
    ) {
      Swal.fire("Error", "Todos los campos son obligatorios", "warning");
      setIsProcessing(false);
      return;
    }
    if (password !== rpassword) {
      Swal.fire("Error", "Las contraseñas no coinciden", "warning");
      setIsProcessing(false);
      return;
    }
    if (!emailRegex.test(correo)) {
      Swal.fire("Error", "Por favor ingresa un correo electrónico válido", "warning");
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
          rol: "usuario",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response.status === 201) {
        Swal.fire("¡Éxito!", response.data?.msg || "Registro exitoso!", "success");
        setFormRegister({ nombreUsuario: "", correo: "", password: "", rpassword: "" });
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.error("Error detallado:", error);
      let errorMessage = "Error al registrar";
      if (error.response) {
        if (error.response.data?.msg) {
          errorMessage = error.response.data.msg;
        } else if (error.response.status === 500) {
          errorMessage = "El usuario se creó pero hubo un error en el servidor";
        }
      } else if (error.request) {
        errorMessage = "El servidor no respondió. Verifica tu conexión";
      }
      Swal.fire("Error", errorMessage, "error");
    } finally {
      setIsProcessing(false);
    }
  };

  /* Login */
  const handleClickLogin = async (e) => {
    e.preventDefault();
    const { nombreUsuario, password } = formLogin;
    if (!nombreUsuario.trim() || !password.trim()) {
      Swal.fire("Error", "Algún campo está vacío", "warning");
      return;
    }
    setIsProcessing(true);
    try {
      const result = await clienteAxios.post(
        "/usuarios/login",
        { nombreUsuario: nombreUsuario.trim(), password: password.trim() },
        configHeaders
      );
      if (result.status === 200) {
        Swal.fire({
          title: "¡Bienvenido!",
          text: result.data.msg,
          icon: "success",
          confirmButtonColor: "#E966A0",   // rosa
          background: "#191825",           // negroMate
          color: "#FAF1E6",                // blanco para el texto
          iconColor: "#FB2576"             // fucsia
        });
        sessionStorage.setItem("token", JSON.stringify(result.data.token));
        sessionStorage.setItem("rol", JSON.stringify(result.data.rol));
        sessionStorage.setItem(
          "idUsuario",
          JSON.stringify(result.data.idUsuario)
        );
        sessionStorage.setItem(
          "nombreUsuario",
          JSON.stringify(result.data.nombreUsuario)
        );
        setTimeout(() => {
          navigate(result.data.rol === "usuario" ? "/" : "/administrador");
        }, 1000);
      }
    } catch (error) {
      Swal.fire("Error", "No se pudo iniciar sesión", "error");
    } finally {
      setIsProcessing(false);
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

        {/* Nombre de Usuario */}
        <div className="mb-6">
          <label
            htmlFor="nombreUsuario"
            className="block text-sm font-medium mb-2 text-blanco"
          >
            Nombre de Usuario
          </label>
          <input
            type="text"
            id="nombreUsuario"
            name="nombreUsuario"
            placeholder="Ej: usuario123"
            onChange={idPage === "login" ? handleChangeLogin : handleChangeregister}
            value={
              idPage === "login"
                ? formLogin.nombreUsuario
                : formRegister.nombreUsuario
            }
            className="w-full px-4 py-3 bg-white/5 border border-lila/30 rounded-xl text-blanco placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rosa transition-all"
            required
          />
        </div>

        {/* Correo (solo registro) */}
        {idPage !== "login" && (
          <div className="mb-6">
            <label
              htmlFor="correo"
              className="block text-sm font-medium mb-2 text-blanco"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="correo"
              name="correo"
              placeholder="usuario@email.com"
              onChange={handleChangeregister}
              value={formRegister.correo}
              className="w-full px-4 py-3 bg-white/5 border border-lila/30 rounded-xl text-blanco placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rosa transition-all"
              required
            />
          </div>
        )}

        {/* Contraseña */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium mb-2 text-blanco"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            onChange={idPage === "login" ? handleChangeLogin : handleChangeregister}
            value={
              idPage === "login"
                ? formLogin.password
                : formRegister.password
            }
            className="w-full px-4 py-3 bg-white/5 border border-lila/30 rounded-xl text-blanco placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rosa transition-all"
            required
          />
        </div>

        {/* Confirmar contraseña (solo registro) */}
        {idPage !== "login" && (
          <div className="mb-8">
            <label
              htmlFor="rpassword"
              className="block text-sm font-medium mb-2 text-blanco"
            >
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="rpassword"
              name="rpassword"
              placeholder="••••••••"
              onChange={handleChangeregister}
              value={formRegister.rpassword}
              className="w-full px-4 py-3 bg-white/5 border border-lila/30 rounded-xl text-blanco placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rosa transition-all"
              required
            />
          </div>
        )}

        {/* Botón */}
        <button
          type="button"
          onClick={idPage === "login" ? handleClickLogin : handleClickRegister}
          disabled={isProcessing}
          className={`w-full py-3.5 bg-gradient-to-r from-rosa to-fucsia text-white font-medium rounded-xl hover:from-fucsia hover:to-rosa transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-rosa ${
            isProcessing ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isProcessing
            ? "Procesando..."
            : idPage !== "login"
            ? "Registrarse"
            : "Ingresar"}
        </button>

        {/* Enlace alternativo */}
        <div className="mt-6 text-center">
          <p className="text-sm text-blanco/70">
            {idPage === "login" ? (
              <>
                ¿No tienes cuenta?{" "}
                <a
                  href="/registro"
                  className="text-rosa hover:text-fucsia underline"
                >
                  Regístrate
                </a>
              </>
            ) : (
              <>
                ¿Ya tienes cuenta?{" "}
                <a
                  href="/login"
                  className="text-rosa hover:text-fucsia underline"
                >
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
