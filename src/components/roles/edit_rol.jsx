import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Toast } from "react-bootstrap";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { red, green } from "@mui/material/colors";
import { FaTimes, FaRegSave } from "react-icons/fa";
import { UpdateRole, GetRole } from "../../services/roles"; // Importamos ambas funciones

const Edit_Rol = ({ estructura, roleId, onClose }) => {
  const [showA, setShowA] = useState(false);
  const [showB, setShowB] = useState(false);

  const toggleShowA = () => setShowA(!showA);
  const toggleShowB = () => setShowB(!showB);
  const [data, setData] = useState({
    id: roleId,
    nombre: "",
    permisos: estructura,
    createdAt: null,
    updatedAt: null,
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
        if (permission !== "url") {
          // Ignorar 'url' porque no es un permiso
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
    setLoading(true); // Activamos el indicador de carga
    setError(""); // Reseteamos cualquier error previo
    setShowB(false);

    const response = await UpdateRole(roleId, data);

    if (response.status === 200) {
      console.log("Guardado exitoso:", response.data);
      // Aquí puedes guardar el token de sesión o hacer la redirección
      setShowA(true);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else {
      console.log(response);
      setError(response.error); // Muestra el error si lo hay
      setShowB(true);
    }

    setLoading(false);
  };

  return (
    <>
      <Modal.Header className="bg-secondary border-bottom-0">
        <Modal.Title className="text-warning">
          <h1 className="fw-bolder">
            Editar <span className="fw-light">Rol</span>
          </h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-secondary">
        <Form id="productoForm" onSubmit={handleSubmit}>
          <Form.Group className="mb-3 was-validated">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={data.nombre}
              onChange={handleNombreChange}
              required
            />
          </Form.Group>
          <div className="bg-body p-3 rounded-2">
            <h5 className="text-secondary">Permisos:</h5>
            {Object.keys(data.permisos).map((section) => (
              <div key={section} className="mb-5">
                <h6 className="fs-4 fw-bolder">
                  {section}{" "}
                  <a
                    href={estructura[section].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline link-underline-opacity-0 link-warning fs-5 fw-normal fst-italic"
                  >
                    {estructura[section].url}
                  </a>
                </h6>

                {/* Checkbox para seleccionar/deseleccionar todos los permisos */}
                <label className="form-check-label fw-medium">
                  <input
                    type="checkbox"
                    checked={Object.keys(data.permisos[section])
                      .filter((permission) => permission !== "url")
                      .every(
                        (permission) =>
                          data.permisos[section][permission] === true
                      )}
                    onChange={() =>
                      handleSelectAll(
                        section,
                        !Object.keys(data.permisos[section])
                          .filter((permission) => permission !== "url")
                          .every(
                            (permission) =>
                              data.permisos[section][permission] === true
                          )
                      )
                    }
                    className="form-check-input me-2"
                  />
                  Seleccionar todo
                </label>

                <div>
                  {Object.keys(data.permisos[section]).map(
                    (permission) =>
                      permission !== "url" && (
                        <label
                          key={permission}
                          className="form-check-label ms-4"
                        >
                          <input
                            type="checkbox"
                            checked={
                              data.permisos[section][permission] || false
                            }
                            onChange={(e) =>
                              handlePermissionChange(
                                section,
                                permission,
                                e.target.checked
                              )
                            }
                            className="form-check-input me-2"
                          />
                          {permission}
                        </label>
                      )
                  )}
                </div>
              </div>
            ))}
          </div>
        </Form>

        <Toast
          show={showA}
          onClose={toggleShowA}
          className="position-fixed bottom-0 start-0 m-3 border-success-subtle"
        >
          <Toast.Header className="text-bg-success">
            <WarningRoundedIcon sx={{ color: green[100] }} />
            <strong className="ms-2 me-auto">Proceso exitoso.</strong>
          </Toast.Header>
        </Toast>
        <Toast
          show={showB}
          onClose={toggleShowB}
          className="position-fixed bottom-0 start-0 m-3 border-danger-subtle"
          bg="danger-subtle"
        >
          <Toast.Header className="text-bg-danger">
            <WarningRoundedIcon sx={{ color: red[100] }} />
            <strong className="ms-2 me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>
            <span className="fs-6">{error}</span>
          </Toast.Body>
        </Toast>
      </Modal.Body>
      <Modal.Footer className="justify-content-between bg-secondary border-top-0">
        <Button variant="light fw-bold" onClick={onClose}>
          <FaTimes fontSize={22} /> Cancelar
        </Button>
        <Button variant="dark fw-bold" type="submit" form="productoForm">
          <FaRegSave fontSize={22} /> Guardar
        </Button>
      </Modal.Footer>
    </>
  );
};

export default Edit_Rol;
