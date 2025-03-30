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
    create: false,
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
    create: false,
    edit: false,
    delete: false,
  },
  Contratos: {
    url: "/admin/contratos",
    list: false,
    view: false,
    create: false,
    edit: false,
    delete: false,
  },
  Reviews: {
    url: "/admin/reviews",
    list: false,
    view: false,
    create: false,
    edit: false,
    delete: false,
  },
  Comprobantes: {
    url: "/admin/comprobantes",
    list: false,
    view: false,
    create: false,
    edit: false,
    delete: false,
  },
  Reporte: {
    url: "/admin/reporte",
    ganacia: false,
    perdida: false,
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
      <button
        onClick={toggleModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Toggle modal
      </button>
      
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10"></div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-gray-900"
                    >
                      Deactivate account
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to deactivate your account? All of
                        your data will be permanently removed. This action
                        cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Deactivate
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

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

      <p>Status: {datos.status}</p>
      <pre>{JSON.stringify(datos.data || datos.error, null, 2)}</pre>
    </>
  );
};

export default List_Rol;
