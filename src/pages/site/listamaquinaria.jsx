import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const MaquinariasList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Datos de ejemplo para las maquinarias
  const maquinarias = [
    { id: 1, nombre: "Excavador", tipo: "Maquinaria de trabajo", rating: 5, imagen: "/src/assets/excavador.jpg" },
    { id: 2, nombre: "Excavador", tipo: "Maquinaria de trabajo", rating: 5, imagen: "/src/assets/excavador.jpg" },
    { id: 3, nombre: "Excavador", tipo: "Maquinaria de trabajo", rating: 5, imagen: "/src/assets/excavador.jpg" },
    { id: 4, nombre: "Excavador", tipo: "Maquinaria de trabajo", rating: 5, imagen: "/src/assets/excavador.jpg" },
    { id: 5, nombre: "Excavador", tipo: "Maquinaria de trabajo", rating: 5, imagen: "/src/assets/excavador.jpg" }
  ];

  // Función para renderizar estrellas según rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<i key={i} className="fas fa-star text-warning"></i>);
    }
    return stars;
  };

  // Función para cambiar de página
  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="py-5" style={{ backgroundColor: "#1c1c1c", color: "#fff" }}>
      <div className="container">
        <div className="row">
          {/* Título principal */}
          <div className="col-12 mb-4">
            <h1 className="text-warning" style={{ fontSize: "2.5rem" }}>
              Maquinarias <span style={{ color: "#fff" }}>en</span>
              <div style={{ color: "#FFC107", fontSize: "2.8rem" }}>Alquiler</div>
            </h1>
          </div>

          {/* Contenedor de las cards */}
          <div className="col-md-9">
            <div className="row">
              {/* Primera fila de maquinarias (2 cards) */}
              <div className="col-md-6 mb-4">
                <div className="card border-warning h-100" style={{ backgroundColor: "#fff", borderRadius: "15px", overflow: "hidden" }}>
                  <img src="/api/placeholder/400/300" className="card-img-top" alt="Excavador" />
                  <div className="card-body text-center">
                    <div className="mb-2">{renderStars(5)}</div>
                    <h5 className="card-title fw-bold text-dark">Excavador</h5>
                    <p className="card-text text-muted">Maquinaria de trabajo</p>
                    <button className="btn btn-warning text-dark px-4 rounded-pill">
                      Ver más <i className="fas fa-eye ms-1"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="card border-warning h-100" style={{ backgroundColor: "#fff", borderRadius: "15px", overflow: "hidden" }}>
                  <img src="/api/placeholder/400/300" className="card-img-top" alt="Excavador" />
                  <div className="card-body text-center">
                    <div className="mb-2">{renderStars(5)}</div>
                    <h5 className="card-title fw-bold text-dark">Excavador</h5>
                    <p className="card-text text-muted">Maquinaria de trabajo</p>
                    <button className="btn btn-warning text-dark px-4 rounded-pill">
                      Ver más <i className="fas fa-eye ms-1"></i>
                    </button>
                  </div>
                </div>
              </div>

              {/* Segunda fila de maquinarias (3 cards más pequeñas) */}
              <div className="col-md-4 mb-4">
                <div className="card border-warning h-100" style={{ backgroundColor: "#fff", borderRadius: "15px", overflow: "hidden" }}>
                  <img src="/api/placeholder/400/300" className="card-img-top" alt="Excavador" />
                  <div className="card-body text-center">
                    <div className="mb-2">{renderStars(5)}</div>
                    <h5 className="card-title fw-bold text-dark">Excavador</h5>
                    <p className="card-text text-muted">Maquinaria de trabajo</p>
                    <button className="btn btn-warning text-dark px-3 rounded-pill" style={{ fontSize: "0.9rem" }}>
                      Ver más <i className="fas fa-eye ms-1"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-4">
                <div className="card border-warning h-100" style={{ backgroundColor: "#fff", borderRadius: "15px", overflow: "hidden" }}>
                  <img src="/api/placeholder/400/300" className="card-img-top" alt="Excavador" />
                  <div className="card-body text-center">
                    <div className="mb-2">{renderStars(5)}</div>
                    <h5 className="card-title fw-bold text-dark">Excavador</h5>
                    <p className="card-text text-muted">Maquinaria de trabajo</p>
                    <button className="btn btn-warning text-dark px-3 rounded-pill" style={{ fontSize: "0.9rem" }}>
                      Ver más <i className="fas fa-eye ms-1"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-4">
                <div className="card border-warning h-100" style={{ backgroundColor: "#fff", borderRadius: "15px", overflow: "hidden" }}>
                  <img src="/api/placeholder/400/300" className="card-img-top" alt="Excavador" />
                  <div className="card-body text-center">
                    <div className="mb-2">{renderStars(5)}</div>
                    <h5 className="card-title fw-bold text-dark">Excavador</h5>
                    <p className="card-text text-muted">Maquinaria de trabajo</p>
                    <button className="btn btn-warning text-dark px-3 rounded-pill" style={{ fontSize: "0.9rem" }}>
                      Ver más <i className="fas fa-eye ms-1"></i>
                    </button>
                  </div>
                </div>
              </div>

              {/* Paginación */}
              <div className="col-12 mt-3 d-flex justify-content-center">
                <nav aria-label="Paginación de maquinarias">
                  <ul className="pagination">
                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Anterior">
                        <span aria-hidden="true" style={{ backgroundColor: "#1c1c1c", color: "#FFC107" }}>&lsaquo;</span>
                      </a>
                    </li>
                    <li className="page-item active">
                      <a className="page-link" href="#" style={{ backgroundColor: "#FFC107", borderColor: "#FFC107", color: "#000" }}>1</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#" style={{ backgroundColor: "#333", borderColor: "#333", color: "#FFC107" }}>2</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#" style={{ backgroundColor: "#333", borderColor: "#333", color: "#FFC107" }}>3</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#" style={{ backgroundColor: "#333", borderColor: "#333", color: "#FFC107" }}>4</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#" style={{ backgroundColor: "#333", borderColor: "#333", color: "#FFC107" }}>5</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Siguiente">
                        <span aria-hidden="true" style={{ backgroundColor: "#1c1c1c", color: "#FFC107" }}>&rsaquo;</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>

          {/* Filtro lateral */}
          <div className="col-md-3">
            <div className="card bg-light p-3">
              <h5 className="mb-3">Filtrar las maquinarias</h5>
              
              <div className="mb-3">
                <h6 className="d-flex align-items-center">
                  <span className="me-2">Tipo</span>
                  <i className="fas fa-chevron-circle-down text-secondary"></i>
                </h6>
                <input type="text" className="form-control form-control-sm" placeholder="Tipo de Maquinaria" />
              </div>
              
              <div className="mb-3">
                <h6 className="d-flex align-items-center">
                  <span className="me-2">Marca</span>
                  <i className="fas fa-chevron-circle-down text-secondary"></i>
                </h6>
                <input type="text" className="form-control form-control-sm" placeholder="Marca de Maquinaria" />
              </div>
              
              <div className="mb-3">
                <h6 className="d-flex align-items-center">
                  <span className="me-2">Modelo</span>
                  <i className="fas fa-chevron-circle-down text-secondary"></i>
                </h6>
                <input type="text" className="form-control form-control-sm" placeholder="Modelo de Maquinaria" />
              </div>
              
              <div className="mb-3">
                <h6 className="d-flex align-items-center">
                  <span className="me-2">Operador</span>
                </h6>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" id="operadorSwitch" />
                </div>
              </div>
              
              <div className="mb-3">
                <h6 className="d-flex align-items-center">
                  <span className="me-2">Ubicación</span>
                  <i className="fas fa-chevron-circle-down text-secondary"></i>
                </h6>
                <input type="text" className="form-control form-control-sm" placeholder="Nombre de Ubicación" />
              </div>
              
              <div className="d-grid gap-2 mt-4">
                <button className="btn btn-outline-secondary btn-sm">Clear all</button>
                <button className="btn btn-dark btn-sm">Result filter</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaquinariasList;