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
import Grafico from "../../custom/grafico";

const Reporte_page = () => {
  const initialData = JSON.parse(localStorage.getItem("grafica"));
  const [datos, setData] = useState({});

  useEffect(() => {
    const fetchList = async () => {
      const result = await Reporte_service();
      setData(result.data);

      const localData = result?.data?.horas?.map((hora, index) => ({
        name: hora,
        ganancia: result.data.ganancias[index],
        perdida: result.data.perdidas[index],
      }));

      // Guardar en localStorage
      localStorage.setItem("grafica", JSON.stringify(localData));
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
                <font style={{ verticalAlign: "inherit" }}>Reporte</font>
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
        <div className="bg-body-tertiary p-3 mb-3 rounded-3">
          <Grafico initialData={initialData} />
          <div className="row mt-3 text-center px-5">
            <div className="col bg-success rounded-start-pill">
              <h2 className="fw-bolder">Ganancias: {datos?.totalGanancia} Bs</h2>
            </div>
            <div className="col bg-danger rounded-end-pill">
              <h2 className="fw-bolder">Perdidas: {datos?.totalPerdida} Bs</h2>
            </div>
          </div>
        </div>
        <Table responsive hover borderless className="datatable-custom">
          <thead>
            <tr>
              <th className="table-column-ps-0 sorting bg-warning">Codigo</th>
              <th className="table-column-ps-0 sorting bg-warning">Nombre</th>
              <th className="table-column-ps-0 sorting bg-warning">Marca</th>
              <th className="table-column-ps-0 sorting bg-warning">Modelo</th>
              <th className="table-column-ps-0 sorting bg-warning">
                Proveedor
              </th>
              <th className="table-column-ps-0 sorting bg-warning">Estado</th>
              <th className="table-column-ps-0 sorting bg-warning text-nowrap">
                Total mantenimiento
              </th>
            </tr>
          </thead>
          <tbody>
            {datos?.maquinarias?.map((e) => (
              <tr key={e.id}>
                <td
                  className=" text-nowrap align-items-center fs-6"
                  style={{ verticalAlign: "middle" }}
                >
                  {e.codigo}
                </td>
                <td
                  className=" text-nowrap align-items-center fw-bold fs-5"
                  style={{ verticalAlign: "middle" }}
                >
                  {e?.portada && (
                    <img
                      src={e?.portada}
                      alt={e.id}
                      style={{ height: "70px" }}
                      className="me-3"
                    />
                  )}
                  {e.nombre}
                </td>
                <td
                  className=" text-nowrap align-items-center fs-6"
                  style={{ verticalAlign: "middle" }}
                >
                  {e.marca}
                </td>
                <td
                  className=" text-nowrap align-items-center fs-6"
                  style={{ verticalAlign: "middle" }}
                >
                  {e.modelo}
                </td>
                <td
                  className=" text-nowrap align-items-center fs-6"
                  style={{ verticalAlign: "middle" }}
                >
                  {e.detalles.Proveedor == null
                    ? "Marcos Zamorano"
                    : e.detalles.Proveedor}
                </td>
                <td
                  className=" text-nowrap align-items-center fs-6"
                  style={{ verticalAlign: "middle" }}
                >
                  <div className="d-flex align-items-center">
                    <span
                      className={`me-1 p-2 bg-${
                        e.estado == "Disponible"
                          ? "primary"
                          : e.estado == "Alquilado"
                          ? "success"
                          : "danger"
                      } border rounded-circle`}
                    ></span>
                    {e.estado}
                  </div>
                </td>
                <td
                  className=" text-nowrap align-items-center fs-6"
                  style={{ verticalAlign: "middle" }}
                >
                  {e.totalMantenimientos} mantenimientos
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Reporte_page;
