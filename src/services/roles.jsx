import React from "react";
import $ from "jquery";

const apiUrl = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

const Roles_service = async () => {
  return new Promise((resolve) => {
    $.ajax({
      url: `${apiUrl}/Roles`,
      method: "GET",
      dataType: "json",
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el header
      },
      statusCode: {
        200: function (data) {
          resolve({ status: 200, data });
        },
        0: function () {
          resolve({ status: 0, error: "Sin conexión con el servidor" });
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
      },
      error: function (xhr) {
        resolve({ status: xhr.status, error: xhr.responseText });
      },
    });
  });
};

export default Roles_service;

export const GetRole = async (roleId) => {
  return new Promise((resolve) => {
    $.ajax({
      url: `${apiUrl}/Roles/${roleId}`, // Se añade el ID en la URL
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
        404: function () {
          resolve({ status: 404, error: "Rol no encontrado" });
        },
        0: function () {
          resolve({ status: 0, error: "Sin conexión con el servidor" });
        },
        500: function () {
          resolve({ status: 500, error: "Error interno del servidor" });
        },
      },
      error: function (xhr) {
        resolve({ status: xhr.status, error: xhr.responseText });
      },
    });
  });
};

const formatRoleData = (roleData) => ({
  ...roleData,
  permisos: JSON.stringify(filterPermisos(roleData.permisos)).replace(
    /"/g,
    '"'
  ),
});

const filterPermisos = (permisos) => {
  return Object.fromEntries(
    Object.entries(permisos).filter(([key, value]) => {
      // Verifica si al menos un permiso es true
      return Object.values(value).some(
        (v) => typeof v === "boolean" && v === true
      );
    })
  );
};

export const CreateRole = (roleData) => {
  const data = formatRoleData(roleData);
  console.log("Datos a enviar al servidor:", data); // Solo mostramos los datos en consola por ahora
  return new Promise((resolve) => {
    $.ajax({
      url: `${apiUrl}/Roles`, // Suponiendo que la URL para crear un rol sea la misma que la de obtener
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
      } /*
      error: function (xhr) {
        resolve({ status: xhr.status, error: xhr.responseText });
      },*/,
    });
  });
};

export const UpdateRole = (roleId, roleData) => {
  const data = formatRoleData(roleData);
  console.log("Datos a enviar al servidor para actualizar:", data); // Muestra los datos en consola

  return new Promise((resolve) => {
    $.ajax({
      url: `${apiUrl}/Roles/${roleId}`, // Se agrega el ID del rol en la URL
      method: "PUT", // Método PUT para actualización
      data: JSON.stringify(data), // Convertimos los datos a JSON
      contentType: "application/json", // Indicamos que estamos enviando datos JSON
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el header
      },
      statusCode: {
        200: function (data) {
          resolve({ status: 200, data }); // Respuesta exitosa de actualización
        },
        400: function () {
          resolve({ status: 400, error: "Datos inválidos" });
        },
        401: function () {
          resolve({
            status: 401,
            error: "No autorizado. Verifique su sesión.",
          });
        },
        404: function () {
          resolve({ status: 404, error: "Rol no encontrado" });
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
