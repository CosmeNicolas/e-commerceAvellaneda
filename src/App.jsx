import { BrowserRouter as Router } from "react-router-dom";
import RoutesViews from "./routes/RoutesViews";
import RoutesViews from "./routes/RoutesViews";

function App() {
  return (
    <BrowserRouter>
      <div className="relative flex flex-col min-h-screen ">
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
