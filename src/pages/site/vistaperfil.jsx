import { useState } from "react";

const VistaPerfil = () => {
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
      { title: "Etiqueta del Menú 1", description: "Descripción del menú 1.", stars: 0 },
      { title: "Etiqueta del Menú 2", description: "Descripción del menú 2.", stars: 0 },
      { title: "Etiqueta del Menú 3", description: "Descripción del menú 3.", stars: 0 },
    ],
    collapsibleSections: [
      { title: "Título 1", content: "Respuesta a la pregunta frecuente 1." },
      { title: "Título 2", content: "Respuesta a la pregunta frecuente 2." },
      { title: "Título 3", content: "Respuesta a la pregunta frecuente 3." },
    ],
  };

  const machineryList = [
    { id: 1, type: "Maquinaria Pesada", brand: "Marca A", model: "Modelo A", operator: "Operador A", location: "Ubicación A" },
    { id: 2, type: "Maquinaria Ligera", brand: "Marca B", model: "Modelo B", operator: "Operador B", location: "Ubicación B" },
    { id: 3, type: "Maquinaria Semipesada", brand: "Marca C", model: "Modelo C", operator: "Operador C", location: "Ubicación C" },
  ];

  return (
    <div className="vh-1 d-flex flex-column">
      <div className="bg-warning" style={{ height: "130px" }}></div>

      <div className="bg-dark text-white flex-grow-1">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <div className="bg-secondary bg-opacity-50 rounded p-4" style={{ marginTop: "20px" }}>
                <div>
                  <p className="text-white-50 mb-0">Nombre</p>
                  <p className="text-white mb-3">{userDetails.name}</p>

                  <p className="text-white-50 mb-0">Apellido</p>
                  <p className="text-white mb-3">{userDetails.surname}</p>

                  <p className="text-white-50 mb-0">CI</p>
                  <p className="text-white mb-3">{userDetails.ci}</p>

                  <p className="text-white-50 mb-0">Teléfono</p>
                  <p className="text-white mb-3">{userDetails.phone}</p>

                  <p className="text-white-50 mb-0">Detalles</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 d-flex justify-content-center">
              <div className="position-relative" style={{ marginTop: "-75px", marginBottom: "20px", zIndex: "1" }}>
                <div className="rounded-circle bg-transparent border border-3 border-white d-flex align-items-center justify-content-center" style={{ width: "180px", height: "180px" }}>
                  <div className="rounded-circle border border-2 border-white" style={{ width: "130px", height: "130px" }}></div>
                </div>
              </div>
            </div>

            <div className="col-md-4 d-flex align-items-start justify-content-start">
              <div className="text-left" style={{ marginTop: "-30px" }}>
                <h2 className="fs-1 fw-bold m-0">{userDetails.username}</h2>
                <p className="text-white-50 m-0">{userDetails.email}</p>
              </div>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-md-4 mb-4">
              <div className="bg-white text-dark rounded">
                <div className="p-2 border-bottom">
                  <p className="fw-bold mb-1">Encabezado</p>
                  <p className="mb-0">Descripción del encabezado</p>
                </div>

                {userDetails.menuItems.map((item, index) => (
                  <div key={index} className="d-flex align-items-start p-2 border-bottom">
                    <div className="me-2 pt-1">
                      <i className="bi bi-star-fill text-dark"></i>
                    </div>
                    <div className="flex-grow-1">
                      <p className="fw-bold mb-0">{item.title}</p>
                      <p className="small text-muted mb-0">{item.description}</p>
                    </div>
                    <div className="text-muted">{item.stars} A</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-md-8">
              <div className="bg-secondary bg-opacity-50 rounded p-4" style={{ marginTop: "-100px" }}>
                <h3 className="fs-5 mb-4">Descripción</h3>

                <div className="mb-2">
                  {userDetails.collapsibleSections.map((section, index) => (
                    <div key={index} className="bg-white rounded mb-2">
                      <div className="d-flex justify-content-between align-items-center p-2 text-dark" onClick={() => toggleExpand(index)} style={{ cursor: "pointer" }}>
                        <span className="fw-bold">{section.title}</span>
                        <i className={`bi ${expandedTitle === index ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
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

          {/* Botón de Filtrar */}
          <div className="d-flex justify-content-end">
            <button className="btn btn-warning" onClick={toggleModal}>Filtrar</button>
          </div>

          {/* Modal para Filtrar */}
          {showModal && (
            <div className="modal show" style={{ display: "block" }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Filtrar las Maquinarias</h5>
                    <button type="button" className="btn-close" onClick={toggleModal}></button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="mb-3">
                        <label className="form-label">Tipo de Maquinaria</label>
                        <input type="text" className="form-control" value={filter.type} onChange={(e) => setFilter({ ...filter, type: e.target.value })} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Marca</label>
                        <input type="text" className="form-control" value={filter.brand} onChange={(e) => setFilter({ ...filter, brand: e.target.value })} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Modelo</label>
                        <input type="text" className="form-control" value={filter.model} onChange={(e) => setFilter({ ...filter, model: e.target.value })} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Operador</label>
                        <input type="text" className="form-control" value={filter.operator} onChange={(e) => setFilter({ ...filter, operator: e.target.value })} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Ubicación</label>
                        <input type="text" className="form-control" value={filter.location} onChange={(e) => setFilter({ ...filter, location: e.target.value })} />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={toggleModal}>Cerrar</button>
                    <button className="btn btn-primary" onClick={toggleModal}>Aplicar Filtros</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Listado de Maquinarias */}
          <div className="row mt-4">
            <div className="col-md-12">
              <h3 className="text-white">Listado de Maquinarias</h3>
              <table className="table table-striped table-dark">
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Operador</th>
                    <th>Ubicación</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {machineryList.map((machinery) => (
                    <tr key={machinery.id}>
                      <td>{machinery.type}</td>
                      <td>{machinery.brand}</td>
                      <td>{machinery.model}</td>
                      <td>{machinery.operator}</td>
                      <td>{machinery.location}</td>
                      <td>
                        <button className="btn btn-warning btn-sm">Editar</button>
                        <button className="btn btn-danger btn-sm">Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VistaPerfil;