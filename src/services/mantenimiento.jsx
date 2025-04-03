import $ from "jquery";

const apiUrl = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

const Mantenimiento_service = async () => {
  return new Promise((resolve) => {
    $.ajax({
      url: `${apiUrl}/Mantenimientos`,
      method: "GET",
      dataType: "json",
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el header
      },
      statusCode: {
        200: function (data) {
          resolve({ status: 200, data });
        },
        401: function () {
          resolve({
            status: 401,
            error: "No autorizado. Verifique su sesión.",
          });
        },
        500: function () {
          resolve({ status: 500, error: "Error interno del servidor" });
        },
        0: function () {
          resolve({ status: 0, error: "Sin conexión con el servidor" });
        },
      },
      
      error: function (xhr) {
        resolve({ status: xhr.status, error: xhr.responseText });
      },
    });
  });
};

export default Mantenimiento_service;