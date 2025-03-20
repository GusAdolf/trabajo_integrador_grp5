import { useEffect, useState } from "react";
import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  DateField,
  TextField,
  EditButton,
  TextInput,
  DateInput,
  useRecordContext,
  ImageInput,
  ImageField,
  Form,
  SaveButton,
  SelectInput,
  ArrayInput,
  Button,
  SimpleFormIterator,
} from "react-admin";
import BookIcon from "@mui/icons-material/Book";
export const PostIcon = BookIcon;
import { Grid, Box, Container, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  assignCategory,
  updateProduct,
} from "../../../../services/productService";
import "./edit.styles.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Swal from "sweetalert2";

export const PostEdit = () => {
  const { id } = useParams();
  const { products, categories } = useAuth();
  const [productById, setProductById] = useState(null);
  const [productEdit, setProductEdit] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    imageSet: [],
  });

  useEffect(() => {
    if (products && id) {
      const foundProduct = products.find(
        (product) => product.id === Number(id)
      );
      console.log("🚀 ~ useEffect ~ foundProduct:", foundProduct);
      setProductById(foundProduct);
      if (foundProduct) {
        setProductEdit({
          id: foundProduct.id,
          name: foundProduct.name,
          description: foundProduct.description,
          price: foundProduct.price,
          imageSet: foundProduct.imageSet.map((image) => ({
            imageUrl: image.imageUrl,
          })),
          city: {
            id: 1,
          },
          availabilitySet: [{ date: "2025-11-22" }],
          maxCapacity: 10,
          address: "Soy una direccion",
        });
      }
    }
  }, [products, id]);

  const handleInputChange = (event) => {
    setProductEdit({
      ...productEdit,
      [event.target.name]: event.target.value,
    });
  };

  const handleRemoveImage = (i) => {
    const newImageSet = [...productEdit.imageSet];
    newImageSet.splice(i, 1);
    setProductEdit({
      ...productEdit,
      imageSet: newImageSet,
    });
  };

  const handleAddImage = (files) => {
    if (files && files.length > 0) {
      const lastFile = files[files.length - 1];

      const newImage = {
        imageUrl: URL.createObjectURL(lastFile),
      };

      setProductEdit({
        ...productEdit,
        imageSet: [...productEdit.imageSet, newImage],
      });
    }
  };

  if (!productById) {
    return <div>Cargando...</div>;
  }

  const handleSubmit = (values) => {
    updateProduct(productEdit)
      .then((response) => {
        return assignCategory(id, values.Categoría);
      })
      .then((responseCategory) => {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Producto editado correctamente.",
        }).then(() => {
          window.location.href = "/admin/products";
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo completar la operación.",
        });
      });
  };

  return (
    <>
      {productById && (
        <Edit
          title="Editar un producto"
          sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Container sx={{ display: "flex", alignItems: "center" }}>
            <Paper
              elevation={3}
              sx={{
                p: { xs: 2, sm: 4 }, // padding responsivo
                my: 2,
              }}
            >
              {productById && (
                <SimpleForm onSubmit={handleSubmit} toolbar={false}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextInput
                        name="name"
                        source="Nombre"
                        label="Nombre"
                        fullWidth
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextInput
                        name="description"
                        source="Descripción"
                        label="Descripción"
                        fullWidth
                        multiline
                        onChange={handleInputChange}
                      />
                    </Grid>

                    <TextInput
                      name="price"
                      source="Precio"
                      label="Precio"
                      fullWidth
                      onChange={handleInputChange}
                      sx={{ paddingLeft: "16px" }}
                    />
                    <Grid item xs={12} sm={6}>
                      <SelectInput
                        source="Categoría"
                        label="Categoría"
                        required
                        choices={categories.map((category) => ({
                          id: category.id,
                          name: category.title,
                        }))}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                        {productEdit.imageSet.map((image, index) => (
                          <div key={index} className="image-container">
                            <Card sx={{ maxWidth: 345 }}>
                              <ImageField
                                source="imageUrl"
                                record={image}
                                title="imageUrl"
                              />
                              <CardActions>
                                <Button
                                  onClick={() => handleRemoveImage(index)}
                                  startIcon={<DeleteIcon />}
                                >
                                  Eliminar
                                </Button>
                              </CardActions>
                            </Card>
                          </div>
                        ))}
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <ArrayInput source="Imagenes" label="Imágenes (URLs)">
                        <SimpleFormIterator>
                          <ImageInput
                            source="imageUrl"
                            label="Imágenes"
                            onChange={handleAddImage}
                            multiple
                          >
                            <ImageField source="imageUrl" title="imageUrl" />
                          </ImageInput>
                        </SimpleFormIterator>
                      </ArrayInput>
                    </Grid>

                    <Grid item xs={12} display="flex" justifyContent="center">
                      <Box mt={2}>
                        <SaveButton
                          label="Editar"
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
              )}
            </Paper>
          </Container>
        </Edit>
      )}
    </>
  );
};
