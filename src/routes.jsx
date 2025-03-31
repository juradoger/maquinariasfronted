import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio_page from "./pages/site/inicio";
import Roles_page from "./pages/admin/roles";
import Header from "./layout/header";
import Sidebar from "./layout/sidebar";
import Maquinarias_page from "./pages/admin/maquinarias";

const Mis_routes = () => {
  const [sideMenuIsExpand, setSideMenuIsExpand] = useState(true);
  return (
    <>
      <BrowserRouter>
        <Header />
        <Sidebar setExpand={setSideMenuIsExpand} />
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<Inicio_page />} />
            <Route path="/admin/roles" element={<Roles_page />} />
            <Route path="/admin/maquinarias" element={<Maquinarias_page />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default Mis_routes;
