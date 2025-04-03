import Swal from "sweetalert2";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_APP_API_URL;
<<<<<<< HEAD
const API_URL = `${BASE_URL}/reviews`;

export const getReviewsByProduct = async (productId) => {
  try {
    const response = await fetch(`${API_URL}/product/${productId}`);

    if (!response.ok) {
      throw new Error("Error al obtener las reseñas del producto");
=======

/**
 * Obtiene todas las reseñas de un producto por su ID
 * @param {number} productId - ID del producto
 * @returns {Promise<Array>} - Lista de reseñas (ReviewResponseDto)
 */
export const getReviewsByProduct = async (productId) => {
  try {
    const response = await fetch(`${BASE_URL}/reviews/product/${productId}`);
    if (!response.ok) {
      throw new Error("Error al obtener las reseñas del producto.");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Crea una nueva reseña (review) asociada a una booking (reservación)
 * @param {number} bookingId - ID de la reservación
 * @param {Object} reviewData - Datos de la reseña { score, comment }
 * @returns {Promise<Object>} - La reseña creada
 */
export const createReview = async (bookingId, reviewData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No estás autenticado. Por favor inicia sesión.");
    }

    const response = await fetch(`${BASE_URL}/reviews/booking/${bookingId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(reviewData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "No se pudo crear la reseña.");
>>>>>>> 09c2f901b8fa8807ab4c0f6037c25609120a1e4b
    }

    return await response.json();
  } catch (error) {
<<<<<<< HEAD
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudieron obtener las reseñas del producto",
    });
=======
    Swal.fire({
      icon: "error",
      title: "Error al crear la reseña",
      text: error.message || "Ha ocurrido un error"
    });
    throw error;
>>>>>>> 09c2f901b8fa8807ab4c0f6037c25609120a1e4b
  }
};
