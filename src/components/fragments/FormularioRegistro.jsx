import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../helpers/axios";

const FormularioRegistro = ({ idPage }) => {
  const navigate = useNavigate();
  const [formRegister, setFormRegister] = useState({});
  const [formLogin, setFormLogin] = useState({});

  const handleChangeregister = (e) => {
    setFormRegister({ ...formRegister, [e.target.name]: e.target.value });
  };

  const handleChangeLogin = (e) => {
    setFormLogin({ ...formLogin, [e.target.name]: e.target.value });
  };

  /* Registro */
  const handleClickRegister = async (e) => {
    e.preventDefault();
    const { nombreUsuario, password, rpassword, correo } = formRegister;
    if (!nombreUsuario || !password || !rpassword || !correo) {
      alert("Algún campo está vacío");
      return;
    }
    if (password === rpassword) {
      try {
        const result = await clienteAxios.post("/usuarios", {
          nombreUsuario,
          correo,
          password,
        });
        if (result.status === 201) {
          alert(`${result.data.msg}`);
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
      } catch (error) {
        alert("Error al registrar el usuario");
      }
    } else {
      alert("Las contraseñas no coinciden");
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
      const result = await clienteAxios.post("/usuarios/login", {
        nombreUsuario,
        password,
      });
      if (result.status === 200) {
        alert(`${result.data.msg}`);
        sessionStorage.setItem("token", JSON.stringify(result.data.token));
        sessionStorage.setItem("rol", JSON.stringify(result.data.rol));
        sessionStorage.setItem("idUsuario", JSON.stringify(result.data.idUsuario));
        if (result.data.rol === "usuario") {
          setTimeout(() => {
            navigate("/user");
          }, 1000);
        } else {
          setTimeout(() => {
            navigate("/admin");
          }, 1000);
        }
      }
    } catch (error) {
      alert("Error al iniciar sesión");
    }
  };

  return (
    <form className="p-4 bg-gray-800 text-white rounded-lg max-w-md mx-auto">
      {/* Campo de Usuario */}
      <div className="mb-4">
        <label htmlFor="nombreUsuario" className="block text-sm font-medium mb-1">
          Usuario
        </label>
        <input
          type="text"
          id="nombreUsuario"
          placeholder="Ingrese un Usuario"
          name="nombreUsuario"
          onChange={idPage === "login" ? handleChangeLogin : handleChangeregister}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Campo de Correo (solo para registro) */}
      {idPage !== "login" && (
        <div className="mb-4">
          <label htmlFor="correo" className="block text-sm font-medium mb-1">
            Correo
          </label>
          <input
            type="email"
            id="correo"
            placeholder="Ingrese su correo"
            name="correo"
            onChange={handleChangeregister}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {/* Campo de Contraseña */}
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          placeholder="Ingrese su contraseña"
          name="password"
          onChange={idPage === "login" ? handleChangeLogin : handleChangeregister}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Campo de Repetir Contraseña (solo para registro) */}
      {idPage !== "login" && (
        <div className="mb-6">
          <label htmlFor="rpassword" className="block text-sm font-medium mb-1">
            Repetir Contraseña
          </label>
          <input
            type="password"
            id="rpassword"
            placeholder="Repita su contraseña"
            name="rpassword"
            onChange={handleChangeregister}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {/* Botón de Envío */}
      <button
        type="button"
        onClick={idPage === "login" ? handleClickLogin : handleClickRegister}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {idPage !== "login" ? "Registrarse" : "Ingresar"}
      </button>
    </form>
  );
};

export default FormularioRegistro;