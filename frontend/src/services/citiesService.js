const API_URL = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_APP_API_URL;

export const getCities = async () => {
  try {
    const response = await fetch(`${API_URL}/cities`);
    if (!response.ok) {
      throw new Error("Error al obtener las ciudades");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
