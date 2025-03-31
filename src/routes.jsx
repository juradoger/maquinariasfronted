import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio_page from "./pages/site/inicio";
import Ayuda_page from "./pages/site/ayuda";
import Roles_page from "./pages/admin/roles";
import Lista_maquinaria from "./pages/site/listamaquinaria"; // Corregido
import Header from "./layout/header";
import Footer from "./layout/footer";
import Sidebar from "./layout/sidebar";

const Mis_routes = () => {
  const [sideMenuIsExpand, setSideMenuIsExpand] = useState(true);
  return (
    <BrowserRouter>
      <Header />
      <Sidebar setExpand={setSideMenuIsExpand} />
      <div
        className={`flex-1 min-h-screen mx-0 transition-all duration-300 ease-in-out ${
          sideMenuIsExpand ? "md:ml-72" : "md:ml-20"
        }`}
      >
        <Routes>
          <Route path="/" element={<Inicio_page />} />
          <Route path="/ayuda" element={<Ayuda_page />} />
          <Route path="/lista" element={<Lista_maquinaria />} /> {/* Corregido */}
          <Route path="/admin/roles" element={<Roles_page />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default Mis_routes;
