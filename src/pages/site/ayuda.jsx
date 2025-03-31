import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Accordion, Button, Card, Container, Row, Col } from "react-bootstrap";

export default function HelpCenter() {
  return (
    <div className="bg-dark text-white py-5">
      <Container>
        {/* Título */}
        <h2 className="text-center fw-bold mb-5">
          Centro <span className="fw-light">de</span> Ayuda
        </h2>
        
       

        {/* Sección de Tarjetas */}
        <Row className="mt-4 justify-content-center">
          <Col md={5} className="mb-4">
            <Card className="border-light rounded">
              <Card.Header className="bg-warning text-dark fw-bold">
                SITIO WEB
              </Card.Header>
              <Card.Body className="bg-secondary">
                <Accordion>
                  {[1, 2, 3].map((item, index) => (
                    <Accordion.Item eventKey={index.toString()} key={index}>
                      <Accordion.Header>Title</Accordion.Header>
                      <Accordion.Body>
                        Respuesta a la pregunta frecuente en una frase o párrafo corto.
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
                <Button variant="warning" className="w-100 mt-3">
                  Contactar con nosotros
                </Button>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={5} className="mb-4">
            <Card className="border-light rounded">
              <Card.Header className="bg-warning text-dark fw-bold">
                PANEL DE ADMINISTRADOR
              </Card.Header>
              <Card.Body className="bg-secondary">
                <Accordion>
                  {[1, 2, 3].map((item, index) => (
                    <Accordion.Item eventKey={index.toString()} key={index}>
                      <Accordion.Header>Title</Accordion.Header>
                      <Accordion.Body>
                        Respuesta a la pregunta frecuente en una frase o párrafo corto.
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
                <Button variant="warning" className="w-100 mt-3">
                  Contactar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mb-5 justify-content-center">
  <Col md={10} lg={8}>
    <div className="mb-4">
      <h1 className="mb-0">
        <span className="fw-bold">Demo</span> <span className="fw-light">de</span>
      </h1>
      <h2 className="mb-4">¿Cómo funciona?</h2>
      
      <div className="video-container position-relative">
        <div
          className="ratio ratio-16x9 bg-secondary"
          style={{
            borderRadius: "8px",
            border: "2px solid #ffc107",
            minHeight: "300px"
          }}
        >
          {/* Incrustar video de YouTube */}
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/Y6giH81r1WI"  // Reemplaza VIDEO_ID con el ID real del video
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              borderRadius: "8px", 
            }}
          ></iframe>
        </div>
      </div>
    </div>
  </Col>
</Row>

      </Container>
    </div>
  );
}