import React, { useState } from "react";
import { TextField, Button, Container, Grid } from "@mui/material";
import Swal from "sweetalert2";
import './styles.css';

import { createCategories } from "../../../../services/categoryService";

const namespace = "categories";

export const CreateCategory = () => {
  const [category, setCategory] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });

  const handleChange = (event) => {
    setCategory({
      ...category,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await createCategories(category);
      if (!response) {
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Categoría creada correctamente",
      });

      setCategory({ title: "", description: "", imageUrl: "" });
      window.location.href = "/admin/categories/list";
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error)
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear la categoría",
      });
    }
  };

  return (
    <div className={namespace}>
      <h2>Agrega una nueva categoría</h2>
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Título"
                name="title"
                value={category.title}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Descripción"
                name="description"
                value={category.description}
                onChange={handleChange}
                fullWidth
                multiline
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="URL de la imagen"
                name="imageUrl"
                value={category.imageUrl}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} textAlign="center">
              <Button type="submit" variant="contained" color="primary" className={`${namespace}__button`}>
                Crear Categoría
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};
