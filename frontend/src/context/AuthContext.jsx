import { createContext, useState, useEffect, useContext } from "react";
import { loginUser, getProfile, getProducts } from "../services/productService";
import { getCategories } from "../services/categoryService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const token = localStorage.getItem("token");
    if (token ) {
      fetchCategories();
      fetchProducts()
    }
  }, []);

  const fetchCategories = async () => {
    const data = await getCategories();
    if (data) {
      setCategories(data);
    }
  };

  const fetchProducts = async () => {
    const data = await getProducts();
    if (data) {
      setProducts(data);
    }
  };

  const login = async (email, password) => {
    const response = await loginUser({ email, password });
    if (!response) {
      return;
    }
    let token;

    if (response?.token) {
      token = response.token;
      localStorage.setItem("token", token);
      const profile = await getProfile(token);
      const { firstname, lastname, email } = profile;
      const initials = `${firstname.charAt(0)}${lastname.charAt(
        0
      )}`.toUpperCase();

      const user = {
        name: `${firstname} ${lastname}`,
        email,
        avatar: initials,
        isAdmin: profile.role === "SUPERADMIN" || profile.role === "ADMIN",
      };

      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      window.location.href = "/profile";
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setCategories([]);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, categories, products }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
