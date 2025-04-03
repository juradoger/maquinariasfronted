import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Toast, ProgressBar, Card } from "react-bootstrap";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import PublishRoundedIcon from "@mui/icons-material/PublishRounded";
import { red, green } from "@mui/material/colors";
import { FaTimes, FaRegSave } from "react-icons/fa";
import { RolesActualizar, UploadFoto } from "../../services/usuarios";
import Roles_service from "../../services/roles";

const ViewUsuario = ({ usuario, onClose }) => {
  useEffect(() => {
    const fetchRoles = async () => {
      const result = await Roles_service();
      setRoles(result.data.data);
      console.log(result.data.data);
    };
    setRolesSeleccionados(usuario.rol || []);

    fetchRoles();
  }, [usuario]);
  const [roles, setRoles] = useState([]);
  const [rolesSeleccionados, setRolesSeleccionados] = useState([]);

  const handleSelectChange = (e) => {
    const seleccionados = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value)
    );
    setRolesSeleccionados(seleccionados);
  };

  // Enviar datos al servidor (Ejemplo)
  const handleSubmit = async () => {
    setError("");

    const uploadResponse = await RolesActualizar(
      usuario.id,
      rolesSeleccionados
    );

    if (uploadResponse.status === 200) {
      setShowA(true); // Muestra el toast de éxito
      setTimeout(() => {
        setShowA(false);
      }, 3000);
    } else {
      setError(uploadResponse.error);
      setShowB(true); // Muestra el toast de error
    }
  };

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [showA, setShowA] = useState(false);
  const [showB, setShowB] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Selecciona una imagen antes de subir.");
      return;
    }

    setUploading(true);
    setError("");
    setProgress(0);

    const uploadResponse = await UploadFoto(usuario.id, file, setProgress);
    console.log(uploadResponse);
    if (uploadResponse.status === 200) {
      setShowA(true); // Muestra el toast de éxito
      setTimeout(() => {
        setShowA(false);
      }, 3000);
    } else {
      setError(uploadResponse.error);
      setShowB(true); // Muestra el toast de error
    }

    setUploading(false);
  };

  return (
    <>
      <Modal.Header className="border-bottom-0" closeButton></Modal.Header>
      <Modal.Body>
        <div className="row">
          {/* Imagen de perfil */}
          <div className="col-md-4 text-center">
            {preview ? (
              <img
                src={preview}
                alt="Vista previa"
                className="img-fluid rounded-circle mb-3"
                style={{ maxHeight: "150px" }}
              />
            ) : usuario?.avatar ? (
              <img
                src={usuario.avatar}
                alt="Avatar"
                className="img-fluid rounded-circle mb-3"
                style={{ maxHeight: "150px" }}
              />
            ) : (
              <img
                src="https://via.placeholder.com/150"
                alt="Sin avatar"
                className="img-fluid rounded-circle mb-3"
              />
            )}

            <Form.Group>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Form.Group>
            {uploading && (
              <ProgressBar
                variant="warning"
                now={progress}
                animated
                className="mt-3"
              />
            )}
            {error && <p className="text-danger mt-2">{error}</p>}

            <Button
              variant="warning"
              onClick={handleUpload}
              disabled={uploading}
            >
              <PublishRoundedIcon />{" "}
              {uploading ? "Subiendo..." : "Subir Imagen"}
            </Button>

            <div>
              <Form.Group>
                <Form.Label>Seleccionar Roles</Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  value={rolesSeleccionados}
                  onChange={handleSelectChange}
                >
                  {roles.map((rol) => (
                    <option key={rol.id} value={rol.id}>
                      {rol.nombre}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Button variant="primary" onClick={handleSubmit} className="mt-3">
                Guardar Roles
              </Button>
            </div>
          </div>

          {/* Información del usuario */}
          <div className="col-md-8">
            <h4>
              {usuario?.nombre} {usuario?.apellido}
            </h4>
            <p>
              <strong>CI:</strong> {usuario?.ci}
            </p>
            <p>
              <strong>Correo:</strong> {usuario?.correo}
            </p>
            <p>
              <strong>Teléfono:</strong> {usuario?.telefono}
            </p>
            <p>
              <strong>Estado:</strong> {usuario?.estado ? "Activo" : "Inactivo"}
            </p>
            <p>
              <strong>Creado:</strong>{" "}
              {new Date(usuario?.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Última actualización:</strong>{" "}
              {new Date(usuario?.updatedAt).toLocaleString()}
            </p>

            {/* Detalles del usuario? */}
            <h5>Detalles</h5>
            {usuario?.detalles?.Cliente && (
              <p>
                <strong>Empresa:</strong> {usuario?.detalles?.Cliente.empresa}
              </p>
            )}
            {usuario?.detalles?.Empresa && (
              <>
                <p>
                  <strong>NIT:</strong> {usuario?.detalles?.Empresa.nit}
                </p>
                <p>
                  <strong>Representante:</strong>{" "}
                  {usuario?.detalles?.Empresa.representante}
                </p>
              </>
            )}
            {usuario?.detalles?.Operador && (
              <>
                <p>
                  <strong>Experiencia:</strong>{" "}
                  {usuario?.detalles?.Operador.experiencia}
                </p>
                <p>
                  <strong>Disponibilidad:</strong>{" "}
                  {usuario?.detalles?.Operador.disponibilidad}
                </p>
              </>
            )}
            <p>
              <strong>Dirección:</strong> {usuario?.detalles?.direccion}
            </p>
            <p>
              <strong>Descripción:</strong> {usuario?.detalles?.Descripcion}
            </p>
          </div>
        </div>
        {/* Toast de Éxito */}
        <Toast
          show={showA}
          onClose={() => setShowA(false)}
          className="position-fixed bottom-0 start-0 m-3 border-success-subtle"
        >
          <Toast.Header className="text-bg-success">
            <WarningRoundedIcon sx={{ color: green[100] }} />
            <strong className="ms-2 me-auto">Proceso exitoso</strong>
          </Toast.Header>
        </Toast>

        {/* Toast de Error */}
        <Toast
          show={showB}
          onClose={() => setShowB(false)}
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

      <Modal.Footer className="border-top-0">
        <Button variant="light fw-bold" onClick={onClose}>
          <FaTimes fontSize={22} /> Cerrar
        </Button>
      </Modal.Footer>
    </>
  );
};

export default ViewUsuario;
