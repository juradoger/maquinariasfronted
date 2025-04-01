import $ from "jquery";

const apiUrl = import.meta.env.VITE_API_URL; // Asegúrate de tener la URL de tu API correctamente configurada
const token = localStorage.getItem("token");

export const Login_Service = async (data) => {
  return new Promise((resolve) => {
    $.ajax({
      url: `${apiUrl}/Auth/login`, // URL de la API para login
      method: "POST", // Tipo de petición
      dataType: "json", // Tipo de dato esperado en la respuesta
      contentType: "application/json", // Indicamos que vamos a enviar JSON
      data: JSON.stringify(data), // Enviamos el objeto 'data' completo
      statusCode: {
        200: function (data) {
          // Guardamos el token en sessionStorage
          localStorage.setItem("token", data.token);

          // Guardamos el resto de la información en localStorage
          localStorage.setItem("user_id", data.id);
          localStorage.setItem(
            "user_data",
            JSON.stringify({
              nombre: data.nombre,
              apellido: data.apellido,
              correo: data.correo,
              rol: data.rol,
              avatar: data.avatar,
            })
          );

          resolve({ status: 200, data });
        },
        400: function (data) {
          console.log(data.responseJSON);
          resolve({
            status: 400,
            error: "Errores de validación no especificados.",
            errors: data.responseJSON.errors,
          });
        },
        401: function (data) {
          console.log(data.responseJSON.mensaje);
          resolve({ status: 401, error: data.responseJSON.mensaje });
        },
        500: function () {
          resolve({ status: 500, error: "Error interno del servidor." });
        },
        0: function () {
          resolve({ status: 0, error: "Sin conexión con el servidor." });
        },
      },
      /*
      error: function (xhr) {
        console.log(xhr.responseText);
        resolve({ status: xhr.status, error: xhr.responseText });
      },
      */
    });
  });
};

export const Perfil_Service = () => {
  return new Promise((resolve) => {
    $.ajax({
      url: `${apiUrl}/Auth/perfil`,
      method: "GET",
      dataType: "json",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      statusCode: {
        200: function (data) {
          localStorage.setItem("perfil", JSON.stringify(data)); // Guardar en localStorage
          resolve({ status: 200, data });
        },
        401: function () {
          const error = "No autorizado. Verifique su sesión.";
          resolve({ status: 401, error });
        },
        500: function () {
          const error = "Error interno del servidor.";
          resolve({ status: 500, error });
        },
        0: function () {
          const error = "Sin conexión con el servidor.";
          resolve({ status: 0, error });
        },
      },/*
      error: function (xhr) {
        resolve({ status: xhr.status, error: xhr.responseText });
      },*/
    });
  });
};
