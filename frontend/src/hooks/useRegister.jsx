import { useState } from "react";

import Swal from "sweetalert2";

import { registerUser } from "../services/productService";

const useRegister = (setOpen) => {
  const [ submitting, setSubmitting ] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [checked, setChecked] = useState(false);

  // Estados para controlar los modales
  const [showEmailConfirmModal, setShowEmailConfirmModal] = useState(false);
  const [showReenvioModal, setShowReenvioModal] = useState(false);

  // Estado para controlar la visibilidad de la contraseña
  const [showPassword, setShowPassword] = useState(false);

  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData({
      ...registrationData,
      [name]: value,
    });
    setErrors({});
  };

  const validateFields = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (!registrationData.firstname.trim()) {
      newErrors.firstname = "El nombre es obligatorio.";
    } else if (!nameRegex.test(registrationData.firstname)) {
      newErrors.firstname = "El nombre solo puede contener letras.";
    } else if (registrationData.firstname.length < 2) {
      newErrors.firstname = "El nombre debe tener al menos 2 caracteres.";
    }

    if (!registrationData.lastname.trim()) {
      newErrors.lastname = "El apellido es obligatorio.";
    } else if (!nameRegex.test(registrationData.lastname)) {
      newErrors.lastname = "El apellido solo puede contener letras.";
    } else if (registrationData.lastname.length < 2) {
      newErrors.lastname = "El apellido debe tener al menos 2 caracteres.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!registrationData.email.trim()) {
      newErrors.email = "El email es obligatorio.";
    } else if (!emailRegex.test(registrationData.email)) {
      newErrors.email = "Ingresa un email válido.";
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!registrationData.password) {
      newErrors.password = "La contraseña es obligatoria.";
    } else if (!passwordRegex.test(registrationData.password)) {
      newErrors.password =
        "Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.";
    }

    if (!checked) {
      newErrors.checkbox = "Debes aceptar los términos y condiciones.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (!validateFields()) return;

    setSubmitting(true);
    try {
      await registerUser(registrationData);
      setRegistrationData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      });
      setErrors({});
      setChecked(false);

      setOpen(false);
      setShowEmailConfirmModal(true);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
    setSubmitting(false);
  };

  const handleTimerEnd = () => {
    setShowEmailConfirmModal(false);
    setShowReenvioModal(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return {
    handleClose,
    handleInputChange,
    registrationData,
    errors,
    showPassword,
    togglePasswordVisibility,
    checked,
    handleSubmit,
    showEmailConfirmModal,
    handleTimerEnd,
    showReenvioModal,
    setChecked,
    setShowEmailConfirmModal,
    setShowReenvioModal,
    submitting,
  };
};

export default useRegister;
