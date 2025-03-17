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
} from "react-admin";
import { createProduct } from "../../../../services/productService";

export const PostIcon = BookIcon;

export const PostCreate = () => {
  const handleSubmit = async (values) => {
    const productBody = {
      name: values.Nombre,
      description: values.Descripción,
      price: parseFloat(values.Precio),
      imageSet: values.Imagenes?.map((imgUrl) => ({
        imageUrl: imgUrl,
        altText: `Imagen de ${values.Nombre}`,
      })),
    };

    try {
      const response = await createProduct(productBody);
      if (!response) {
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Producto creado correctamente.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear el producto.",
      });
    }
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
              <TextInput source="Precio" label="Precio" fullWidth />
            </Grid>

            <Grid item xs={12}>
              <label > Debe ingresar por lo menos cinco imagenes </label>
              <ArrayInput source="Imagenes" label="Imágenes (URLs)">
                <SimpleFormIterator>
                  <TextInput label="URL de imagen" />
                </SimpleFormIterator>
              </ArrayInput>
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
