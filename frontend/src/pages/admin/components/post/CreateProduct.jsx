import { Grid, Box, Container, Paper, Typography } from "@mui/material";
import Swal from "sweetalert2";
import BookIcon from "@mui/icons-material/Book";
import {
  Create,
  SimpleForm,
  TextInput,
  SaveButton,
  SelectInput,
  ArrayInput,
  SimpleFormIterator,
  NumberInput,
  DateInput,
} from "react-admin";
import {
  createProduct,
  assignCategory,
} from "../../../../services/productService";
import { useAuth } from "../../../../context/AuthContext";

export const PostIcon = BookIcon;

export const PostCreate = () => {
  const { categories, cities } = useAuth();
  const required = (value) => (value ? undefined : "Este campo es requerido");

  const handleSubmit = (values) => {
    const productBody = {
      name: values.Nombre,
      description: values.Descripción,
      price: parseFloat(values.Precio),
      imageSet: values.Imagenes?.map((imgUrl) => ({
        imageUrl: imgUrl,
        altText: `Imagen de ${values.Nombre}`,
      })),
      city: { id: values.Ciudad },
      availabilitySet: values.Disponibilidad?.map((availability) => ({
        date: availability.date,
      })),
      maxCapacity: values.CapacidadMaxima, // Capacidad global para todas las fechas
      address: "Soy una dirección",
    };

    createProduct(productBody)
      .then((response) => {
        if (!response) return;
        const { id } = response;
        return assignCategory(id, values.Categoría);
      })
      .then(() => {
        //if (!responseCategory) return;

        Swal.fire({
          icon: "success",
          title: "¡Producto Creado!",
          text: "El producto se ha creado con éxito.",
          confirmButtonColor: "#00CED1",
        }).then(() => {
          window.location.href = "/admin/products";
        });
      })
      .catch((error) => {
        console.error("Error:", error);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo completar la operación.",
          confirmButtonColor: "#d33",
        });
      });
  };

  return (
    <Create
      // Retiramos height: "100vh" para no forzar scroll vertical
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "stretch",
        py: 4, // Espaciado vertical
      }}
      title="Crear producto"
    >
      <Container maxWidth="md">
        {/* Paper envuelve el formulario para un fondo blanco y sombra */}
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 4 }, // padding responsivo
            my: 2,
          }}
        >
          {/* Título general */}
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            align="center"
            sx={{ mb: 3 }}
          >
            Crear Nuevo Producto
          </Typography>

          <SimpleForm
            toolbar={false}
            onSubmit={handleSubmit}
            // 5 espacios de imagen por defecto; se pueden agregar más
            defaultValues={{
              Imagenes: ["", "", "", "", ""],
            }}
          >
            <Grid container spacing={2}>
              {/* Nombre */}
              <Grid item xs={12} md={6}>
                <TextInput source="Nombre" label="Nombre" fullWidth validate={required}/>
              </Grid>

              {/* Categoría */}
              <Grid item xs={12} md={6}>
                <SelectInput
                  source="Categoría"
                  label="Categoría"
                  choices={categories.map((category) => ({
                    id: category.id,
                    name: category.title,
                  }))}
                  fullWidth
                  validate={required}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <SelectInput
                  source="Ciudad"
                  label="Ciudad"
                  choices={cities.map((city) => ({
                    id: city.id,
                    name: city.name,
                  }))}
                  fullWidth
                  validate={required}
                />
              </Grid>

              {/* Descripción (una sola columna) */}
              <Grid item xs={12}>
                <TextInput
                  source="Descripción"
                  label="Descripción"
                  multiline
                  rows={3}
                  fullWidth
                  validate={required}
                />
              </Grid>

              {/* Precio */}
              <Grid item xs={12} md={6}>
                <TextInput source="Precio" label="Precio" fullWidth validate={required}/>
              </Grid>

              {/* Capacidad Global */}
              <Grid item xs={12} md={6}>
                <NumberInput
                  source="CapacidadMaxima"
                  label="Capacidad Máxima (global)"
                  fullWidth
                  min={1}
                  validate={required}
                />
              </Grid>

              {/* Imágenes */}
              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ mb: 1 }}
                >
                  Ingrese al menos 5 imágenes
                </Typography>
                <ArrayInput source="Imagenes" label="" validate={required}>
                  {/* initialCount={5} para 5 campos por defecto, 
                      aunque ya creamos 5 con defaultValues */}
                  <SimpleFormIterator initialCount={5}>
                    <TextInput label="URL de imagen" validate={required}/>
                  </SimpleFormIterator>
                </ArrayInput>
              </Grid>

              {/* Disponibilidad */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mt: 2 }} fontWeight="bold">
                  Disponibilidad
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Seleccione las fechas en las que estará disponible el
                  producto. Puede agregar más con el botón “Agregar”.
                </Typography>
                <ArrayInput source="Disponibilidad" label="" validate={required}>
                  <SimpleFormIterator>
                    <DateInput label="Fecha" source="date" />
                  </SimpleFormIterator>
                </ArrayInput>
              </Grid>

              {/* Botón Guardar */}
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" mt={2}>
                  <SaveButton
                    label="Crear"
                    sx={{
                      backgroundColor: "#00CED1",
                      borderRadius: "10px",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                      px: 4,
                      py: 1.5,
                      fontWeight: "bold",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#00B3B3",
                      },
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </SimpleForm>
        </Paper>
      </Container>
    </Create>
  );
};
