import Swal from "sweetalert2";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_APP_API_URL;
const API_URL = `${BASE_URL}/bookings`;

/**
 * Crea una nueva reserva (booking) en el backend
 * @param {Object} bookingData - Datos necesarios para crear la reserva
 * @param {number} bookingData.product_id - ID del producto
 * @param {number} bookingData.availability_id - ID de la disponibilidad seleccionada
 * @param {number} bookingData.quantity - Cantidad de personas
 * @returns {Promise<Object>} - Retorna la respuesta del servidor (BookingResponseDto) en caso de éxito
 */
export const createBooking = async (bookingData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No estás autenticado. Por favor inicia sesión.");
    }

    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "No se pudo confirmar la reserva.");
    }

    return await response.json();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error al crear la reserva",
      text: error.message || "Ha ocurrido un error",
    });
    throw error;
  }
};

/**
 * Obtiene las reservas del usuario autenticado
 * @returns {Promise<Array>} - Lista de reservas (BookingResponseDto)
 */
export const getBookings = async () => { // byUser
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return [];
      //throw new Error("No estás autenticadohhh. Por favor inicia sesión.");
    }

    const response = await fetch(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "No se pudieron obtener las reservas.");
    }

    return await response.json();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message || "No se pudieron obtener las reservas",
    });
    return [];
  }
};

export const getBookingsByProduct = async (productId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No estás autenticado. Por favor inicia sesión.");
    }

    const response = await fetch(`${API_URL}/product/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "No se pudieron obtener las reservas del producto.");
    }

    return await response.json();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message || "No se pudieron obtener las reservas del producto",
    });
    return [];
  }
};
