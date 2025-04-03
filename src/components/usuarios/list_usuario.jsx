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
import {
  DeleteMaquinaria,
  RestoreMaquinaria,
} from "../../services/maquinarias";
import ViewMaquinaria from "./viewUsuario";
import { DeleteUsuario, RestoreUsuario } from "../../services/usuarios";

const List_Usuario = ({ data }) => {
  console.log(data);
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

  const cancelRestoreU = async () => {
    if (selectedMaquinaria.deletedAt) {
      const response = await RestoreUsuario(selectedMaquinaria?.id);

      if (response.status === 200) {
        window.location.reload();
      } else {
        console.log(response);
      }
    } else {
      const response = await DeleteUsuario(selectedMaquinaria?.id);

      if (response.status === 200) {
        window.location.reload();
      } else {
        console.log(response);
      }
    }
  };

  return (
    <>
      <Table responsive hover borderless className="datatable-custom">
        <thead>
          <tr>
            <th className="table-column-ps-0 sorting bg-warning">Avatar</th>
            <th className="table-column-ps-0 sorting bg-warning">Nombre</th>
            <th className="table-column-ps-0 sorting bg-warning">Apellido</th>
            <th className="table-column-ps-0 sorting bg-warning">Correo</th>
            <th className="table-column-ps-0 sorting bg-warning">Telefono</th>
            <th className="table-column-ps-0 sorting bg-warning">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((e) => (
            <tr key={e.id}>
              <td
                className=" text-nowrap align-items-center fs-5"
                style={{ verticalAlign: "middle" }}
              >
                {e.avatar && (
                  <img src={e.avatar} alt={e.id} style={{ height: "70px" }} />
                )}
              </td>
              <td
                className=" text-nowrap align-items-center fs-5"
                style={{ verticalAlign: "middle" }}
              >
                {e.nombre}
              </td>
              <td
                className=" text-nowrap align-items-center fs-5"
                style={{ verticalAlign: "middle" }}
              >
                {e.apellido}
              </td>
              <td
                className=" text-nowrap align-items-center fs-5"
                style={{ verticalAlign: "middle" }}
              >
                {e.correo}
              </td>
              <td
                className=" text-nowrap align-items-center fs-5"
                style={{ verticalAlign: "middle" }}
              >
                {e.telefono}
              </td>
              <td
                className=" text-nowrap align-items-center fs-5"
                style={{ verticalAlign: "middle" }}
              >
                <ButtonGroup>
                  <Button
                    variant="warning text-nowrap"
                    onClick={() => handleShowView(e)}
                  >
                    <VisibilityRoundedIcon /> Ver
                  </Button>
                  <div style={{ width: "2px" }}></div>
                  {!e.deletedAt && (
                    <Button
                      variant="danger text-bg-danger text-nowrap"
                      onClick={() => handleShow(e)}
                    >
                      <DeleteIcon /> Eliminar
                    </Button>
                  )}
                  {e.deletedAt && (
                    <Button
                      variant="info text-bg-info text-nowrap"
                      onClick={() => handleShow(e)}
                    >
                      <RestoreIcon /> Restaurar
                    </Button>
                  )}
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose} size="md" centered>
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
          <h6>Correo: {selectedMaquinaria?.correo}</h6>
          <h4>
            {selectedMaquinaria?.nombre} {selectedMaquinaria?.apellido}
          </h4>
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button variant="light fw-bold" onClick={handleClose}>
            <FaTimes fontSize={22} /> Cancelar
          </Button>
          <Button
            variant={`${
              selectedMaquinaria?.deletedAt ? "info" : "danger"
            } fw-bold`}
            onClick={cancelRestoreU}
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
          usuario={selectedMaquinaria}
          onClose={handleCloseView}
        />
      </Modal>
    </>
  );
};

export default List_Usuario;
