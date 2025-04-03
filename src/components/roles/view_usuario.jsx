import React, { useEffect, useState } from "react";
import { GetRolId } from "../../services/usuarios";
import { Modal } from "react-bootstrap";
import ViewUsuario from "../usuarios/viewUsuario";
import List_Usuario from "../usuarios/list_usuario";

const ViewUsuarioRol = ({ id }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchRoles = async () => {
      const result = await GetRolId(id);
      setData(result.data);
      console.log(result.data);
    };

    fetchRoles();
  }, []);
  return (
    <>
      <Modal.Header closeButton className="border-bottom-0">
        <Modal.Title>
          <h2 className="fw-bolder">
            Usuarios{" "}
            <span className="fs-4 fw-normal text-secondary">Overview</span>
          </h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2 className="fw-bolder ms-5">
          {data.rol}{" "}
          <span className="fs-4 fw-normal text-secondary">Overview</span>
        </h2>
        <List_Usuario data={data.data}/>
      </Modal.Body>
    </>
  );
};

export default ViewUsuarioRol;
