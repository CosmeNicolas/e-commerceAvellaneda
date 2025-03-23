import { Routes, Route } from 'react-router-dom';
import Inicio from "../components/pages/Inicio";
import Menu from "../components/common/Menu";
import Error404 from "../components/pages/Error404";
import Contacto from "../components/pages/Contacto";
import DetalleProducto from '../components/fragments/DetalleProducto';
import Footer from '../components/common/Footer';
import LoginPage from '../components/pages/Login'; // Importa el componente de Login
import Registro from '../components/pages/Registro'; // Importa el componente de Registro

const RoutesViews = () => {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Menu />
      <div className="flex-grow">
        <Routes>
          <Route exact path="/" element={<Inicio />} />
          <Route exact path="/error404" element={<Error404 />} />
          <Route exact path="/detalleProducto/:idProducto" element={<DetalleProducto />} />
          <Route exact path="/contacto" element={<Contacto />} />
          {/* Agrega las rutas de Login y Registro */}
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/registro" element={<Registro />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default RoutesViews;