import Swal from "sweetalert2";

// Usa la variable de entorno VITE_BACKEND_URL (debe comenzar con VITE_ en Vite)
// Si no se define, se usa "http://localhost:8080" por defecto.
const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

// Define las URLs de tus endpoints a partir de BASE_URL
const URL_PRODUCTS = `${BASE_URL}/products`;
const URL_AUTH_REGISTER = `${BASE_URL}/api/auth/register`;
const URL_AUTH_LOGIN = `${BASE_URL}/api/auth/login`;
const URL_USER_PROFILE = `${BASE_URL}/users/profile`;
const URL_USERS = `${BASE_URL}/users`;
const URL_UPDATE_USER_ROLE = (id) => `${BASE_URL}/users/${id}/role`;
const URL_ASSIGN_CATEGORY = (id, categoryId) =>
  `${BASE_URL}/categories/${id}/assign/${categoryId}`;

// PRODUCTS

// Get all products
export const getProducts = async () => {
  try {
    const response = await fetch(URL_PRODUCTS);
    if (!response.ok) {
      throw new Error("Error al obtener los productos");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Create product
export const createProduct = async (product) => {
  try {
    const bearerToken = `Bearer ${localStorage.getItem("token")}`;
    const response = await fetch(URL_PRODUCTS, {
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
    const response = await fetch(`${URL_PRODUCTS}/${id}`, {
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
    const response = await fetch(URL_PRODUCTS, {
      method: "PUT",
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

// USERS

// Create user
export const registerUser = async (user) => {
  try {
    const response = await fetch(URL_AUTH_REGISTER, {
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
    const response = await fetch(URL_AUTH_LOGIN, {
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
    const response = await fetch(URL_USER_PROFILE, {
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
    const response = await fetch(URL_USERS, {
      headers: {
        Authorization: bearerToken,
      },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

// Change role
export const updateUserRole = async (id, role) => {
  try {
    const bearerToken = `Bearer ${localStorage.getItem("token")}`;
    const response = await fetch(URL_UPDATE_USER_ROLE(id), {
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
    const response = await fetch(URL_ASSIGN_CATEGORY(id, categoryId), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
  } catch (error) {
    console.error(error);
  }
};
