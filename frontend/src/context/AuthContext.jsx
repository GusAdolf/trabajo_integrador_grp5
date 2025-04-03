import { createContext, useState, useEffect, useContext } from "react";
import { loginUser, getProfile, getProducts } from "../services/productService";
import { getCategories } from "../services/categoryService";
import { getCities } from "../services/citiesService";
import { getFeatures, deleteFeature } from "../services/featuresService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [cities, setCities] = useState([]);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetchProducts();
    fetchCategories();

    const token = localStorage.getItem("token");
    if (token) {
      fetchProducts();
      fetchUserProfile(token);
      fetchCities();
    }
  }, []);

  const fetchUserProfile = async (token) => {
    const profile = await getProfile(token);
    if (profile) {
      const { firstname, lastname, email } = profile;
      const initials = `${firstname.charAt(0)}${lastname.charAt(0)}`.toUpperCase();

      const user = {
        name: `${firstname} ${lastname}`,
        email,
        avatar: initials,
        isAdmin: profile.role === "SUPERADMIN" || profile.role === "ADMIN",
      };

      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    }
  };

  const fetchCategories = async () => {
    const data = await getCategories();
    if (data) {
      setCategories(data);
    }
  };

  const fetchCities = async () => {
    const data = await getCities();
    if (data) {
      setCities(data);
    }
  };

  const fetchProducts = async () => {
    const data = await getProducts();
    if (data) {
      setProducts(data);
    }
  };

  const fetchFeatures = async () => {
    const data = await getFeatures();
    if (data) {
      setFeatures(data);
    }
  };

  const refreshFeatures = () => fetchFeatures();

  const deleteFeatureById = async (id) => {
    await deleteFeature(id);
    fetchFeatures();
  };

  const login = async (email, password) => {
    try {
      const response = await loginUser({ email, password });

      if (!response || !response.token) {
        throw new Error("Correo o contraseña incorrectos");
      }

      const token = response.token;
      localStorage.setItem("token", token);
      await fetchUserProfile(token);
      window.location.href = "/";
    } catch (err) {
      throw new Error(err.message || "Error al iniciar sesión");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setCategories([]);
    setProducts([]);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        categories,
        products,
        features,
        cities,
        refreshFeatures,
        deleteFeatureById,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
