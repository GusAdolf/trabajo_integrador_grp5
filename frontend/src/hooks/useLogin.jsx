import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const useLogin = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateFields = (emailValue, passwordValue) => {
    const messages = [];

    if (!emailValue.trim()) {
      messages.push("El email es obligatorio.");
    } else if (!emailRegex.test(emailValue)) {
      messages.push("Ingresa un email válido.");
    }

    if (!passwordValue) {
      messages.push("La contraseña es obligatoria.");
    }

    return messages;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateFields(email, password);

    if (validationErrors.length > 0) {
      setError(validationErrors.join(" "));
      return;
    }

    try {
      await login(email, password);
      setError("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return {
    handleSubmit,
    handleInputChange,
    togglePasswordVisibility,
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    error,
  };
};

export default useLogin;
