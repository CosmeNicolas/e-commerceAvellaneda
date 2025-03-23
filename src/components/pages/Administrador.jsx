import { useEffect, useState } from "react";
import clienteAxios, { configHeaders, configHeadersImagen } from "../../helpers/axios";
import { HashLoader } from "react-spinners";
import Swal from "sweetalert2";


const Administrador = (/* { usuarios = [], productos = [] } */) => {
  const [tabActiva, setTabActiva] = useState("productos"); // Estado para manejar la pestaña activa
  const [show, setShow] = useState(false);
  const [usuarioInfo, setUsuarioInfo] = useState(null);
  const [productoInfo, setProductoInfo] = useState(null);
  const [imagenProducto, setImagenProducto] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [usuarios, setUsuarios] = useState([])
  const [productos, setProductos] = useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const verUsuarios =async()=>{
    const result = await  clienteAxios.get('/usuarios',{}, configHeaders)
    console.log(result.data)
    const usuarios = result.data.result
    setUsuarios(usuarios.usuarios)
  }

  const verProductos =async()=>{
    const result = await clienteAxios.get('/productos',{}, configHeaders)
    console.log(result.data)
    const productos = result.data
    setProductos(productos.productos)
  }

  useEffect(() => {
    verUsuarios()
    verProductos()
  }, [])
  
  // =========================================================
  // Funciones para Usuarios
  // =========================================================

  const deleteUsuario = async (idUsuario) => {
    const confirmDelete = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    });

    if (confirmDelete.isConfirmed) {
      try {
        setCargando(true);
        await clienteAxios.delete(`/usuarios/${idUsuario}`, configHeaders);
        Swal.fire("¡Eliminado!", "El usuario ha sido eliminado.", "success");
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        Swal.fire("Error", "No se pudo eliminar el usuario.", "error");
      } finally {
        setCargando(false);
      }
    }
  };

  const toggleEstadoUsuario = async (idUsuario, estadoActual) => {
    const confirmToggle = await Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Deseas ${estadoActual ? "habilitar" : "deshabilitar"} este usuario?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
    });

    if (confirmToggle.isConfirmed) {
      try {
        setCargando(true);
        const endpoint = estadoActual ? "habilitar" : "deshabilitar";
        await clienteAxios.put(`/usuarios/${endpoint}/${idUsuario}`, {}, configHeaders);
        Swal.fire("¡Éxito!", `Usuario ${estadoActual ? "habilitado" : "deshabilitado"}.`, "success");
      } catch (error) {
        console.error("Error al cambiar el estado del usuario:", error);
        Swal.fire("Error", "No se pudo cambiar el estado del usuario.", "error");
      } finally {
        setCargando(false);
      }
    }
  };

  const handlerInfoUsuario = (usuario) => {
    setUsuarioInfo(usuario);
    handleShow();
  };

  const handleChangeUsuarioInfo = (ev) => {
    setUsuarioInfo({ ...usuarioInfo, [ev.target.name]: ev.target.value });
  };

  const handleClickUsuarioInfo = async (ev) => {
    ev.preventDefault();
    try {
      setCargando(true);
      await clienteAxios.put(`/usuarios/${usuarioInfo._id}`, usuarioInfo, configHeaders);
      Swal.fire("¡Éxito!", "Usuario actualizado correctamente.", "success");
      handleClose();
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      Swal.fire("Error", "No se pudo actualizar el usuario.", "error");
    } finally {
      setCargando(false);
    }
  };

  // =========================================================
  // Funciones para Productos
  // =========================================================

  const deleteProducto = async (idProducto) => {
    const confirmDelete = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    });

    if (confirmDelete.isConfirmed) {
      try {
        setCargando(true);
        await clienteAxios.delete(`/productos/${idProducto}`, configHeaders);
        Swal.fire("¡Eliminado!", "El producto ha sido eliminado.", "success");
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        Swal.fire("Error", "No se pudo eliminar el producto.", "error");
      } finally {
        setCargando(false);
      }
    }
  };

  const toggleEstadoProducto = async (idProducto, estadoActual) => {
    const confirmToggle = await Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Deseas ${estadoActual ? "habilitar" : "deshabilitar"} este producto?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
    });

    if (confirmToggle.isConfirmed) {
      try {
        setCargando(true);
        const endpoint = estadoActual ? "habilitar" : "deshabilitar";
        await clienteAxios.put(`/productos/${endpoint}/${idProducto}`, {}, configHeaders);
        Swal.fire("¡Éxito!", `Producto ${estadoActual ? "habilitado" : "deshabilitado"}.`, "success");
      } catch (error) {
        console.error("Error al cambiar el estado del producto:", error);
        Swal.fire("Error", "No se pudo cambiar el estado del producto.", "error");
      } finally {
        setCargando(false);
      }
    }
  };

  const handlerInfoProducto = (producto) => {
    setProductoInfo(producto);
    handleShow();
  };

  const handleChangeProductoInfo = (ev) => {
    setProductoInfo({ ...productoInfo, [ev.target.name]: ev.target.value });
  };

  const handleClickProductoInfo = async (ev) => {
    ev.preventDefault();
    try {
      setCargando(true);
      const result = await clienteAxios.put(
        `/productos/${productoInfo._id}`,
        productoInfo,
        configHeaders
      );
      if (imagenProducto) {
        const formData = new FormData();
        formData.append("imagen", imagenProducto);
        await clienteAxios.post(
          `/productos/agregarImagen/${productoInfo._id}`,
          formData,
          configHeadersImagen
        );
      }
      Swal.fire("¡Éxito!", "Producto actualizado correctamente.", "success");
      handleClose();
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      Swal.fire("Error", "No se pudo actualizar el producto.", "error");
    } finally {
      setCargando(false);
    }
  };

  // =========================================================
  // Renderizado
  // =========================================================

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Tabs para alternar entre usuarios y productos */}
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

      {/* Contenido de las pestañas */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {tabActiva === "usuarios" ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Usuarios</h2>
            <hr className="mb-4" />
            {cargando ? (
              <div className="flex justify-center">
                <HashLoader color="#3B82F6" />
              </div>
            ) : (
              <div className="overflow-x-auto"> {/* Contenedor con scroll horizontal */}
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th> */}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usuario
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rol
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Opciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {usuarios.map(
                    (usuario) =>
                      usuario._id !== JSON.parse(sessionStorage.getItem("idUsuario")) && (
                        <tr key={usuario._id}>
                         {/*  <td className="px-6 py-4 whitespace-nowrap">{usuario._id}</td> */}
                          <td className="px-6 py-4 whitespace-nowrap">{usuario.nombreUsuario}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{usuario.rol}</td>
                          <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                            <button
                              onClick={() => handlerInfoUsuario(usuario)}
                              className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => deleteUsuario(usuario._id)}
                              className="bg-red-500 text-white px-4 py-2 rounded-lg"
                              disabled={usuario.rol === "admin"}
                            >
                              Eliminar
                            </button>
                            <button
                              onClick={() => toggleEstadoUsuario(usuario._id, usuario.bloqueado)}
                              className={`${
                                usuario.bloqueado ? "bg-green-500" : "bg-gray-500"
                              } text-white px-4 py-2 rounded-lg`}
                            >
                              {usuario.bloqueado ? "Habilitar" : "Bloquear"}
                            </button>
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
              </div>
            )}
          </>
        ) : (
          /* Productos */
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Productos</h2>
            <hr className="mb-4" />
            {cargando ? (
              <div className="flex justify-center">
                <HashLoader color="#3B82F6" />
              </div>
            ) : (
              <div className="overflow-x-auto"> {/* Contenedor con scroll horizontal */}
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                   {/*  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th> */}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Descripción
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Precio
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Imagen
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Opciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {productos.map((producto) => (
                    <tr key={producto._id}>
                      {/* <td className="px-6 py-4 whitespace-nowrap">{producto._id}</td> */}
                      <td className="px-6 py-4 whitespace-nowrap">{producto.nombreProducto}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{producto.descripcion}</td>
                      <td className="px-6 py-4 whitespace-nowrap">${producto.precio}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img src={producto.imagen} alt="producto" className="w-20 h-20 object-cover" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                        <button
                          onClick={() => handlerInfoProducto(producto)}
                          className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => deleteProducto(producto._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg"
                        >
                          Eliminar
                        </button>
                        <button
                          onClick={() => toggleEstadoProducto(producto._id, producto.bloqueado)}
                          className={`${
                            producto.bloqueado ? "bg-green-500" : "bg-gray-500"
                          } text-white px-4 py-2 rounded-lg`}
                        >
                          {producto.bloqueado ? "Habilitar" : "Bloquear"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal para editar */}
      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {tabActiva === "usuarios" ? "Editar Usuario" : "Editar Producto"}
            </h2>
            <form onSubmit={tabActiva === "usuarios" ? handleClickUsuarioInfo : handleClickProductoInfo}>
              {tabActiva === "usuarios" ? (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                      type="text"
                      name="nombreUsuario"
                      value={usuarioInfo?.nombreUsuario || ""}
                      onChange={handleChangeUsuarioInfo}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Rol</label>
                    <select
                      name="rol"
                      value={usuarioInfo?.rol || ""}
                      onChange={handleChangeUsuarioInfo}
                      className="w-full px-3 py-2 border rounded-lg"
                    >
                      <option value="usuario">Usuario</option>
                      <option value="admin">Administrador</option>
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                      type="text"
                      name="nombreProducto"
                      value={productoInfo?.nombreProducto || ""}
                      onChange={handleChangeProductoInfo}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Descripción</label>
                    <input
                      type="text"
                      name="descripcion"
                      value={productoInfo?.descripcion || ""}
                      onChange={handleChangeProductoInfo}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Precio</label>
                    <input
                      type="number"
                      name="precio"
                      value={productoInfo?.precio || ""}
                      onChange={handleChangeProductoInfo}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Imagen</label>
                    <input
                      type="file"
                      name="imagen"
                      onChange={(ev) => setImagenProducto(ev.target.files[0])}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </>
              )}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
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

export default Administrador;