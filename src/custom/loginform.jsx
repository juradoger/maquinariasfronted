import React, { useState } from "react";
import { Form, Toast, ToastContainer } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Login_Service } from "../services/Auth_service";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { red, green } from "@mui/material/colors";

const LoginForm = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showA, setShowA] = useState(false);
  const [showB, setShowB] = useState(false);

  const toggleShowA = () => setShowA(!showA);
  const toggleShowB = () => setShowB(!showB);

  // Usamos un solo estado 'data' para almacenar correo y password
  const [data, setData] = useState({ correo: "", password: "" });
  const [error, setError] = useState(""); // Para mostrar el error
  const [loading, setLoading] = useState(false); // Para mostrar que la solicitud está en curso

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que el formulario se recargue por defecto
    setLoading(true); // Activamos el indicador de carga
    setError(""); // Reseteamos cualquier error previo
    setShowB(false);

    // Llamada al servicio de login pasando el objeto data
    const response = await Login_Service(data);

    if (response.status === 200) {
      console.log("Login exitoso:", response.data);
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

    setLoading(false); // Desactivamos el indicador de carga
  };

  // Función para manejar el cambio de valor en los campos de input
  const handleChange = (e) => {
    const { name, value } = e.target; // Extraemos el nombre y valor del campo
    setData((prevData) => ({
      ...prevData,
      [name]: value, // Actualizamos el campo correspondiente en 'data'
    }));
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Iniciar sesion
      </Button>

      <Modal
        show={show}
        fullscreen={true}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="correo" // El nombre del campo será 'correo' para coincidir con el estado
                value={data.correo} // Usamos 'data.correo' para el valor
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password" // El nombre del campo será 'password' para coincidir con el estado
                value={data.password} // Usamos 'data.password' para el valor
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Cargando..." : "Iniciar sesión"}
            </Button>
          </Form>
          <Toast
            show={showA}
            onClose={toggleShowA}
            className="position-fixed bottom-0 start-0 m-3 border-success-subtle"
          >
            <Toast.Header className="text-bg-success">
              <WarningRoundedIcon sx={{ color: green[100] }} />
              <strong className="ms-2 me-auto">
                Inicio de sesión exitoso.
              </strong>
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
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoginForm;
