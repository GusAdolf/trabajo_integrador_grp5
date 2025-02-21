export const validatePostCreation = (values) => {
    const errors = {};
    const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i;
  
    if (!values.Imagen || !urlPattern.test(values.Imagen)) {
      errors.Imagen = "Debe ser una URL válida de imagen";
    }
    if (!values.Nombre || values.Nombre.length < 5) {
      errors.Nombre = "El nombre debe tener al menos 5 caracteres";
    }
    if (!values.Descripción || values.Descripción.length < 5) {
      errors.Descripción = "La descripción debe tener al menos 5 caracteres";
    }
    if (!values.Precio || isNaN(values.Precio)) {
      errors.Precio = "El precio debe ser un número válido";
    }
  
    return errors;
  };