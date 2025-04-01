import React, { useEffect, useState } from "react";
import Maquinarias_service from "../../services/maquinarias";
import { Toast } from "react-bootstrap";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { red, green } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import List_Maquinaria from "../../components/maquinarias/list_maquinaria";

const Maquinarias_page = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState({ status: 0, data: null });
  const [error, setError] = useState("");

  const [autorizado, setAutorizado] = useState(false);
  const [showA, setShowA] = useState(false);

  const toggleShowA = () => setShowA(!showA);

  useEffect(() => {
    const fetchMaquinarias = async () => {
      const result = await Maquinarias_service();
      setResponse(result); // Actualiza el estado con la respuesta

      if (result.status === 200) {
        setAutorizado(true);
      } else if (result.status === 401) {
        console.log(result);
        setError(result.error);
        setShowA(true);

        setTimeout(() => {
          navigate("/");
        }, 5000);
      } else {
        console.log(result);
        setError(result.error);
        setShowA(true);
      }
    };

    fetchMaquinarias();
  }, []);

  return (
    <>
      <div className="container-fluid py-3">
      <Toast
        show={showA}
        onClose={toggleShowA}
        className="position-fixed bottom-0 end-0 m-3 border-danger-subtle"
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

      {autorizado && <List_Maquinaria datos={response.data} />}
      </div>
    </>
  );
};

export default Maquinarias_page;