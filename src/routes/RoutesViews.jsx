import { Routes, Route } from 'react-router-dom';
import Inicio from "../components/pages/Inicio";
import Menu from "../components/common/Menu";
import Error404 from "../components/pages/Error404";
import Contacto from "../components/pages/Contacto";
import DetalleProducto from '../components/fragments/DetalleProducto';
import Footer from '../components/common/Footer';
import Login from '../components/pages/Login'; // Importa el componente de Login
import Registro from '../components/pages/Registro'; // Importa el componente de Registro
import Administrador from '../components/admin/Administrador'; // Importa el componente de Administrador
import CardProductos from '../components/fragments/CardProductos';
import Carrito from '../components/pages/Carrito'; // Importa el componente de Carrito


const RoutesViews = () => {
  return (
    <div className="min-h-screen bg-cover bg-center fondo" >
      <Menu />
      <div className="flex-grow">
        <Routes>
          <Route exact path="/" element={<Inicio />} />
          <Route exact path="/error404" element={<Error404 />} />
          <Route exact path="/detalleProducto/:idProducto" element={<DetalleProducto />} />
          <Route exact path="/contacto" element={<Contacto />} />
          {/* Agrega las rutas de Login y Registro */}
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/registro" element={<Registro />} />
          <Route exact path="/administrador" element={<Administrador />} />
          <Route exact path="/productos" element={<CardProductos/>}/>
          <Route exact path="/carrito" element={<Carrito />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default RoutesViews;