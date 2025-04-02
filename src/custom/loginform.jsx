import React, { useState } from "react";
import { Form, Toast, ToastContainer } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Login_Service } from "../services/Auth_service";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { red, green } from "@mui/material/colors";
import { FaUserCircle, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import RegisterUsuario from "./register";

const LoginForm = () => {
  const [showU, setShowU] = useState(false);

  const handleCloseU = () => setShowU(false);
  const handleShowU = () => {
    setShowU(true);
    setShow(false);
  };

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
      <Button variant="warning" size="lg" onClick={handleShow}>
        <FaSignInAlt fontSize={35} className="text-black" />
      </Button>

      <Modal
        show={show}
        fullscreen={true}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header
          closeButton
          className="border-bottom-0 login-container"
        ></Modal.Header>
        <Modal.Body className="login-container align-content-center">
          <div className="row">
            <div className="col-md-6">
              <h1 className="welcome-text display-3 fw-bolder text-nowrap">
                BIENVENIDO A
              </h1>
              <h2 className="platform-text display-4 text-nowrap">
                Nuestra Plataforma
              </h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingresa tu correo"
                    name="correo" // El nombre del campo será 'correo' para coincidir con el estado
                    value={data.correo} // Usamos 'data.correo' para el valor
                    onChange={handleChange}
                    className="form-input"
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
                    className="form-input"
                  />
                </Form.Group>
                <div className="remember-forgot">
                  <label className="remember-label">
                    <input type="checkbox" /> Recordar Contraseña
                  </label>
                  <a href="#" className="forgot-link">
                    Olvidaste la contraseña?
                  </a>
                </div>

                <Button
                  variant="warning login-button"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Comprobando..." : "Ingresar"}
                </Button>
              </Form>

              <div className="register-button-container">
                <button className="register-button" onClick={handleShowU}>
                  <span className="icon">👤</span> Registrarse
                </button>
              </div>

              <div className="signup-text">
                No tienes una cuenta?{" "}
                <a href="#" className="signup-link">
                  Registrate Gratis!
                </a>
                {/* Sección del logo 
                <div className="logo-section">
                  <div className="logo-content">
                    <div className="triangle-logo">
                      <img
                        src="/src/assets/logo.webp"
                        alt="Excavator Logo"
                        className="excavator-image"
                      />
                    </div>
                    <p className="brand-slogan">
                      Plataforma para alquiler de maquinarias
                    </p>
                  </div>
                </div>*/}
              </div>
            </div>
            <div className="col-md-6">
              <div className="h-100 text-center">
                <img
                  src="/src/assets/logo.webp"
                  alt="Excavator Logo"
                  className="w-100"
                  style={{ maxWidth: "550px" }}
                />
              </div>
            </div>
          </div>
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
      </Modal>
      <RegisterUsuario show={showU} handleClose={handleCloseU} />
    </>
  );
};

export default LoginForm;
