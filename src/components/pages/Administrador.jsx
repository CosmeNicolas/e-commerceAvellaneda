import { useEffect, useState } from "react";
import clienteAxios, { configHeaders, configHeadersImagen } from "../../helpers/axios";
import { HashLoader } from "react-spinners";
import Swal from "sweetalert2";
import { FaUserPlus, FaCartPlus } from "react-icons/fa";


const Administrador = (/* { usuarios = [], productos = [] } */) => {
  const [tabActiva, setTabActiva] = useState("usuarios"); // Estado para manejar la pestaña activa
  const [show, setShow] = useState(false);
  const [showCrear, setShowCrear] = useState(false); // Modal de creación
  const [usuarioInfo, setUsuarioInfo] = useState(null);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombreUsuario: "",
    contrasenia: "",
    role: "usuario",
     correo: ""
  });
  const [usuarios, setUsuarios] = useState([])

  const [productoInfo, setProductoInfo] = useState(null);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombreProducto: "",
    descripcion: "",
    precio: 0,
  }); // Datos del nuevo producto
  const [imagenProducto, setImagenProducto] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [productos, setProductos] = useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseCrear = () => setShowCrear(false); // Cerrar modal de creación
  const handleShowCrear = () => setShowCrear(true); // Abrir modal de creación
  
  useEffect(() => {
    verUsuarios()
    verProductos()
  }, [])

  const verUsuarios =async()=>{
    const url = `${import.meta.env.VITE_URL_BACK_LOCAL}/api/usuarios`;
    const result = await  clienteAxios.get(url, configHeaders)
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

  // =========================================================
  // Funciones para Usuarios
  // =========================================================
  // Maneja cambios en los inputs del formulario de creación
const handleChangeNuevoUsuario = (ev) => {
  setNuevoUsuario({ 
    ...nuevoUsuario, 
    [ev.target.name]: ev.target.value 
  });
};


// Envía los datos del nuevo usuario al backend
const handleCrearUsuario = async (ev) => {
  ev.preventDefault();
  try {
    setCargando(true);
    
    // Validación mejorada (igual que el backend)
    if (!nuevoUsuario.nombreUsuario || !nuevoUsuario.correo || !nuevoUsuario.contrasenia) {
      Swal.fire("Error", "Todos los campos son obligatorios", "error");
      return;
    }

    if (nuevoUsuario.nombreUsuario.length < 5) {
      Swal.fire("Error", "El nombre de usuario debe tener al menos 5 caracteres", "error");
      return;
    }

    if (nuevoUsuario.contrasenia.length < 8 || nuevoUsuario.contrasenia.length > 40) {
      Swal.fire("Error", "La contraseña debe tener entre 8 y 40 caracteres", "error");
      return;
    }

    // Validación adicional para correo (si el backend lo requiere)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(nuevoUsuario.correo)) {
      Swal.fire("Error", "Ingrese un correo electrónico válido", "error");
      return;
    }
      
    const response = await clienteAxios.post(
      '/usuarios',
      {
        nombreUsuario: nuevoUsuario.nombreUsuario,
        correo: nuevoUsuario.correo,
        password: nuevoUsuario.contrasenia,
        rol: nuevoUsuario.role || "usuario" // Valor por defecto si está vacío
      },
      configHeaders
    );

    if (response.data && response.data.msg) {
      Swal.fire("¡Éxito!", response.data.msg, "success");
    } else {
      Swal.fire("¡Éxito!", "Usuario creado correctamente", "success");
    }
    
    // Reiniciar el formulario con valores por defecto
    setNuevoUsuario({
      nombreUsuario: "",
      contrasenia: "",
      role: "usuario", // Valor por defecto
      correo: ""
    });
    
    handleCloseCrear();
    await verUsuarios();
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    
    let errorMsg = "No se pudo crear el usuario";
    if (error.response) {
      if (error.response.data && error.response.data.msg) {
        errorMsg = error.response.data.msg;
      } else if (error.response.status === 409) {
        errorMsg = "El nombre de usuario o correo ya está en uso";
      } else {
        errorMsg = `Error ${error.response.status}: ${error.response.statusText}`;
      }
    }
    
    Swal.fire("Error", errorMsg, "error");
  } finally {
    setCargando(false);
  }
};

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
  
        // Depuración: Verifica el ID del usuario y el token
        console.log("ID del usuario a eliminar:", idUsuario);
        const token = JSON.parse(sessionStorage.getItem('token'));
        console.log("Token:", token);
  
        // Realiza la solicitud DELETE
        const response = await clienteAxios.delete(`/usuarios/${idUsuario}`, configHeaders);
        console.log("Respuesta del backend:", response); // Depuración
  
        // Muestra mensaje de éxito y actualiza la lista de usuarios
        Swal.fire("¡Eliminado!", "El usuario ha sido eliminado.", "success");
        await verUsuarios();
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
    setUsuarioInfo({...usuario});
    handleShow();
  };

  const handleChangeUsuarioInfo = (ev) => {
    setUsuarioInfo({ ...usuarioInfo, [ev.target.name]: ev.target.value });
  };

  const handleClickUsuarioInfo = async (ev) => {
    ev.preventDefault();
    try {
      setCargando(true);
      await clienteAxios.put(
        `/usuarios/${usuarioInfo._id}`,
        usuarioInfo,
        configHeaders
      );
      Swal.fire("¡Éxito!", "Usuario actualizado correctamente.", "success");
      handleClose();
      await verUsuarios(); // Actualiza la lista de usuarios
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
  const crearProducto = async (ev) => {
    ev.preventDefault();
    try {
      setCargando(true);
  
      // Crear el producto
      const result = await clienteAxios.post("/productos", nuevoProducto, configHeaders);
  
      // Verificar que el _id esté presente en la respuesta
      if (!result.data._id) {
        throw new Error("No se pudo obtener el ID del producto creado");
      }
  
      // Subir la imagen si existe
      if (imagenProducto) {
        const formData = new FormData();
        formData.append("imagen", imagenProducto);
  
        // Enviar la imagen al backend
        const imagenResult = await clienteAxios.post(
          `/productos/agregarImagen/${result.data._id}`, // Usar el _id del producto
          formData,
          configHeadersImagen
        );
  
        // Si la subida de la imagen falla, eliminar el producto creado
        if (imagenResult.status !== 200) {
          await clienteAxios.delete(`/productos/${result.data._id}`, configHeaders);
          throw new Error("Error al subir la imagen");
        }
      }
  
      // Mostrar mensaje de éxito
      Swal.fire("¡Éxito!", "Producto creado correctamente.", "success");
  
      // Cerrar el modal y actualizar la lista de productos
      handleCloseCrear();
      await verProductos();
    } catch (error) {
      console.error("Error al crear el producto:", error);
      Swal.fire("Error", "No se pudo crear el producto.", "error");
    } finally {
      setCargando(false);
    }
  };
  
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
        await verProductos()
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
      await verProductos()
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
            {/* Modal para crear usuario */}
            {showCrear && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg w-full max-w-md">
                  <h2 className="text-xl font-bold mb-4">
                    Crear Nuevo Usuario
                  </h2>

                  <form onSubmit={handleCrearUsuario}>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">
                        Nombre de Usuario
                      </label>
                      <input
                        type="text"
                        name="nombreUsuario"
                        value={nuevoUsuario.nombreUsuario}
                        onChange={handleChangeNuevoUsuario}
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        name="correo"
                        value={nuevoUsuario.correo}
                        onChange={handleChangeNuevoUsuario}
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">
                        Contraseña
                      </label>
                      <input
                        type="password"
                        name="contrasenia"
                        value={nuevoUsuario.contrasenia}
                        onChange={handleChangeNuevoUsuario}
                        className="w-full p-2 border rounded"
                        required
                        minLength="6"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">Rol</label>
                      <select
                        name="role"
                        value={nuevoUsuario.role}
                        onChange={handleChangeNuevoUsuario}
                        className="w-full p-2 border rounded"
                        required
                      >
                        <option value="usuario">Usuario</option>
                        <option value="admin">Administrador</option>
                      </select>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={handleCloseCrear}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="bg-rosa text-white px-4 py-2 rounded-lg  hover:bg-fuchsia-800 transition-colors duration-300"
                        disabled={cargando}
                      >
                        {cargando ? "Creando..." : "Crear Usuario"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Usuarios
              </h2>
              <button
                onClick={handleShowCrear}
                className="bg-rosa rounded-md px-3 my-1 hover:bg-lila transition-colors duration-300"
                title="Crear nuevo usuario"
              >
                <FaUserPlus />
              </button>
            </div>

            <hr className="mb-4" />
            {cargando ? (
              <div className="flex justify-center">
                <HashLoader color="#3B82F6" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                {" "}
                {/* Contenedor con scroll horizontal */}
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
                        usuario._id !==
                          JSON.parse(sessionStorage.getItem("idUsuario")) && (
                          <tr key={usuario._id}>
                            {/*  <td className="px-6 py-4 whitespace-nowrap">{usuario._id}</td> */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              {usuario.nombreUsuario}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {usuario.rol}
                            </td>
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
                                onClick={() =>
                                  toggleEstadoUsuario(
                                    usuario._id,
                                    usuario.bloqueado
                                  )
                                }
                                className={`${
                                  usuario.bloqueado
                                    ? "bg-slate-950-500"
                                    : "bg-gray-500"
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
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Productos
              </h2>
              <button
                onClick={handleShowCrear}
                className="bg-sky-900 rounded-md px-3 my-1 hover:bg-sky-800 transition-colors duration-300"
              >
                <FaCartPlus className="text-white" />
              </button>
            </div>
            <hr className="mb-4" />
            {cargando ? (
              <div className="flex justify-center">
                <HashLoader color="#3B82F6" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                {" "}
                {/* Contenedor con scroll horizontal */}
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
                        <td className="px-6 py-4 whitespace-nowrap">
                          {producto.nombreProducto}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {producto.descripcion}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          ${producto.precio}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img
                            src={producto.imagen}
                            alt="producto"
                            className="w-20 h-20 object-cover"
                          />
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
                            onClick={() =>
                              toggleEstadoProducto(
                                producto._id,
                                producto.bloqueado
                              )
                            }
                            className={`${
                              producto.bloqueado
                                ? "bg-green-500"
                                : "bg-gray-500"
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

      {/* Modal para crear producto */}
      {showCrear && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-md">
            <h2 className="text-xl font-bold mb-4">Crear Producto</h2>
            <form onSubmit={crearProducto}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombreProducto"
                  value={nuevoProducto.nombreProducto}
                  onChange={(e) =>
                    setNuevoProducto({
                      ...nuevoProducto,
                      nombreProducto: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <input
                  type="text"
                  name="descripcion"
                  value={nuevoProducto.descripcion}
                  onChange={(e) =>
                    setNuevoProducto({
                      ...nuevoProducto,
                      descripcion: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Precio
                </label>
                <input
                  type="number"
                  name="precio"
                  value={nuevoProducto.precio}
                  onChange={(e) =>
                    setNuevoProducto({
                      ...nuevoProducto,
                      precio: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Imagen
                </label>
                <input
                  type="file"
                  name="imagen"
                  onChange={(e) => setImagenProducto(e.target.files[0])}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleCloseCrear}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para editar */}
      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {tabActiva === "usuarios" ? "Editar Usuario" : "Editar Producto"}
            </h2>
            <form
              onSubmit={
                tabActiva === "usuarios"
                  ? handleClickUsuarioInfo
                  : handleClickProductoInfo
              }
            >
              {tabActiva === "usuarios" ? (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="nombreUsuario"
                      value={usuarioInfo?.nombreUsuario || ""}
                      onChange={handleChangeUsuarioInfo}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Rol
                    </label>
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
                    <label className="block text-sm font-medium text-gray-700">
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="nombreProducto"
                      value={productoInfo?.nombreProducto || ""}
                      onChange={handleChangeProductoInfo}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Descripción
                    </label>
                    <input
                      type="text"
                      name="descripcion"
                      value={productoInfo?.descripcion || ""}
                      onChange={handleChangeProductoInfo}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Precio
                    </label>
                    <input
                      type="number"
                      name="precio"
                      value={productoInfo?.precio || ""}
                      onChange={handleChangeProductoInfo}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Imagen
                    </label>
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