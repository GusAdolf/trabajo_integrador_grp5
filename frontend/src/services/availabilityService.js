import Swal from "sweetalert2";

// Obtén la URL base del backend usando variables de entorno:
// Prioriza VITE_BACKEND_URL, y si no existe, usa VITE_APP_API_URL;
const BASE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_APP_API_URL;

// Define la URL para availabilities
const AVAILABILITY_URL = `${BASE_BACKEND_URL}/availabilities`;

// Crear disponibilidad para un producto
export const createAvailability = async (productId, availabilityData) => {
  try {
    const bearerToken = `Bearer ${localStorage.getItem("token")}`;
    const response = await fetch(`${AVAILABILITY_URL}/product/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearerToken,
      },
      body: JSON.stringify(availabilityData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `No se pudo guardar la disponibilidad: ${errorText}`,
      });
      return;
    }

    return await response.json();
  } catch (error) {
    console.error("Error en createAvailability:", error);
  }
};
