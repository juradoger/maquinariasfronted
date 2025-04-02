import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const FormularioPago = () => {
  const [formData, setFormData] = useState({
    tipoOperacion: 'alquilar',
    metodoPago: 'tarjetaCredito',
    numTarjeta: '',
    fechaVencimiento: '',
    nombreTarjeta: '',
    cuotas: '',
    pagoInicial: ''
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
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ backgroundColor: '#333', minHeight: '100vh' }}>
      <div className="card w-100" style={{ maxWidth: '550px', backgroundColor: '#4e4a4a', borderRadius: '8px', border: '1px solid #ffc107' }}>
        <div className="card-body p-4">
          {/* Header with radio buttons */}
          <div className="d-flex justify-content-center mb-4">
            <div className="bg-dark p-2 px-4 rounded-pill">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="tipoOperacion"
                  id="alquilar"
                  value="alquilar"
                  checked={formData.tipoOperacion === 'alquilar'}
                  onChange={handleChange}
                />
                <label className="form-check-label text-white" htmlFor="alquilar">
                  Alquilar
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="tipoOperacion"
                  id="reservar"
                  value="reservar"
                  checked={formData.tipoOperacion === 'reservar'}
                  onChange={handleChange}
                />
                <label className="form-check-label text-white" htmlFor="reservar">
                  Reserva
                </label>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Payment Options Title */}
            <h4 className="text-white mb-3">
              <span className="fw-bold">Opciones</span> de Pago
            </h4>

            {/* Payment Method Selection */}
            <div className="d-flex mb-3">
              <div className="form-check me-4">
                <input
                  className="form-check-input"
                  type="radio"
                  name="metodoPago"
                  id="tarjetaCredito"
                  value="tarjetaCredito"
                  checked={formData.metodoPago === 'tarjetaCredito'}
                  onChange={handleChange}
                />
                <label className="form-check-label text-white" htmlFor="tarjetaCredito">
                  Tarjeta de crédito
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="metodoPago"
                  id="tarjetaDebito"
                  value="tarjetaDebito"
                  checked={formData.metodoPago === 'tarjetaDebito'}
                  onChange={handleChange}
                />
                <label className="form-check-label text-white" htmlFor="tarjetaDebito">
                  Tarjeta de débito
                </label>
              </div>
            </div>

            {/* Card Information */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="numTarjeta" className="form-label small text-white">Num Tarjeta</label>
                <input
                  type="text"
                  className="form-control"
                  id="numTarjeta"
                  name="numTarjeta"
                  placeholder="XXXXXXXXXX"
                  value={formData.numTarjeta}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="pagoInicial" className="form-label small text-white">Pago Inicial</label>
                <input
                  type="text"
                  className="form-control"
                  id="pagoInicial"
                  name="pagoInicial"
                  placeholder="$ hr / $50 lts—campo llenado automáticamente"
                  value={formData.pagoInicial}
                  onChange={handleChange}
                  readOnly
                />
              </div>
            </div>

            {/* Expiration Date */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="fechaVencimiento" className="form-label small text-white">Fecha Vencimiento</label>
                <input
                  type="text"
                  className="form-control"
                  id="fechaVencimiento"
                  name="fechaVencimiento"
                  placeholder="Ingrese la fecha"
                  value={formData.fechaVencimiento}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="cuotas" className="form-label small text-white">Cuotas</label>
                <input
                  type="text"
                  className="form-control"
                  id="cuotas"
                  name="cuotas"
                  placeholder="XXXXXXX"
                  value={formData.cuotas}
                  onChange={handleChange}
                />
              </div>
            </div>

           
            <div className="mb-4">
              <label htmlFor="nombreTarjeta" className="form-label small text-white">Nombre de la tarjeta</label>
              <input
                type="text"
                className="form-control"
                id="nombreTarjeta"
                name="nombreTarjeta"
                placeholder="Ingrese la fecha"
                value={formData.nombreTarjeta}
                onChange={handleChange}
              />
            </div>

           
            <div className="d-grid gap-2">
              <button type="button" className="btn btn-dark text-white">
                Cancelar Pago
              </button>
              <button type="submit" className="btn text-dark fw-bold" style={{ backgroundColor: '#ffc107' }}>
                Continuar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioPago;