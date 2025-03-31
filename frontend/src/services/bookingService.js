import Swal from "sweetalert2";

const BASE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_APP_API_URL;
const API_URL = `${BASE_BACKEND_URL}/bookings`;


export const getBookings = async () => {
  try {
    const bearerToken = `Bearer ${localStorage.getItem("token")}`;
    const response = await fetch(`${API_URL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearerToken,
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener las reservas");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudieron obtener las reservas",
    });
  }
};

