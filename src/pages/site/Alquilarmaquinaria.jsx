import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AlquilarMaquinariaForm = () => {
  const [formData, setFormData] = useState({
    fax: '',
    celular: '',
    website: '',
    razonSocial: '',
    direccion: '',
    codigoPos: '',
    detallesAdicionales: '',
    conFactura: true,
    formatoContrato: 'pdf'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'radio' ? value : type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your form submission logic here
  };

  return (
    <div className="container-fluid p-0" style={{ maxWidth: '550px', margin: '0 auto', backgroundColor: 'rgba(128, 128, 128, 0.8)' }}>
      <form onSubmit={handleSubmit} className="p-4 text-white">
        <div className="mb-3">
          <label htmlFor="detallesMaquinaria" className="form-label small fw-bold">Detalles Maquinaria</label>
        </div>

        <div className="row mb-3">
          <div className="col-6">
            <label htmlFor="fax" className="form-label small fw-bold">Fax</label>
            <input
              type="text"
              className="form-control"
              id="fax"
              name="fax"
              placeholder="Este campo se llenará automático"
              value={formData.fax}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div className="col-6">
            <label htmlFor="celular" className="form-label small fw-bold">Celular</label>
            <input
              type="text"
              className="form-control"
              id="celular"
              name="celular"
              placeholder="Este campo se llenará automático"
              value={formData.celular}
              onChange={handleChange}
              readOnly
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="website" className="form-label small fw-bold">Website</label>
          <input
            type="text"
            className="form-control"
            id="website"
            name="website"
            placeholder="Este campo se llenará automático"
            value={formData.website}
            onChange={handleChange}
            readOnly
          />
        </div>

        <div className="mb-3">
          <div className="row">
            <div className="col-md-4">
              <label htmlFor="razonSocial" className="form-label small fw-bold">Razón Social</label>
              <input
                type="text"
                className="form-control"
                id="razonSocial"
                name="razonSocial"
                placeholder="Este campo se llenará automático"
                value={formData.razonSocial}
                onChange={handleChange}
                readOnly
              />
            </div>
            <div className="col-md-5">
              <label htmlFor="direccion" className="form-label small fw-bold">Dirección</label>
              <input
                type="text"
                className="form-control"
                id="direccion"
                name="direccion"
                placeholder="Este campo se llenará automático"
                value={formData.direccion}
                onChange={handleChange}
                readOnly
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="codigoPos" className="form-label small fw-bold">Código Pos</label>
              <input
                type="text"
                className="form-control"
                id="codigoPos"
                name="codigoPos"
                placeholder="Este campo se llenará automático"
                value={formData.codigoPos}
                onChange={handleChange}
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="detallesAdicionales" className="form-label small fw-bold">Detalles Adicionales</label>
          <input
            type="text"
            className="form-control"
            id="detallesAdicionales"
            name="detallesAdicionales"
            placeholder="Este campo se llenará automático"
            value={formData.detallesAdicionales}
            onChange={handleChange}
            readOnly
          />
        </div>

        <div className="mb-4">
          <div className="d-flex align-items-center mb-2">
            <div className="form-check me-4">
              <input
                className="form-check-input"
                type="radio"
                name="factura"
                id="conFactura"
                checked={formData.conFactura}
                onChange={() => setFormData({...formData, conFactura: true})}
              />
              <label className="form-check-label" htmlFor="conFactura">
                Con factura
              </label>
            </div>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="factura"
              id="sinFactura"
              checked={!formData.conFactura}
              onChange={() => setFormData({...formData, conFactura: false})}
            />
            <label className="form-check-label" htmlFor="sinFactura">
              Sin factura
            </label>
          </div>
        </div>

        <div className="d-flex gap-2 mb-3">
          <button 
            type="button" 
            className="btn btn-danger text-white d-flex align-items-center justify-content-center"
            style={{ width: '130px', height: '40px' }}
          >
            <i className="bi bi-file-earmark-pdf-fill me-2"></i>
            Contrato PDF
          </button>
          <button 
            type="button" 
            className="btn btn-primary text-white d-flex align-items-center justify-content-center"
            style={{ width: '130px', height: '40px' }}
          >
            <i className="bi bi-file-earmark-word-fill me-2"></i>
            Contrato DOCX
          </button>
        </div>
        
        <div className="d-grid mb-2">
          <button 
            type="button" 
            className="btn btn-light"
            style={{ height: '40px' }}
          >
            Cancelar
          </button>
        </div>
        
        <div className="d-grid">
          <button 
            type="button" 
            className="btn btn-dark"
            style={{ height: '40px' }}
          >
            Alquilar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AlquilarMaquinariaForm;