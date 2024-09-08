import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Inicio from "./components/pages/Inicio";
import Menu from "./components/common/Menu";
import Footer from "./components/common/Footer";
import Error404 from "./components/pages/Error404";
import DetalleProducto from "./components/fragments/DetalleProducto";
import Contacto from "./components/pages/Contacto";
function App() {
  return (
    <BrowserRouter>
      <div className="relative flex flex-col min-h-screen">
        <Menu />
        <div className="flex-grow">
          <Routes>
            <Route exact path="/" element={<Inicio />} />
            <Route exact path="/error404" element={<Error404 />} />
            <Route
              exact
              path="/detalleProducto"
              element={<DetalleProducto />}
            />
            <Route
            exact path='/contacto' element={<Contacto/>}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>

    /*  <h1 className='text-[30px] font-bold'>Inicio Ecommerce mayorista</h1> */
  );
}

export default App;
