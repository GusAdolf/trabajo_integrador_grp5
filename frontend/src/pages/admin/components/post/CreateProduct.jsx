import { Grid, Box, Container } from "@mui/material";
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
  SelectArrayInput,
  ReferenceArrayInput,
} from "react-admin";
import {
  createProduct,
  assignCategory,
} from "../../../../services/productService";
import { useAuth } from "../../../../context/AuthContext";

export const PostIcon = BookIcon;

export const PostCreate = () => {
  const { categories } = useAuth();

  const handleSubmit = (values) => {
    const productBody = {
      name: values.Nombre,
      description: values.Descripción,
      price: parseFloat(values.Precio),
      imageSet: values.Imagenes?.map((imgUrl) => ({
        imageUrl: imgUrl,
        altText: `Imagen de ${values.Nombre}`,
      })),
      // featureIds: values.featureIds || []
      city: {
        id: 1,
      },
      availabilitySet: [{ date: "2025-11-22" }],
      maxCapacity: 10,
      address: "Soy una direccion",
    };

    createProduct(productBody)
      .then((response) => {
        if (!response) return;
        const { id } = response;
        return assignCategory(id, values.Categoría);
      })
      .then((responseCategory) => {
        console.log("🚀 ~ .then ~ responseCategory:", responseCategory);
        if (!responseCategory) return;

        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Producto creado correctamente.",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo completar la operación.",
        });
      });
  };
  return (
    <Create
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      label="Crear producto"
      title="Crear producto"
    >
      <Container sx={{ display: "flex", alignItems: "center" }}>
        <SimpleForm toolbar={false} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextInput source="Nombre" label="Nombre" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextInput
                source="Descripción"
                label="Descripción"
                fullWidth
                multiline
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectInput
                source="Categoría"
                label="Categoría"
                choices={categories.map((category) => ({
                  id: category.id,
                  name: category.title,
                }))}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextInput source="Precio" label="Precio" fullWidth />
            </Grid>

            <Grid item xs={12}>
              <label> Debe ingresar por lo menos cinco imagenes </label>
              <ArrayInput source="Imagenes" label="Imágenes (URLs)">
                <SimpleFormIterator>
                  <TextInput label="URL de imagen" />
                </SimpleFormIterator>
              </ArrayInput>
            </Grid>
            <Grid item xs={12}>
              <ReferenceArrayInput
                label="Características"
                source="featureIds"
                reference="features"
              >
                <SelectArrayInput optionText="name" />
              </ReferenceArrayInput>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="center">
              <Box mt={2}>
                <SaveButton
                  label="Crear"
                  sx={{
                    backgroundColor: "#00CED1",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    padding: "10px 30px",
                    fontWeight: "bold",
                    textTransform: "none",
                    width: "100%",
                    "&:hover": {
                      backgroundColor: "#00B3B3",
                    },
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </SimpleForm>
      </Container>
    </Create>
  );
};
