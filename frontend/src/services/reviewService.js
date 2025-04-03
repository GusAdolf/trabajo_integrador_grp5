import Swal from "sweetalert2";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_APP_API_URL;
const API_URL = `${BASE_URL}/reviews`;

export const getReviewsByProduct = async (productId) => {
  try {
    const response = await fetch(`${API_URL}/product/${productId}`);

    if (!response.ok) {
      throw new Error("Error al obtener las reseñas del producto");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudieron obtener las reseñas del producto",
    });
  }
};
