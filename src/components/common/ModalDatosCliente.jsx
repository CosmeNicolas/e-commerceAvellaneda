// src/components/common/ModalDatosCliente.jsx
import { useState } from "react";
import Swal from "sweetalert2";

const ModalDatosCliente = ({ onDatosGuardados }) => {
  const [mostrar, setMostrar] = useState(false);
  const [datos, setDatos] = useState({
    nombreCompleto: "",
    email: "",
    telefono: "",
    dni: "",
    direccion: "",
    localidad: "",
    provincia: ""
  });

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const validarYGuardar = () => {
    const { nombreCompleto, email, telefono, dni, direccion, localidad, provincia } = datos;

    if (!nombreCompleto || !email || !telefono || !dni || !direccion || !localidad || !provincia) {
      return Swal.fire({
        title: "Faltan datos",
        text: "Por favor completá todos los campos antes de continuar.",
        icon: "warning",
        confirmButtonColor: "#FB2576",
        background: "#191825",
        color: "#FAF1E6",
        iconColor: "#E966A0"
      });
    }

    localStorage.setItem("nombreCompletoCliente", nombreCompleto);
    localStorage.setItem("emailCliente", email);
    localStorage.setItem("telefonoCliente", telefono);
    localStorage.setItem("dniCliente", dni);
    localStorage.setItem("direccionCliente", direccion);
    localStorage.setItem("localidadCliente", localidad);
    localStorage.setItem("provinciaCliente", provincia);

    Swal.fire({
      title: "Datos guardados",
      text: "Podés continuar con el pago.",
      icon: "success",
      confirmButtonColor: "#FB2576",
      background: "#191825",
      color: "#FAF1E6",
      iconColor: "#E966A0"
    });

    setMostrar(false);
    onDatosGuardados();
  };

  return (
    <>
      <button
        onClick={() => setMostrar(true)}
        className="bg-gradient-to-r from-fucsia to-rosa text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:brightness-110 transition"
      >
        Ingresar datos del comprador
      </button>

      {mostrar && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white text-black rounded-xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Datos del comprador</h2>
            <input
              type="text"
              name="nombreCompleto"
              placeholder="Nombre completo"
              value={datos.nombreCompleto}
              onChange={handleChange}
              className="w-full p-2 mb-3 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={datos.email}
              onChange={handleChange}
              className="w-full p-2 mb-3 border rounded"
            />
            <input
              type="text"
              name="telefono"
              placeholder="Teléfono"
              value={datos.telefono}
              onChange={handleChange}
              className="w-full p-2 mb-3 border rounded"
            />
            <input
              type="text"
              name="dni"
              placeholder="DNI"
              value={datos.dni}
              onChange={handleChange}
              className="w-full p-2 mb-3 border rounded"
            />
            <input
              type="text"
              name="direccion"
              placeholder="Dirección"
              value={datos.direccion}
              onChange={handleChange}
              className="w-full p-2 mb-3 border rounded"
            />
            <input
              type="text"
              name="localidad"
              placeholder="Localidad"
              value={datos.localidad}
              onChange={handleChange}
              className="w-full p-2 mb-3 border rounded"
            />
            <input
              type="text"
              name="provincia"
              placeholder="Provincia"
              value={datos.provincia}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setMostrar(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={validarYGuardar}
                className="px-4 py-2 bg-rosa text-white rounded hover:bg-fucsia"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalDatosCliente;