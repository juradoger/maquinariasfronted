import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio_page from "./pages/site/inicio";
import Roles_page from "./pages/admin/roles";
import Header from "./layout/header";
import Sidebar from "./layout/sidebar";

const Mis_routes = () => {
  const [sideMenuIsExpand, setSideMenuIsExpand] = useState(true);
  return (
    <>
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
            <Route path="/admin/roles" element={<Roles_page />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default Mis_routes;
