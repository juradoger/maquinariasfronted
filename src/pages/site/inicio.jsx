import React from "react";
import { useNavigate } from "react-router-dom"; // Importación correcta
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
  const navigate = useNavigate(); // Hook para la navegación

  const handleClick = () => {
    navigate("/lista"); // Redirige a la página de lista de maquinarias
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: "#FFC107", // Amarillo más brillante
        minHeight: "100vh",
        width: "100%",
        padding: "20px",
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          {/* Columna de texto */}
          <div className="col-lg-7 mb-4 mb-lg-0">
            <p className="mb-0 text-secondary">Bienvenido a RentMaq360</p>
            <h1 className="display-4 fw-bold" style={{ fontSize: "4rem", color: "#000" }}>
              Potencia tu<br />Progreso
            </h1>
            <h3 className="mt-4 mb-3" style={{ color: "#000" }}>
              Alquiler para la Nueva Era de la Construcción
            </h3>
            <p className="mb-4" style={{ color: "#333" }}>
              Transforma tus ideas en realidad con nuestra amplia gama de maquinaria en
              alquiler, diseñada para cada necesidad constructiva.
            </p>
            <button
              className="btn px-4 py-2 fw-bold"
              style={{
                backgroundColor: "#FF5722",
                color: "white",
                borderRadius: "4px",
                fontSize: "1rem",
              }}
              onClick={handleClick} // Evento de clic agregado
            >
              Descubre más...
            </button>
          </div>
          
          {/* Columna de imagen */}
          <div className="col-lg-5 text-center">
            <img
              src="/src/assets/ucb.png" 
              alt="Cargador frontal amarillo"
              className="img-fluid"
              style={{
                maxHeight: "400px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
