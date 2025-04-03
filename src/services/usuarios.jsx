import $ from "jquery";

const apiUrl = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

const Usuario_service = async () => {
  return new Promise((resolve) => {
    $.ajax({
      url: `${apiUrl}/Usuarios`,
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

export default Usuario_service;

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

export const UpdatedUsuario = (data) => {
  console.log("Datos a enviar al servidor:", data); // Solo mostramos los datos en consola por ahora
  return new Promise((resolve) => {
    $.ajax({
      url: `${apiUrl}/Usuarios/${data.id}`, // Suponiendo que la URL para crear un rol sea la misma que la de obtener
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
        400: function (data) {
          resolve({ status: 400, error: "Datos inválidos" });
        },
        401: function () {
          const error = "No autorizado. Verifique su sesión.";
          resolve({ status: 401, error });
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
      },

      error: function (xhr) {
        console.log(xhr);
        resolve({ status: xhr.status, error: xhr.responseText });
      },
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

export const GetRolId = (id) => {
  return new Promise((resolve) => {
    $.ajax({
      url: `${apiUrl}/Usuarios/${id}/rol`,
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

export const UploadFoto = (id, file, setProgress) => {
  return new Promise((resolve) => {
    const formData = new FormData();
    formData.append("foto", file);

    $.ajax({
      url: `${apiUrl}/Usuarios/${id}/foto`,
      method: "POST",
      data: formData,
      contentType: false,
      processData: false,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      xhr: function () {
        const xhr = new window.XMLHttpRequest();
        xhr.upload.addEventListener(
          "progress",
          function (event) {
            if (event.lengthComputable) {
              const percentComplete = Math.round(
                (event.loaded / event.total) * 100
              );
              setProgress(percentComplete);
            }
          },
          false
        );
        return xhr;
      },
      statusCode: {
        200: function (data) {
          resolve({ status: 200, data });
        },
        400: function () {
          const error = "Error al subir la imagen.";
          resolve({ status: 400, error });
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
      },
    });
  });
};

const formatData = (data) => JSON.stringify(data).replace(/"/g, '"');

export const RolesActualizar = (id, datos) => {
  const data = formatData(datos);
  console.log("Datos a enviar al servidor:", data); // Solo mostramos los datos en consola por ahora
  return new Promise((resolve) => {
    $.ajax({
      url: `${apiUrl}/Usuarios/${id}/cambiar-rol`, // Suponiendo que la URL para crear un rol sea la misma que la de obtener
      method: "PUT",
      data: JSON.stringify(data), // Convertimos los datos a JSON
      contentType: "application/json", // Indicamos que estamos enviando datos JSON
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el header
      },
      statusCode: {
        200: function (data) {
          resolve({ status: 200, data }); // Respuesta exitosa de creación
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

export const DeleteUsuario = (id) => {
  return new Promise((resolve) => {
    $.ajax({
      url: `${apiUrl}/Usuarios/${id}`,
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

export const RestoreUsuario = (id) => {
  return new Promise((resolve) => {
    $.ajax({
      url: `${apiUrl}/Usuarios/restore/${id}`,
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
