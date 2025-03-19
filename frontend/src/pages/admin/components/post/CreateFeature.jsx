import { useState } from "react";
import { TextField, Button, Container, Grid } from "@mui/material";
import Swal from "sweetalert2";
import './styles.css';

import { createFeatures } from "../../../../services/featuresService";

const namespace = "features";

export const CreateFeature = () => {
  const [feature, setFeature] = useState({
    name: "",
    iconUrl: "",
  });

  const handleChange = (event) => {
    setFeature({
      ...feature,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await createFeatures(feature);
      if (!response) {
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Característica creada correctamente",
      });

      setFeature({ name: "", iconUrl: "" });
      window.location.href = "/admin/features/list";
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error)
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear la característica",
      });
    }
  };

  return (
    <div className={namespace}>
      <h2>Agrega una nueva característica</h2>
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Título"
                name="title"
                value={feature.name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="URL del icono"
                name="imageUrl"
                value={feature.iconUrl}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} textAlign="center">
              <Button type="submit" variant="contained" color="primary" className={`${namespace}__button`}>
                Crear característica
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};
