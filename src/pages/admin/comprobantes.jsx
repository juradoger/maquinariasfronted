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
import Comprobante_service from "../../services/comprobante";

const Comprobantes_page = () => {
  const [datos, setData] = useState({});

  useEffect(() => {
    const fetchList = async () => {
      const result = await Comprobante_service();
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
            <h1 className="page-header-title fw-bold">
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
              <th className="table-column-ps-0 sorting bg-warning text-nowrap">
                Estado pago
              </th>
              <th className="table-column-ps-0 sorting bg-warning text-nowrap">
                Metodo pago
              </th>
              <th className="table-column-ps-0 sorting bg-warning">Monto</th>
              <th className="table-column-ps-0 sorting bg-warning text-nowrap">
                Estado reserva
              </th>
              <th className="table-column-ps-0 sorting bg-warning">
                Fecha inicio
              </th>
              <th className="table-column-ps-0 sorting bg-warning">
                Fecha fin
              </th>
              <th className="table-column-ps-0 sorting bg-warning">Cliente</th>
            </tr>
          </thead>
          <tbody>
            {datos?.data?.map((e) => (
              <tr key={e.id}>
                <td
                  className=" text-nowrap align-items-center fs-6"
                  style={{ verticalAlign: "middle" }}
                >
                  {e.estadoPago}
                </td>
                <td
                  className=" text-nowrap align-items-center fs-6"
                  style={{ verticalAlign: "middle" }}
                >
                  {e.metodoPago}
                </td>
                <td
                  className=" text-nowrap align-items-center fs-6"
                  style={{ verticalAlign: "middle" }}
                >
                  {e.monto} Bs
                </td>
                <td
                  className=" text-nowrap align-items-center fs-6"
                  style={{ verticalAlign: "middle" }}
                >
                  {e?.reservado?.estado}
                </td>
                <td
                  className=" text-nowrap align-items-center fs-6"
                  style={{ verticalAlign: "middle" }}
                >
                  {e?.reservado?.fechaInicio
                    ? new Date(e.reservado.fechaInicio).toLocaleDateString(
                        "es-ES"
                      )
                    : ""}
                </td>
                <td
                  className="text-nowrap align-items-center fs-6"
                  style={{ verticalAlign: "middle" }}
                >
                  {e?.reservado?.fechaFin
                    ? new Date(e.reservado.fechaFin).toLocaleDateString("es-ES")
                    : ""}
                </td>
                <td
                  className=" text-nowrap align-items-center fs-6"
                  style={{ verticalAlign: "middle" }}
                >
                  {e?.reservado?.cliente?.nombre}{" "}
                  {e?.reservado?.cliente?.apellido}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Comprobantes_page;
