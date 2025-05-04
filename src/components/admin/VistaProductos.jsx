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
    categoria: "",
    stockPorTalle: { S: 0, M: 0, L: 0, XL: 0, XXL: 0 }
  });
  const [productoEdit, setProductoEdit] = useState(null);
  const [imagenProducto, setImagenProducto] = useState(null);

  const verProductos = async () => {
    setCargando(true);
    try {
      const result = await clienteAxios.get("/productos", configHeaders());
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

  const categorias = [
    'COLECCION OTOÑO INVIERNO 2025',
    'CAMPERAS Y ABRIGOS',
    'CHALECOS',
    'POLLERAS Y SHORT',
    'SASTRERIA',
    'PANTALON',
    'CAMISAS Y REMERAS'
  ];

  const talles = ['S', 'M', 'L', 'XL', 'XXL'];

  const crearProducto = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      const res = await clienteAxios.post(
        "/productos",
        nuevoProducto,
        configHeaders()
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
      setNuevoProducto({
        nombreProducto: "",
        descripcion: "",
        precio: 0,
        categoria: "",
        stockPorTalle: { S: 0, M: 0, L: 0, XL: 0, XXL: 0 }
      });
      setImagenProducto(null);
      await verProductos();
      Swal.fire({
        title: "Éxito",
        text: "Producto creado correctamente",
        icon: "success",
        confirmButtonColor: "#E966A0",
        background: "#191825",
        color: "#FAF1E6",
        iconColor: "#FB2576"
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudo crear el producto",
        icon: "error",
        confirmButtonColor: "#FB2576",
        background: "#191825",
        color: "#FAF1E6",
        iconColor: "#E966A0"
      });
    } finally {
      setCargando(false);
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
            <th className="px-4 py-2">Categoría</th>
            <th className="px-4 py-2">Imagen</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto._id} className="border-t text-gray-700">
              <td className="px-4 py-2">{producto.nombreProducto}</td>
              <td className="px-4 py-2">{producto.descripcion}</td>
              <td className="px-4 py-2">${producto.precio}</td>
              <td className="px-4 py-2">{producto.categoria}</td>
              <td className="px-4 py-2">
                <img
                  src={producto.imagen}
                  alt="producto"
                  className="w-16 h-16 object-cover"
                />
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
              <label className="block font-semibold mb-1">Nombre del producto</label>
              <input
                type="text"
                name="nombreProducto"
                value={nuevoProducto.nombreProducto}
                onChange={handleChangeNuevoProducto}
                className="w-full border p-2 mb-3 rounded"
                placeholder="Ej: Campera acolchada"
                required
              />

              <label className="block font-semibold mb-1">Descripción</label>
              <input
                type="text"
                name="descripcion"
                value={nuevoProducto.descripcion}
                onChange={handleChangeNuevoProducto}
                className="w-full border p-2 mb-3 rounded"
                placeholder="Ej: Campera invierno con cierre y capucha"
                required
              />

              <label className="block font-semibold mb-1">Precio</label>
              <input
                type="number"
                name="precio"
                value={nuevoProducto.precio}
                onChange={handleChangeNuevoProducto}
                className="w-full border p-2 mb-3 rounded"
                placeholder="Ej: 15999"
                required
              />

              <label className="block font-semibold mb-1">Categoría</label>
              <select
                name="categoria"
                value={nuevoProducto.categoria}
                onChange={handleChangeNuevoProducto}
                className="w-full border p-2 mb-3 rounded"
                required
              >
                <option value="">Seleccionar categoría</option>
                {categorias.map((cat, i) => (
                  <option key={i} value={cat}>{cat}</option>
                ))}
              </select>

              <label className="block font-semibold mb-1">Stock por talle</label>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {talles.map((talle) => (
                  <div key={talle} className="flex flex-col">
                    <label className="text-sm font-medium">{talle}</label>
                    <input
                      type="number"
                      min="0"
                      value={nuevoProducto.stockPorTalle?.[talle] || 0}
                      onChange={(e) => {
                        const nuevoStock = { ...nuevoProducto.stockPorTalle, [talle]: parseInt(e.target.value) || 0 };
                        setNuevoProducto({ ...nuevoProducto, stockPorTalle: nuevoStock });
                      }}
                      className="border p-1 rounded"
                      placeholder="0"
                    />
                  </div>
                ))}
              </div>

              <label className="block font-semibold mb-1">Imagen del producto</label>
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
    </div>
  );
};

export default VistaProductos;