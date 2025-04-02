import $ from "jquery";

const apiUrl = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

const Maquinarias_service = async () => {
  return new Promise((resolve) => {
    $.ajax({
      url: `${apiUrl}/Maquinarias/autorizar`,
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
          resolve({ status: 500, error: "Error interno del servidor." });
        },
        0: function () {
          resolve({ status: 0, error: "Sin conexión con el servidor." });
        },
      },
      /*
      error: function (xhr) {
        resolve({ status: xhr.status, error: xhr.responseText });
      },*/
    });
  });
};

export default Maquinarias_service;

const formatMaquinariaData = (data) => ({
  ...data,
  detalles: JSON.stringify(data.detalles).replace(/"/g, '"'),
  tipo: JSON.stringify(data.tipo).replace(/"/g, '"'),
});

export const CreateMaquinaria = (maquinariaData) => {
  const data = formatMaquinariaData(maquinariaData);
  console.log("Datos a enviar al servidor:", data); // Solo mostramos los datos en consola por ahora
  return new Promise((resolve) => {
    $.ajax({
      url: `${apiUrl}/Maquinarias`, // Suponiendo que la URL para crear un rol sea la misma que la de obtener
      method: "POST",
      data: JSON.stringify(data), // Convertimos los datos a JSON
      contentType: "application/json", // Indicamos que estamos enviando datos JSON
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el header
      },
      statusCode: {
        201: function (data) {
          resolve({ status: 201, data }); // Respuesta exitosa de creación
        },
        400: function () {
          resolve({ status: 400, error: "Datos inválidos" });
        },
        500: function () {
          resolve({ status: 500, error: "Error interno del servidor" });
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

export const GetMaquinaria = (id) => {
  return new Promise((resolve) => {
    $.ajax({
      url: `${apiUrl}/Maquinarias/${id}`,
      method: "GET",
      dataType: "json",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      statusCode: {
        200: function (data) {
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
      } /*
      error: function (xhr) {
        resolve({ status: xhr.status, error: xhr.responseText });
      },*/,
    });
  });
};

export const UpdateMaquinaria = (maquinariaData) => {
  const data = formatMaquinariaData(maquinariaData);
  console.log("Datos a enviar al servidor:", data); // Solo mostramos los datos en consola por ahora
  return new Promise((resolve) => {
    $.ajax({
      url: `${apiUrl}/Maquinarias/${data.id}`, // Suponiendo que la URL para crear un rol sea la misma que la de obtener
      method: "PUT",
      data: JSON.stringify(data), // Convertimos los datos a JSON
      contentType: "application/json", // Indicamos que estamos enviando datos JSON
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el header
      },
      statusCode: {
        204: function (data) {
          resolve({ status: 204, data }); // Respuesta exitosa de creación
        },
        400: function () {
          resolve({ status: 400, error: "Datos inválidos" });
        },
        500: function () {
          resolve({ status: 500, error: "Error interno del servidor" });
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

export const DeleteMaquinaria = (id) => {
  return new Promise((resolve) => {
    $.ajax({
      url: `${apiUrl}/Maquinarias/${id}`,
      method: "DELETE",
      dataType: "json",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      statusCode: {
        200: function (data) {
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
      } /*
      error: function (xhr) {
        resolve({ status: xhr.status, error: xhr.responseText });
      },*/,
    });
  });
};

export const RestoreMaquinaria = (id) => {
  return new Promise((resolve) => {
    $.ajax({
      url: `${apiUrl}/Maquinarias/restore/${id}`,
      method: "PUT",
      dataType: "json",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      statusCode: {
        200: function (data) {
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
      } /*
      error: function (xhr) {
        resolve({ status: xhr.status, error: xhr.responseText });
      },*/,
    });
  });
};
