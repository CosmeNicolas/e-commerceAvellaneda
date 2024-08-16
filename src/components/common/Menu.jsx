import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button } from "@nextui-org/react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from '../../img/favicon-moda.png'
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

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={location.pathname === '/'}>
          <Link
            to="/"
            className={`font-bold ${location.pathname === '/' ? 'rounded-md bg-rosa p-2 text-[#001524]' : 'text-white'}`}
          >
            Inicio
          </Link>
        </NavbarItem>
        <NavbarItem isActive={location.pathname === '/donaciones'}>
          <Link
            to="/"
            className={`font-bold ${location.pathname === '/error404' ? 'rounded-md bg-rosa p-2 text-[#001524]' : 'text-white'}`}
          >
            Productos
          </Link>
        </NavbarItem>
        <NavbarItem isActive={location.pathname === '/error404'}>
          <Link
            to="/"
            className={`font-bold ${location.pathname === '/error404' ? ' rounded-md bg-rosa p-2 text-[#001524]' : 'text-white'}`}
          >
            Contacto
          </Link>
        </NavbarItem>
        <NavbarItem isActive={location.pathname === '/error404'}>
          <Link
            to="/error404"
            className={`font-bold ${location.pathname === '/error404' ? 'rounded-md bg-rosa p-2 text-[#001524]' : 'text-white'}`}
          >
            Donde estamos
          </Link>
        </NavbarItem>
        <NavbarItem isActive={location.pathname === '/error404'}>
          <Link
            to="/error404"
            className={` font-bold p-2`}
          >
          <FaShoppingCart className="text-white   "/>
          </Link>
        </NavbarItem>
        
      </NavbarContent>

      {/* Pantallas pequeñas */}
      <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden menu-toggle"
      
        />
      <NavbarMenu
        className={`sm:hidden mx-auto  backdrop-filter backdrop-blur-md bg-opacity-70 rounded-2xl p-5 bg-[#8b89892a]  shadow-lg  overflow-y-auto flex flex-col justify-center`}
      
      >

        <Link to='/'>
          <img className="mx-auto" src={logo} alt="logo" />
          <p className="text-center text-negroMate font-bold text-lg">Luz Bell Mayorista</p>
        </Link>

        <NavbarMenuItem>
          <Button variant="bordered" as={Link} className="w-full flex justify-center font-bold my-1 bg-fucsia border-black text-white" to='/'>
            Inicio
          </Button>
          <Button variant="bordered" as={Link} className="w-full flex justify-center font-bold bg-fucsia border-black text-white my-1" to='/error404'>
            Productos
          </Button>
          <Button variant="bordered" as={Link} className="w-full flex justify-center font-bold bg-fucsia border-black text-white my-1" to='/error404'>
            Contacto
          </Button>
          <Button variant="bordered" as={Link} className="w-full flex justify-center font-bold bg-fucsia border-black text-white my-1" to='/error404'>
            Donde estamos 
          </Button>
          <Button variant="bordered" as={Link} className="w-full flex justify-center font-bold bg-fucsia border-black text-white my-1" to='/error404'>
          <FaShoppingCart />
          </Button>
       
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}

export default Menu;
