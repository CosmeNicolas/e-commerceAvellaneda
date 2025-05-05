import { useEffect, useState } from "react";
import clienteAxios, {
  configHeaders,
  configHeadersImagen,
} from "../../config/axios";
import Swal from "sweetalert2";
import { HashLoader } from "react-spinners";
import { FaCartPlus } from "react-icons/fa";

const categorias = [
  "COLECCION OTOÑO INVIERNO 2025",
  "CAMPERAS Y ABRIGOS",
  "CHALECOS",
  "POLLERAS Y SHORT",
  "SASTRERIA",
  "PANTALON",
  "CAMISAS Y REMERAS",
];

const talles = ["S", "M", "L", "XL", "XXL"];

const VistaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [modalActivo, setModalActivo] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [imagenProducto, setImagenProducto] = useState(null);

  const [producto, setProducto] = useState({
    nombreProducto: "",
    descripcion: "",
    precio: 0,
    categoria: "",
    stockPorTalle: { S: 0, M: 0, L: 0, XL: 0, XXL: 0 },
  });

  useEffect(() => {
    verProductos();
  }, []);

  const verProductos = async () => {
    setCargando(true);
    try {
      const res = await clienteAxios.get("/productos", configHeaders());
      setProductos(res.data.productos);
    } catch (err) {
      console.error("Error al obtener productos", err);
    } finally {
      setCargando(false);
    }
  };

  const resetFormulario = () => {
    setProducto({
      nombreProducto: "",
      descripcion: "",
      precio: 0,
      categoria: "",
      stockPorTalle: { S: 0, M: 0, L: 0, XL: 0, XXL: 0 },
    });
    setImagenProducto(null);
  };

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleStockChange = (e, talle) => {
    const nuevoStock = {
      ...producto.stockPorTalle,
      [talle]: parseInt(e.target.value) || 0,
    };
    setProducto({ ...producto, stockPorTalle: nuevoStock });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    const esEdicion = modoEdicion && producto._id;

    try {
      let res;
      if (esEdicion) {
        await clienteAxios.put(
          `/productos/${producto._id}`,
          producto,
          configHeaders()
        );
        res = { data: producto };
      } else {
        const nueva = await clienteAxios.post(
          "/productos",
          producto,
          configHeaders()
        );
        res = nueva;
      }

      if (imagenProducto) {
        const formData = new FormData();
        formData.append("imagen", imagenProducto);
        await clienteAxios.post(
          `/productos/agregarImagen/${res.data._id || res.data._id}`,
          formData,
          configHeadersImagen
        );
      }

      await verProductos();
      Swal.fire({
        title: esEdicion ? "Actualizado" : "Creado",
        text: `Producto ${esEdicion ? "editado" : "creado"} correctamente`,
        icon: "success",
        confirmButtonColor: "#E966A0",
        background: "#191825",
        color: "#FAF1E6",
        iconColor: "#FB2576",
      });

      resetFormulario();
      setModalActivo(false);
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "No se pudo guardar el producto",
        icon: "error",
        confirmButtonColor: "#FB2576",
        background: "#191825",
        color: "#FAF1E6",
        iconColor: "#E966A0",
      });
    } finally {
      setCargando(false);
    }
  };

  const handleEditar = (prod) => {
    setProducto(prod);
    setModoEdicion(true);
    setModalActivo(true);
  };

  const eliminarProducto = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar producto?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#FB2576",
      cancelButtonColor: "#E966A0",
      background: "#191825",
      color: "#FAF1E6",
      iconColor: "#E384FF",
    });

    if (confirm.isConfirmed) {
      setCargando(true);
      try {
        await clienteAxios.delete(`/productos/${id}`, configHeaders());
        await verProductos();
        Swal.fire({
          title: "Eliminado",
          text: "Producto eliminado",
          icon: "success",
          confirmButtonColor: "#E966A0",
          background: "#191825",
          color: "#FAF1E6",
          iconColor: "#FB2576",
        });
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: "No se pudo eliminar",
          icon: "error",
          confirmButtonColor: "#E966A0",
          background: "#191825",
          color: "#FAF1E6",
          iconColor: "#FB2576",
        });
      } finally {
        setCargando(false);
      }
    }
  };

  return (
    <div className="relative overflow-x-auto">
      {cargando && (
        <div className="fixed inset-0 bg-black/70 z-[9999] flex flex-col items-center justify-center">
          <HashLoader color="#E966A0" />
          <p className="mt-4 text-white font-semibold">Procesando...</p>
        </div>
      )}

      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="text-xl font-bold text-gray-800">Productos</h2>
        <button
          onClick={() => {
            resetFormulario();
            setModoEdicion(false);
            setModalActivo(true);
          }}
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
            <th className="px-4 py-2">Categoría</th>
            <th className="px-4 py-2">Imagen</th>
            <th className="px-4 py-2">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p._id} className="border-t text-gray-700">
              <td className="px-4 py-2">{p.nombreProducto}</td>
              <td className="px-4 py-2">{p.descripcion}</td>
              <td className="px-4 py-2">${p.precio}</td>
              <td className="px-4 py-2">{p.categoria}</td>
              <td className="px-4 py-2">
                <img
                  src={p.imagen}
                  alt="producto"
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="px-4 py-2">
                <div className="flex gap-2 flex-wrap">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                    onClick={() => handleEditar(p)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => eliminarProducto(p._id)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalActivo && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {modoEdicion ? "Editar Producto" : "Crear Producto"}
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="nombreProducto"
                placeholder="Nombre"
                value={producto.nombreProducto}
                onChange={handleChange}
                className="w-full border p-2 mb-3 rounded"
                required
              />
              <input
                type="text"
                name="descripcion"
                placeholder="Descripción"
                value={producto.descripcion}
                onChange={handleChange}
                className="w-full border p-2 mb-3 rounded"
                required
              />
              <input
                type="number"
                name="precio"
                placeholder="Precio"
                value={producto.precio}
                onChange={handleChange}
                className="w-full border p-2 mb-3 rounded"
                required
              />

              <select
                name="categoria"
                value={producto.categoria}
                onChange={handleChange}
                className="w-full border p-2 mb-3 rounded"
                required
              >
                <option value="">Seleccionar categoría</option>
                {categorias.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <div className="grid grid-cols-3 gap-2 mb-3">
                {talles.map((talle) => (
                  <div key={talle}>
                    <label className="text-sm font-medium">{talle}</label>
                    <input
                      type="number"
                      min="0"
                      value={producto.stockPorTalle?.[talle] || 0}
                      onChange={(e) => handleStockChange(e, talle)}
                      className="w-full border p-1 rounded"
                      placeholder="0"
                    />
                  </div>
                ))}
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImagenProducto(e.target.files[0])}
                className="w-full border p-2 mb-4 rounded"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalActivo(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {modoEdicion ? "Guardar" : "Crear"}
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
