import React, { useState } from "react";
import { Button, Form, Modal, Toast, ProgressBar, Card } from "react-bootstrap";
import { UploadFotos, UploadPortada } from "../../services/maquinarias";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import PublishRoundedIcon from "@mui/icons-material/PublishRounded";
import { red, green } from "@mui/material/colors";
import { FaTimes, FaRegSave } from "react-icons/fa";

const ViewMaquinaria = ({ maquinaria, onClose }) => {
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

    const uploadResponse = await UploadPortada(
      maquinaria.id,
      file,
      setProgress
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

    setUploading(false);
  };

  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleFilesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setPreviews(selectedFiles.map((file) => URL.createObjectURL(file)));
  };

  const handleUploadFotos = async () => {
    if (!files.length) {
      setError("Selecciona imágenes antes de subir.");
      return;
    }

    setUploading(true);
    setError("");
    setProgress(0);

    const uploadResponse = await UploadFotos(maquinaria.id, files, setProgress);

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

  return (
    <>
      <Modal.Header className="border-bottom-0" closeButton></Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6">
            {!preview && maquinaria.portada && (
              <img
                src={maquinaria.portada}
                alt="Vista previa"
                className="img-fluid mb-3"
                style={{ maxHeight: "250px" }}
              />
            )}
            {preview && (
              <img
                src={preview}
                alt="Vista previa"
                className="img-fluid mb-3"
                style={{ maxHeight: "250px" }}
              />
            )}
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
            <div className="bg-body-tertiary p-3 my-3 rounded-3">
              {/* Previsualización de múltiples imágenes */}
              <div className="d-flex flex-wrap gap-2">
                {previews.length === 0 && maquinaria.fotos && (
                  <>
                    {maquinaria.fotos.map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt={`Vista previa ${index}`}
                        className="img-fluid mb-2"
                        style={{ maxHeight: "100px", borderRadius: "5px" }}
                      />
                    ))}
                  </>
                )}
                {previews.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Vista previa ${index}`}
                    className="img-fluid mb-2"
                    style={{ maxHeight: "100px", borderRadius: "5px" }}
                  />
                ))}
              </div>

              <Form.Group>
                <Form.Control
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFilesChange}
                />
              </Form.Group>

              {uploading && (
                <ProgressBar
                  variant="info"
                  now={progress}
                  animated
                  className="mt-3"
                />
              )}

              {error && <p className="text-danger mt-2">{error}</p>}

              <Button
                variant="warning"
                onClick={handleUploadFotos}
                disabled={uploading}
              >
                <PublishRoundedIcon />{" "}
                {uploading ? "Subiendo..." : "Subir Fotos"}
              </Button>
            </div>
          </div>
          <div className="col-md-6">
            <h2 className="fw-bolder">{maquinaria.nombre}</h2>
            <h3 className="fw-normal">{maquinaria.codigo}</h3>

            {/* Descripción */}
            <Card className="bg-body-secondary border-0 mb-4">
              <Card.Body>
                <h2 className="fs-5 fw-bold mb-2 text-white-custom">
                  DESCRIPCIÓN
                </h2>
                <p className="small text-light">{maquinaria.descripcion}</p>
              </Card.Body>
            </Card>

            {/* Costos */}
            <h5>
              Costo por hora{" "}
              <span className="badge text-bg-secondary">
                {maquinaria.costoUsoHora} bs
              </span>
            </h5>
            <h5>
              Costo por día{" "}
              <span className="badge text-bg-secondary">
                {maquinaria.costoUsoDia} bs
              </span>
            </h5>
            <h5>
              Costo por mes{" "}
              <span className="badge text-bg-secondary">
                {maquinaria.costoUsoMes} bs
              </span>
            </h5>

            {/* Marca, Modelo y Ubicación */}
            <Card className="bg-body-secondary border-0 mb-4">
              <Card.Body>
                <div className="row">
                  <div className="col">
                    <h2 className="fs-5 fw-bold mb-2 text-white-custom">
                      MARCA
                    </h2>
                    <p className="small text-light">{maquinaria.marca}</p>
                  </div>
                  <div className="col">
                    <h2 className="fs-5 fw-bold mb-2 text-white-custom">
                      MODELO
                    </h2>
                    <p className="small text-light">{maquinaria.modelo}</p>
                  </div>
                </div>

                <h2 className="fs-5 fw-bold mb-2 text-white-custom">
                  UBICACIÓN
                </h2>
                <p className="small text-light">{maquinaria.ubicacion}</p>
              </Card.Body>
            </Card>

            {/* Estado de la maquinaria */}
            <h5>
              Estado:{" "}
              <span className="badge text-bg-primary">{maquinaria.estado}</span>
            </h5>
            <div className="row">
              <div className="col">
                {/* Respaldo Técnico y Operador Requerido */}
                <h5>
                  Respaldo Técnico:{" "}
                  <span className="badge text-bg-success">
                    {maquinaria.respaldoTecnico ? "Sí" : "No"}
                  </span>
                </h5>
              </div>
              <div className="col">
                <h5>
                  Operador Requerido:{" "}
                  <span className="badge text-bg-danger">
                    {maquinaria.operadorRequerido ? "Sí" : "No"}
                  </span>
                </h5>
              </div>
            </div>
            <div className="row">
              {/* Detalles Técnicos */}
              <div className="col">
                <Card className="bg-body-secondary border-0 mb-4">
                  <Card.Body>
                    <h2 className="fs-5 fw-bold mb-2 text-white-custom">
                      DETALLES
                    </h2>
                    <ul className="text-light">
                      {Object.entries(maquinaria.detalles).map(
                        ([key, value]) => (
                          <li key={key}>
                            <strong>{key}:</strong> {value}
                          </li>
                        )
                      )}
                    </ul>
                  </Card.Body>
                </Card>
              </div>

              {/* Tipos de maquinaria */}
              <div className="col">
                <h5>Tipo:</h5>
                <ul>
                  {maquinaria.tipo.map((tipo, index) => (
                    <li key={index}>{tipo}</li>
                  ))}
                </ul>
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
      </Modal.Body>

      <Modal.Footer className="border-top-0">
        <Button variant="light fw-bold" onClick={onClose}>
          <FaTimes fontSize={22} /> Cerrar
        </Button>
      </Modal.Footer>
    </>
  );
};

export default ViewMaquinaria;
