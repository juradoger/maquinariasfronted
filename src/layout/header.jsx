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
  );
}