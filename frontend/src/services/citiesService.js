export const getCities = async () => {
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/cities");
    if (!response.ok) {
      throw new Error("Error al obtener las ciudades");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};