import { Routes, Route } from 'react-router-dom';
import Inicio from "../components/pages/Inicio";
import Menu from "../components/common/Menu";
import Error404 from "../components/pages/Error404";
import Contacto from "../components/pages/Contacto";
import DetalleProducto from '../components/fragments/DetalleProducto';
import Footer from '../components/common/Footer';
import Login from '../components/pages/Login';
import Registro from '../components/pages/Registro';
import Administrador from '../components/admin/Administrador';
import CardProductos from '../components/fragments/CardProductos';
import Carrito from '../components/pages/Carrito';
import RutaProtegida from './RutaProtegida';
import WhatsAppButton from '../components/common/WhatsAppButton';

import PagoExitoso from "../components/pages/PagoExitoso";
import PagoFallido from "../components/pages/PagoFallido";
import PagoPendiente from "../components/pages/PagoPendiente";

// ... resto de tus imports

const RoutesViews = () => {
  return (
    <div className="min-h-screen bg-cover bg-center fondo">
      <Menu />
      <div className="flex-grow">
        <Routes>
          <Route exact path="/" element={<Inicio />} />
          <Route exact path="/error404" element={<Error404 />} />
          <Route exact path="/detalleProducto/:idProducto" element={<DetalleProducto />} />
          <Route exact path="/contacto" element={<Contacto />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/registro" element={<Registro />} />
          <Route exact path="/productos" element={<CardProductos />} />
          <Route exact path="/carrito" element={<Carrito />} />

          {/* NUEVAS RUTAS DE PAGO */}
          <Route exact path="/pago-exitoso" element={<PagoExitoso />} />
          <Route exact path="/pago-pendiente" element={<PagoPendiente />} />
          <Route exact path="/pago-fallido" element={<PagoFallido />} />

          <Route
            exact
            path="/administrador"
            element={
              <RutaProtegida soloAdmin={true}>
                <Administrador />
              </RutaProtegida>
            }
          />
        </Routes>
      </div>
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default RoutesViews;