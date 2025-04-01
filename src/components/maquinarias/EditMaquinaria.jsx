import React, { useState } from "react";
import { Button, Form, Modal, Toast } from "react-bootstrap";
import { UpdateMaquinaria } from "../../services/maquinarias";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { red, green } from "@mui/material/colors";
import { FaTimes, FaRegSave } from "react-icons/fa";

const EditMaquinaria = ({ maquinaria, onClose }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showA, setShowA] = useState(false);
  const [showB, setShowB] = useState(false);

  const toggleShowA = () => setShowA(!showA);
  const toggleShowB = () => setShowB(!showB);

  const [error, setError] = useState(""); // Para mostrar el error
  const [loading, setLoading] = useState(false);

  const [producto, setProducto] = useState(maquinaria);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, options } = e.target;
    if (name === "tipo") {
      const selectedOptions = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setProducto({
        ...producto,
        tipo: selectedOptions,
      });
    } else {
      setProducto({
        ...producto,
        [name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
      });
    }
  };

  const handleDetalleChange = (key, value) => {
    setProducto({
      ...producto,
      detalles: {
        ...producto.detalles,
        [key]: value,
      },
    });
  };

  const addDetalle = () => {
    setProducto({
      ...producto,
      detalles: {
        ...producto.detalles,
        "": "",
      },
    });
  };

  const removeDetalle = (key) => {
    const newDetalles = { ...producto.detalles };
    delete newDetalles[key];
    setProducto({
      ...producto,
      detalles: newDetalles,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(producto);
    setLoading(true); // Activamos el indicador de carga
    setError(""); // Reseteamos cualquier error previo
    setShowB(false);

    // Llamada al servicio de login pasando el objeto data
    const response = await UpdateMaquinaria(producto);

    if (response.status === 204) {
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

    setLoading(false); // Desactivamos el indicador de carga
  };

  return (
    <>
      <Modal.Header className="bg-secondary border-bottom-0">
        <Modal.Title className="text-warning">
          <h1 className="fw-bolder">Editar</h1>
          <LocalShippingOutlinedIcon
            sx={{ fontSize: 100 }}
            className="position-absolute top-0 end-50"
          />
          <h1 className="fw-light">Maquinaria</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-secondary">
        <Form id="productoForm" onSubmit={handleSubmit}>
          <Form.Group className="mb-3 was-validated">
            <Form.Label>Código</Form.Label>
            <Form.Control
              type="text"
              name="codigo"
              value={producto.codigo}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 was-validated">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={producto.nombre}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              name="descripcion"
              value={producto.descripcion}
              onChange={handleChange}
              rows={5}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Marca</Form.Label>
            <Form.Control
              type="text"
              name="marca"
              value={producto.marca}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Modelo</Form.Label>
            <Form.Control
              type="text"
              name="modelo"
              value={producto.modelo}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tipo</Form.Label>
            <Form.Select
              name="tipo"
              multiple
              value={producto.tipo}
              onChange={handleChange}
            >
              {["Excavadora", "Grúa", "Bulldozer", "Retroexcavadora"].map(
                (tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                )
              )}
            </Form.Select>
          </Form.Group>
          <div className="row">
            <Form.Group className="mb-3 col">
              <Form.Label>Costo Uso Día</Form.Label>
              <Form.Control
                type="number"
                name="costoUsoDia"
                value={producto.costoUsoDia}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3 col">
              <Form.Label>Costo Uso Hora</Form.Label>
              <Form.Control
                type="number"
                name="costoUsoHora"
                value={producto.costoUsoHora}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3 col">
              <Form.Label>Costo Uso Mes</Form.Label>
              <Form.Control
                type="number"
                name="costoUsoMes"
                value={producto.costoUsoMes}
                onChange={handleChange}
              />
            </Form.Group>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Estado</Form.Label>
            <Form.Select
              name="estado"
              value={producto.estado}
              onChange={handleChange}
            >
              <option value="Disponible">Disponible</option>
              <option value="Alquilado">Alquilado</option>
              <option value="Mantenimiento">Mantenimiento</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ubicación</Form.Label>
            <Form.Control
              type="text"
              name="ubicacion"
              value={producto.ubicacion}
              onChange={handleChange}
            />
          </Form.Group>
          <div className="row">
            <Form.Group className="mb-3 col">
              <Form.Check
                type="checkbox"
                label="Respaldo Técnico"
                name="respaldoTecnico"
                checked={producto.respaldoTecnico}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3 col">
              <Form.Check
                type="checkbox"
                label="Operador Requerido"
                name="operadorRequerido"
                checked={producto.operadorRequerido}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Detalles</Form.Label>
              {Object.entries(producto.detalles).map(([key, value], index) => (
                <div key={index} className="d-flex mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Atributo"
                    value={key}
                    onChange={(e) => {
                      const newKey = e.target.value;
                      const newDetalles = { ...producto.detalles };
                      newDetalles[newKey] = newDetalles[key];
                      delete newDetalles[key];
                      setProducto({
                        ...producto,
                        detalles: newDetalles,
                      });
                    }}
                  />
                  <Form.Control
                    type="text"
                    placeholder="Valor"
                    value={value}
                    onChange={(e) => handleDetalleChange(key, e.target.value)}
                  />
                  <Button variant="danger" onClick={() => removeDetalle(key)}>
                    Eliminar
                  </Button>
                </div>
              ))}
              <br />
              <Button variant="warning fw-bold" onClick={addDetalle}>
                Añadir Detalle
              </Button>
            </Form.Group>
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

export default EditMaquinaria;
