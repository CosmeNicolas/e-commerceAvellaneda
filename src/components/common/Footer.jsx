import React from 'react'
import { BsFacebook, BsInstagram,  BsLinkedin, BsHeartFill} from "react-icons/bs";
import { Link } from 'react-router-dom';
import { FaWhatsapp } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaStoreAlt } from "react-icons/fa"; //tienda icono
import luzbell from '../../img/LuzBell.svg'
const Footer = () => {
  return (
    <footer className="bg-negroMate  text-white pt-8 px-8">
      <section className='container mx-auto'>
        <article className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap 4'>
      <article>
        <img src={luzbell} alt="logoLuzbell" width={100} height={100} />
        Donde estamos ?
        <FaLocationDot />
        <p> Av. Avellaneda 3142</p>
        <FaStoreAlt />
        <p>www.luzbell.com.ar</p>
      </article>
      <article className="">

        <p className="text-lg text-center text-blue-50 font-oswald font-bold ">
          Nuestras Redes
        </p>
        <ul className="flex items-center justify-around  text-slate-200 mt-1">
          <Link to="https://www.tiktok.com/@luzbell122?lang=es">
            <li>
              <FaTiktok className="text-[#000] " />
            </li>
          </Link>
          <Link to="https://www.facebook.com/luz.bellavellaneda.5">
            <li>
              <BsFacebook className="text-[#1877F2] " />
            </li>
          </Link>
          <Link to="https://www.instagram.com/luzbellavellaneda/">
            <li>
              <BsInstagram className="text-[#E1306C] mx-1" />
            </li>
          </Link>
        </ul>
      </article>
      <article>
        <p className="text-lg text-blue-50 font-bold">Contactanos</p>
        <ul className="text-blue-50 list-none ">
          <li className="flex">
            <FaWhatsapp  />
            1130516831
          </li>
        </ul>
      </article>
      </article>
      </section>
          <hr />
      <div className="bg-azul-oscuro rounded-xl flex flex-col text-center p-4">
        <p className="text-sm text-slate-200 flex  text-center justify-center">
          &copy; Todos los derechos reservados - 
          Hecho con <BsHeartFill className="text-fucsia m-1" />
        </p>
      </div>
    </footer>
  );
}

export default Footer