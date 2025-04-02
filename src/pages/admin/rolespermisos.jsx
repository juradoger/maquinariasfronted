import { useState } from "react"
import { Table, Button, Modal, Form, Container } from "react-bootstrap"
import { FaEdit, FaEye, FaCheck, FaTimes, FaPlus } from "react-icons/fa"

const RolesPermisos = () => {
  // Estados para los datos
  const [roles, setRoles] = useState([
    { id: 1, nombre: "Administrador", activo: true },
    { id: 2, nombre: "Usuario", activo: true },
    { id: 3, nombre: "Invitado", activo: false },
  ])

  // Estados para los modales
  const [showAddRolModal, setShowAddRolModal] = useState(false)
  const [showEditRolModal, setShowEditRolModal] = useState(false)
  const [showAddPermisoModal, setShowAddPermisoModal] = useState(false)
  const [showEditPermisoModal, setShowEditPermisoModal] = useState(false)
  const [showVerPermisosModal, setShowVerPermisosModal] = useState(false)
  const [showUsuariosRolModal, setShowUsuariosRolModal] = useState(false)

  // Estado para el rol seleccionado
  const [selectedRol, setSelectedRol] = useState(null)
  const [newRolName, setNewRolName] = useState("")
  const [newPermisoName, setNewPermisoName] = useState("")

  // Datos de ejemplo para usuarios y permisos
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Juan Pérez", apellido: "Pérez", correo: "juan@example.com", telefono: "123456789", activo: true },
    {
      id: 2,
      nombre: "María López",
      apellido: "López",
      correo: "maria@example.com",
      telefono: "987654321",
      activo: true,
    },
  ])

  const [permisos, setPermisos] = useState([
    { id: 1, nombre: "Crear usuarios", activo: true },
    { id: 2, nombre: "Editar usuarios", activo: true },
    { id: 3, nombre: "Eliminar usuarios", activo: false },
  ])

  // Manejadores para abrir/cerrar modales
  const handleOpenAddRolModal = () => setShowAddRolModal(true)
  const handleCloseAddRolModal = () => setShowAddRolModal(false)

  const handleOpenEditRolModal = (rol) => {
    setSelectedRol(rol)
    setNewRolName(rol.nombre)
    setShowEditRolModal(true)
  }
  const handleCloseEditRolModal = () => setShowEditRolModal(false)

  const handleOpenAddPermisoModal = () => setShowAddPermisoModal(true)
  const handleCloseAddPermisoModal = () => setShowAddPermisoModal(false)

  const handleOpenEditPermisoModal = (permiso) => {
    setSelectedRol(permiso)
    setNewPermisoName(permiso.nombre)
    setShowEditPermisoModal(true)
  }
  const handleCloseEditPermisoModal = () => setShowEditPermisoModal(false)

  const handleOpenVerPermisosModal = (rol) => {
    setSelectedRol(rol)
    setShowVerPermisosModal(true)
  }
  const handleCloseVerPermisosModal = () => setShowVerPermisosModal(false)

  const handleOpenUsuariosRolModal = (rol) => {
    setSelectedRol(rol)
    setShowUsuariosRolModal(true)
  }
  const handleCloseUsuariosRolModal = () => setShowUsuariosRolModal(false)

  // Manejadores para acciones
  const handleAddRol = () => {
    if (newRolName.trim()) {
      const newRol = {
        id: roles.length + 1,
        nombre: newRolName,
        activo: true,
      }
      setRoles([...roles, newRol])
      setNewRolName("")
      handleCloseAddRolModal()
    }
  }

  const handleEditRol = () => {
    if (newRolName.trim() && selectedRol) {
      const updatedRoles = roles.map((rol) => (rol.id === selectedRol.id ? { ...rol, nombre: newRolName } : rol))
      setRoles(updatedRoles)
      handleCloseEditRolModal()
    }
  }

  const handleToggleRolActivo = (id) => {
    const updatedRoles = roles.map((rol) => (rol.id === id ? { ...rol, activo: !rol.activo } : rol))
    setRoles(updatedRoles)
  }

  const handleAddPermiso = () => {
    if (newPermisoName.trim()) {
      const newPermiso = {
        id: permisos.length + 1,
        nombre: newPermisoName,
        activo: true,
      }
      setPermisos([...permisos, newPermiso])
      setNewPermisoName("")
      handleCloseAddPermisoModal()
    }
  }

  const handleTogglePermisoActivo = (id) => {
    const updatedPermisos = permisos.map((permiso) =>
      permiso.id === id ? { ...permiso, activo: !permiso.activo } : permiso,
    )
    setPermisos(updatedPermisos)
  }

  // Estilos inline
  const styles = {
    container: {
      fontFamily: "'Nunito Sans', sans-serif",
      backgroundColor: "var(--background)",
      color: "var(--text-normal)",
      padding: 0,
      margin: 0,
      width: "100%",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px",
      backgroundColor: "var(--background)",
    },
    title: {
      color: "var(--title-text)",
      margin: 0,
      fontWeight: "normal",
      fontSize: "24px",
    },
    createButton: {
      backgroundColor: "var(--primary)",
      border: "none",
      color: "#000",
      fontWeight: "bold",
      padding: "5px 15px",
      borderRadius: "4px",
    },
    table: {
      backgroundColor: "var(--background)",
      color: "var(--text-normal)",
      borderCollapse: "collapse",
    },
    tableHeader: {
      backgroundColor: "#1E1E1E",
      color: "var(--text-normal)",
      borderBottom: "1px solid #444",
      padding: "10px 15px",
      textAlign: "left",
    },
    tableRow: {
      backgroundColor: "#1E1E1E",
    },
    tableRowAlt: {
      backgroundColor: "#333",
    },
    tableCell: {
      padding: "10px 15px",
      borderBottom: "1px solid #444",
    },
    actionButton: {
      margin: "0 5px",
      border: "none",
      padding: "5px 8px",
      borderRadius: "4px",
    },
    editButton: {
      backgroundColor: "#17a2b8",
      color: "white",
    },
    checkButton: {
      backgroundColor: "#6c757d",
      color: "white",
    },
    eyeButton: {
      backgroundColor: "var(--secondary)",
      color: "white",
    },
    permisosButton: {
      backgroundColor: "white",
      color: "black",
      padding: "5px 10px",
      borderRadius: "4px",
      border: "none",
      fontWeight: "normal",
      fontSize: "14px",
    },
    modal: {
      backgroundColor: "var(--background-tarjetas)",
      color: "var(--text-normal)",
      border: "none",
      borderRadius: "4px",
      padding: "0",
    },
    modalHeader: {
      backgroundColor: "var(--background-tarjetas)",
      color: "var(--text-normal)",
      borderBottom: "none",
      padding: "15px",
    },
    modalTitle: {
      color: "var(--text-normal)",
      fontSize: "18px",
      fontWeight: "normal",
    },
    modalBody: {
      backgroundColor: "var(--background-tarjetas)",
      padding: "15px",
    },
    modalFooter: {
      backgroundColor: "var(--background-tarjetas)",
      borderTop: "none",
      padding: "15px",
      display: "flex",
      justifyContent: "flex-end",
    },
    input: {
      backgroundColor: "white",
      color: "black",
      border: "none",
      borderRadius: "4px",
      padding: "8px 12px",
      width: "100%",
    },
    confirmButton: {
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      borderRadius: "4px",
      padding: "5px 10px",
      marginRight: "5px",
    },
    cancelButton: {
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      borderRadius: "4px",
      padding: "5px 10px",
    },
    subtitle: {
      color: "#999",
      fontSize: "14px",
      marginTop: "5px",
    },
  }

  return (
    <Container fluid style={styles.container} className="p-0">
      <div style={styles.header}>
        <h2 style={styles.title}>Ver Roles</h2>
        <Button style={styles.createButton} onClick={handleOpenAddRolModal}>
          Crear
        </Button>
      </div>

      <Table bordered hover variant="dark" style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Nombre</th>
            <th style={styles.tableHeader}>Rol</th>
            <th style={{ ...styles.tableHeader, textAlign: "center", width: "200px" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((rol, index) => (
            <tr key={rol.id} style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
              <td style={styles.tableCell}>{rol.id}</td>
              <td style={styles.tableCell}>{rol.nombre}</td>
              <td style={{ ...styles.tableCell, textAlign: "center" }}>
                <Button
                  style={{ ...styles.actionButton, ...styles.editButton }}
                  onClick={() => handleOpenEditRolModal(rol)}
                >
                  <FaEdit />
                </Button>
                <Button
                  style={{ ...styles.actionButton, ...styles.checkButton }}
                  onClick={() => handleToggleRolActivo(rol.id)}
                >
                  {rol.activo ? <FaCheck /> : <FaTimes />}
                </Button>
                <Button
                  style={{ ...styles.actionButton, ...styles.eyeButton }}
                  onClick={() => handleOpenUsuariosRolModal(rol)}
                >
                  <FaEye />
                </Button>
                <Button style={styles.permisosButton} onClick={() => handleOpenVerPermisosModal(rol)}>
                  Ver Permisos
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para Añadir Rol */}
      <Modal show={showAddRolModal} onHide={handleCloseAddRolModal} centered contentClassName="bg-dark">
        <Modal.Header closeButton style={styles.modalHeader}>
          <Modal.Title style={styles.modalTitle}>Añadir Rol</Modal.Title>
        </Modal.Header>
        <Modal.Body style={styles.modalBody}>
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Ingresa el nombre"
                value={newRolName}
                onChange={(e) => setNewRolName(e.target.value)}
                style={styles.input}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={styles.modalFooter}>
          <Button style={styles.confirmButton} onClick={handleAddRol}>
            <FaCheck />
          </Button>
          <Button style={styles.cancelButton} onClick={handleCloseAddRolModal}>
            <FaTimes />
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para Editar Rol */}
      <Modal show={showEditRolModal} onHide={handleCloseEditRolModal} centered contentClassName="bg-dark">
        <Modal.Header closeButton style={styles.modalHeader}>
          <Modal.Title style={styles.modalTitle}>Editar Rol</Modal.Title>
        </Modal.Header>
        <Modal.Body style={styles.modalBody}>
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Ingresa el nombre"
                value={newRolName}
                onChange={(e) => setNewRolName(e.target.value)}
                style={styles.input}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={styles.modalFooter}>
          <Button style={styles.confirmButton} onClick={handleEditRol}>
            <FaCheck />
          </Button>
          <Button style={styles.cancelButton} onClick={handleCloseEditRolModal}>
            <FaTimes />
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para Añadir Permiso */}
      <Modal show={showAddPermisoModal} onHide={handleCloseAddPermisoModal} centered contentClassName="bg-dark">
        <Modal.Header closeButton style={styles.modalHeader}>
          <Modal.Title style={styles.modalTitle}>Añadir Permisos</Modal.Title>
        </Modal.Header>
        <Modal.Body style={styles.modalBody}>
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Permiso"
                value={newPermisoName}
                onChange={(e) => setNewPermisoName(e.target.value)}
                style={styles.input}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={styles.modalFooter}>
          <Button style={styles.confirmButton} onClick={handleAddPermiso}>
            <FaCheck />
          </Button>
          <Button style={styles.cancelButton} onClick={handleCloseAddPermisoModal}>
            <FaTimes />
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para Editar Permiso */}
      <Modal show={showEditPermisoModal} onHide={handleCloseEditPermisoModal} centered contentClassName="bg-dark">
        <Modal.Header closeButton style={styles.modalHeader}>
          <Modal.Title style={styles.modalTitle}>Editar Permisos</Modal.Title>
        </Modal.Header>
        <Modal.Body style={styles.modalBody}>
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Ingresa el nombre"
                value={newPermisoName}
                onChange={(e) => setNewPermisoName(e.target.value)}
                style={styles.input}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={styles.modalFooter}>
          <Button
            style={styles.confirmButton}
            onClick={() => {
              // Lógica para editar permiso
              handleCloseEditPermisoModal()
            }}
          >
            <FaCheck />
          </Button>
          <Button style={styles.cancelButton} onClick={handleCloseEditPermisoModal}>
            <FaTimes />
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para Ver Permisos */}
      <Modal
        show={showVerPermisosModal}
        onHide={handleCloseVerPermisosModal}
        centered
        contentClassName="bg-dark"
        size="lg"
      >
        <Modal.Header closeButton style={styles.modalHeader}>
          <Modal.Title style={styles.modalTitle}>Ver Permisos</Modal.Title>
        </Modal.Header>
        <Modal.Body style={styles.modalBody}>
          <Table bordered hover variant="dark">
            <thead>
              <tr>
                <th
                  style={{
                    padding: "10px",
                    textAlign: "left",
                    borderBottom: "1px solid #444",
                  }}
                >
                  Nombre
                </th>
                <th
                  style={{
                    padding: "10px",
                    textAlign: "center",
                    borderBottom: "1px solid #444",
                  }}
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {permisos.map((permiso) => (
                <tr key={permiso.id}>
                  <td
                    style={{
                      padding: "10px",
                      borderBottom: "1px solid #444",
                    }}
                  >
                    {permiso.nombre}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      borderBottom: "1px solid #444",
                    }}
                  >
                    <Button
                      style={{ ...styles.actionButton, ...styles.editButton }}
                      onClick={() => handleOpenEditPermisoModal(permiso)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      style={{ ...styles.actionButton, ...styles.checkButton }}
                      onClick={() => handleTogglePermisoActivo(permiso.id)}
                    >
                      {permiso.activo ? <FaCheck /> : <FaTimes />}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "15px",
            }}
          >
            <Button
              style={{
                backgroundColor: "var(--primary)",
                color: "black",
                border: "none",
                borderRadius: "4px",
                padding: "5px 10px",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
              onClick={handleOpenAddPermisoModal}
            >
              <FaPlus /> Añadir
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Modal para Ver Usuarios del Rol */}
      <Modal
        show={showUsuariosRolModal}
        onHide={handleCloseUsuariosRolModal}
        centered
        contentClassName="bg-dark"
        size="xl"
      >
        <Modal.Header closeButton style={styles.modalHeader}>
          <div>
            <Modal.Title style={styles.modalTitle}>Rol {selectedRol?.nombre}</Modal.Title>
            <div style={styles.subtitle}>Usuarios</div>
          </div>
        </Modal.Header>
        <Modal.Body style={styles.modalBody}>
          <Table bordered hover variant="dark">
            <thead>
              <tr>
                <th
                  style={{
                    padding: "10px",
                    textAlign: "left",
                    borderBottom: "1px solid #444",
                  }}
                >
                  Nombre
                </th>
                <th
                  style={{
                    padding: "10px",
                    textAlign: "left",
                    borderBottom: "1px solid #444",
                  }}
                >
                  Apellido
                </th>
                <th
                  style={{
                    padding: "10px",
                    textAlign: "left",
                    borderBottom: "1px solid #444",
                  }}
                >
                  Correo
                </th>
                <th
                  style={{
                    padding: "10px",
                    textAlign: "left",
                    borderBottom: "1px solid #444",
                  }}
                >
                  Teléfono
                </th>
                <th
                  style={{
                    padding: "10px",
                    textAlign: "center",
                    borderBottom: "1px solid #444",
                  }}
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td
                    style={{
                      padding: "10px",
                      borderBottom: "1px solid #444",
                    }}
                  >
                    {usuario.nombre}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      borderBottom: "1px solid #444",
                    }}
                  >
                    {usuario.apellido}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      borderBottom: "1px solid #444",
                    }}
                  >
                    {usuario.correo}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      borderBottom: "1px solid #444",
                    }}
                  >
                    {usuario.telefono}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      borderBottom: "1px solid #444",
                    }}
                  >
                    <Button style={{ ...styles.actionButton, ...styles.editButton }}>
                      <FaEdit />
                    </Button>
                    <Button style={{ ...styles.actionButton, ...styles.checkButton }}>
                      <FaCheck />
                    </Button>
                    <Button style={{ ...styles.actionButton, ...styles.eyeButton }}>
                      <FaEye />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </Container>
  )
}

export default RolesPermisos

