import React, { useState, useEffect } from "react";
import { UpdateRole, GetRole } from "../../services/roles"; // Importamos ambas funciones

const Edit_Rol = ({ estructura, roleId }) => {
  const [data, setData] = useState({
    id: roleId,
    nombre: "",
    permisos: estructura,
    createdAt: null,
    updatedAt: null
  });

  const [loading, setLoading] = useState(true); // Para mostrar que estamos cargando los datos
  const [error, setError] = useState(null);

  // Cargar datos iniciales del rol al montar el componente
  useEffect(() => {
    const fetchRoleData = async () => {
      try {
        const response = await GetRole(roleId); // Obtenemos los datos del rol
        if (response.status === 200) {
          setData({
            id: response.data.id,
            nombre: response.data.nombre,
            permisos: {
              ...estructura,
              ...response.data.permisos,
            },
            createdAt: response.data.createdAt,
            updatedAt: response.data.updatedAt,
          });
        } else {
          setError("Error al obtener el rol");
        }
      } catch (err) {
        setError("Error al conectar con el servidor");
      } finally {
        setLoading(false); // Terminamos de cargar
      }
    };

    fetchRoleData(); // Llamamos a la función para obtener los datos
  }, [roleId]); // Se vuelve a ejecutar si el `roleId` cambia

  const handlePermissionChange = (section, permission, value) => {
    setData((prevData) => {
      const newPermisos = { ...prevData.permisos };
      newPermisos[section][permission] = value; // Establecer directamente el valor
      return { ...prevData, permisos: newPermisos };
    });
  };

  // Manejar cambios en los permisos
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

  // Manejar cambio en el nombre
  const handleNombreChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      nombre: e.target.value,
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await UpdateRole(roleId, data);
    console.log(response);
  };

  // Si los datos están cargando o hay un error, mostramos un mensaje
  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <h4>Editar Rol</h4>
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

        <button type="submit">Actualizar Rol</button>
      </form>
    </>
  );
};

export default Edit_Rol;
