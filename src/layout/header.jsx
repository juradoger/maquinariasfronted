import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Máquinas en Alquiler", href: "/maquinas" },
  { name: "Administración", href: "/administracion" },
  { name: "Contáctenos", href: "/contacto" },
  { name: "Ayuda", href: "/ayuda" },
];

export default function Header() {
  return (
<<<<<<< HEAD
    <nav className="bg-warning shadow">
      <div className="container-fluid px-0">
        <div className="d-flex align-items-center">
          {/* Logo con tamaño fijo */}
          <div className="py-1 px-3">
            <NavLink to="/" className="d-flex align-items-center">
              <img
                src="/src/assets/logo.png"
                alt="RentMaq360 Logo"
                style={{ height: "180px", width: "auto" }}
              />
            </NavLink>
          </div>

          {/* Navegación - mantiene espacio proporcional */}
          <div className="flex-grow-1 d-flex justify-content-center">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) => 
                  `px-4 py-3 text-dark fw-bold text-decoration-none fs-5 ${
                    isActive ? "text-white" : ""
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Íconos de usuario y logout */}
          <div className="d-flex align-items-center gap-4 px-4">
            <FaUserCircle size={28} className="text-dark" />
            <FaSignOutAlt size={28} className="text-dark" />
          </div>
        </div>
      </div>
    </nav>
=======
    <>
      <h1>Nayeli</h1>
      <Disclosure as="nav" className="shadow dark:bg-[#240d06] bg-[#fef6f4]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            {/* Botón para menú móvil */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white">
                <MenuIcon
                  aria-hidden="true"
                  className="block size-6 group-data-open:hidden"
                />
                <CloseIcon
                  aria-hidden="true"
                  className="hidden size-6 group-data-open:block"
                />
              </DisclosureButton>
            </div>

            {/* Logo y navegación */}
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex items-center">
                <img className="h-8 w-auto" src="/vite.svg" alt="Logo" />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        classNames(
                          isActive
                            ? "bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
                            : "text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>

            {/* Controles */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Botón de notificaciones */}
              <button className="relative rounded-full bg-gray-200 dark:bg-gray-800 p-1 text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white">
                <NotificationsNoneOutlinedIcon className="size-6" />
              </button>

              {/* Toggle de tema */}
              <ThemeToggle />

              <LoginForm />

              {/* Menú de usuario */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-200 dark:bg-gray-800 text-sm">
                    <img
                      className="size-8 rounded-full"
                      src="https://via.placeholder.com/32"
                      alt="Usuario"
                    />
                  </MenuButton>
                </div>
                <MenuItems className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <MenuItem>
                    <NavLink className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Perfil
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <NavLink className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Configuración
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <NavLink className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Cerrar sesión
                    </NavLink>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>

        {/* Menú móvil */}
        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as={NavLink}
                to={item.href}
                className={({ isActive }) =>
                  classNames(
                    isActive
                      ? "bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
                      : "text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )
                }
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>
    </>
>>>>>>> e6881ae52febced7be8fa6038daf6a98330a42c7
  );
}