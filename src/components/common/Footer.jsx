import React from 'react'
import { BsFacebook, BsInstagram,  BsLinkedin, BsHeartFill} from "react-icons/bs";
import { Link } from 'react-router-dom';
import { FaWhatsapp } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaStoreAlt } from "react-icons/fa"; //tienda icono
const Footer = () => {
  return (
    <footer className="bg-negroMate  ">
  <article className="text-center">
     Donde estamos ? 
     <FaLocationDot />
     <p> Av. Avellaneda 3142</p>
     <FaStoreAlt /><p>www.luzbell.com.ar</p>
    </article> 
    <article className=''>
      
        <p className="text-lg text-blue-50 font-oswald font-bold mx-1">
          Sigueme
        </p>
        <ul className="flex  justify-between   text-slate-200 mt-1">
          <Link to="https://www.tiktok.com/@luzbell122?lang=es">
            <li>
              <FaTiktok className="text-[#000] mx-1"/>
            </li>
          </Link>
          <Link to="https://www.facebook.com/luz.bellavellaneda.5">
            <li>
              <BsFacebook className="text-[#1877F2] mx-1" />
            </li>
          </Link>
          <Link to='https://www.instagram.com/luzbellavellaneda/'>
            <li>
              <BsInstagram className="text-[#E1306C] mx-1" />
            </li>
          </Link>
         
        </ul>
  
    </article>
    <article>
      <p className='text-lg text-blue-50 font-bold'>Contactanos</p>
      <ul className='text-blue-50 list-none '>
        <li className='flex'>
        <FaWhatsapp className='mt-1 me-1' />1130516831
        </li>
      </ul>
    </article>
    <div className="bg-azul-oscuro rounded-xl p-4">
        <p className="text-lg text-slate-200">
          &copy; Todos los derechos reservados
        </p>
        <p className=" text-slate-200 text-lg flex flex-row justify-center ">Hecho con <BsHeartFill className='text-fucsia m-1' /> </p>
      </div>
  </footer>
  )
}

export default Footer