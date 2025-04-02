import React, { useState } from "react";
import { Button, Form, Modal, Toast } from "react-bootstrap";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import { FaTimes, FaRegSave } from "react-icons/fa";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { red, green } from "@mui/material/colors";
import { CreateRole } from "../../services/roles";

const New_Rol = ({ nombre, estructura }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showA, setShowA] = useState(false);
  const [showB, setShowB] = useState(false);

  const toggleShowA = () => setShowA(!showA);
  const toggleShowB = () => setShowB(!showB);

  const [error, setError] = useState(""); // Para mostrar el error
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    nombre: "",
    permisos: estructura,
    createdAt: null,
    updatedAt: null,
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
        if (permission !== "url") {
          // Ignorar 'url' porque no es un permiso
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
    setLoading(true); // Activamos el indicador de carga
    setError(""); // Reseteamos cualquier error previo
    setShowB(false);

    const response = await CreateRole(data);
    if (response.status === 201) {
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
      <Button
        variant="warning"
        className="text-uppercase fw-bolder ps-1"
        onClick={handleShow}
      >
        <font style={{ verticalAlign: "inherit" }}>
          <AddRoundedIcon fontSize="large" />
          <font style={{ verticalAlign: "inherit" }}>Añadir {nombre}</font>
        </font>
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        fullscreen={"lg-down"}
        scrollable
      >
        <Modal.Header className="bg-secondary border-bottom-0">
          <Modal.Title className="text-warning">
            <h1 className="fw-bolder">
              Registrar <span className="fw-light">Rol</span>
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
                          <label key={permission} className="form-check-label ms-4">
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
          <Button variant="light fw-bold" onClick={handleClose}>
            <FaTimes fontSize={22} /> Cancelar
          </Button>
          <Button variant="dark fw-bold" type="submit" form="productoForm">
            <FaRegSave fontSize={22} /> Siguiente
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default New_Rol;
