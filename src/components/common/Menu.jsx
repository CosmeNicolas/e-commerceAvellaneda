// src/components/common/Menu.jsx
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Button,
} from "@nextui-org/react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter
} from "@heroui/drawer";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../img/LuzBell.svg";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { useCart } from "../helpers/CartContexts";
import Swal from "sweetalert2";
import { isAdmin, isLoggedIn, getUserName, logout } from "../../config/auth";



const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { carrito } = useCart();
  const totalItems = carrito.length;
  const nombreUsuario = getUserName();
  

console.log(nombreUsuario)

  const menuItems = [
    { path: '/', name: 'Inicio' },
    { path: '/productos', name: 'Productos' },
    { path: '/contacto', name: 'Contacto' },
    { path: '/carrito', name: <LiaShoppingCartSolid />, icon: true }
  ];

  const handleLogout = () => {
    Swal.fire({
      title: "Cerrar sesión",
      text: "¿Estás seguro de que deseas salir?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, salir"
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire("Sesión cerrada", "Hasta pronto", "success");
        navigate("/login");
      }
    });
  };

  return (
    <>
      <Navbar
        isBordered
        className="bg-gradient-to-b from-negroMate to-[#2A2342] border-b border-lila/20 shadow-sm"
        maxWidth="full"
      >
        <NavbarBrand>
          <Link to="/" className="flex items-center gap-2">
            <img className="w-8" src={logo} alt="LuzBell Logo" />
            <span className="hidden sm:block text-2xl font-light tracking-wider bg-gradient-to-r from-rosa to-fucsia bg-clip-text text-transparent font-cormorant uppercase">
              LuzBell Mayorista
            </span>
          </Link>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-1" justify="center">
          {menuItems.map((item) => (
            <NavbarItem
              key={item.path}
              isActive={location.pathname === item.path}
            >
              <Link
                to={item.path}
                className={`relative flex items-center justify-center rounded-full transition-all px-4 py-2 ${
                  location.pathname === item.path
                    ? "bg-gradient-to-r from-rosa/80 to-fucsia/80 text-white shadow-md"
                    : item.icon
                    ? "text-blanco hover:bg-white/10"
                    : "text-blanco hover:text-rosa hover:bg-white/10"
                }`}
              >
                {item.path === "/carrito" ? (
                  <div className="relative">
                    <LiaShoppingCartSolid size={22} />
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-rosa text-white text-xs font-bold px-1.5 py-0.5 rounded-full leading-none">
                        {totalItems}
                      </span>
                    )}
                  </div>
                ) : (
                  item.name
                )}
              </Link>
            </NavbarItem>
          ))}

          {isAdmin() && (
            <NavbarItem>
              <Link
                to="/administrador"
                className="text-blanco hover:text-fucsia hover:bg-white/10 px-4 py-2 rounded-full border border-lila/30"
              >
                Administrar
              </Link>
            </NavbarItem>
          )}
        </NavbarContent>

        <NavbarContent justify="end" className="hidden sm:flex gap-2">
          {isLoggedIn() ? (
            <>
              <span className="text-white/80 px-2">Hola, {nombreUsuario}❤️</span>
              <Button
                onClick={handleLogout}
                className="bg-white/5 text-blanco hover:bg-white/10 border border-lila/30"
              >
                Cerrar sesión
              </Button>
            </>
          ) : (
            <>
              <Button as={Link} to="/login" className="bg-white/5 text-blanco hover:bg-white/10 border border-lila/30">
                Iniciar sesión
              </Button>
              <Button as={Link} to="/registro" className="bg-white/5 text-blanco hover:bg-white/10 border border-lila/30">
                Registrarse
              </Button>
            </>
          )}
        </NavbarContent>

        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          className="sm:hidden text-blanco"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </Navbar>

      {/* Mobile Drawer */}
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
              {menuItems.map((item) => (
                <Button
                  key={item.path}
                  as={Link}
                  to={item.path}
                  fullWidth
                  className={`justify-start h-14 text-lg ${
                    location.pathname === item.path
                      ? "bg-gradient-to-r from-rosa to-fucsia text-white"
                      : "bg-transparent text-blanco hover:bg-white/10"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Button>
              ))}

              {isAdmin() && (
                <Button
                  as={Link}
                  to="/administrador"
                  fullWidth
                  className="justify-start h-14 text-lg bg-white/5 text-blanco hover:bg-white/10 border border-lila/30"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Administrar
                </Button>
              )}

              {isLoggedIn() ? (
                <>
                  <span className="text-white/80 px-2">Hola, {nombreUsuario}❤️</span>

                  <Button
                    fullWidth
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                    className="justify-start h-14 text-lg bg-white/5 text-blanco hover:bg-white/10 border border-lila/30"
                  >
                    Cerrar sesión
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    as={Link}
                    to="/login"
                    fullWidth
                    className="justify-start h-14 text-lg bg-white/5 text-blanco hover:bg-white/10 border border-lila/30"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Iniciar sesión
                  </Button>
                  <Button
                    as={Link}
                    to="/registro"
                    fullWidth
                    className="justify-start h-14 text-lg bg-white/5 text-blanco hover:bg-white/10 border border-lila/30"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Registrarse
                  </Button>
                </>
              )}
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