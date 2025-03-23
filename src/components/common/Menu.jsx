import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button, Divider } from "@nextui-org/react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from '../../img/favicon-moda.png';
import { FaShoppingCart } from "react-icons/fa";

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <Navbar
      isBordered
      className="text-white bg-negroMate font-oswald"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarBrand>
          <Link to='/'>
            <img className="w-[30px]" src={logo} alt="logo" />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Enlaces para pantallas grandes */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={location.pathname === '/'}>
          <Link
            to="/"
            className={`font-bold ${location.pathname === '/' ? 'rounded-md bg-rosa p-2 text-[#001524]' : 'text-white'}`}
          >
            Inicio
          </Link>
        </NavbarItem>
        <NavbarItem isActive={location.pathname === '/error404'}>
          <Link
            to="/error404"
            className={`font-bold ${location.pathname === '/error404' ? 'rounded-md bg-rosa p-2 text-[#001524]' : 'text-white'}`}
          >
            Productos
          </Link>
        </NavbarItem>
        <NavbarItem isActive={location.pathname === '/contacto'}>
          <Link
            to="/contacto"
            className={`font-bold ${location.pathname === '/contacto' ? 'rounded-md bg-rosa p-2 text-[#001524]' : 'text-white'}`}
          >
            Contacto
          </Link>
        </NavbarItem>
        <NavbarItem isActive={location.pathname === '/error404'}>
          <Link
            to="/error404"
            className={`font-bold p-2 ${location.pathname === '/error404' ? 'rounded-md bg-rosa text-white' : 'text-white'}`}
          >
            <FaShoppingCart className="text-white" />
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Enlaces de Iniciar Sesión y Registrarse para pantallas grandes */}
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem>
          <Link
            to="/login"
            className={`font-bold ${location.pathname === '/login' ? 'rounded-md bg-rosa p-2 text-[#001524]' : 'text-white'}`}
          >
            Iniciar Sesión
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            to="/registro"
            className={`font-bold ${location.pathname === '/registro' ? 'rounded-md bg-rosa p-2 text-[#001524]' : 'text-white'}`}
          >
            Registrarse
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Menú para pantallas pequeñas */}
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden menu-toggle"
      />
      <NavbarMenu
        className={`sm:hidden mx-auto backdrop-filter backdrop-blur-md bg-opacity-70 rounded-2xl p-5 bg-[#8b89892a] shadow-lg overflow-y-auto flex flex-col justify-center`}
      >
        <Link to='/'>
          <img className="mx-auto" src={logo} alt="logo" />
          <p className="text-center text-white font-bold text-lg">Luz Bell Mayorista</p>
        </Link>

        <NavbarMenuItem>
          <Button variant="bordered" as={Link} className="w-full flex justify-center font-bold my-1 bg-fucsia border-black text-white" to='/'>
            Inicio
          </Button>
          <Button variant="bordered" as={Link} className="w-full flex justify-center font-bold bg-fucsia border-black text-white my-1" to='/error404'>
            Productos
          </Button>
          <Button variant="bordered" as={Link} className="w-full flex justify-center font-bold bg-fucsia border-black text-white my-1" to='/contacto'>
            Contacto
          </Button>
          <Button variant="bordered" as={Link} className="w-full flex justify-center font-bold bg-fucsia border-black text-white my-1" to='/error404'>
            <FaShoppingCart />
          </Button>
          {/* Enlaces de Iniciar Sesión y Registrarse para pantallas pequeñas */}
          <Button variant="bordered" as={Link} className="w-full flex justify-center font-bold bg-fucsia border-black text-white my-1" to='/login'>
            Iniciar Sesión
          </Button>
          <Divider  orientation="vertical"/>
          <Button variant="bordered" as={Link} className="w-full flex justify-center font-bold bg-fucsia border-black text-white my-1" to='/registro'>
            Registrarse
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}

export default Menu;