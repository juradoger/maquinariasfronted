import $ from "jquery";

const apiUrl = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

export const RegisterUsuarioNew = (data) => {
  console.log("Datos a enviar al servidor:", data); // Solo mostramos los datos en consola por ahora
  return new Promise((resolve) => {
    $.ajax({
      url: `${apiUrl}/Usuarios`, // Suponiendo que la URL para crear un rol sea la misma que la de obtener
      method: "POST",
      data: JSON.stringify(data), // Convertimos los datos a JSON
      contentType: "application/json", // Indicamos que estamos enviando datos JSON
      statusCode: {
        201: function (data) {
          resolve({ status: 201, data }); // Respuesta exitosa de creación
        },
        400: function (data) {
          resolve({ status: 400, error: "Datos inválidos" });
        },
        500: function () {
          resolve({
            status: 500,
            error: "Este correo ya está afiliado a una cuenta existente",
          });
        },
        0: function () {
          resolve({ status: 0, error: "Sin conexión con el servidor" });
        },
      } /*
      error: function (xhr) {
        resolve({ status: xhr.status, error: xhr.responseText });
      },*/,
    });
  });
};

export const GetPerfil = () => {
  const id = localStorage.getItem("user_id");
  return new Promise((resolve) => {
    $.ajax({
      url: `${apiUrl}/Usuarios/${id}`,
      method: "GET",
      dataType: "json",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      statusCode: {
        200: function (data) {
          resolve({ status: 200, data });
        },
        500: function () {
          const error = "Error interno del servidor.";
          resolve({ status: 500, error });
        },
        0: function () {
          const error = "Sin conexión con el servidor.";
          resolve({ status: 0, error });
        },
      } /*
      error: function (xhr) {
        resolve({ status: xhr.status, error: xhr.responseText });
      },*/,
    });
  });
};
