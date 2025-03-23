import React from "react";
import FormularioRegistro from "../fragments/FormularioRegistro"

const Registro = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 fondo">
      <div className="w-full max-w-md">
        <FormularioRegistro />
      </div>
    </div>
  );
};

export default Registro;