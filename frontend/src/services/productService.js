import Swal from "sweetalert2";

const URL = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_APP_API_URL;

// PRODUCTS

// Get all products
export const getProducts = async () => {
  try {
    const response = await fetch(`${URL}/products`);
    if (!response.ok) {
      throw new Error("Error al obtener los productos");
    }
    return await response.json();
  } catch (error) {
   return null;
  }
};

// Create product
export const createProduct = async (product) => {
  try {
    const bearerToken = `Bearer ${localStorage.getItem("token")}`;
    const response = await fetch(`${URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearerToken,
      },
      body: JSON.stringify(product),
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

// Delete product
export const deleteProduct = async (id) => {
  try {
    const bearerToken = `Bearer ${localStorage.getItem("token")}`;
    const response = await fetch(`${URL}/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: bearerToken,
      },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

// Update product
export const updateProduct = async (product) => {
  try {
    const bearerToken = `Bearer ${localStorage.getItem("token")}`;
    const response = await fetch(`${URL}/products/${product.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearerToken,
      },
      body: JSON.stringify(product ),
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

// USERS

// Create user
export const registerUser = async (user) => {
  try {
    const response = await fetch(`${URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
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

// Login user
export const loginUser = async (user) => {
  try {
    const response = await fetch(`${URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
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

// Get profile
export const getProfile = async (token) => {
  try {
    const bearerToken = `Bearer ${token}`;
    const response = await fetch(`${URL}/users/profile`, {
      headers: {
        Authorization: bearerToken,
      },
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

// Get users
export const getUsers = async () => {
  try {
    const bearerToken = `Bearer ${localStorage.getItem("token")}`;
    const response = await fetch(`${URL}/users`, {
      headers: {
        Authorization: bearerToken,
      },
    });
    return await response.json();
  } catch (error) {
    return null;
  }
};

// Change role
export const updateUserRole = async (id, role) => {
  try {
    const bearerToken = `Bearer ${localStorage.getItem("token")}`;
    const response = await fetch(`${URL}/users/${id}/role`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearerToken,
      },
      body: JSON.stringify({ role }),
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
  } catch (error) {
    console.error(error);
  }
};

// Asign category
export const assignCategory = async (id, categoryId) => {
  try {
    const bearerToken = `Bearer ${localStorage.getItem("token")}`;
    const response = await fetch(
      `${URL}/categories/${id}/assign/${categoryId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: bearerToken,
        },
      }
    );
    if (response.status === 400) {
      const responseText = await response.text();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: responseText,
      });

      return;
    }
  } catch (error) {
    console.error(error);
  }
};

// Add category 
export const addCategory = async () => {

};
