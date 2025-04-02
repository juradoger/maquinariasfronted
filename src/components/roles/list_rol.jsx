import React, { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Edit_Rol from "./edit_rol";
import New_Rol from "./new_rol";

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
  };

  const [open, setOpen] = useState(true);

  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <>
      <New_Rol estructura={Permisos_structure} />
      {selectedRoleId && (
        <Edit_Rol estructura={Permisos_structure} roleId={selectedRoleId} />
      )}
      <h3>Listar</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Usuarios</th>
            <th>Maquinarias</th>
            <th>Roles</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos?.data?.map((role) => (
            <tr key={role.id}>
              <td>{role.nombre}</td>
              {/* Mostrar los permisos */}
              <td>{role.permisos?.Usuarios?.view ? "✔️" : "❌"}</td>
              <td>{role.permisos?.Maquinarias?.view ? "✔️" : "❌"}</td>
              <td>{role.permisos?.Roles?.view ? "✔️" : "❌"}</td>
              <td>
                {/* Botón de editar */}
                <button onClick={() => handleEditClick(role.id)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default List_Rol;
