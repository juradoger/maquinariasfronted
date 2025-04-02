import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiltrarMaquinarias } from "../../services/maquinarias";
import { useNavigate } from "react-router-dom";

const MaquinariasList = () => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<i key={i} className="fas fa-star text-warning"></i>);
    }
    return stars;
  };
  const [filtros, setFiltros] = useState({
    codigo: "",
    nombre: "",
    marca: "",
    estado: "",
    tipo: "",
    costoMin: null,
    costoMax: null,
    antiguedad: "",
  });

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchFiltrar();
  }, []);

  const fetchFiltrar = async () => {
    const result = await FiltrarMaquinarias(filtros);
    setData(result.data || []);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const handleFiltrar = () => {
    setCurrentPage(1);
    fetchFiltrar();
  };

  const handleLimpiar = () => {
    setFiltros({
      codigo: "",
      nombre: "",
      marca: "",
      estado: "",
      tipo: "",
      costoMin: "",
      costoMax: "",
      antiguedad: "",
    });
    setCurrentPage(1);
    fetchFiltrar();
  };

  const totalItems = data.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const maquinariasPaginadas = data.slice(startIndex, endIndex);

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const navigate = useNavigate();
  const setMaquinariaSeleccionada = (e) =>{
    localStorage.setItem("maquinaria", JSON.stringify(e));
    navigate("/detalle");
  }

  return (
    <div className="py-5" style={{ backgroundColor: "#1c1c1c", color: "#fff" }}>
      <div className="container">
        <h1 className="text-warning">Maquinarias en Alquiler</h1>
        <div className="row">
          <div className="col-md-9">
            <div className="row">
              {maquinariasPaginadas.map((maquinaria) => (
                <div key={maquinaria.id} className="col-md-4 mb-4">
                  <div className="card text-bg-light border-warning h-100">
                    <img
                      src={maquinaria.portada || "/api/placeholder/400/300"}
                      className="card-img-top"
                      alt={maquinaria.nombre}
                    />
                    <div className="card-body text-center">
                      <div className="mb-2">
                        {renderStars(maquinaria.puntuacionPromedio)}
                      </div>
                      <h5 className="card-title">{maquinaria.nombre}</h5>
                      <p className="card-text">{maquinaria.descripcion}</p>
                      <button className="btn btn-warning" onClick={() => setMaquinariaSeleccionada(maquinaria)}>
                        Ver más <i className="fas fa-eye ms-1"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <nav>
              <ul className="pagination justify-content-center">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageClick(currentPage - 1)}
                  >
                    &lsaquo;
                  </button>
                </li>
                {[...Array(totalPages)].map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      currentPage === index + 1 ? "bg-warning" : ""
                    }`}
                  >
                    <button
                      className={`page-link text-white ${
                        currentPage === index + 1 ? "bg-warning" : ""
                      }`}
                      onClick={() => handlePageClick(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageClick(currentPage + 1)}
                  >
                    &rsaquo;
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Filtro lateral */}
          <div className="col-md-3">
            <div className="card text-bg-light p-3">
              <span className="text-secondary">Filtrar</span>
              <h5 className="mb-3">Filtrar las maquinarias</h5>

              {[
                { label: "Código", name: "codigo" },
                { label: "Nombre", name: "nombre" },
                { label: "Marca", name: "marca" },
                { label: "Estado", name: "estado" },
                { label: "Tipo", name: "tipo" },
                { label: "Antigüedad", name: "antiguedad" },
              ].map(({ label, name }) => (
                <div className="mb-3" key={name}>
                  <h6 className="d-flex align-items-center">
                    <span className="me-2">{label}</span>
                  </h6>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder={label}
                    name={name}
                    value={filtros[name]}
                    onChange={handleChange}
                  />
                </div>
              ))}
              {/*
              <div className="mb-3">
                <h6 className="d-flex align-items-center">
                  <span className="me-2">Costo mínimo</span>
                </h6>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  placeholder="Costo mínimo"
                  name="costoMin"
                  value={filtros.costoMin}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <h6 className="d-flex align-items-center">
                  <span className="me-2">Costo máximo</span>
                </h6>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  placeholder="Costo máximo"
                  name="costoMax"
                  value={filtros.costoMax}
                  onChange={handleChange}
                />
              </div>*/}

              <div className="d-grid gap-2 mt-4">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={handleLimpiar}
                >
                  Limpiar filtros
                </button>
                <button className="btn btn-dark btn-sm" onClick={handleFiltrar}>
                  Aplicar filtros
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaquinariasList;
