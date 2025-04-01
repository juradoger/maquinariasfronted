import React, { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreIcon from "@mui/icons-material/Restore";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownButton,
  Modal,
  Table,
} from "react-bootstrap";
import New_Maquinaria from "./new_maquinaria";
import EditMaquinaria from "./EditMaquinaria";

const List_Maquinaria = ({ datos }) => {
  const [verCosto, setVerCosto] = useState("costoUsoHora");

  const [showEdit, setShowEdit] = useState(false);
  const [selectedMaquinaria, setSelectedMaquinaria] = useState(null);

  const handleShowEdit = (maquinaria) => {
    setSelectedMaquinaria(maquinaria);
    setShowEdit(true);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
    setSelectedMaquinaria(null);
  };
  return (
    <>
      <div className="row align-items-center mb-3">
        <div className="col-sm mb-2 mb-sm-0">
          <h1 className="page-header-title fst-italic fw-bold">
            <font style={{ verticalAlign: "inherit" }}>
              <font style={{ verticalAlign: "inherit" }}>
                {datos.permiso.nombre}
              </font>
              <font style={{ verticalAlign: "inherit" }} className="ms-3 text-secondary fw-normal">
                Overview
              </font>
            </font>
          </h1>
        </div>
        <div className="col-sm-auto">
          {datos.permiso.create && (
            <New_Maquinaria nombre={datos.permiso.nombre} />
          )}
        </div>
      </div>
      <div className="card border-warning border-2 pb-3">
        <Table responsive hover borderless className="datatable-custom">
          <thead>
            <tr>
              <th className="table-column-ps-0 sorting bg-warning">Proveedor</th>
              <th className="table-column-ps-0 sorting bg-warning">Codigo</th>
              <th className="table-column-ps-0 sorting bg-warning">Equipo</th>
              <th className="table-column-ps-0 sorting bg-warning">Tipo</th>
              <th className="table-column-ps-0 sorting bg-warning p-0 m-0">
                <Dropdown>
                  <Dropdown.Toggle
                    variant="warning text-white fw-bold p-2"
                    id="dropdown-basic"
                  >
                    Costo
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setVerCosto("costoUsoHora")}>
                      Costo por hora
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setVerCosto("costoUsoDia")}>
                      Costo por día
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setVerCosto("costoUsoMes")}>
                      Costo por mes
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </th>
              <th className="table-column-ps-0 sorting bg-warning">Estado</th>
              <th className="table-column-ps-0 sorting bg-warning">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datos.data.map((maquinaria) => (
              <tr key={maquinaria.id}>
                <td
                  className="bg-warning bg-opacity-75 text-nowrap align-items-center"
                  style={{ verticalAlign: "middle" }}
                >
                  {maquinaria.detalles.Proveedor}
                </td>
                <td
                  className="bg-warning bg-opacity-75 text-nowrap align-items-center"
                  style={{ verticalAlign: "middle" }}
                >
                  {maquinaria.codigo}
                </td>
                <td className="bg-warning bg-opacity-75 text-nowrap p-0">
                  <Button
                    variant="link"
                    className="d-flex align-items-center w-100 link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover"
                  >
                    <div className="flex-shrink-0">
                      {maquinaria.portada && (
                        <img
                          className="rounded object-fit-cover"
                          src={maquinaria.portada}
                          alt={maquinaria.nombre}
                          style={{ aspectRatio: "1/1", width: "3.4rem" }}
                        />
                      )}
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h5 className="text-inherit text-start mb-0">
                        <font style={{ verticalAlign: "inherit" }}>
                          <font style={{ verticalAlign: "inherit" }}>
                            {maquinaria.nombre}
                          </font>
                        </font>
                      </h5>
                    </div>
                  </Button>
                </td>
                <td
                  className="bg-warning bg-opacity-75 text-nowrap"
                  style={{ verticalAlign: "middle" }}
                >
                  {maquinaria.tipo.join(", ")}
                </td>
                <td
                  className="bg-warning bg-opacity-75 text-nowrap"
                  style={{ verticalAlign: "middle" }}
                >
                  {maquinaria[verCosto]} bs
                </td>
                <td
                  className="bg-warning bg-opacity-75"
                  style={{ verticalAlign: "middle" }}
                >
                  <div className="d-flex align-items-center">
                    <span
                      className={`me-1 p-2 bg-${
                        maquinaria.estado == "Disponible"
                          ? "primary"
                          : maquinaria.estado == "Alquilado"
                          ? "success"
                          : "danger"
                      } border rounded-circle`}
                    ></span>
                    {maquinaria.estado}
                  </div>
                </td>
                <td
                  className="bg-warning bg-opacity-75"
                  style={{ verticalAlign: "middle" }}
                >
                  <ButtonGroup>
                    <Button variant="warning text-nowrap">
                      <VisibilityRoundedIcon /> Ver
                    </Button>
                    <div style={{ width: "2px" }}></div>
                    <DropdownButton
                      variant={`${maquinaria.deletedAt ? "danger" : "warning"}`}
                      as={ButtonGroup}
                      title=""
                      id="acciones-maquinarias"
                    >
                      <Dropdown.Item onClick={() => handleShowEdit(maquinaria)}>
                        <EditSquareIcon /> Editar
                      </Dropdown.Item>
                      {!maquinaria.deletedAt && (
                        <Dropdown.Item className="text-bg-danger">
                          <DeleteIcon /> Eliminar
                        </Dropdown.Item>
                      )}
                      {maquinaria.deletedAt && (
                        <Dropdown.Item className="text-bg-success">
                          <RestoreIcon /> Restaurar
                        </Dropdown.Item>
                      )}
                    </DropdownButton>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Modal
        show={showEdit}
        onHide={handleCloseEdit}
        backdrop="static"
        keyboard={false}
        size="lg"
        fullscreen={"lg-down"}
        scrollable
      >
        <EditMaquinaria
          maquinaria={selectedMaquinaria}
          onClose={handleCloseEdit}
        />
      </Modal>
    </>
  );
};

export default List_Maquinaria;
// <pre>{JSON.stringify(datos.data || datos.error, null, 2)}</pre>
