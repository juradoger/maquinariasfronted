import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { FaStar } from "react-icons/fa"; // Importing star icon from react-icons

// Custom CSS
const customStyles = `
  .bg-dark-custom {
    background-color: #1a1a1a;
  }
  .bg-dark-secondary {
    background-color: #2a2a2a;
  }
  .text-yellow {
    color: #ffc107;
  }
  .text-white-custom {
    color: white;
  }
  .btn-yellow {
    background-color: #ffc107;
    color: #000;
    border: none;
  }
  .btn-yellow:hover {
    background-color: #e0a800;
    color: #000;
  }
  .btn-outline-yellow {
    background-color: transparent;
    color: #ffc107;
    border: 1px solid #ffc107;
  }
  .btn-outline-yellow:hover {
    background-color: rgba(255, 193, 7, 0.1);
    color: #ffc107;
  }
  .similar-equipment-card {
    background-color: #2a2a2a;
    border: none;
    border-radius: 6px;
    overflow: hidden;
  }
  .similar-equipment-img {
    height: 120px;
    object-fit: cover;
  }
  .user-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #3a3a3a;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    color: white; /* Text color for the initial */
  }
`;

const DetalleMaquinaria = () => {
  const [maquinaria, setMaquinaria] = useState(null);
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("maquinaria")) || [];
    setMaquinaria(local);
    console.log(local);
  }, []);
  const reviews = [
    {
      id: 1,
      rating: 5,
      text: "Excelente maquinaria, muy eficiente y fácil de usar.",
      user: "Usuario 1",
    },
    {
      id: 2,
      rating: 2,
      text: "Tuve algunos problemas con el mantenimiento.",
      user: "Usuario 2",
    },
  ];

  const similarEquipment = [
    { id: 1, name: "Compactador CA2500", image: "/placeholder.jpg" },
    { id: 2, name: "Rodillo CS54B", image: "/placeholder.jpg" },
    { id: 3, name: "Compactador CB34B", image: "/placeholder.jpg" },
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<i key={i} className="fas fa-star text-warning"></i>);
    }
    return stars;
  };
  return (
    <>
      <style>{customStyles}</style>

      <div className="bg-dark-custom text-white min-vh-100">
        <Container className="py-4">
          <Row className="mb-4">
            <Col md={6} className="mb-4 mb-md-0">
              <div
                className="bg-dark-secondary rounded mb-3"
                style={{ height: "300px" }}
              >
                <img
                  src={maquinaria?.portada}
                  alt="Compactador"
                  className="w-100 h-100 object-fit-contain"
                />
              </div>
              <Row className="g-2">
                {maquinaria?.fotos.map((e, index) => (
                  <Col xs={4} key={index}>
                    <div
                      className="bg-dark-secondary rounded overflow-hidden"
                      style={{ height: "80px" }}
                    >
                      <img
                        src={e}
                        alt="Vista 1"
                        className="w-100 h-100 object-fit-cover"
                      />
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>

            <Col md={6}>
              <div className="mb-4">
                <h1 className="fs-2 fw-bold">
                  {maquinaria?.nombre}
                </h1>
                <div className="d-flex align-items-center mt-1">
                  <span className="text-yellow">{renderStars(maquinaria?.puntuacionPromedio)}</span>
                  <span className="text-secondary ms-2 small">
                    {!maquinaria?.puntuacionPromedio && ("No tiene reseñas aun")}
                  </span>
                </div>
              </div>

              <Card className="bg-dark-secondary border-0 mb-4">
                <Card.Body>
                  <h2 className="fs-5 fw-bold mb-2 text-white-custom">
                    DESCRIPCIÓN
                  </h2>
                  <p className="small text-light">
                    Compactador vibratorio ideal para suelos y asfalto, con alta
                    eficiencia y bajo consumo de combustible. Potencia: 173 HP.
                    Peso operativo: 10,000 kg.
                  </p>
                </Card.Body>
              </Card>

              <div className="mb-4">
                <Form.Select className="bg-dark-secondary text-white border-secondary mb-3">
                  <option>Día</option>
                  <option value="1">1 día</option>
                  <option value="2">2 días</option>
                  <option value="3">3 días</option>
                </Form.Select>

                <Form.Select className="bg-dark-secondary text-white border-secondary mb-3">
                  <option>Hora</option>
                  <option value="8">8 horas</option>
                  <option value="12">12 horas</option>
                  <option value="24">24 horas</option>
                </Form.Select>

                <Form.Select className="bg-dark-secondary text-white border-secondary mb-3">
                  <option>Tipo</option>
                  <option value="standard">Estándar</option>
                  <option value="premium">Premium</option>
                </Form.Select>
              </div>

              <div>
                <Button className="btn-yellow w-100 py-2 mb-2 fw-bold">
                  ALQUILAR YA <i className="bi bi-chevron-right ms-1"></i>
                </Button>

                <Button className="btn-outline-yellow w-100">
                  Dejar una reseña
                </Button>
              </div>
            </Col>
          </Row>

          <Card className="bg-dark-secondary border-0 mb-4 text-white">
            <Card.Body>
              <Row>
                <Col md={6} className="mb-4 mb-md-0">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-bottom border-secondary pb-3 mb-3"
                    >
                      <div className="d-flex align-items-center mb-2">
                        <div className="user-avatar">
                          <span>{review.user.charAt(0)}</span>{" "}
                          {/* Displaying the initial */}
                        </div>
                        <div>
                          <p className="small fw-medium mb-0">{review.user}</p>
                          <div className="d-flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FaStar
                                key={star}
                                className={`small ${
                                  star <= review.rating
                                    ? "text-yellow"
                                    : "text-secondary"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="small text-light">{review.text}</p>
                    </div>
                  ))}
                </Col>

                <Col md={6}>
                  <div className="mb-3">
                    <h3 className="fs-5 fw-bold">Valoraciones</h3>
                    <div className="d-flex align-items-center">
                      <span className="fs-3 fw-bold me-1">4.8</span>
                      <div className="d-flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar key={star} className="text-yellow" />
                        ))}
                      </div>
                    </div>
                    <p className="small text-secondary">(20 valoraciones)</p>
                  </div>
                </Col>
              </Row>

              <div className="mt-4">
                <Form.Group className="mb-3">
                  <Form.Label className="text-light">Calificación</Form.Label>
                  <Form.Select className="bg-dark-secondary text-white border-secondary mb-3">
                    <option value="5">★★★★★ (5/5)</option>
                    <option value="4">★★★★ (4/5)</option>
                    <option value="3">★★★ (3/5)</option>
                    <option value="2">★★ (2/5)</option>
                    <option value="1">★ (1/5)</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="text-light">Comentario</Form.Label>
                  <Form.Control
                    as="textarea"
                    className="bg-white text-dark border-0"
                    placeholder="Ingresa tu comentario"
                    style={{ height: "80px" }}
                  />
                </Form.Group>

                <div className="d-flex justify-content-end">
                  <Button className="btn-yellow">
                    Postear <i className="bi bi-arrow-right ms-1"></i>
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>

          <div>
            <h2 className="fs-4 fw-bold mb-3">Equipos Similares</h2>
            <Row className="g-3">
              {similarEquipment.map((item) => (
                <Col key={item.id} xs={6} md={4}>
                  <Card className="similar-equipment-card">
                    <div style={{ height: "120px" }}>
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-100 h-100 similar-equipment-img"
                      />
                    </div>
                    <Card.Body className="p-2">
                      <p className="small fw-medium text-truncate mb-0">
                        {item.name}
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default DetalleMaquinaria;
