import { useEffect, useState } from "react";
import clienteAxios, { configHeaders, configHeadersImagen } from "../../helpers/axios";
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
    try {
      setCargando(true);
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

  const crearProducto = async (e) => {
    e.preventDefault();
    try {
      setCargando(true);
      const res = await clienteAxios.post("/productos", nuevoProducto, configHeaders);
      const idProducto = res.data._id;

      if (imagenProducto) {
        const formData = new FormData();
        formData.append("imagen", imagenProducto);
        await clienteAxios.post(`/productos/agregarImagen/${idProducto}`, formData, configHeadersImagen);
      }

      Swal.fire("Éxito", "Producto creado correctamente", "success");
      setShowCrear(false);
      setNuevoProducto({ nombreProducto: "", descripcion: "", precio: 0 });
      setImagenProducto(null);
      verProductos();
    } catch (error) {
      Swal.fire("Error", "No se pudo crear el producto", "error");
    } finally {
      setCargando(false);
    }
  };

  const eliminarProducto = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
    });

    if (confirm.isConfirmed) {
      try {
        await clienteAxios.delete(`/productos/${id}`, configHeaders);
        Swal.fire("Eliminado", "Producto eliminado", "success");
        verProductos();
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar", "error");
      }
    }
  };

  const toggleEstadoProducto = async (id, bloqueado) => {
    const accion = bloqueado ? "habilitar" : "deshabilitar";
    const confirm = await Swal.fire({
      title: `¿Deseas ${accion} este producto?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí",
    });

    if (confirm.isConfirmed) {
      try {
        await clienteAxios.put(`/productos/${accion}/${id}`, {}, configHeaders);
        verProductos();
      } catch (error) {
        Swal.fire("Error", "No se pudo cambiar el estado", "error");
      }
    }
  };

  const editarProducto = async (e) => {
    e.preventDefault();
    try {
      await clienteAxios.put(`/productos/${productoEdit._id}`, productoEdit, configHeaders);

      if (imagenProducto) {
        const formData = new FormData();
        formData.append("imagen", imagenProducto);
        await clienteAxios.post(
          `/productos/agregarImagen/${productoEdit._id}`,
          formData,
          configHeadersImagen
        );
      }

      Swal.fire("Éxito", "Producto actualizado", "success");
      setShowEditar(false);
      setImagenProducto(null);
      verProductos();
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar", "error");
    }
  };

  return (
    <div>
      {/* Modal Crear */}
      {showCrear && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Crear Producto</h2>
            <form onSubmit={crearProducto}>
              <input
                className="w-full border p-2 rounded mb-3"
                type="text"
                placeholder="Nombre"
                value={nuevoProducto.nombreProducto}
                onChange={(e) =>
                  setNuevoProducto({ ...nuevoProducto, nombreProducto: e.target.value })
                }
              />
              <input
                className="w-full border p-2 rounded mb-3"
                type="text"
                placeholder="Descripción"
                value={nuevoProducto.descripcion}
                onChange={(e) =>
                  setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })
                }
              />
              <input
                className="w-full border p-2 rounded mb-3"
                type="number"
                placeholder="Precio"
                value={nuevoProducto.precio}
                onChange={(e) =>
                  setNuevoProducto({ ...nuevoProducto, precio: e.target.value })
                }
              />
              <input
                type="file"
                onChange={(e) => setImagenProducto(e.target.files[0])}
                className="w-full mb-4"
              />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowCrear(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                  Cancelar
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Editar */}
      {showEditar && productoEdit && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Editar Producto</h2>
            <form onSubmit={editarProducto}>
              <input
                className="w-full border p-2 rounded mb-3"
                type="text"
                value={productoEdit.nombreProducto}
                onChange={(e) =>
                  setProductoEdit({ ...productoEdit, nombreProducto: e.target.value })
                }
              />
              <input
                className="w-full border p-2 rounded mb-3"
                type="text"
                value={productoEdit.descripcion}
                onChange={(e) =>
                  setProductoEdit({ ...productoEdit, descripcion: e.target.value })
                }
              />
              <input
                className="w-full border p-2 rounded mb-3"
                type="number"
                value={productoEdit.precio}
                onChange={(e) =>
                  setProductoEdit({ ...productoEdit, precio: e.target.value })
                }
              />
              <input
                type="file"
                onChange={(e) => setImagenProducto(e.target.files[0])}
                className="w-full mb-4"
              />
              <div className="flex justify-end gap-2">
                <button onClick={() => setShowEditar(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                  Cancelar
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Productos</h2>
        <button
          onClick={() => setShowCrear(true)}
          className="bg-sky-900 text-white px-3 py-2 rounded hover:bg-sky-800 transition"
        >
          <FaCartPlus />
        </button>
      </div>

      {cargando ? (
        <div className="flex justify-center"><HashLoader color="#E966A0" /></div>
      ) : (
        <table className="w-full table-auto text-left border border-gray-200">
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
                  <img src={producto.imagen} alt="producto" className="w-16 h-16 object-cover" />
                </td>
                <td className="px-4 py-2 space-x-2">
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
                  <button
                    className={`${
                      producto.bloqueado ? "bg-green-500" : "bg-gray-500"
                    } text-white px-3 py-1 rounded`}
                    onClick={() => toggleEstadoProducto(producto._id, producto.bloqueado)}
                  >
                    {producto.bloqueado ? "Habilitar" : "Bloquear"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VistaProductos;
