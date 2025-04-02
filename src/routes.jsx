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
            <Route path="/lista" element={< MaquinariasList />} />
            <Route path="/contacto" element={<ContactUsPage/>} />
            <Route path="/usuario/perfil" element={<VistaPerfil/>} />
            {/* Corregido */}
            <Route path="/admin/roles" element={<Roles_page />} />
            <Route path="/admin/maquinarias" element={<Maquinarias_page />} />
            <Route path="/admin/rolespermisos" element={<RolesPermisos />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default Mis_routes;
