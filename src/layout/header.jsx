import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaSignInAlt,
  FaBars,
} from "react-icons/fa";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LoginForm from "../custom/loginform";
import { Perfil_Service } from "../services/Auth_service";

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Máquinas en Alquiler", href: "/maquinas" },
  { name: "Administración", href: "/administracion" },
  { name: "Contáctenos", href: "/contacto" },
  { name: "Ayuda", href: "/ayuda" },
];

export default function Header() {
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No hay token, no se puede obtener el perfil.");
    } else {
      Perfil_Service().then((result) => {
        setPerfil(result.data);

        if (result.status === 200) {
          console.log("Perfil cargado:", result.data);
        } else {
          console.log(result);
        }
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_data");

    console.log("Sesión cerrada.");
    window.location.href = "/";
  };

  const expand = "lg";
  return (
    <>
      <Navbar
        key={expand}
        expand={expand}
        className="sticky-top bg-warning"
        data-bs-theme="light"
      >
        <Container fluid>
          <NavLink to="/" className="navbar-brand">
            <img
              src="/src/assets/logo.webp"
              alt="RentMaq360 Logo"
              style={{ height: "150px", width: "auto" }}
            />
          </NavLink>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-${expand}`}
            className="mt-6 p-0"
          >
            <FaBars fontSize={40} className="text-black" />
          </Navbar.Toggle>
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
            data-bs-theme="dark"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                <img
                  src="/src/assets/logo.webp"
                  alt="RentMaq360 Logo"
                  style={{ height: "100px", width: "auto" }}
                />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="bg-warning">
              <Nav className="justify-content-between flex-grow-1 pe-3 mt-lg-6">
                <NavLink
                  to="/"
                  className="text-black fs-5 fw-bolder text-nowrap nav-link"
                >
                  Inicio
                </NavLink>
                <NavLink
                  to="/lista"
                  className="text-black fs-5 fw-bolder text-nowrap nav-link"
                >
                  Máquinas en Alquiler
                </NavLink>
                {/* 
                {!perfil && (
                  <NavLink
                    to="/lista"
                    className="text-black fs-5 fw-bolder text-nowrap nav-link"
                  >
                    Máquinas en Alquiler
                  </NavLink>
                )}
                {perfil && (
                  <NavDropdown
                    className="text-black fs-5 fw-bolder text-nowrap"
                    title="Máquinas en Alquiler"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item className="fs-5" as={NavLink} to="/lista">
                      Buscar Maquinarias
                    </NavDropdown.Item>
                    <NavDropdown.Item className="fs-5">
                      Maquinarias Seleccionadas
                    </NavDropdown.Item>
                  </NavDropdown>
                )}*/}
                {perfil && perfil.roles && perfil.roles.length > 0 && (
                  <NavDropdown
                    className="text-black fs-5 fw-bolder text-nowrap"
                    title="Administración"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    {perfil.roles.map((rol, index) => (
                      <NavDropdown.Item
                        key={index}
                        as={NavLink}
                        to={rol.url}
                        className="fs-5"
                      >
                        {rol.nombre}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                )}
                <NavLink
                  to="/contacto"
                  className="text-black fs-5 fw-bolder text-nowrap nav-link"
                >
                  Contactenos
                </NavLink>
                <NavLink
                  to="/ayuda"
                  className="text-black fs-5 fw-bolder text-nowrap nav-link"
                >
                  Ayuda
                </NavLink>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
        <div className="position-absolute end-0 top-0 pt-3 pe-5">
          {!perfil && <LoginForm />}
          {perfil && (
            <>
              <NavLink to="/usuario/perfil" className="btn btn-warning btn-lg">
                <FaUserCircle fontSize={35} className="text-black" />
              </NavLink>
              <Button variant="warning" size="lg" onClick={handleLogout}>
                <FaSignOutAlt fontSize={35} className="text-black" />
              </Button>
            </>
          )}
        </div>
      </Navbar>
    </>
  );
}
