import Swal from "sweetalert2";

// Se prioriza VITE_BACKEND_URL y, si no existe, se usa "http://localhost:8080"
const BASE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";
// Se construye la URL para el recurso "features"
const API_URL = `${BASE_BACKEND_URL}/features`;

// Crear feature
export const createFeatures = async (feature) => {
  console.log("🚀 ~ createFeatures ~ feature:", feature);
  try {
    const bearerToken = `Bearer ${localStorage.getItem("token")}`;
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearerToken,
      },
      body: JSON.stringify(feature),
    });
    if (response.status === 400) {
      const responseText = await response.text();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `No se pudo guardar el feature: ${responseText}`,
      });
      return;
    }
    return await response.json();
  } catch (error) {
    console.error("Error en createFeatures:", error);
  }
};

// Obtener features
export const getFeatures = async () => {
  try {
    const bearerToken = `Bearer ${localStorage.getItem("token")}`;
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearerToken,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error en getFeatures:", error);
  }
};

// Actualizar feature
export const updateFeature = async (id, feature) => {
  try {
    const bearerToken = `Bearer ${localStorage.getItem("token")}`;
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearerToken,
      },
      body: JSON.stringify(feature),
    });
    return await response.json();
  } catch (error) {
    console.error("Error en updateFeature:", error);
  }
};

// Eliminar feature
export const deleteFeature = async (id) => {
  try {
    const bearerToken = `Bearer ${localStorage.getItem("token")}`;
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearerToken,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error en deleteFeature:", error);
  }
};
