import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../helpers/axios";

const FormularioLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombreUsuario: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombreUsuario, password } = formData;
    
    if (!nombreUsuario || !password) {
      alert("Usuario y contraseña son obligatorios");
      return;
    }

    try {
      const url = `${import.meta.env.VITE_URL_BACK_LOCAL}/api/usuarios/login`;
      const result = await clienteAxios.post(url, { nombreUsuario, password });
      
      if (result.status === 200) {
        alert(result.data.msg);
        sessionStorage.setItem("token", JSON.stringify(result.data.token));
        sessionStorage.setItem("rol", JSON.stringify(result.data.rol));
        sessionStorage.setItem("idUsuario", JSON.stringify(result.data.idUsuario));
        
        setTimeout(() => {
          navigate(result.data.rol === "usuario" ? "/" : "/administrador");
        }, 1000);
      }
    } catch (error) {
      alert(error.response?.data?.msg || "Error al iniciar sesión");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-negroMate border border-lila/30 rounded-xl shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-rosa to-fucsia bg-clip-text text-transparent">
        Iniciar Sesión
      </h2>

      <div className="mb-5">
        <label htmlFor="nombreUsuario" className="block text-sm font-medium mb-2 text-blanco">
          Usuario
        </label>
        <input
          type="text"
          id="nombreUsuario"
          name="nombreUsuario"
          value={formData.nombreUsuario}
          onChange={handleChange}
          placeholder="Ingrese su usuario"
          className="w-full px-4 py-3 bg-negroMate/80 border border-lila/40 rounded-lg text-blanco focus:outline-none focus:ring-2 focus:ring-rosa focus:border-transparent transition-all"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium mb-2 text-blanco">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Ingrese su contraseña"
          className="w-full px-4 py-3 bg-negroMate/80 border border-lila/40 rounded-lg text-blanco focus:outline-none focus:ring-2 focus:ring-rosa focus:border-transparent transition-all"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 bg-gradient-to-r from-rosa to-fucsia text-white font-medium rounded-lg hover:from-fucsia hover:to-rosa transition-all duration-300 shadow-lg hover:shadow-rosa/30 focus:outline-none focus:ring-2 focus:ring-rosa focus:ring-opacity-50"
      >
        Ingresar
      </button>

      <p className="mt-4 text-center text-blanco/80">
        ¿No tienes cuenta?{" "}
        <a href="/registro" className="text-rosa hover:text-fucsia underline transition-colors">
          Regístrate aquí
        </a>
      </p>
    </form>
  );
};

export default FormularioLogin;