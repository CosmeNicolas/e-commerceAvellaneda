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
      const res = await clienteAxios.post("/productos", nuevoProducto, configHeaders);
      const idProducto = res.data._id;

      if (imagenProducto) {
        const formData = new FormData();
        formData.append("imagen", imagenProducto);
        await clienteAxios.post(`/productos/agregarImagen/${idProducto}`, formData, configHeadersImagen);
      }

      setShowCrear(false);
      setNuevoProducto({ nombreProducto: "", descripcion: "", precio: 0 });
      setImagenProducto(null);
      await verProductos();
      Swal.fire("Éxito", "Producto creado correctamente", "success");
    } catch (error) {
      Swal.fire("Error", "No se pudo crear el producto", "error");
    } finally {
      setCargando(false);
    }
  };

  const editarProducto = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      await clienteAxios.put(`/productos/${productoEdit._id}`, productoEdit, configHeaders);

      if (imagenProducto) {
        const formData = new FormData();
        formData.append("imagen", imagenProducto);
        await clienteAxios.post(`/productos/agregarImagen/${productoEdit._id}`, formData, configHeadersImagen);
      }

      setShowEditar(false);
      setProductoEdit(null);
      setImagenProducto(null);
      await verProductos();
      Swal.fire("Éxito", "Producto actualizado", "success");
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar", "error");
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
      setCargando(true);
      try {
        await clienteAxios.delete(`/productos/${id}`, configHeaders);
        await verProductos();
        Swal.fire("Eliminado", "Producto eliminado", "success");
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar", "error");
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
                <img src={producto.imagen} alt="producto" className="w-16 h-16 object-cover" />
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
    </div>
  );
};

export default VistaProductos;
