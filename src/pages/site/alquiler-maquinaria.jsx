import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  User,
  Package,
  DollarSign,
  FileText,
  CreditCard,
  Lock,
  CheckCircle,
  Download,
  Mail,
  X,
} from "lucide-react";

// API base URL
const API_URL = import.meta.env.VITE_API_URL;

// CSS styles
const styles = {
  modalBackdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1050,
  },
  modalContent: {
    backgroundColor: "#ddd",
    borderRadius: "0.5rem",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "900px",
    maxHeight: "90vh",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  modalContentSmall: {
    backgroundColor: "#fff",
    borderRadius: "0.5rem",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "500px",
    maxHeight: "90vh",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  iconOrange: {
    color: "#fd7e14",
  },
  iconGreen: {
    color: "#28a745",
  },
};

function AlquilerMaquinaria({ id, showRentModal, setShowRentModal }) {
  // Modal visibility states
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  // Data states
  const [maquinaria, setMaquinaria] = useState(null);
  const [proveedor, setProveedor] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form states
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [usageTime, setUsageTime] = useState("");
  const [timeUnit, setTimeUnit] = useState("hour");
  const [isInvoiced, setIsInvoiced] = useState(false);
  const [isRental, setIsRental] = useState(true);
  const [totalCost, setTotalCost] = useState(0);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentConfirmationData, setPaymentConfirmationData] = useState({
    method: "",
    status: "",
    amount: 0,
    machineryType: "",
  });

  // Add a new state variable for the reservation ID
  const [reservaId, setReservaId] = useState(null);

  // Get machinery ID from URL params
  //const [id, setId] = useState(0);
  const navigate = useNavigate();

  // Get auth token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem("token");
  };

  // Headers for API requests
  const getHeaders = () => {
    const token = getAuthToken();
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  // Get current user ID
  const getCurrentUserId = () => {
    // This should be replaced with your actual authentication method
    // For example, you might decode the JWT token or get it from localStorage
    const userData = localStorage.getItem("user_data");
    if (userData) {
      return JSON.parse(userData).id;
    }
    return null;
  };

  // Load machinery, provider and client data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch machinery details
        const maquinariaResponse = await axios.get(
          `${API_URL}/Maquinarias/${id}`,
          { headers: getHeaders() }
        );
        const maquinariaData = maquinariaResponse.data;
        setMaquinaria(maquinariaData);

        // Fetch provider details (assuming provider ID is stored in maquinaria.idProveedor)
        //if (maquinariaData.idProveedor) {
        if (true) {
          const proveedorResponse = await axios.get(
            `${API_URL}/Usuarios/${1}`,
            {
              headers: getHeaders(),
            }
          );
          setProveedor(proveedorResponse.data);
        }

        // Fetch client details (current user)
        const clienteId = localStorage.getItem("user_id");
        if (clienteId) {
          const clienteResponse = await axios.get(
            `${API_URL}/Usuarios/${clienteId}`,
            { headers: getHeaders() }
          );
          setCliente(clienteResponse.data);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Error al cargar los datos");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Calculate total cost
  useEffect(() => {
    if (!maquinaria || !usageTime) return;

    let baseCost = 0;
    const usage = Number.parseInt(usageTime);

    if (isRental) {
      if (timeUnit === "hour") {
        baseCost = usage * maquinaria.costoUsoHora;
      } else if (timeUnit === "day") {
        baseCost = usage * maquinaria.costoUsoDia;
      } else {
        baseCost = usage * maquinaria.costoUsoMes;
      }
    } else {
      // For reservation, we'll charge 5 hours as a deposit
      baseCost = 5 * maquinaria.costoUsoHora;
    }

    const finalCost = isInvoiced ? baseCost * 1.13 : baseCost;
    setTotalCost(finalCost);
  }, [maquinaria, usageTime, timeUnit, isInvoiced, isRental]);

  // Handle modal transitions
  const handleRentConfirm = () => {
    setShowRentModal(false);
    setShowPaymentModal(true);
  };

  // Create reservation in database
  const createReservation = async () => {
    try {
      const clienteId = localStorage.getItem("user_id");
      /*
      if (!clienteId) {
        throw new Error("Usuario no autenticado");
      }*/

      // Calculate dates based on timeUnit and usageTime
      const fechaInicio = new Date(startDate);
      let fechaFin = new Date(endDate);

      if (!endDate) {
        // If no end date is provided, calculate it based on usage time and unit
        fechaFin = new Date(startDate);
        if (timeUnit === "hour") {
          fechaFin.setHours(fechaFin.getHours() + Number.parseInt(usageTime));
        } else if (timeUnit === "day") {
          fechaFin.setDate(fechaFin.getDate() + Number.parseInt(usageTime));
        } else if (timeUnit === "month") {
          fechaFin.setMonth(fechaFin.getMonth() + Number.parseInt(usageTime));
        }
      }

      // Create reservation
      const reservaData = {
        fechaInicio: fechaInicio.toISOString(),
        fechaFin: fechaFin.toISOString(),
        costoTotal: totalCost,
        estado: isRental ? "activada" : "reservado",
        pagoInicial: isRental ? totalCost : totalCost / 2,
        idCliente: clienteId,
        idMaquinaria: maquinaria.id,
        idOperador: maquinaria.operadorRequerido
          ? maquinaria.idOperadorDefault
          : null,
      };

      const reservaResponse = await axios.post(
        `${API_URL}/Reservas`,
        reservaData,
        { headers: getHeaders() }
      );

      return reservaResponse.data;
    } catch (error) {
      console.error("Error creating reservation:", error);
      throw error;
    }
  };

  // Create payment receipt
  const createComprobante = async (idReserva) => {
    try {
      const comprobanteData = {
        metodoPago: "Tarjeta de Crédito",
        monto: totalCost,
        estadoPago: "Completado",
        idReserva: idReserva,
      };

      const comprobanteResponse = await axios.post(
        `${API_URL}/Comprobantes`,
        comprobanteData,
        {
          headers: getHeaders(),
        }
      );

      return comprobanteResponse.data;
    } catch (error) {
      console.error("Error creating payment receipt:", error);
      throw error;
    }
  };

  // Modify the handlePaymentConfirm function to store the reservation ID
  const handlePaymentConfirm = async () => {
    try {
      // Create reservation
      const reservaResult = await createReservation();
      console.log(reservaResult);
      // Get the reservation ID
      const idReserva = reservaResult.id;
      setReservaId(idReserva); // Store the reservation ID

      // Create payment receipt
      await createComprobante(idReserva);

      // Update payment confirmation data for display
      setPaymentConfirmationData({
        method: "Tarjeta de Crédito",
        status: "Completado",
        amount: totalCost,
        machineryType: maquinaria.nombre,
      });

      // Show confirmation modal
      setShowPaymentModal(false);
      setShowConfirmationModal(true);
    } catch (error) {
      alert("Error al procesar el pago: " + error.message);
    }
  };

  // Add a new function to create or update a contract
  const createOrUpdateContract = async () => {
    try {
      if (!reservaId) {
        throw new Error("No hay una reserva asociada");
      }

      const clienteId = localStorage.getItem("user_id");
      if (!clienteId) {
        throw new Error("Usuario no autenticado");
      }

      // Validar que las variables necesarias no sean null o undefined
      if (!maquinaria)
        throw new Error("Los datos de la maquinaria no están disponibles.");
      if (!cliente)
        throw new Error("Los datos del cliente no están disponibles.");

      // Crear detalles del contrato
      const contractDetails = {
        maquinaria: {
          id: maquinaria.id || null,
          nombre: maquinaria.nombre || "",
          codigo: maquinaria.codigo || "",
          modelo: maquinaria.modelo || "",
          costoHora: maquinaria.costoUsoHora || 0,
          costoDia: maquinaria.costoUsoDia || 0,
          costoMes: maquinaria.costoUsoMes || 0,
        },
        proveedor: {
          id: proveedor?.id || null,
          nombre: `${proveedor?.nombre || ""} ${proveedor?.apellido || ""}`,
          telefono: proveedor?.telefono || "",
          correo: proveedor?.correo || "",
        },
        cliente: {
          id: cliente.id || null,
          nombre: `${cliente.nombre || ""} ${cliente.apellido || ""}`,
          telefono: cliente.telefono || "",
          correo: cliente.correo || "",
        },
        alquiler: {
          fechaInicio: startDate || "",
          fechaFin: endDate || "",
          tiempoUso: usageTime || 0,
          unidadTiempo: timeUnit || "",
          tipo: isRental ? "Alquiler" : "Reserva",
          facturado: isInvoiced || false,
        },
        pago: {
          metodo: paymentConfirmationData?.method || "",
          estado: paymentConfirmationData?.status || "",
          monto: totalCost || 0,
        },
      };

      // Create contract data
      const contratoData = {
        detalles: JSON.stringify(contractDetails).replace(/"/g, '"'),
        estado: "Activo",
        costoFacturado: isInvoiced ? totalCost : 0,
        costoNoFacturado: isInvoiced ? 0 : totalCost,
        penalizaciones: 0,
        reservas: JSON.stringify([reservaId]).replace(/"/g, '"'), // Array of reservation IDs
        idCliente: clienteId,
      };

      // Send request to create contract
      const contratoResponse = await axios.post(
        `${API_URL}/Contratos`,
        contratoData,
        { headers: getHeaders() }
      );

      return contratoResponse.data;
    } catch (error) {
      console.error("Error creando contrato:", error.message);
      throw error;
    }
  };

  // Modify the generatePDF function to also create/update the contract
  const generatePDF = async () => {
    try {
      // First create/update the contract in the database
      await createOrUpdateContract();

      const doc = new jsPDF();

      // Add title
      doc.setFontSize(20);
      doc.text("CONTRATO DE ALQUILER", 105, 20, { align: "center" });

      // Add date
      doc.setFontSize(10);
      doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, 30);

      // Add machinery details
      doc.setFontSize(14);
      doc.text("DATOS DE LA MAQUINARIA", 20, 40);
      doc.setFontSize(10);
      doc.text(`Tipo: ${maquinaria.nombre}`, 20, 50);
      doc.text(`Código: ${maquinaria.codigo}`, 20, 55);
      doc.text(`Modelo: ${maquinaria.modelo}`, 20, 60);

      // Add provider details
      doc.setFontSize(14);
      doc.text("DATOS DEL PROVEEDOR", 20, 70);
      doc.setFontSize(10);
      doc.text(`Nombre: ${proveedor?.nombre} ${proveedor?.apellido}`, 20, 80);
      doc.text(`Teléfono: ${proveedor?.telefono}`, 20, 85);
      doc.text(`Correo: ${proveedor?.correo}`, 20, 90);

      // Add client details
      doc.setFontSize(14);
      doc.text("DATOS DEL CLIENTE", 20, 100);
      doc.setFontSize(10);
      doc.text(`Nombre: ${cliente.nombre} ${cliente.apellido}`, 20, 110);
      doc.text(`Teléfono: ${cliente.telefono}`, 20, 115);
      doc.text(`Correo: ${cliente.correo}`, 20, 120);

      // Add rental details
      doc.setFontSize(14);
      doc.text("DETALLES DEL ALQUILER", 20, 130);
      doc.setFontSize(10);
      doc.text(
        `Fecha Inicio: ${new Date(startDate).toLocaleDateString()}`,
        20,
        140
      );
      doc.text(
        `Fecha Fin: ${new Date(endDate || "").toLocaleDateString()}`,
        20,
        145
      );
      doc.text(
        `Tiempo de Uso: ${usageTime} ${
          timeUnit === "hour" ? "horas" : timeUnit === "day" ? "días" : "meses"
        }`,
        20,
        150
      );
      doc.text(`Tipo: ${isRental ? "Alquiler" : "Reserva"}`, 20, 155);
      doc.text(`Facturado: ${isInvoiced ? "Sí" : "No"}`, 20, 160);

      // Add payment details
      doc.setFontSize(14);
      doc.text("DETALLES DEL PAGO", 20, 170);
      doc.setFontSize(10);
      doc.text(`Método de Pago: ${paymentConfirmationData.method}`, 20, 180);
      doc.text(`Estado: ${paymentConfirmationData.status}`, 20, 185);
      doc.text(`Monto Total: $${totalCost.toFixed(2)}`, 20, 190);

      // Add contract status
      doc.setFontSize(14);
      doc.text("ESTADO DEL CONTRATO", 20, 200);
      doc.setFontSize(10);
      doc.text("Activo", 20, 210);

      // Add signatures
      doc.setFontSize(12);
      doc.text("_______________________", 40, 230);
      doc.text("Firma del Cliente", 50, 240);

      doc.text("_______________________", 150, 230);
      doc.text("Firma del Proveedor", 160, 240);

      // Save the PDF
      doc.save("Contrato_Alquiler.pdf");
    } catch (error) {
      alert("Error al generar el contrato: " + error.message);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="container d-flex align-items-center justify-content-center min-vh-100">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="container d-flex align-items-center justify-content-center min-vh-100">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {/* Rent Modal */}
      {showRentModal && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modalContent}>
            <div className="border-bottom p-4 d-flex justify-content-between align-items-center rounded-top">
              <h2 className="fs-3 fw-bold text-dark mb-0">
                Alquilar Maquinaria
              </h2>
              <button
                onClick={() => setShowRentModal(false)}
                className="btn btn-link text-secondary p-0 border-0"
              >
                <X size={24} />
              </button>
            </div>
            <div
              className="p-4"
              style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}
            >
              <div className="row g-4">
                {/* Rental Details */}
                <div className="col-md-6">
                  <div className="card h-100">
                    <div className="card-body">
                      <h3 className="card-title fs-5 fw-medium mb-4">
                        Detalles del Alquiler
                      </h3>
                      <div className="d-flex flex-column gap-4">
                        <div>
                          <label className="form-label fw-medium">
                            Fecha Inicio
                          </label>
                          <div className="input-group">
                            <span
                              className="input-group-text"
                              style={styles.iconOrange}
                            >
                              <Calendar size={20} />
                            </span>
                            <input
                              type="date"
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="form-label fw-medium">
                            Fecha Fin
                          </label>
                          <div className="input-group">
                            <span
                              className="input-group-text"
                              style={styles.iconOrange}
                            >
                              <Calendar size={20} />
                            </span>
                            <input
                              type="date"
                              value={endDate}
                              onChange={(e) => setEndDate(e.target.value)}
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="form-label fw-medium">
                            Tiempo de Uso
                          </label>
                          <div className="input-group">
                            <span
                              className="input-group-text"
                              style={styles.iconOrange}
                            >
                              <Clock size={20} />
                            </span>
                            <input
                              type="number"
                              value={usageTime}
                              onChange={(e) => setUsageTime(e.target.value)}
                              placeholder="Tiempo de uso"
                              className="form-control"
                              required
                            />
                            <select
                              value={timeUnit}
                              onChange={(e) => setTimeUnit(e.target.value)}
                              className="form-select"
                            >
                              <option value="hour">Horas</option>
                              <option value="day">Días</option>
                              <option value="month">Meses</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Provider Details */}
                <div className="col-md-6">
                  <div className="card h-100">
                    <div className="card-body">
                      <h3 className="card-title fs-5 fw-medium mb-4">
                        Proveedor
                      </h3>
                      <div className="d-flex flex-column gap-3">
                        <div className="input-group">
                          <span
                            className="input-group-text"
                            style={styles.iconOrange}
                          >
                            <User size={20} />
                          </span>
                          <input
                            type="text"
                            value={
                              proveedor
                                ? `${proveedor.nombre} ${proveedor.apellido}`
                                : ""
                            }
                            readOnly
                            className="form-control"
                          />
                        </div>
                        <div className="input-group">
                          <span
                            className="input-group-text"
                            style={styles.iconOrange}
                          >
                            <Phone size={20} />
                          </span>
                          <input
                            type="text"
                            value={proveedor ? proveedor.telefono : ""}
                            readOnly
                            className="form-control"
                          />
                        </div>
                        <div className="input-group">
                          <span
                            className="input-group-text"
                            style={styles.iconOrange}
                          >
                            <MapPin size={20} />
                          </span>
                          <input
                            type="text"
                            value={
                              proveedor && proveedor.detalles
                                ? proveedor.detalles.direccion || ""
                                : ""
                            }
                            readOnly
                            className="form-control"
                          />
                        </div>
                        <div className="input-group">
                          <span
                            className="input-group-text"
                            style={styles.iconOrange}
                          >
                            <Mail size={20} />
                          </span>
                          <input
                            type="email"
                            value={proveedor ? proveedor.correo : ""}
                            readOnly
                            className="form-control"
                          />
                        </div>
                        <div className="input-group">
                          <span
                            className="input-group-text"
                            style={styles.iconOrange}
                          >
                            <User size={20} />
                          </span>
                          <input
                            type="text"
                            value={
                              proveedor && proveedor.detalles
                                ? proveedor.detalles.experiencia || "5 años"
                                : "5 años"
                            }
                            readOnly
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Client Details */}
                <div className="col-md-6">
                  <div className="card h-100">
                    <div className="card-body">
                      <h3 className="card-title fs-5 fw-bold mb-4">Cliente</h3>
                      <div className="d-flex flex-column gap-3">
                        <div className="input-group">
                          <span
                            className="input-group-text"
                            style={styles.iconOrange}
                          >
                            <User size={20} />
                          </span>
                          <input
                            type="text"
                            value={
                              cliente
                                ? `${cliente.nombre} ${cliente.apellido}`
                                : ""
                            }
                            readOnly
                            className="form-control"
                          />
                        </div>
                        <div className="input-group">
                          <span
                            className="input-group-text"
                            style={styles.iconOrange}
                          >
                            <Phone size={20} />
                          </span>
                          <input
                            type="text"
                            value={cliente ? cliente.telefono : ""}
                            readOnly
                            className="form-control"
                          />
                        </div>
                        <div className="input-group">
                          <span
                            className="input-group-text"
                            style={styles.iconOrange}
                          >
                            <Mail size={20} />
                          </span>
                          <input
                            type="email"
                            value={cliente ? cliente.correo : ""}
                            readOnly
                            className="form-control"
                          />
                        </div>
                        <div className="input-group">
                          <span
                            className="input-group-text"
                            style={styles.iconOrange}
                          >
                            <MapPin size={20} />
                          </span>
                          <input
                            type="text"
                            value={
                              cliente && cliente.detalles
                                ? cliente.detalles.direccion || ""
                                : ""
                            }
                            readOnly
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Machinery Details */}
                <div className="col-md-6">
                  <div className="card h-100">
                    <div className="card-body">
                      <h3 className="card-title fs-5 fw-bold mb-4">
                        Maquinaria
                      </h3>
                      <div className="d-flex flex-column gap-3">
                        <div className="input-group">
                          <span
                            className="input-group-text"
                            style={styles.iconOrange}
                          >
                            <Package size={20} />
                          </span>
                          <input
                            type="text"
                            value={maquinaria ? maquinaria.nombre : ""}
                            readOnly
                            className="form-control"
                          />
                        </div>
                        <div className="input-group">
                          <span
                            className="input-group-text"
                            style={styles.iconOrange}
                          >
                            <FileText size={20} />
                          </span>
                          <input
                            type="text"
                            value={maquinaria ? maquinaria.codigo : ""}
                            readOnly
                            className="form-control"
                          />
                        </div>
                        <div className="input-group">
                          <span
                            className="input-group-text"
                            style={styles.iconOrange}
                          >
                            <Package size={20} />
                          </span>
                          <input
                            type="text"
                            value={maquinaria ? maquinaria.modelo : ""}
                            readOnly
                            className="form-control"
                          />
                        </div>
                        <div className="input-group">
                          <span
                            className="input-group-text"
                            style={styles.iconOrange}
                          >
                            <DollarSign size={20} />
                          </span>
                          <input
                            type="text"
                            value={
                              maquinaria
                                ? `$${maquinaria.costoUsoHora}/hora`
                                : ""
                            }
                            readOnly
                            className="form-control"
                          />
                        </div>
                        <div className="input-group">
                          <span
                            className="input-group-text"
                            style={styles.iconOrange}
                          >
                            <DollarSign size={20} />
                          </span>
                          <input
                            type="text"
                            value={
                              maquinaria ? `$${maquinaria.costoUsoDia}/día` : ""
                            }
                            readOnly
                            className="form-control"
                          />
                        </div>
                        <div className="input-group">
                          <span
                            className="input-group-text"
                            style={styles.iconOrange}
                          >
                            <DollarSign size={20} />
                          </span>
                          <input
                            type="text"
                            value={
                              maquinaria ? `$${maquinaria.costoUsoMes}/mes` : ""
                            }
                            readOnly
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Options */}
              <div className="card mt-4">
                <div className="card-body">
                  <h3 className="card-title fs-5 fw-bold mb-4">Opciones</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="d-flex gap-4">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            checked={isInvoiced}
                            onChange={() => setIsInvoiced(true)}
                            name="invoice"
                            id="invoiced"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="invoiced"
                          >
                            Facturado
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            checked={!isInvoiced}
                            onChange={() => setIsInvoiced(false)}
                            name="invoice"
                            id="notInvoiced"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="notInvoiced"
                          >
                            No Facturado
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex gap-4">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            checked={isRental}
                            onChange={() => setIsRental(true)}
                            name="rentalType"
                            id="rental"
                          />
                          <label className="form-check-label" htmlFor="rental">
                            Alquiler
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            checked={!isRental}
                            onChange={() => setIsRental(false)}
                            name="rentalType"
                            id="reservation"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="reservation"
                          >
                            Reserva
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="fs-3 fw-bold">
                      Costo Total:{" "}
                      <span className="text-warning">
                        ${totalCost.toFixed(2)}
                      </span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-top p-4 rounded-bottom">
              <div className="d-flex justify-content-end gap-2">
                <button
                  onClick={() => setShowRentModal(false)}
                  className="btn btn-light border"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleRentConfirm}
                  className="btn btn-warning text-white"
                  disabled={!startDate || !usageTime}
                >
                  Alquilar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modalContentSmall}>
            <div className="border-bottom p-4 d-flex justify-content-between align-items-center bg-white rounded-top">
              <h2 className="fs-3 fw-bold text-dark mb-0">Método de Pago</h2>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="btn btn-link text-secondary p-0 border-0"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-4 bg-white">
              <div className="mb-3">
                <label className="form-label fw-medium">
                  Número de Tarjeta
                </label>
                <div className="input-group">
                  <span className="input-group-text" style={styles.iconOrange}>
                    <CreditCard size={20} />
                  </span>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    maxLength={16}
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-medium">
                    Fecha de Expiración
                  </label>
                  <div className="input-group">
                    <span
                      className="input-group-text"
                      style={styles.iconOrange}
                    >
                      <Calendar size={20} />
                    </span>
                    <input
                      type="text"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-medium">CVV</label>
                  <div className="input-group">
                    <span
                      className="input-group-text"
                      style={styles.iconOrange}
                    >
                      <Lock size={20} />
                    </span>
                    <input
                      type="password"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="123"
                      maxLength={3}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="pt-4 mt-3 border-top">
                <h4 className="fs-3 fw-bold">
                  Total a Pagar:{" "}
                  <span className="text-warning">${totalCost.toFixed(2)}</span>
                </h4>
              </div>
            </div>
            <div className="border-top p-4 rounded-bottom">
              <div className="d-flex justify-content-end gap-2">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="btn btn-light border"
                >
                  Cancelar
                </button>
                <button
                  onClick={handlePaymentConfirm}
                  className="btn btn-warning text-white"
                  disabled={!cardNumber || !expiryDate || !cvv}
                >
                  Confirmar Pago
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modalContentSmall}>
            <div className="border-bottom p-4 d-flex justify-content-between align-items-center bg-white rounded-top">
              <h2 className="fs-3 fw-bold text-dark mb-0">
                Confirmación de Pago
              </h2>
              <button
                onClick={() => setShowConfirmationModal(false)}
                className="btn btn-link text-secondary p-0 border-0"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-4 text-bg-light">
              <div className="d-flex align-items-center gap-2 mb-3">
                <CreditCard style={styles.iconOrange} size={20} />
                <span>Método de Pago: {paymentConfirmationData.method}</span>
              </div>
              <div className="d-flex align-items-center gap-2 mb-3">
                <CheckCircle style={styles.iconGreen} size={20} />
                <span>Estado: {paymentConfirmationData.status}</span>
              </div>
              <div className="d-flex align-items-center gap-2 mb-3">
                <FileText style={styles.iconOrange} size={20} />
                <span>
                  Monto Pagado: ${paymentConfirmationData.amount.toFixed(2)}
                </span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Package style={styles.iconOrange} size={20} />
                <span>
                  Tipo de Maquinaria: {paymentConfirmationData.machineryType}
                </span>
              </div>
            </div>
            <div className="border-top p-4 rounded-bottom">
              <div className="d-flex justify-content-center">
                <button
                  onClick={generatePDF}
                  className="btn btn-warning text-white d-flex align-items-center gap-2"
                >
                  <Download size={20} />
                  <span>Descargar Contrato</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AlquilerMaquinaria;
