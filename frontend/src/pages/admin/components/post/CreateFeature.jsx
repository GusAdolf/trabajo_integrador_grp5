import { useState } from "react";
import { TextField, Button, Container, Grid, Typography, Box } from "@mui/material";
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
    const { name, value } = event.target;
    setFeature((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await createFeatures(feature);
      if (!response) return;

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Característica creada correctamente",
      });

      setFeature({ name: "", iconUrl: "" });
      window.location.href = "/admin/features/list";
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear la característica",
      });
    }
  };

  return (
    <div className={namespace}>
      <Container maxWidth="sm">
        <Box mt={4} p={3} boxShadow={3} borderRadius={2} bgcolor="#fff">
          <Typography variant="h5" mb={3} align="center">
            Agrega una nueva característica
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Título"
                  name="name" // <-- CORREGIDO
                  value={feature.name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="URL del icono"
                  name="iconUrl" // <-- CORREGIDO
                  value={feature.iconUrl}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} textAlign="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  className={`${namespace}__button`}
                >
                  Crear característica
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </div>
  );
};
