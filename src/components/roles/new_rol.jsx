import React, { useState } from "react";
import {CreateRole} from "../../services/roles"

const New_Rol = ({ estructura }) => {
  const [data, setData] = useState({
    nombre: "",
    permisos: estructura,
    createdAt: null,
    updatedAt: null
  });

  // Función para manejar el cambio en los permisos (establecer directamente como true o false)
  const handlePermissionChange = (section, permission, value) => {
    setData((prevData) => {
      const newPermisos = { ...prevData.permisos };
      newPermisos[section][permission] = value; // Establecer directamente el valor
      return { ...prevData, permisos: newPermisos };
    });
  };

  // Función para manejar la selección/deselección de todos los permisos de una sección
  const handleSelectAll = (section, value) => {
    setData((prevData) => {
      const newPermisos = { ...prevData.permisos };
      // Asignar directamente el valor a todos los permisos
      Object.keys(newPermisos[section]).forEach((permission) => {
        if (permission !== "url") { // Ignorar 'url' porque no es un permiso
          newPermisos[section][permission] = value;
        }
      });
      return { ...prevData, permisos: newPermisos };
    });
  };

  // Función para manejar el cambio en el nombre del rol
  const handleNombreChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      nombre: e.target.value,
    }));
  };

  // Función para manejar el submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await CreateRole(data);
    console.log(response);
  };

  return (
    <>
      <h4>Nuevo Rol</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={data.nombre}
            onChange={handleNombreChange}
            required
          />
        </div>

        <div>
          <h5>Permisos:</h5>
          {Object.keys(data.permisos).map((section) => (
            <div key={section}>
              <h6>
                {section}{" "}
                <a href={estructura[section].url} target="_blank" rel="noopener noreferrer">
                  {estructura[section].url}
                </a>
              </h6>

              {/* Checkbox para seleccionar/deseleccionar todos los permisos */}
              <label>
                <input
                  type="checkbox"
                  checked={Object.keys(data.permisos[section])
                    .filter((permission) => permission !== "url")
                    .every((permission) => data.permisos[section][permission] === true)}
                  onChange={() => handleSelectAll(section, !Object.keys(data.permisos[section])
                    .filter((permission) => permission !== "url")
                    .every((permission) => data.permisos[section][permission] === true))}
                />
                Seleccionar todo
              </label>

              <div>
                {Object.keys(data.permisos[section]).map(
                  (permission) =>
                    permission !== "url" && (
                      <label key={permission}>
                        <input
                          type="checkbox"
                          checked={data.permisos[section][permission] || false}
                          onChange={(e) => handlePermissionChange(section, permission, e.target.checked)}
                        />
                        {permission}
                      </label>
                    )
                )}
              </div>
            </div>
          ))}
        </div>

        <button type="submit">Crear Rol</button>
      </form>
    </>
  );
};

export default New_Rol;
