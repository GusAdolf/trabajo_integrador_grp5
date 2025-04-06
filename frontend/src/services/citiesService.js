import Swal from "sweetalert2";

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

export const createCity = async (city) => {
  try {
      const bearerToken = `Bearer ${localStorage.getItem("token")}`;
      const response = await fetch(`${API_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: bearerToken,
        },
        body: JSON.stringify(city),
      });
      // notify('Ciudad añadida correctamente', 'success');
      //notify('Error al añadir la ciudad', 'error');
      //notify('Hubo un error al agregar la ciudad', 'error');

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Ciudad creada",
          text: "La ciudad se creó correctamente.",
        });
      } else {
        if (response.status === 400) {
          const responseText = await response.text();
          let errorMessage = JSON.parse(responseText).message 
          let errors = JSON.parse(responseText).errors 
          Swal.fire({
            icon: "error",
            title: errorMessage,
            text: errors
          });
          return;
        } else {
          const responseText = await response.text();
          let errorMessage = JSON.parse(responseText).message 
          Swal.fire({
            icon: "error",
            title: "Error",
            text: errorMessage,
          });
        }
      }
      return await response.json();
    } catch (error) {
      console.error(error);
    }
};
