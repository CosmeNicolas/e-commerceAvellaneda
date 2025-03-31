import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle,
  Button
} from "@nextui-org/react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter
} from "@heroui/drawer";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from '../../img/LuzBell.svg';
import { FaShoppingCart } from "react-icons/fa";

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Menu items data for DRY principle
  const menuItems = [
    { path: '/', name: 'Inicio' },
    { path: '/productos', name: 'Productos' },
    { path: '/contacto', name: 'Contacto' },
    /* { path: '/carrito', name: <FaShoppingCart />, icon: true }, */
    { path: '/error404', name: <FaShoppingCart />, icon: true }
  ];

  const authItems = [
    { path: '/login', name: 'Iniciar Sesión' },
    { path: '/registro', name: 'Registrarse' }
  ];

  return (
    <>
      <Navbar
        isBordered
        className="bg-gradient-to-b from-negroMate to-[#2A2342] border-b border-lila/20 shadow-sm"
        maxWidth="full"
      >
        {/* Logo/Brand */}
        <NavbarBrand>
          <Link to="/" className="flex items-center gap-2">
            <img className="w-8" src={logo} alt="LuzBell Logo" />
            <span className="hidden sm:block text-2xl font-light tracking-wider bg-gradient-to-r from-rosa to-fucsia bg-clip-text text-transparent font-cormorant uppercase">
              LuzBell Mayorista
            </span>
          </Link>
        </NavbarBrand>

        {/* Desktop Navigation */}
        <NavbarContent className="hidden sm:flex gap-1" justify="center">
          {menuItems.map((item) => (
            <NavbarItem key={item.path} isActive={location.pathname === item.path}>
              <Link
                to={item.path}
                className={`px-4 py-2 rounded-full transition-all ${
                  location.pathname === item.path
                    ? 'bg-gradient-to-r from-rosa/80 to-fucsia/80 text-white shadow-md'
                    : item.icon 
                      ? 'text-blanco hover:bg-white/10 p-2'
                      : 'text-blanco hover:text-rosa hover:bg-white/10'
                }`}
              >
                {item.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        {/* Auth Buttons - Desktop */}
        <NavbarContent justify="end" className="hidden sm:flex gap-2">
          {authItems.map((item) => (
            <NavbarItem key={item.path}>
              <Button
                as={Link}
                to={item.path}
                className={`${
                  location.pathname === item.path
                    ? 'bg-gradient-to-r from-rosa to-fucsia text-white'
                    : 'bg-white/5 text-blanco hover:bg-white/10'
                } border border-lila/30`}
              >
                {item.name}
              </Button>
            </NavbarItem>
          ))}
        </NavbarContent>

        {/* Mobile Menu Toggle */}
        <NavbarMenuToggle 
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"} 
          className="sm:hidden text-blanco"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </Navbar>

      {/* Mobile Menu Drawer */}
      <Drawer 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        direction="right"
        className="sm:hidden"
        overlayClassName="bg-black/50"
      >
        <DrawerContent className="bg-gradient-to-b from-negroMate to-[#2A2342] border-l border-lila/20 h-full">
          <DrawerHeader className="flex flex-col items-center pt-16 pb-4">
            <img className="w-12" src={logo} alt="LuzBell Logo" />
            <p className="text-blanco font-bold text-lg mt-3 bg-gradient-to-r from-rosa to-fucsia bg-clip-text text-transparent">
              LuzBell Mayorista
            </p>
          </DrawerHeader>
          
          <DrawerBody className="px-4">
            <div className="flex flex-col gap-3">
              {[...menuItems, ...authItems].map((item, index) => (
                <Button
                  key={`${item.path}-${index}`}
                  as={Link}
                  to={item.path}
                  fullWidth
                  className={`justify-start h-14 text-lg ${
                    location.pathname === item.path
                      ? 'bg-gradient-to-r from-rosa to-fucsia text-white'
                      : 'bg-transparent text-blanco hover:bg-white/10'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Button>
              ))}
            </div>
          </DrawerBody>

          <DrawerFooter className="justify-center pb-8">
            <small className="text-blanco/50">© 2025 LuzBell Mayorista</small>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Menu;