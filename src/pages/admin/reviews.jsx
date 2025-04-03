import React, { useEffect, useState } from "react";
import { data } from "jquery";
import Usuario_service from "../../services/usuarios";
import List_Usuario from "../../components/usuarios/list_usuario";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import DeleteIcon from "@mui/icons-material/Delete";
import PlaylistAddCheckRoundedIcon from "@mui/icons-material/PlaylistAddCheckRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import { Button, ButtonGroup, Modal, Table } from "react-bootstrap";
import { red, green } from "@mui/material/colors";
import { FaTimes, FaRegSave } from "react-icons/fa";
import Reporte_service from "../../services/reporte";
import Review_service from "../../services/reviews";

const Reviews_page = () => {
  const [datos, setData] = useState({});

  useEffect(() => {
    const fetchList = async () => {
      const result = await Review_service();
      setData(result.data);
      console.log(result);
    };

    fetchList();
  }, []);
  return (
    <>
      <div className="container-fluid py-3">
        <div className="row align-items-center mb-3">
          <div className="col-sm mb-2 mb-sm-0">
            <h1 className="page-header-title fst-italic fw-bold">
              <font style={{ verticalAlign: "inherit" }}>
                <font style={{ verticalAlign: "inherit" }}>
                  {datos?.permiso?.nombre}
                </font>
                <font
                  style={{ verticalAlign: "inherit" }}
                  className="ms-3 text-secondary fw-normal"
                >
                  Overview
                </font>
              </font>
            </h1>
          </div>
          <div className="col-sm-auto"></div>
        </div>
        <Table responsive hover borderless className="datatable-custom">
          <thead>
            <tr>
              <th className="table-column-ps-0 sorting bg-warning">Codigo</th>
              <th className="table-column-ps-0 sorting bg-warning">Nombre</th>
              <th className="table-column-ps-0 sorting bg-warning">Estado</th>
              <th className="table-column-ps-0 sorting bg-warning">Cliente</th>
              <th className="table-column-ps-0 sorting bg-warning">
                Puntuacion
              </th>
              <th className="table-column-ps-0 sorting bg-warning">
                Comentario
              </th>
            </tr>
          </thead>
          <tbody>
            {datos?.data?.map((e) => (
              <tr key={e.id}>
                <td
                  className=" text-nowrap align-items-center fs-6"
                  style={{ verticalAlign: "middle" }}
                >
                  {e?.maquinaria?.codigo}
                </td>
                <td
                  className=" text-nowrap align-items-center fs-5"
                  style={{ verticalAlign: "middle" }}
                >
                  {e?.maquinaria?.portada && (
                    <img
                      src={e?.maquinaria?.portada}
                      alt={e.id}
                      style={{ height: "70px" }}
                      className="me-3"
                    />
                  )}
                  {e?.maquinaria?.nombre}
                </td>
                <td
                  className=" text-nowrap align-items-center fs-6"
                  style={{ verticalAlign: "middle" }}
                >
                  <div className="d-flex align-items-center">
                    <span
                      className={`me-1 p-2 bg-${
                        e?.maquinaria?.estado == "Disponible"
                          ? "primary"
                          : e?.maquinaria?.estado == "Alquilado"
                          ? "success"
                          : "danger"
                      } border rounded-circle`}
                    ></span>
                    {e?.maquinaria?.estado}
                  </div>
                </td>
                <td
                  className=" text-nowrap align-items-center fs-6"
                  style={{ verticalAlign: "middle" }}
                >
                  {e?.usuario?.nombre} {e?.usuario?.apellido}
                </td>
                <td
                  className=" text-nowrap align-items-center fs-6"
                  style={{ verticalAlign: "middle" }}
                >
                  {e.puntuacion}
                </td>
                <td
                  className=" text-nowrap align-items-center fs-6"
                  style={{ verticalAlign: "middle" }}
                >
                  {e.comentario}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Reviews_page;
