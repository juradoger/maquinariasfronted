"use client"

import { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container, Form, Button, Row, Col } from "react-bootstrap"

const FormularioAlquilerPago = () => {
  const [formAlquiler, setFormAlquiler] = useState({
    fechaEntrega: "",
    fechaRecogida: "",
    tiempo: "hora",
    estado: "",
    telefono: "",
    cliente: "",
    experiencia: "",
    nombre: "",
    telefonoCliente: "",
    direccion: "",
    tipo: "",
    codigo: "",
    modelo: "",
    costoHora: "",
    costoDia: "",
    costoMes: "",
    costoTotal: "",
    conFactura: true,
    sinFactura: false,
  })

  const [validated, setValidated] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {
      console.log("Form submitted:", formAlquiler)
    }
    setValidated(true)
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target

    if (type === "radio" && name === "tiempo") {
      setFormAlquiler({ ...formAlquiler, tiempo: value })
    } else if (type === "radio" && name === "factura") {
      if (value === "conFactura") {
        setFormAlquiler({ ...formAlquiler, conFactura: true, sinFactura: false })
      } else {
        setFormAlquiler({ ...formAlquiler, conFactura: false, sinFactura: true })
      }
    } else {
      setFormAlquiler({ ...formAlquiler, [name]: value })
    }
  }

  return (
    <Container className="py-4" style={{ backgroundColor: "#4d4d4d", color: "white", maxWidth: "500px" }}>
      <h2 className="text-center mb-0" style={{ color: "#ffc107" }}>
        Alquilar
      </h2>
      <h5 className="text-center mb-4" style={{ color: "#ffc107", fontWeight: "normal" }}>
        Maquinaria
      </h5>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label style={{ fontSize: "12px" }}>Fecha Inicio</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa la fecha"
            name="fechaEntrega"
            value={formAlquiler.fechaEntrega}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{ fontSize: "12px" }}>Fecha Fin</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa la fecha de inicio"
            name="fechaRecogida"
            value={formAlquiler.fechaRecogida}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{ fontSize: "12px" }}>Tiempo de uso</Form.Label>
          <div className="d-flex align-items-center mb-2">
            <Form.Check
              inline
              type="radio"
              name="tiempo"
              id="hora"
              label="Hora"
              value="hora"
              checked={formAlquiler.tiempo === "hora"}
              onChange={handleInputChange}
            />
            <Form.Check
              inline
              type="radio"
              name="tiempo"
              id="dia"
              label="Día"
              value="dia"
              checked={formAlquiler.tiempo === "dia"}
              onChange={handleInputChange}
            />
            <Form.Check
              inline
              type="radio"
              name="tiempo"
              id="mes"
              label="Mes"
              value="mes"
              checked={formAlquiler.tiempo === "mes"}
              onChange={handleInputChange}
            />
            <Button size="sm" variant="light" className="ms-2">
              Imprimir
            </Button>
          </div>
        </Form.Group>

        <Form.Label style={{ fontSize: "12px" }}>Detalle proveedor</Form.Label>
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label style={{ fontSize: "12px" }}>Estado</Form.Label>
              <Form.Control
                type="text"
                placeholder="Este campo se llenará automático"
                name="estado"
                value={formAlquiler.estado}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label style={{ fontSize: "12px" }}>Teléfono</Form.Label>
              <Form.Control
                type="text"
                placeholder="Este campo se llenará automático"
                name="telefono"
                value={formAlquiler.telefono}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label style={{ fontSize: "12px" }}>Cliente</Form.Label>
          <Form.Control
            type="text"
            placeholder="Este campo se llenará automático"
            name="cliente"
            value={formAlquiler.cliente}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{ fontSize: "12px" }}>Experiencia del proveedor</Form.Label>
          <Form.Control
            type="text"
            placeholder="Este campo se llenará automático"
            name="experiencia"
            value={formAlquiler.experiencia}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Label style={{ fontSize: "12px" }}>Detalle cliente</Form.Label>
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label style={{ fontSize: "12px" }}>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Este campo se llenará automático"
                name="nombre"
                value={formAlquiler.nombre}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label style={{ fontSize: "12px" }}>Teléfono</Form.Label>
              <Form.Control
                type="text"
                placeholder="Este campo se llenará automático"
                name="telefonoCliente"
                value={formAlquiler.telefonoCliente}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label style={{ fontSize: "12px" }}>Ubicación o dirección</Form.Label>
          <Form.Control
            type="text"
            placeholder="Este campo se llenará automático"
            name="direccion"
            value={formAlquiler.direccion}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Label style={{ fontSize: "12px" }}>Detalle maquinaria</Form.Label>
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label style={{ fontSize: "12px" }}>Tipo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Este campo se llenará automático"
                name="tipo"
                value={formAlquiler.tipo}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label style={{ fontSize: "12px" }}>Código</Form.Label>
              <Form.Control
                type="text"
                placeholder="Este campo se llenará automático"
                name="codigo"
                value={formAlquiler.codigo}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label style={{ fontSize: "12px" }}>Modelo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Este campo se llenará automático"
            name="modelo"
            value={formAlquiler.modelo}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label style={{ fontSize: "12px" }}>Costo hora</Form.Label>
              <Form.Control
                type="text"
                placeholder="Este campo se llenará automático"
                name="costoHora"
                value={formAlquiler.costoHora}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label style={{ fontSize: "12px" }}>Costo día</Form.Label>
              <Form.Control
                type="text"
                placeholder="Este campo se llenará automático"
                name="costoDia"
                value={formAlquiler.costoDia}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label style={{ fontSize: "12px" }}>Costo mes</Form.Label>
              <Form.Control
                type="text"
                placeholder="Este campo se llenará automático"
                name="costoMes"
                value={formAlquiler.costoMes}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label style={{ fontSize: "12px" }}>Costo total</Form.Label>
          <Form.Control
            type="text"
            placeholder="Este campo se llenará automático"
            name="costoTotal"
            value={formAlquiler.costoTotal}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="radio"
            name="factura"
            id="conFactura"
            label="Con factura"
            value="conFactura"
            checked={formAlquiler.conFactura}
            onChange={handleInputChange}
          />
          <Form.Check
            type="radio"
            name="factura"
            id="sinFactura"
            label="Sin factura"
            value="sinFactura"
            checked={formAlquiler.sinFactura}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Row className="mb-3">
          <Col>
            <Button variant="danger" className="w-100" type="button">
              Cancelar
            </Button>
          </Col>
          <Col>
            <Button variant="primary" className="w-100" type="submit">
              Continuar
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}

export default FormularioAlquilerPago

