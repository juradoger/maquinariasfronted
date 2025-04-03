import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio_page from "./pages/site/inicio";
import Ayuda_page from "./pages/site/ayuda";
import Roles_page from "./pages/admin/roles";
import Header from "./layout/header";
import Footer from "./layout/footer";
import Sidebar from "./layout/sidebar";
import Maquinarias_page from "./pages/admin/maquinarias";
import ContactUsPage from "./pages/site/contactos";
import VistaPerfil from "./pages/site/vistaperfil";
import MaquinariasList from "./pages/site/listamaquinaria";
import RolesPermisos from "./pages/admin/rolespermisos";
import DetalleMaquinaria from "./pages/site/detalle-maquinaria";
import Usuarios_page from "./pages/admin/usuarios";
import Reporte_page from "./pages/admin/reporte";
import Mantenimiento_page from "./pages/admin/mantenimientos";
import Reservas_page from "./pages/admin/reservas";
import Contratos_page from "./pages/admin/contratos";
import Reviews_page from "./pages/admin/reviews";
import Comprobantes_page from "./pages/admin/comprobantes";

const Mis_routes = () => {
  const [sideMenuIsExpand, setSideMenuIsExpand] = useState(true);
  return (
    <BrowserRouter>
      <div className="flex-grow-1">
        <Header />
        <div className="">
          <Routes>
            <Route path="/" element={<Inicio_page />} />
            <Route path="/ayuda" element={<Ayuda_page />} />
            <Route path="/lista" element={<MaquinariasList />} />
            <Route path="/contacto" element={<ContactUsPage />} />
            <Route path="/detalle" element={<DetalleMaquinaria />} />
            <Route path="/usuario/perfil" element={<VistaPerfil />} />
            {/* Corregido */}
            <Route path="/admin/usuarios" element={<Usuarios_page />} />
            <Route path="/admin/roles" element={<Roles_page />} />
            <Route path="/admin/maquinarias" element={<Maquinarias_page />} />
            <Route path="/admin/mantenimientos" element={<Mantenimiento_page />} />
            <Route path="/admin/reservas" element={<Reservas_page />} />
            <Route path="/admin/contratos" element={<Contratos_page />} />
            <Route path="/admin/reviews" element={<Reviews_page />} />
            <Route path="/admin/comprobantes" element={<Comprobantes_page />} />
            <Route path="/admin/reporte" element={<Reporte_page />} />
            <Route path="/admin/rolespermisos" element={<RolesPermisos />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default Mis_routes;
