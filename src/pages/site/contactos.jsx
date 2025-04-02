import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const ContactUsPage = () => {
  return (
    <>
      {/* Header */}
      <header className="bg-warning text-dark py-3">
        <div className="container d-flex justify-content-between align-items-center">
          {/* Puedes agregar un logo o título aquí */}
        </div>
      </header>

      <div style={{ backgroundColor: '#1E1E1E', color: 'white', padding: '20px' }}>
        <h1 className="text-center my-4" style={{ color: '#FEC107', fontSize: '6rem' }}>Contáctanos</h1>
        <div className="container">
          <h5 className="my-4" style={{ color: '#FEC107' }}>Google Maps</h5>
          <div className="map-container mb-3">
            <iframe 
              title="Google Maps Ubicación"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3711.2498091295915!2d-64.74440148826783!3d-21.537085290278778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x940647dfb7a7d803%3A0x9c955b696d54271a!2sUniversidad%20Privada%20Domingo%20Savio!5e0!3m2!1ses-419!2sbo!4v1743550832384!5m2!1ses-419!2sbo"
              width="100%" 
              height="500" 
              style={{ border: '5px solid transparent' }} 
              allowFullScreen 
              loading="lazy"
            ></iframe>
          </div>

          <div className="row mb-4 justify-content-center">
            {/* Columna para Publicidad / Patrocinios */}
            <div className="col-md-5 mx-2" style={{ maxWidth: '600px' }}>
              <h5 style={{ color: '#FEC107', fontSize: '2.5rem' }}>Publicidad / Patrocinios</h5>
              <p style={{ fontSize: '1.5rem', fontWeight: '200' }}>2492 Central Ave, Acworth, GA, 30102</p>
              <p style={{ fontSize: '1.5rem', fontWeight: '200' }}>Email: example@example.com</p>
              <p style={{ fontSize: '1.5rem', fontWeight: '200' }}>Teléfono: +1 234 567 890</p>
              <p style={{ fontSize: '1.5rem', fontWeight: '200' }}>Horario: Lunes a Sábado de 9:00 a 17:00 horas.</p>
            </div>

            {/* Columna para Información del Contacto */}
            <div className="col-md-5 mx-2" style={{ maxWidth: '500px' }}>
              <h5 style={{ color: '#FEC107', fontSize: '2.5rem' }}>Información del Contacto</h5>
              <p style={{ fontSize: '1.5rem', fontWeight: '200' }}>2492 Central Ave, Acworth, GA, 30102</p>
              <p style={{ fontSize: '1.5rem', fontWeight: '200' }}>Email: example@example.com</p>
              <p style={{ fontSize: '1.5rem', fontWeight: '200' }}>Teléfono: +1 234 567 890</p>
              <p style={{ fontSize: '1.5rem', fontWeight: '200' }}>Horario: Lunes a Sábado de 9:00 a 17:00 horas.</p>
            </div>
          </div>
        
          <form action="https://formsubmit.co/wattfiv@gmail.com" method="POST"  
            style={{ border: '1px solid #333333', borderRadius: '8px', padding: '20px', backgroundColor: '#2E2E2E', maxWidth: '1000px', margin: '0 auto' }}>
  
            <p>Por favor, rellene el formulario a continuación y nos pondremos en contacto con usted en breve.</p>
  
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre</label>
              <input 
                name="nombre"
                type="text" 
                className="form-control" 
                id="name" 
                placeholder="Ingresa el nombre" 
                style={{ border: '2px solid #FEC107' }} 
                required 
              />
            </div>
  
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo Electrónico</label>
              <input 
                type="email" 
                className="form-control" 
                name="email"
                id="email" 
                placeholder="Ingresa el correo electrónico" 
                style={{ border: '2px solid #FEC107' }} 
                required 
              />
            </div>
  
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Mensaje</label>
              <textarea 
                className="form-control" 
                name="mensaje"
                id="message" 
                rows="3" 
                placeholder="Ingresa tu mensaje" 
                style={{ border: '2px solid #FEC107' }} 
                required
              ></textarea>
            </div>
  
            <input type="hidden" name="_next" value="http://localhost:5173/" />
            <input type="hidden" name="_captcha" value="false" />
  
            <button type="submit" className="btn" style={{ backgroundColor: '#FF5F00', color: 'white', width: '100%' }}>
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactUsPage;
