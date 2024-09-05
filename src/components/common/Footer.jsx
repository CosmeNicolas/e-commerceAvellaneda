import React from "react";
import {
  BsFacebook,
  BsInstagram,
  BsHeartFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaStoreAlt } from "react-icons/fa"; //tienda icono
import luzbell from "../../img/LuzBell.svg";
import { Divider } from "@nextui-org/react";
const Footer = () => {
  return (
    <footer className="bg-negroMate  text-white pt-8 px-8">
      <section className="container mx-auto">
        <article className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <article className="flex justify-center">
            <img
              className="p-2"
              src={luzbell}
              alt="logoLuzbell"
              width={120}
              height={120}
            />
          <Divider orientation="vertical" className="bg-white mx-5"/>
          </article>
          <article className="">
            <p className="text-lg text-center text-blue-50 font-oswald font-bold ">
              Nuestras Redes
            </p>

            <ul className=" flex justify-center text-slate-200 mt-1">
              <Link to="https://www.tiktok.com/@luzbell122?lang=es">
                <li>
                  <FaTiktok className="text-[#000] " />
                </li>
              </Link>
              <Link to="https://www.facebook.com/luz.bellavellaneda.5">
                <li>
                  <BsFacebook className="text-[#1877F2] mx-3 " />
                </li>
              </Link>
              <Link to="https://www.instagram.com/luzbellavellaneda/">
                <li>
                  <BsInstagram className="text-[#E1306C] mx-1" />
                </li>
              </Link>
            </ul>
          </article>
          <article className="text-center">
            <p className="text-lg text-blue-50 font-bold">Contactanos</p>
            <ul className="text-blue-50 list-none ">
              <li className="flex justify-center">
                <FaWhatsapp className="mt-1 me-1" />
                1130516831
              </li>
            </ul>
          </article>
          <article>
            <p className="text-lg font-bold">Donde estamos</p>
            <div className="flex">
              <FaLocationDot className="mt-1 me-1" />
              <p> Av. Avellaneda 3142</p>
            </div>
            <div className="flex mb-5">
              <FaStoreAlt className="mt-1 me-1" />
              <p>www.luzbell.com.ar</p>
            </div>
          </article>
        </article>
      </section>

      <div className="bg-azul-oscuro rounded-xl flex flex-col text-center p-4">
        <p className="text-sm text-slate-200 flex  text-center justify-center">
          &copy; Todos los derechos reservados - Hecho con{" "}
          <BsHeartFill className="text-fucsia m-1" />
        </p>
      </div>
    </footer>
  );
};

export default Footer;
