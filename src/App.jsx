
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Inicio from './components/pages/Inicio'
import Menu from './components/common/Menu'
import Footer from './components/common/Footer'
function App() {
 

  return (
    <BrowserRouter>
    <div className="relative flex flex-col min-h-screen">
    <Menu/>
    <div className='flex-grow'>
    <Routes>
      <Route extact path='/' element={<Inicio/>}/>
    </Routes>
    </div>
    <Footer/>
    </div>
    </BrowserRouter>

     /*  <h1 className='text-[30px] font-bold'>Inicio Ecommerce mayorista</h1> */
    
  )
}

export default App
