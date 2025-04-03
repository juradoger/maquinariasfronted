import React, { useEffect, useState } from "react";
import { data } from "jquery";
import Usuario_service from "../../services/usuarios";
import List_Usuario from "../../components/usuarios/list_usuario";

const Usuarios_page = () => {
  const [response, setResponse] = useState({});

  useEffect(() => {
    const fetchUsuarios = async () => {
      const result = await Usuario_service();
      setResponse(result.data);
      console.log(result)
    };

    fetchUsuarios();
  }, []);
  return (
    <>
      <div className="container-fluid py-3">
        <h1 className="fw-bolder">
          Usuarios{" "}
          <span className="fs-3 fw-normal text-secondary">Overview</span>
        </h1>
        <List_Usuario data={response.data} />
      </div>
    </>
  );
};

export default Usuarios_page;
