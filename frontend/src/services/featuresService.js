
import Swal from "sweetalert2";

const BASE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_APP_API_URL;

const API_URL = `${BASE_BACKEND_URL}/features`;

// create feature
export const createFeature = async (feature) => {
    console.log("🚀 ~ createFeatures ~ feature:", feature)
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

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Característica creada",
          text: "La característica se creó correctamente.",
        });
      } else {
        const responseText = await response.text();
        let errorMessage = JSON.parse(responseText).message
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMessage,
        });
        return false;
      }
      /* if (response.status === 400) {
        const responseText = await response.text();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: responseText,
        });
        return;
      } */
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  // get Features
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
      console.error(error);
    }
  }

   // update features
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

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Característica actualizada",
          text: `La característica con id: ${id} se actualizó correctamente.`,
        });
      } else {
        const responseText = await response.text();
        let errorMessage = JSON.parse(responseText).message
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMessage,
        });
        return false;
      }
          
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  // Delete feature
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
      /* return await response.text(); */

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Característica eliminada",
          text: `La característica con id: ${id} se eliminó correctamente.`,
        });
        return true;
      } else {
        const responseText = await response.text();
        let errorMessage = JSON.parse(responseText).message
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se puede eliminar una característica que tiene productos asignados."// errorMessage,
        });
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  }