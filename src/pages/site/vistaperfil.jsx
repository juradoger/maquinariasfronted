import { useEffect, useState } from "react";
import { GetPerfil } from "../../services/usuarios";
import {
  Button,
  Form,
  Modal,
  Toast,
  ProgressBar,
  Card,
  Table,
} from "react-bootstrap";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import PublishRoundedIcon from "@mui/icons-material/PublishRounded";
import { red, green } from "@mui/material/colors";
import { FaTimes, FaRegSave } from "react-icons/fa";
import { RolesActualizar, UploadFoto } from "../../services/usuarios";
import Reserva_Service from "../../services/reservas";
import Edit_Usario from "../../components/usuarios/edit_usuario";

const VistaPerfil = () => {
  useEffect(() => {}, []);
  const [roles, setRoles] = useState([]);
  const [rolesSeleccionados, setRolesSeleccionados] = useState([]);

  const handleSelectChange = (e) => {
    const seleccionados = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value)
    );
    setRolesSeleccionados(seleccionados);
  };

  // Enviar datos al servidor (Ejemplo)
  const handleSubmit = async () => {
    setError("");

    const uploadResponse = await RolesActualizar(
      usuario.id,
      rolesSeleccionados
    );

    if (uploadResponse.status === 200) {
      setShowA(true); // Muestra el toast de éxito
      setTimeout(() => {
        setShowA(false);
      }, 3000);
    } else {
      setError(uploadResponse.error);
      setShowB(true); // Muestra el toast de error
    }
  };

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [showA, setShowA] = useState(false);
  const [showB, setShowB] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Selecciona una imagen antes de subir.");
      return;
    }

    setUploading(true);
    setError("");
    setProgress(0);

    const uploadResponse = await UploadFoto(data.id, file, setProgress);
    console.log(uploadResponse);
    if (uploadResponse.status === 200) {
      setShowA(true); // Muestra el toast de éxito
      setTimeout(() => {
        setShowA(false);
      }, 3000);
    } else {
      setError(uploadResponse.error);
      setShowB(true); // Muestra el toast de error
    }

    setUploading(false);
  };

  const [data, setData] = useState({});

  useEffect(() => {
    fetchFiltrar();
  }, []);

  const [reservas, setReservas] = useState(null);

  const fetchFiltrar = async () => {
    const result = await GetPerfil();
    setData(result.data || []);

    const resultReserv = await Reserva_Service();
    setReservas(resultReserv?.data?.resultado || []);
    console.log(resultReserv?.data?.resultado);
  };

  const [expandedTitle, setExpandedTitle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState({
    type: "",
    brand: "",
    model: "",
    operator: "",
    location: "",
  });

  const toggleExpand = (index) => {
    setExpandedTitle(expandedTitle === index ? null : index);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const userDetails = {
    name: "Juan Pérez",
    surname: "González",
    ci: "12345678",
    phone: "+123456789",
    username: "NombreDeUsuario",
    email: "NombreDeUsuario@gmail.com",
    menuItems: [
      {
        title: "Etiqueta del Menú 1",
        description: "Descripción del menú 1.",
        stars: 0,
      },
      {
        title: "Etiqueta del Menú 2",
        description: "Descripción del menú 2.",
        stars: 0,
      },
      {
        title: "Etiqueta del Menú 3",
        description: "Descripción del menú 3.",
        stars: 0,
      },
    ],
    collapsibleSections: [
      { title: "Título 1", content: "Respuesta a la pregunta frecuente 1." },
      { title: "Título 2", content: "Respuesta a la pregunta frecuente 2." },
      { title: "Título 3", content: "Respuesta a la pregunta frecuente 3." },
    ],
  };

  const machineryList = [
    {
      id: 1,
      type: "Maquinaria Pesada",
      brand: "Marca A",
      model: "Modelo A",
      operator: "Operador A",
      location: "Ubicación A",
    },
    {
      id: 2,
      type: "Maquinaria Ligera",
      brand: "Marca B",
      model: "Modelo B",
      operator: "Operador B",
      location: "Ubicación B",
    },
    {
      id: 3,
      type: "Maquinaria Semipesada",
      brand: "Marca C",
      model: "Modelo C",
      operator: "Operador C",
      location: "Ubicación C",
    },
  ];

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="vh-1 d-flex flex-column">
        <div className="bg-warning" style={{ height: "130px" }}></div>

        <div className="bg-dark text-white flex-grow-1">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4">
                <div
                  className="bg-secondary bg-opacity-50 rounded p-4"
                  style={{ marginTop: "20px" }}
                >
                  <div>
                    <p className="text-white-50 mb-0">Nombre</p>
                    <p className="text-white mb-3">{data.nombre}</p>

                    <p className="text-white-50 mb-0">Apellido</p>
                    <p className="text-white mb-3">{data.apellido}</p>

                    <p className="text-white-50 mb-0">CI</p>
                    <p className="text-white mb-3">{data.ci}</p>

                    <p className="text-white-50 mb-0">Teléfono</p>
                    <p className="text-white mb-3">{data.telefono}</p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 d-flex justify-content-center">
                <div
                  className="position-relative"
                  style={{
                    marginTop: "-75px",
                    marginBottom: "20px",
                    zIndex: "1",
                  }}
                >
                  <div
                    className="rounded-circle bg-transparent border border-3 border-white d-flex align-items-center justify-content-center"
                    style={{ width: "180px", height: "180px" }}
                  >
                    <div
                      className="rounded-circle border border-2 border-white"
                      style={{ width: "130px", height: "130px" }}
                    >
                      {!preview && data.avatar && (
                        <img
                          src={data.avatar}
                          alt="Vista previa"
                          className="img-fluid mb-3 rounded-circle"
                          style={{ maxHeight: "250px" }}
                        />
                      )}
                      {preview && (
                        <img
                          src={preview}
                          alt="Vista previa"
                          className="img-fluid mb-3 rounded-circle"
                          style={{ maxHeight: "250px" }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 d-flex align-items-start justify-content-start">
                <div className="text-left" style={{ marginTop: "-30px" }}>
                  <h2 className="fs-1 fw-bold m-0">
                    {data.nombre} {data.apellido}
                  </h2>
                  <p className="text-white-50 m-0">{data.correo}</p>
                  <Form.Group>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </Form.Group>
                  {uploading && (
                    <ProgressBar
                      variant="warning"
                      now={progress}
                      animated
                      className="mt-3"
                    />
                  )}
                  {error && <p className="text-danger mt-2">{error}</p>}

                  <Button
                    variant="warning"
                    onClick={handleUpload}
                    disabled={uploading}
                  >
                    <PublishRoundedIcon />{" "}
                    {uploading ? "Subiendo..." : "Subir Imagen"}
                  </Button>
                  <Button variant="info d-block mt-2" onClick={handleShow}>
                    Editar
                  </Button>
                </div>
              </div>
            </div>
            <Edit_Usario
              show={show}
              handleClose={handleClose}
              usuarioEditar={data}
            />
            {/** 
            <div className="row mt-2">
              <div className="col-md-4 mb-4">
                <div className="bg-white text-dark rounded">
                  <div className="p-2 border-bottom">
                    <p className="fw-bold mb-1">Encabezado</p>
                    <p className="mb-0">Descripción del encabezado</p>
                  </div>

                  {userDetails.menuItems.map((item, index) => (
                    <div
                      key={index}
                      className="d-flex align-items-start p-2 border-bottom"
                    >
                      <div className="me-2 pt-1">
                        <i className="bi bi-star-fill text-dark"></i>
                      </div>
                      <div className="flex-grow-1">
                        <p className="fw-bold mb-0">{item.title}</p>
                        <p className="small text-muted mb-0">
                          {item.description}
                        </p>
                      </div>
                      <div className="text-muted">{item.stars} A</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-md-8">
                <div
                  className="bg-secondary bg-opacity-50 rounded p-4"
                  style={{ marginTop: "-100px" }}
                >
                  <h3 className="fs-5 mb-4">Descripción</h3>

                  <div className="mb-2">
                    {userDetails.collapsibleSections.map((section, index) => (
                      <div key={index} className="bg-white rounded mb-2">
                        <div
                          className="d-flex justify-content-between align-items-center p-2 text-dark"
                          onClick={() => toggleExpand(index)}
                          style={{ cursor: "pointer" }}
                        >
                          <span className="fw-bold">{section.title}</span>
                          <i
                            className={`bi ${
                              expandedTitle === index
                                ? "bi-chevron-up"
                                : "bi-chevron-down"
                            }`}
                          ></i>
                        </div>
                        {expandedTitle === index && (
                          <div className="p-2 border-top">
                            <p className="mb-0 text-dark">{section.content}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
*/}
            {/* Botón de Filtrar 
            <div className="d-flex justify-content-end">
              <button className="btn btn-warning" onClick={toggleModal}>
                Filtrar
              </button>
            </div>
*/}
            {/* Modal para Filtrar */}
            {showModal && (
              <div className="modal show" style={{ display: "block" }}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Filtrar las Maquinarias</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={toggleModal}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="mb-3">
                          <label className="form-label">
                            Tipo de Maquinaria
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={filter.type}
                            onChange={(e) =>
                              setFilter({ ...filter, type: e.target.value })
                            }
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Marca</label>
                          <input
                            type="text"
                            className="form-control"
                            value={filter.brand}
                            onChange={(e) =>
                              setFilter({ ...filter, brand: e.target.value })
                            }
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Modelo</label>
                          <input
                            type="text"
                            className="form-control"
                            value={filter.model}
                            onChange={(e) =>
                              setFilter({ ...filter, model: e.target.value })
                            }
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Operador</label>
                          <input
                            type="text"
                            className="form-control"
                            value={filter.operator}
                            onChange={(e) =>
                              setFilter({ ...filter, operator: e.target.value })
                            }
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Ubicación</label>
                          <input
                            type="text"
                            className="form-control"
                            value={filter.location}
                            onChange={(e) =>
                              setFilter({ ...filter, location: e.target.value })
                            }
                          />
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button
                        className="btn btn-secondary"
                        onClick={toggleModal}
                      >
                        Cerrar
                      </button>
                      <button className="btn btn-primary" onClick={toggleModal}>
                        Aplicar Filtros
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Listado de Maquinarias */}
            <div className="row mt-4">
              <div className="col-md-12">
                <h3 className="text-white">Todas mis reservas</h3>
                <Table responsive hover borderless className="datatable-custom">
                  <thead>
                    <tr>
                      <th className="table-column-ps-0 sorting bg-warning">
                        Codigo
                      </th>
                      <th className="table-column-ps-0 sorting bg-warning">
                        Nombre
                      </th>
                      <th className="table-column-ps-0 sorting bg-warning">
                        Marca
                      </th>
                      <th className="table-column-ps-0 sorting bg-warning">
                        Modelo
                      </th>
                      <th className="table-column-ps-0 sorting bg-warning text-nowrap">
                        Costo total
                      </th>
                      <th className="table-column-ps-0 sorting bg-warning text-nowrap">
                        Pago inicial
                      </th>
                      <th className="table-column-ps-0 sorting bg-warning">
                        Ubicación
                      </th>
                      <th className="table-column-ps-0 sorting bg-warning">
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservas?.map((e) => (
                      <tr key={e.id}>
                        <td
                          className=" text-nowrap align-items-center fs-5"
                          style={{ verticalAlign: "middle" }}
                        >
                          {e?.maquinaria?.codigo}
                        </td>
                        <td
                          className=" text-nowrap align-items-center fs-4 fw-bolder"
                          style={{ verticalAlign: "middle" }}
                        >
                          {e?.maquinaria?.portada && (
                            <img
                              src={e?.maquinaria?.portada}
                              alt={e.id}
                              style={{ height: "70px" }}
                              className="me-3"
                            />
                          )}
                          {e?.maquinaria?.nombre}
                        </td>
                        <td
                          className=" text-nowrap align-items-center fs-5"
                          style={{ verticalAlign: "middle" }}
                        >
                          {e?.maquinaria?.marca}
                        </td>
                        <td
                          className=" text-nowrap align-items-center fs-5"
                          style={{ verticalAlign: "middle" }}
                        >
                          {e?.maquinaria?.modelo}
                        </td>
                        <td
                          className=" text-nowrap align-items-center fs-5"
                          style={{ verticalAlign: "middle" }}
                        >
                          {e.costoTotal} Bs
                        </td>
                        <td
                          className=" text-nowrap align-items-center fs-5"
                          style={{ verticalAlign: "middle" }}
                        >
                          {e.pagoInicial} Bs
                        </td>
                        <td
                          className=" text-nowrap align-items-center fs-5"
                          style={{ verticalAlign: "middle" }}
                        >
                          {e?.maquinaria?.ubicacion}
                        </td>
                        <td
                          className=" text-nowrap align-items-center fs-5"
                          style={{ verticalAlign: "middle" }}
                        >
                          {e?.estado}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Toast de Éxito */}
      <Toast
        show={showA}
        onClose={() => setShowA(false)}
        className="position-fixed bottom-0 start-0 m-3 border-success-subtle"
      >
        <Toast.Header className="text-bg-success">
          <WarningRoundedIcon sx={{ color: green[100] }} />
          <strong className="ms-2 me-auto">Proceso exitoso</strong>
        </Toast.Header>
      </Toast>

      {/* Toast de Error */}
      <Toast
        show={showB}
        onClose={() => setShowB(false)}
        className="position-fixed bottom-0 start-0 m-3 border-danger-subtle"
        bg="danger-subtle"
      >
        <Toast.Header className="text-bg-danger">
          <WarningRoundedIcon sx={{ color: red[100] }} />
          <strong className="ms-2 me-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>
          <span className="fs-6">{error}</span>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default VistaPerfil;
