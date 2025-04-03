import { useState, useEffect } from "react";
import { Modal, Button, Form, Toast } from "react-bootstrap";
import { FaTimes, FaRegSave } from "react-icons/fa";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { red, green } from "@mui/material/colors";
import { UpdatedUsuario } from "../../services/usuarios";

const Edit_Usario = ({ show, handleClose, usuarioEditar }) => {
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    ci: "",
    correo: "",
    telefono: "",
    passwordHash: null,
  });

  const [id, setId] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showA, setShowA] = useState(false);
  const [showB, setShowB] = useState(false);

  useEffect(() => {
    if (usuarioEditar) {
      setUsuario({
        nombre: usuarioEditar.nombre,
        apellido: usuarioEditar.apellido,
        ci: usuarioEditar.ci,
        correo: usuarioEditar.correo,
        telefono: usuarioEditar.telefono,
        contraseña: "",
        passwordHash: "",
      });
      setId(usuarioEditar.id);
    }
  }, [usuarioEditar]);

  const toggleShowA = () => setShowA(!showA);
  const toggleShowB = () => setShowB(!showB);

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShowB(false);
    if (usuario.contraseña !== usuario.passwordHash) {
      setError("Las contraseñas no coinciden.");
      setShowB(true);
      setLoading(false);
      return;
    } else if (usuario.passwordHash) {
      const dataUser = {
        id: id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        ci: usuario.ci,
        correo: usuario.correo,
        telefono: usuario.telefono,
        passwordHash: usuario.passwordHash,
      };
      const response = await UpdatedUsuario(dataUser);

      if (response.status === 204) {
        setShowA(true);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        setError(response.error);
        setShowB(true);
      }
    } else {
      const dataUser = {
        id: id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        ci: usuario.ci,
        correo: usuario.correo,
        telefono: usuario.telefono,
        passwordHash: null,
      };
      const response = await UpdatedUsuario(dataUser);

      if (response.status === 204) {
        setShowA(true);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        setError(response.error);
        setShowB(true);
      }
    }
    setLoading(false);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      keyboard={false}
      backdrop="static"
      size="lg"
      fullscreen={"lg-down"}
      scrollable
    >
      <Modal.Header className="bg-secondary border-bottom-0">
        <Modal.Title className="text-warning">
          {usuarioEditar ? "Editar Usuario" : "Registro de Usuario"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-secondary">
        <Form id="usuarioForm" onSubmit={handleSubmit}>
          {Object.keys(usuario).map((key) => (
            <Form.Group className="mb-3" key={key}>
              <Form.Label>
                {key === "passwordHash" && "Contraseña (repetir)"}
                {key !== "passwordHash" &&
                  key.charAt(0).toUpperCase() + key.slice(1)}
              </Form.Label>
              <Form.Control
                type={key === "passwordHash" ? "password" : "text"}
                name={key}
                value={usuario[key]}
                onChange={handleChange}
                required={key !== "passwordHash" && key !== "contraseña"}
              />
            </Form.Group>
          ))}
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
        <Button
          variant="light fw-bold"
          onClick={handleClose}
          disabled={loading}
        >
          <FaTimes fontSize={22} /> Cancelar
        </Button>
        <Button
          variant="dark fw-bold"
          type="submit"
          form="usuarioForm"
          disabled={loading}
        >
          <FaRegSave fontSize={22} />
          {loading
            ? "Guardando..."
            : usuarioEditar
            ? "Actualizar"
            : "Registrar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Edit_Usario;
