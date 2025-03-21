import Swal from "sweetalert2";

const AVAILABILITY_URL = "https://backend-production-147b.up.railway.app/availabilities";

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
