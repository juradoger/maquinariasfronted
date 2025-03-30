import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <h5>Slider</h5>
      <NavLink to="/admin/roles">
        Roles
      </NavLink>
    </>
  );
};

export default Sidebar;
