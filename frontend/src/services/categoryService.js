
import Swal from "sweetalert2";


// create category
export const createCategories = async (category) => {
    console.log("🚀 ~ createCategories ~ category:", category)
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
      const bearerToken = `Bearer ${localStorage.getItem("token")}`;
      const response = await fetch("http://localhost:8080/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: bearerToken,
        },
      });
      return await response.json();
    } catch (error) {
      return null;
    }
  }