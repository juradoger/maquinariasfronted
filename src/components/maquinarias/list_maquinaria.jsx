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
import { FaTimes, FaRegSave } from "react-icons/fa";
import New_Maquinaria from "./new_maquinaria";
import EditMaquinaria from "./EditMaquinaria";
import {
  DeleteMaquinaria,
  RestoreMaquinaria,
} from "../../services/maquinarias";
import ViewMaquinaria from "./viewMaquinaria";

const List_Maquinaria = ({ datos }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (maquinaria) => {
    setSelectedMaquinaria(maquinaria);
    setShow(true);
  };

  const [verCosto, setVerCosto] = useState("costoUsoHora");

  const [showEdit, setShowEdit] = useState(false);
  const [showView, setShowView] = useState(false);
  const [selectedMaquinaria, setSelectedMaquinaria] = useState(null);

  const handleShowEdit = (maquinaria) => {
    setSelectedMaquinaria(maquinaria);
    setShowEdit(true);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
    setSelectedMaquinaria(null);
  };

  const handleShowView = (maquinaria) => {
    setSelectedMaquinaria(maquinaria);
    setShowView(true);
  };

  const handleCloseView = () => {
    window.location.reload();
    setShowView(false);
    setSelectedMaquinaria(null);
  };

  const cancelRestore = async (e) => {
    if (selectedMaquinaria.deletedAt) {
      const response = await RestoreMaquinaria(selectedMaquinaria?.id);

      if (response.status === 200) {
        window.location.reload();
      } else {
        console.log(response);
      }
    } else {
      const response = await DeleteMaquinaria(selectedMaquinaria?.id);

      if (response.status === 200) {
        window.location.reload();
      } else {
        console.log(response);
      }
    }
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
              <font
                style={{ verticalAlign: "inherit" }}
                className="ms-3 text-secondary fw-normal"
              >
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
              <th className="table-column-ps-0 sorting bg-warning">
                Proveedor
              </th>
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
                    onClick={() => handleShowView(maquinaria)}
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
                    <Button
                      variant="warning text-nowrap"
                      onClick={() => handleShowView(maquinaria)}
                    >
                      <VisibilityRoundedIcon /> Ver
                    </Button>
                    {(datos.permiso.edit || datos.permiso["delete"]) && (
                      <>
                        <div style={{ width: "2px" }}></div>
                        <DropdownButton
                          variant={`${
                            maquinaria.deletedAt ? "danger" : "warning"
                          }`}
                          as={ButtonGroup}
                          title=""
                          id="acciones-maquinarias"
                        >
                          {datos.permiso.edit && (
                            <Dropdown.Item
                              onClick={() => handleShowEdit(maquinaria)}
                            >
                              <EditSquareIcon /> Editar
                            </Dropdown.Item>
                          )}
                          {!maquinaria.deletedAt && datos.permiso["delete"] && (
                            <Dropdown.Item
                              className="text-bg-danger"
                              onClick={() => handleShow(maquinaria)}
                            >
                              <DeleteIcon /> Eliminar
                            </Dropdown.Item>
                          )}
                          {maquinaria.deletedAt && datos.permiso["delete"] && (
                            <Dropdown.Item
                              className="text-bg-info"
                              onClick={() => handleShow(maquinaria)}
                            >
                              <RestoreIcon /> Restaurar
                            </Dropdown.Item>
                          )}
                        </DropdownButton>
                      </>
                    )}
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
      <Modal show={show} onHide={handleClose} size="sm" centered>
        <Modal.Header
          closeButton
          className={`bg-${
            selectedMaquinaria?.deletedAt ? "info-subtle" : "danger"
          }`}
        >
          <Modal.Title>
            {selectedMaquinaria?.deletedAt
              ? "¿Deseas restaurar?"
              : "¿Deseas eliminar?"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Codigo: {selectedMaquinaria?.codigo}</h6>
          <h4>{selectedMaquinaria?.nombre}</h4>
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button variant="light fw-bold" onClick={handleClose}>
            <FaTimes fontSize={22} /> Cancelar
          </Button>
          <Button
            variant={`${
              selectedMaquinaria?.deletedAt ? "info" : "danger"
            } fw-bold`}
            onClick={cancelRestore}
          >
            <FaRegSave fontSize={22} /> Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showView}
        onHide={handleCloseView}
        backdrop="static"
        keyboard={false}
        size="lg"
        fullscreen={true}
        scrollable
      >
        <ViewMaquinaria
          maquinaria={selectedMaquinaria}
          onClose={handleCloseView}
        />
      </Modal>
    </>
  );
};

export default List_Maquinaria;
// <pre>{JSON.stringify(datos.data || datos.error, null, 2)}</pre>
