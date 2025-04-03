import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap-icons/font/bootstrap-icons.css";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { FaStar } from "react-icons/fa"; // Importing star icon from react-icons
import { useParams } from "react-router-dom"; // Si estás usando React Router
import AlquilerMaquinaria from "./alquiler-maquinaria";
import { Toast } from "react-bootstrap";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { red, green } from "@mui/material/colors";

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
  const [showRentModal, setShowRentModal] = useState(false);

  const [showA, setShowA] = useState(true);

  const toggleShowA = () => setShowA(!showA);
  const [showB, setShowB] = useState(false);

  const toggleShowB = () => setShowB(!showB);
  const [logueado, setLogueado] = useState(false);
  // Estado para controlar la visibilidad de la tarjeta de reseñas
  const [showReviews, setShowReviews] = useState(false);

  // Estados para almacenar datos del backend
  const [maquinaria, setMaquinaria] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [similarEquipment, setSimilarEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para el formulario de reseña
  const [puntuacion, setPuntuacion] = useState("5");
  const [comentario, setComentario] = useState("");

  // Obtener el ID de la maquinaria de los parámetros de la URL (si usas React Router)
  // Si no usas React Router, puedes pasar el ID como prop o definirlo de otra manera
  const [id, setId] = useState(0); // ID por defecto: 1

  // URL base de la API
  const apiUrl = import.meta.env.VITE_API_URL;

  // Función para mostrar/ocultar la tarjeta de reseñas
  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };

  // Cargar datos de la maquinaria al montar el componente
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogueado(true);
      setShowA(false);
    }
    const local = JSON.parse(localStorage.getItem("maquinaria")) || [];
    setMaquinaria(local);
    setId(local.id);

    const fetchData = async () => {
      try {
        setLoading(true);

        // Obtener detalles de la maquinaria
        const maquinariaResponse = await fetch(
          `${apiUrl}/Maquinarias/${local?.id}`
        );
        if (!maquinariaResponse.ok) {
          throw new Error("No se pudo obtener los datos de la maquinaria");
        }
        const maquinariaData = await maquinariaResponse.json();
        setMaquinaria(maquinariaData);

        // Obtener reseñas de la maquinaria
        const reviewsResponse = await fetch(
          `${apiUrl}/Reviews/ByMaquinaria/${local?.id}`
        );
        if (reviewsResponse.ok) {
          const reviewsData = await reviewsResponse.json();
          setReviews(reviewsData);
        }

        // Obtener maquinarias similares
        const similarResponse = await fetch(
          `${apiUrl}/Maquinarias/Similar/${local?.id}`
        );
        if (similarResponse.ok) {
          const similarData = await similarResponse.json();
          setSimilarEquipment(similarData);
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Función para enviar una nueva reseña
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    try {
      // Obtener el token de autenticación (si tienes autenticación implementada)
      const token = localStorage.getItem("token");
      const headers = token
        ? {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        : { "Content-Type": "application/json" };

      const id_usuario_local = localStorage.getItem("user_id");
      console.log(id_usuario_local);
      const response = await fetch(`${apiUrl}/Reviews`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          puntuacion: parseInt(puntuacion),
          comentario: comentario,
          idMaquinaria: parseInt(id),
          idUsuario: id_usuario_local,
          // Si tienes autenticación, puedes incluir el ID del usuario actual
          // idUsuario: currentUser.id
        }),
      });
      /*
      if (!response.ok) {
        throw new Error("No se pudo enviar la reseña");
      }*/

      // Recargar las reseñas para mostrar la nueva
      const reviewsResponse = await fetch(
        `${apiUrl}/Reviews/ByMaquinaria/${id}`
      );
      if (reviewsResponse.ok) {
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);
      }

      // Limpiar el formulario
      setPuntuacion("5");
      setComentario("");
      setShowB(true);
      setTimeout(() => {
        setShowB(false);
      }, 5000);
    } catch (err) {
      alert(`Error al enviar la reseña: ${err.message}`);
    }
  };

  // Mostrar un mensaje de carga mientras se obtienen los datos
  if (loading) {
    return (
      <div className="bg-dark-custom text-white min-vh-100 d-flex justify-content-center align-items-center">
        <p>Cargando datos...</p>
      </div>
    );
  }

  // Mostrar un mensaje de error si ocurrió algún problema
  if (error) {
    return (
      <div className="bg-dark-custom text-white min-vh-100 d-flex justify-content-center align-items-center">
        <p>Error: {error}</p>
      </div>
    );
  }

  // Si no hay datos de maquinaria
  if (!maquinaria) {
    return (
      <div className="bg-dark-custom text-white min-vh-100 d-flex justify-content-center align-items-center">
        <p>No se encontró la maquinaria solicitada</p>
      </div>
    );
  }

  // Calcular el promedio de calificaciones
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.puntuacion, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  // Procesar las fotos si existen
  const fotos = maquinaria.fotos ? maquinaria.fotos : [];

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
                  src={maquinaria.portada || "/placeholder.jpg"}
                  alt={maquinaria.nombre}
                  className="w-100 h-100 object-fit-contain"
                />
              </div>
              <Row className="g-2">
                {fotos.slice(0, 3).map((foto, index) => (
                  <Col xs={4} key={index}>
                    <div
                      className="bg-dark-secondary rounded overflow-hidden"
                      style={{ height: "80px" }}
                    >
                      <img
                        src={foto || "/placeholder.jpg"}
                        alt={`Vista ${index + 1}`}
                        className="w-100 h-100 object-fit-cover"
                      />
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>

            <Col md={6}>
              <div className="mb-4">
                <h1 className="fs-2 fw-bold">{maquinaria.nombre}</h1>
                <div className="d-flex align-items-center mt-1">
                  <span className="text-yellow">
                    {Array(5)
                      .fill()
                      .map((_, i) => (
                        <span key={i}>
                          {i < Math.round(parseFloat(averageRating))
                            ? "★"
                            : "☆"}
                        </span>
                      ))}
                  </span>
                  <span className="text-secondary ms-2 small">
                    ({averageRating} basado en {reviews.length} reseñas)
                  </span>
                </div>
              </div>

              <Card className="bg-dark-secondary border-0 mb-4">
                <Card.Body>
                  <h2 className="fs-5 fw-bold mb-2 text-white-custom">
                    DESCRIPCIÓN
                  </h2>
                  <p className="small text-light">{maquinaria.descripcion}</p>
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
                <Button
                  className="btn-yellow w-100 py-2 mb-2 fw-bold"
                  disabled={!logueado}
                  onClick={() => setShowRentModal(true)}
                >
                  ALQUILAR YA <i className="bi bi-chevron-right ms-1"></i>
                </Button>

                <AlquilerMaquinaria
                  id={maquinaria.id}
                  showRentModal={showRentModal}
                  setShowRentModal={setShowRentModal}
                />
                <Button
                  className="btn-outline-yellow w-100"
                  onClick={toggleReviews}
                >
                  Dejar una reseña
                </Button>
              </div>
            </Col>
          </Row>

          {/* Tarjeta de reseñas que se muestra/oculta según el estado */}
          {(showReviews || reviews) && (
            <Card className="bg-dark-secondary border-0 mb-4 text-white">
              <Card.Body>
                <Row>
                  <Col md={6} className="mb-4 mb-md-0">
                    {reviews.length > 0 ? (
                      reviews.map((review) => (
                        <div
                          key={review.id}
                          className="border-bottom border-secondary pb-3 mb-3"
                        >
                          <div className="d-flex align-items-center mb-2">
                            <div className="user-avatar">
                              <span>
                                {review.usuario?.nombre?.charAt(0) || "U"}
                              </span>
                            </div>
                            <div>
                              <p className="small fw-medium mb-0">
                                {review.usuario
                                  ? `${review.usuario.nombre} ${review.usuario.apellido}`
                                  : "Usuario"}
                              </p>
                              <div className="d-flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <FaStar
                                    key={star}
                                    className={`small ${
                                      star <= review.puntuacion
                                        ? "text-yellow"
                                        : "text-secondary"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className="small text-light">
                            {review.comentario}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted">
                        No hay reseñas disponibles para esta maquinaria.
                      </p>
                    )}
                  </Col>

                  <Col md={6}>
                    <div className="mb-3">
                      <h3 className="fs-5 fw-bold">Valoraciones</h3>
                      <div className="d-flex align-items-center">
                        <span className="fs-3 fw-bold me-1">
                          {averageRating}
                        </span>
                        <div className="d-flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              className={`${
                                star <= Math.round(parseFloat(averageRating))
                                  ? "text-yellow"
                                  : "text-secondary"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="small text-secondary">
                        ({reviews.length} valoraciones)
                      </p>
                    </div>
                  </Col>
                </Row>
                {showReviews && (
                  <div className="mt-4">
                    <Form onSubmit={handleSubmitReview}>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-light">
                          Calificación
                        </Form.Label>
                        <Form.Select
                          className="bg-dark-secondary text-white border-secondary mb-3"
                          value={puntuacion}
                          onChange={(e) => setPuntuacion(e.target.value)}
                        >
                          <option value="5">★★★★★ (5/5)</option>
                          <option value="4">★★★★ (4/5)</option>
                          <option value="3">★★★ (3/5)</option>
                          <option value="2">★★ (2/5)</option>
                          <option value="1">★ (1/5)</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className="text-light">
                          Comentario
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          className="bg-white text-dark border-0"
                          placeholder="Ingresa tu comentario"
                          style={{ height: "80px" }}
                          value={comentario}
                          onChange={(e) => setComentario(e.target.value)}
                        />
                      </Form.Group>

                      <div className="d-flex justify-content-end">
                        <Button
                          type="submit"
                          className="btn-yellow"
                          disabled={!logueado}
                        >
                          Postear <i className="bi bi-arrow-right ms-1"></i>
                        </Button>
                      </div>
                    </Form>
                  </div>
                )}
              </Card.Body>
            </Card>
          )}

          <div>
            <h2 className="fs-4 fw-bold mb-3">Equipos Similares</h2>
            <Row className="g-3">
              {similarEquipment.map((item) => (
                <Col key={item.id} xs={6} md={4}>
                  <Card className="similar-equipment-card">
                    <div style={{ height: "120px" }}>
                      <img
                        src={item.portada || "/placeholder.svg"}
                        alt={item.nombre}
                        className="w-100 h-100 similar-equipment-img"
                      />
                    </div>
                    <Card.Body className="p-2">
                      <p className="small fw-medium text-truncate mb-0">
                        {item.nombre}
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </div>

      <Toast
        show={showA}
        onClose={toggleShowA}
        className="position-fixed bottom-0 end-0 m-3 border-danger-subtle"
        bg="danger-subtle"
      >
        <Toast.Header className="text-bg-danger">
          <WarningRoundedIcon sx={{ color: red[100] }} />
          <strong className="ms-2 me-auto">Debes estar registrado</strong>
        </Toast.Header>
      </Toast>
      <Toast
        show={showB}
        onClose={toggleShowB}
        className="position-fixed bottom-0 end-0 m-3 border-danger-subtle"
        bg="danger-subtle"
      >
        <Toast.Header className="text-bg-success">
          <WarningRoundedIcon sx={{ color: green[100] }} />
          <strong className="ms-2 me-auto">Se guardo tu reseña</strong>
        </Toast.Header>
      </Toast>
    </>
  );
};

export default DetalleMaquinaria;
