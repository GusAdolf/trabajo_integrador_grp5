import Swal from "sweetalert2";

// Usa la variable de entorno VITE_BACKEND_URL y, si no existe, usa localhost por defecto.
const BASE_URL = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_APP_API_URL;

// create category
export const createCategory = async (category) => {
  console.log("🚀 ~ createCategories ~ category:", category);
  try {
    const bearerToken = `Bearer ${localStorage.getItem("token")}`;
    const response = await fetch(`${BASE_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearerToken,
      },
      body: JSON.stringify(category),
    });

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Categoría creada",
        text: "La categoría se creó correctamente.",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.assign("/admin/categories")
        }
      });
    } else {
      const responseText = await response.text();
      let errorMessage = JSON.parse(responseText).message 
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
    }

    /* if (response.status === 400) {
      const responseText = await response.text();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: responseText,
      });
      return;
    }*/
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

// get categories
export const getCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error("Error al obtener las categorias");
    }
    return await response.json();
  } catch (error) {
    return null;
  }
};

// get products by category
export const getProductsByCategory = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/categories/${id}/products`);
    if (!response.ok) {
      throw new Error("Error al obtener los productos por categoría");
    }
    return await response.json();
  } catch (error) {
    return null;
  }
};

// delete category
export const deleteCategory = async (id) => {
  try {
    const bearerToken = `Bearer ${localStorage.getItem("token")}`;
    const response = await fetch(`${BASE_URL}/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: bearerToken,
      },
    });

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Categoría eliminada",
        text: `La categoría con id: ${id} se eliminó correctamente.`,
      });
      return true;
    } else {
      const responseText = await response.text();
      let errorMessage = JSON.parse(responseText).message //"Ocurrió un error al intentar eliminar la categoría.";
      /*if (response.status === 404) {
        errorMessage = "La categoría no fue encontrada.";
      } else if (response.status === 401 || response.status === 403) {
        errorMessage = "Está categoría no se puede eliminar";
      } else if (response.status === 500) {
        errorMessage = "Error interno del servidor.";
      }*/
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
      return false;
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Ocurrió un error al intentar eliminar la categoría.",
    });

    return null;
  }
};
