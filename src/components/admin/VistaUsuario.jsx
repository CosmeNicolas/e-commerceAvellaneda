import { useEffect, useState } from "react";
import clienteAxios, { configHeaders } from "../../config/axios";
import { HashLoader } from "react-spinners";
import Swal from "sweetalert2";
import { FaUserPlus } from "react-icons/fa";

const VistaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [showCrear, setShowCrear] = useState(false);
  const [showEditar, setShowEditar] = useState(false);
  const [usuarioEdit, setUsuarioEdit] = useState(null);

  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombreUsuario: "",
    correo: "",
    password: "",
    rol: "usuario",
  });

  const verUsuarios = async () => {
    try {
      setCargando(true);
      const result = await clienteAxios.get("/usuarios", configHeaders);
      const usuariosObtenidos = result?.data?.result?.usuarios || [];
      setUsuarios(usuariosObtenidos);
    } catch (error) {
      console.error("Error al cargar usuarios", error);
      Swal.fire("Error", "No se pudieron cargar los usuarios", "error");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    verUsuarios();
  }, []);

  const handleChangeNuevoUsuario = (e) => {
    setNuevoUsuario({ ...nuevoUsuario, [e.target.name]: e.target.value });
  };

  const handleChangeEditarUsuario = (e) => {
    setUsuarioEdit({ ...usuarioEdit, [e.target.name]: e.target.value });
  };

  const handleCrearUsuario = async (e) => {
    e.preventDefault();
    try {
      setCargando(true);
      const { nombreUsuario, correo, password } = nuevoUsuario;

      if (!nombreUsuario || !correo || !password) {
        Swal.fire("Error", "Todos los campos son obligatorios", "error");
        return;
      }

      if (nombreUsuario.length < 5) {
        Swal.fire(
          "Error",
          "El nombre debe tener al menos 5 caracteres",
          "error"
        );
        return;
      }

      if (password.length < 8 || password.length > 40) {
        Swal.fire(
          "Error",
          "La contraseña debe tener entre 8 y 40 caracteres",
          "error"
        );
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(correo)) {
        Swal.fire("Error", "Correo electrónico inválido", "error");
        return;
      }

      await clienteAxios.post("/usuarios", nuevoUsuario, configHeaders);
      Swal.fire("Éxito", "Usuario creado correctamente", "success");

      setNuevoUsuario({
        nombreUsuario: "",
        correo: "",
        password: "",
        rol: "usuario",
      });

      setShowCrear(false);
      verUsuarios();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo crear el usuario", "error");
    } finally {
      setCargando(false);
    }
  };

  const handleEditarUsuario = async (e) => {
    e.preventDefault();
    try {
      await clienteAxios.put(
        `/usuarios/${usuarioEdit._id}`,
        usuarioEdit,
        configHeaders
      );
      Swal.fire("Éxito", "Usuario actualizado", "success");
      setShowEditar(false);
      verUsuarios();
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar", "error");
    }
  };

  const deleteUsuario = async (idUsuario) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
    });

    if (confirm.isConfirmed) {
      try {
        await clienteAxios.delete(`/usuarios/${idUsuario}`, configHeaders);
        Swal.fire("Eliminado", "Usuario eliminado", "success");
        verUsuarios();
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar el usuario", "error");
      }
    }
  };

  const toggleEstadoUsuario = async (id, bloqueado) => {
    const accion = bloqueado ? "habilitar" : "deshabilitar";
    const confirm = await Swal.fire({
      title: `¿Deseas ${accion} este usuario?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí",
    });

    if (confirm.isConfirmed) {
      try {
        await clienteAxios.put(`/usuarios/${accion}/${id}`, {}, configHeaders);
        verUsuarios();
      } catch (error) {
        Swal.fire("Error", "No se pudo cambiar el estado", "error");
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="text-xl font-bold text-gray-800">Usuarios</h2>
        <button
          onClick={() => setShowCrear(true)}
          className="bg-rosa text-white px-3 py-2 rounded hover:bg-fucsia transition-colors"
        >
          <FaUserPlus />
        </button>
      </div>

      {cargando ? (
        <div className="flex justify-center z-[9999]">
          <HashLoader color="#E966A0" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-left border border-gray-200">
            <thead className="bg-gray-100 text-sm text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-2">Usuario</th>
                <th className="px-4 py-2">Rol</th>
                <th className="px-4 py-2">Opciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) =>
                u._id !== JSON.parse(sessionStorage.getItem("idUsuario")) ? (
                  <tr key={u._id} className="border-t text-gray-700">
                    <td className="px-4 py-2">{u.nombreUsuario}</td>
                    <td className="px-4 py-2">{u.rol}</td>
                    <td className="px-4 py-2">
                      <div className="flex flex-wrap gap-2">
                        <button
                          className="bg-yellow-500 text-white px-3 py-1 rounded"
                          onClick={() => {
                            setUsuarioEdit(u);
                            setShowEditar(true);
                          }}
                        >
                          Editar
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded"
                          onClick={() => deleteUsuario(u._id)}
                          disabled={u.rol === "admin"}
                        >
                          Eliminar
                        </button>
                        <button
                          className={`${
                            u.bloqueado ? "bg-green-500" : "bg-gray-500"
                          } text-white px-3 py-1 rounded`}
                          onClick={() =>
                            toggleEstadoUsuario(u._id, u.bloqueado)
                          }
                        >
                          {u.bloqueado ? "Habilitar" : "Bloquear"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de creación */}
      {showCrear && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Crear Usuario</h2>
            <form onSubmit={handleCrearUsuario}>
              <input
                className="w-full border p-2 rounded mb-3"
                type="text"
                name="nombreUsuario"
                placeholder="Nombre de usuario"
                value={nuevoUsuario.nombreUsuario}
                onChange={handleChangeNuevoUsuario}
              />
              <input
                className="w-full border p-2 rounded mb-3"
                type="email"
                name="correo"
                placeholder="Correo"
                value={nuevoUsuario.correo}
                onChange={handleChangeNuevoUsuario}
              />
              <input
                className="w-full border p-2 rounded mb-3"
                type="password"
                name="password"
                placeholder="Contraseña"
                value={nuevoUsuario.password}
                onChange={handleChangeNuevoUsuario}
              />
              <select
                className="w-full border p-2 rounded mb-4"
                name="rol"
                value={nuevoUsuario.rol}
                onChange={handleChangeNuevoUsuario}
              >
                <option value="usuario">Usuario</option>
                <option value="admin">Administrador</option>
              </select>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCrear(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de edición */}
      {showEditar && usuarioEdit && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Editar Usuario</h2>
            <form onSubmit={handleEditarUsuario}>
              <input
                className="w-full border p-2 rounded mb-3"
                type="text"
                name="nombreUsuario"
                value={usuarioEdit.nombreUsuario}
                onChange={handleChangeEditarUsuario}
              />
              <select
                className="w-full border p-2 rounded mb-4"
                name="rol"
                value={usuarioEdit.rol}
                onChange={handleChangeEditarUsuario}
              >
                <option value="usuario">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEditar(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VistaUsuarios;
