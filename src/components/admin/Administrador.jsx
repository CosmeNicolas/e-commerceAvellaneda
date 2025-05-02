import { useState } from "react";
import VistaUsuarios from "./VistaUsuario";
import VistaProductos from "./VistaProductos";

const Administrador = () => {
  const [tabActiva, setTabActiva] = useState("usaurios");

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setTabActiva("usuarios")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            tabActiva === "usuarios"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          Usuarios
        </button>
        <button
          onClick={() => setTabActiva("productos")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            tabActiva === "productos"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          Productos
        </button>
      </div>

      {/* Contenido dinámico */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {tabActiva === "usuarios" ? <VistaUsuarios /> : <VistaProductos />}
      </div>
    </div>
  );
};

export default Administrador;
