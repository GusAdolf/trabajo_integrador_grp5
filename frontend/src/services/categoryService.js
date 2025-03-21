import Swal from "sweetalert2";

// create category
export const createCategories = async (category) => {
  console.log("🚀 ~ createCategories ~ category:", category);
  try {
    const bearerToken = `Bearer ${localStorage.getItem("token")}`;
    const response = await fetch("http://localhost:8080/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearerToken,
      },
      body: JSON.stringify(category),
    });
    if (response.status === 400) {
      const responseText = await response.text();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: responseText,
      });
      return;
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

// get categories
export const getCategories = async () => {
  try {
    //const bearerToken = `Bearer ${localStorage.getItem("token")}`;
    const response = await fetch("http://localhost:8080/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //Authorization: bearerToken,
      },
    });
    return await response.json();
  } catch (error) {
    return null;
  }
};

// delete category
export const deleteCategory = async (id) => {
  try {
    const bearerToken = `Bearer ${localStorage.getItem("token")}`;
    const response = await fetch(`http://localhost:8080/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: bearerToken,
      },
    });

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Categoría eliminada",
        text: "La categoría se eliminó correctamente.",
      });
      return true;
    } else {
      let errorMessage = "Ocurrió un error al intentar eliminar la categoría.";
      if (response.status === 404) {
        errorMessage = "La categoría no fue encontrada.";
      } else if (response.status === 401 || response.status === 403) {
        errorMessage = "Está categoría no se puede eliminar";
      } else if (response.status === 500) {
        errorMessage = "Error interno del servidor.";
      }
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
