
import Swal from "sweetalert2";

const API_URL = "http://localhost:8080/features"

// create feature
export const createFeatures = async (feature) => {
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
      });
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
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }