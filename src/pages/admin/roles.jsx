import React, { useEffect, useState } from "react";
import Roles_service from "../../services/roles";
import List_Rol from "../../components/roles/list_rol";
import { data } from "jquery";

const Roles_page = () => {
  const [response, setResponse] = useState({ status: 0, data: null });

  useEffect(() => {
    const fetchRoles = async () => {
      const result = await Roles_service();
      setResponse(result);
    };

    fetchRoles();
  }, []);
  return (
    <>
      <div className="container-fluid py-3">
        <h1>Roles</h1>
        <List_Rol datos={response} />
      </div>
    </>
  );
};

export default Roles_page;
