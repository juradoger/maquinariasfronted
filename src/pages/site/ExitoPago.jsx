import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';

const TransaccionExitosa = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="text-white" style={{ width: '100%', maxWidth: '500px', backgroundColor: '#1e2430', borderRadius: '10px' }}>
        <Card.Body className="p-4">
          <div className="text-center mb-4">
            <h1 className="fw-bold">TRANSACIÓN</h1>
            <h2 className="fs-3 fw-light mb-4">EXITOSA</h2>
            
            <div className="mb-4">
              <div style={{ width: '80px', height: '80px', margin: '0 auto', position: 'relative' }}>
                <div className="rounded-circle" style={{ width: '100%', height: '100%', border: '3px solid #ffc107', position: 'relative' }}>
                  <div style={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)',
                    color: '#ffc107',
                    fontSize: '40px'
                  }}>
                    ✓
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Row className="mb-3">
            <Col xs={6} className="text-start text-white-50">
              <p>Metodo de pago</p>
            </Col>
            <Col xs={6} className="text-end">
              <p>Pago en línea</p>
            </Col>
          </Row>
          
          <Row className="mb-3">
            <Col xs={6} className="text-start text-white-50">
              <p>Estado de pago</p>
            </Col>
            <Col xs={6} className="text-end">
              <p>Pagado</p>
            </Col>
          </Row>
          
          <Row className="mb-3">
            <Col xs={6} className="text-start text-white-50">
              <p>Monto pagado</p>
            </Col>
            <Col xs={6} className="text-end">
              <p>1000 Bs</p>
            </Col>
          </Row>
          
          <Row className="mb-4">
            <Col xs={6} className="text-start text-white-50">
              <p>Tipo de Maquinaria</p>
            </Col>
            <Col xs={6} className="text-end">
              <p>Excabadora</p>
            </Col>
          </Row>
          
          <Button variant="warning" className="w-100 py-2 mb-3 fw-bold">
            Confirmar
          </Button>
          
          <Button variant="outline-light" className="w-100 py-2">
            Descargar PDF <i className="bi bi-file-earmark-arrow-down"></i>
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TransaccionExitosa;