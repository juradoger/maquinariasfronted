import React, { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Edit_Rol from "./edit_rol";
import New_Rol from "./new_rol";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, ButtonGroup, Modal, Table } from "react-bootstrap";

const Permisos_structure = {
  Usuarios: {
    url: "/admin/usuarios",
    list: false,
    view: false,
    edit: false,
    delete: false,
  },
  Roles: {
    url: "/admin/roles",
    list: false,
    view: false,
    create: false,
    edit: false,
    delete: false,
  },
  Maquinarias: {
    url: "/admin/maquinarias",
    list: false,
    view: false,
    create: false,
    edit: false,
    delete: false,
  },
  Mantenimientos: {
    url: "/admin/mantenimientos",
    list: false,
    view: false,
    create: false,
    edit: false,
    delete: false,
    historial: false,
  },
  Reservas: {
    url: "/admin/reservas",
    list: false,
    view: false,
    edit: false,
    delete: false,
  },
  Contratos: {
    url: "/admin/contratos",
    list: false,
    view: false,
    edit: false,
    delete: false,
  },
  Reviews: {
    url: "/admin/reviews",
    list: false,
    view: false,
    edit: false,
    delete: false,
  },
  Comprobantes: {
    url: "/admin/comprobantes",
    list: false,
    view: false,
    edit: false,
    delete: false,
  },
  Reporte: {
    url: "/admin/reporte",
    export: false,
    view: false,
  },
};

const List_Rol = ({ datos }) => {
  const [selectedRoleId, setSelectedRoleId] = useState(null);

  const handleEditClick = (id) => {
    setSelectedRoleId(id);
    setShowEdit(true);
  };

  const [open, setOpen] = useState(true);

  const toggleModal = () => {
    setOpen(!open);
  };

  const [showEdit, setShowEdit] = useState(false);
  const [selectedMaquinaria, setSelectedMaquinaria] = useState(null);

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
                {datos?.permiso.nombre}
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
          {datos?.permiso.create && (
            <New_Rol
              nombre={datos?.permiso.nombre}
              estructura={Permisos_structure}
            />
          )}
        </div>
      </div>
      <Table responsive hover borderless className="datatable-custom">
        <thead>
          <tr>
            <th className="table-column-ps-0 sorting bg-warning">ID</th>
            <th className="table-column-ps-0 sorting bg-warning">Nombre</th>
            <th className="table-column-ps-0 sorting bg-warning">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos?.data.map((e) => (
            <tr key={e.id}>
              <td
                className=" text-nowrap align-items-center fw-bold"
                style={{ verticalAlign: "middle" }}
              >
                {e.id}
              </td>
              <td
                className=" text-nowrap align-items-center fs-5"
                style={{ verticalAlign: "middle" }}
              >
                {e.nombre}
              </td>
              <td className="" style={{ verticalAlign: "middle" }}>
                <ButtonGroup>
                  {datos.permiso.edit && (
                    <Button
                      variant="warning text-nowrap"
                      onClick={() => handleEditClick(e.id)}
                    >
                      <EditSquareIcon /> Editar
                    </Button>
                  )}
                </ButtonGroup>
              </td>
              <td>{e.permisos?.Usuarios?.view ? "✔️" : "❌"}</td>
              <td>{e.permisos?.Maquinarias?.view ? "✔️" : "❌"}</td>
              <td>{e.permisos?.Roles?.view ? "✔️" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal
        show={showEdit}
        onHide={handleCloseEdit}
        backdrop="static"
        keyboard={false}
        size="lg"
        fullscreen={"lg-down"}
        scrollable
      >
        <Edit_Rol
          onClose={handleCloseEdit}
          estructura={Permisos_structure}
          roleId={selectedRoleId}
        />
      </Modal>
    </>
  );
};

export default List_Rol;
