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
    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Producto creado",
        text: "El producto se creó correctamente.",
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
    } */
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};


// Get product
export const getProduct = async (id) => {
  try {
    const response = await fetch(`${URL}/products/${id}`);
    if (!response.ok) {
      throw new Error("Error al obtener producto");
    }
    return await response.json();
  } catch (error) {
   return null;
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
    /* return await response.text(); */
    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Producto eliminado",
        text: `El producto con id: ${id} se eliminó correctamente.`,
      });
      return true;
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
  } catch (error) {
    console.error(error);
  }
};

// Update product
export const updateProduct = async (product, id) => {
  try {
    const bearerToken = `Bearer ${localStorage.getItem("token")}`;
    const response = await fetch(`${URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearerToken,
      },
      body: JSON.stringify(product),
    });

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Producto actualizado",
        text: `El producto con id: ${id} se actualizó correctamente.`,
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
    } */
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

// USERS

// Create user
export const registerUser = async (user) => {
    const response = await fetch(`${URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if(response.ok == false){
      if(response.status === 409){
        throw new Error("El usuario ya existe");
      }
      throw new Error("Error al registrar el usuario");
    }
    
    const data = await response.json();
    const token = data.token;
    localStorage.setItem("resend-token", token);
    return data;
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
    if (response.status === 401) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Correo o contraseña incorrectos.",
      });
      return;
    } else if (response.status === 400) {
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
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.assign("/");
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

    if (!response.ok) {
      const responseError = await response.json();
      Swal.fire({
        icon: "error",
        title: "Error al cambiar rol",
        text: responseError.message,
      })/* .then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      }) */;
       return false;
    }

    Swal.fire({
      icon: "success",
      title: "Rol cambiado con éxito",
      text: `Usuario con id: ${id} cambió su rol`,
    });
    return true;
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

    if (!response.ok) {
      const responseError = await response.json();
      Swal.fire({
        icon: "error",
        title: "Error al cambiar categoía al producto",
        text: responseError.message,
      })/* .then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      }) */;
       return false;
    }

    Swal.fire({
      icon: "success",
      title: "Categoría del producto cambiado con éxito",
      text: `Producto con id: ${id} cambió su categoría`,
    });
    return true;

    /* if (response.status === 400) {
      const responseText = await response.text();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: responseText,
      });

      return;
    } */
  } catch (error) {
    console.error(error);
  }
};

// Add category 
export const addCategory = async () => {

};
