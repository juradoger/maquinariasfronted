import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  return (
    <footer className="bg-warning text-dark py-4">
      <div className="container">
        <div className="row">
          
          <div className="col-md-6">
            <h2 className="fw-bold mb-2">RentMaq360</h2>
            <p className="mb-3">Una plataforma desarrollada para el alquiler y reserva de maquinarias en Bolivia</p>
            
            <h4 className="fw-bold mb-2">Redes Sociales</h4>
            <div className="d-flex gap-3 mb-4">
             
              <a href="#" className="text-dark" style={{ fontSize: "24px" }}>
                <i className="fab fa-facebook-f"></i>
              </a>
              
              <a href="#" className="text-dark" style={{ fontSize: "24px" }}>
                <i className="fab fa-twitter"></i>
              </a>
              
              <a href="#" className="text-dark" style={{ fontSize: "24px" }}>
                <i className="fab fa-youtube"></i>
              </a>
            </div>

           
            <div className="mb-3">
              <iframe
                title="Mapa"
                src="https://www.google.com/maps/embed?..."
                width="100%"
                height="200"
                style={{ border: '1px solid #ccc', maxWidth: "450px" }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          
          <div className="col-md-6 d-flex justify-content-center justify-content-md-end align-items-center">
            <div className="text-center">
              <img 
                src="/src/assets/logo.png" 
                alt="RentMaq360" 
                style={{ 
                  maxWidth: "450px",
                  height: "auto"
                }} 
              />
             
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
