import { useEffect, useState } from "react";
import clienteAxios, {
  configHeaders,
  configHeadersImagen,
} from "../../config/axios";
import Swal from "sweetalert2";
import { HashLoader } from "react-spinners";
import { FaCartPlus } from "react-icons/fa";

const VistaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [showCrear, setShowCrear] = useState(false);
  const [showEditar, setShowEditar] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombreProducto: "",
    descripcion: "",
    precio: 0,
  });
  const [productoEdit, setProductoEdit] = useState(null);
  const [imagenProducto, setImagenProducto] = useState(null);

  const verProductos = async () => {
    setCargando(true);
    try {
      const result = await clienteAxios.get("/productos", configHeaders);
      setProductos(result.data.productos);
    } catch (error) {
      console.error("Error al obtener productos", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    verProductos();
  }, []);

  const handleChangeNuevoProducto = (e) => {
    setNuevoProducto({ ...nuevoProducto, [e.target.name]: e.target.value });
  };

  const handleChangeEditarProducto = (e) => {
    setProductoEdit({ ...productoEdit, [e.target.name]: e.target.value });
  };

  const crearProducto = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      const res = await clienteAxios.post(
        "/productos",
        nuevoProducto,
        configHeaders
      );
      const idProducto = res.data._id;

      if (imagenProducto) {
        const formData = new FormData();
        formData.append("imagen", imagenProducto);
        await clienteAxios.post(
          `/productos/agregarImagen/${idProducto}`,
          formData,
          configHeadersImagen
        );
      }

      setShowCrear(false);
      setNuevoProducto({ nombreProducto: "", descripcion: "", precio: 0 });
      setImagenProducto(null);
      await verProductos();
      Swal.fire({
        title: "Éxito",
        text: "Producto creado correctamente",
        icon: "success",
        confirmButtonColor: "#E966A0",   // rosa
        background: "#191825",           // negroMate
        color: "#FAF1E6",                // blanco
        iconColor: "#FB2576"             // fucsia
      });
      
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudo crear el producto",
        icon: "error",
        confirmButtonColor: "#FB2576",   // fucsia
        background: "#191825",           // negroMate
        color: "#FAF1E6",                // blanco
        iconColor: "#E966A0"             // rosa
      });
      
    } finally {
      setCargando(false);
    }
  };

  const editarProducto = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      await clienteAxios.put(
        `/productos/${productoEdit._id}`,
        productoEdit,
        configHeaders
      );

      if (imagenProducto) {
        const formData = new FormData();
        formData.append("imagen", imagenProducto);
        await clienteAxios.post(
          `/productos/agregarImagen/${productoEdit._id}`,
          formData,
          configHeadersImagen
        );
      }

      setShowEditar(false);
      setProductoEdit(null);
      setImagenProducto(null);
      await verProductos();
      Swal.fire({
        title: "Éxito",
        text: "Producto actualizado",
        icon: "success",
        confirmButtonColor: "#FB2576",   // fucsia
        background: "#191825",           // negroMate
        color: "#FAF1E6",                // blanco
        iconColor: "#E384FF"             // lila
      });
      
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudo actualizar",
        icon: "error",
        confirmButtonColor: "#E966A0",   // rosa
        background: "#191825",           // negroMate
        color: "#FAF1E6",                // blanco
        iconColor: "#FB2576"             // fucsia
      });
      
    } finally {
      setCargando(false);
    }
  };

  const eliminarProducto = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar producto?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#FB2576",   // fucsia
      cancelButtonColor: "#E966A0",    // rosa
      background: "#191825",           // negroMate
      color: "#FAF1E6",                // blanco
      iconColor: "#E384FF"             // lila
    });
  
    if (confirm.isConfirmed) {
      setCargando(true);
      try {
        await clienteAxios.delete(`/productos/${id}`, configHeaders);
        await verProductos();
        Swal.fire({
          title: "Eliminado",
          text: "Producto eliminado",
          icon: "success",
          confirmButtonColor: "#E966A0",
          background: "#191825",
          color: "#FAF1E6",
          iconColor: "#FB2576"
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "No se pudo eliminar",
          icon: "error",
          confirmButtonColor: "#E966A0",
          background: "#191825",
          color: "#FAF1E6",
          iconColor: "#FB2576"
        });
      } finally {
        setCargando(false);
      }
    }
  };
  

  return (
    <div className="relative overflow-x-auto">
      {cargando && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex flex-col items-center justify-center">
          <HashLoader color="#E966A0" />
          <p className="mt-4 text-white font-semibold">Procesando...</p>
        </div>
      )}

      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="text-xl font-bold text-gray-800">Productos</h2>
        <button
          onClick={() => setShowCrear(true)}
          className="bg-sky-900 text-white px-3 py-2 rounded hover:bg-sky-800 transition"
        >
          <FaCartPlus />
        </button>
      </div>

      <table className="min-w-full table-auto text-left border border-gray-200">
        <thead className="bg-gray-100 text-sm text-gray-600 uppercase">
          <tr>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Descripción</th>
            <th className="px-4 py-2">Precio</th>
            <th className="px-4 py-2">Imagen</th>
            <th className="px-4 py-2">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto._id} className="border-t text-gray-700">
              <td className="px-4 py-2">{producto.nombreProducto}</td>
              <td className="px-4 py-2">{producto.descripcion}</td>
              <td className="px-4 py-2">${producto.precio}</td>
              <td className="px-4 py-2">
                <img
                  src={producto.imagen}
                  alt="producto"
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="px-4 py-2">
                <div className="flex flex-wrap gap-2">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                    onClick={() => {
                      setProductoEdit(producto);
                      setShowEditar(true);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => eliminarProducto(producto._id)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showCrear && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Crear Producto</h2>
            <form onSubmit={crearProducto}>
              <input
                type="text"
                name="nombreProducto"
                placeholder="Nombre del producto"
                value={nuevoProducto.nombreProducto}
                onChange={handleChangeNuevoProducto}
                className="w-full border p-2 mb-3 rounded"
              />
              <input
                type="text"
                name="descripcion"
                placeholder="Descripción"
                value={nuevoProducto.descripcion}
                onChange={handleChangeNuevoProducto}
                className="w-full border p-2 mb-3 rounded"
              />
              <input
                type="number"
                name="precio"
                placeholder="Precio"
                value={nuevoProducto.precio}
                onChange={handleChangeNuevoProducto}
                className="w-full border p-2 mb-3 rounded"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImagenProducto(e.target.files[0])}
                className="w-full border p-2 mb-4 rounded"
              />
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

      {showEditar && productoEdit && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Editar Producto</h2>
            <form onSubmit={editarProducto}>
              <input
                type="text"
                name="nombreProducto"
                value={productoEdit.nombreProducto}
                onChange={handleChangeEditarProducto}
                className="w-full border p-2 mb-3 rounded"
              />
              <input
                type="text"
                name="descripcion"
                value={productoEdit.descripcion}
                onChange={handleChangeEditarProducto}
                className="w-full border p-2 mb-3 rounded"
              />
              <input
                type="number"
                name="precio"
                value={productoEdit.precio}
                onChange={handleChangeEditarProducto}
                className="w-full border p-2 mb-3 rounded"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImagenProducto(e.target.files[0])}
                className="w-full border p-2 mb-4 rounded"
              />
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

export default VistaProductos;
