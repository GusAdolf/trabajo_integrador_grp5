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
import { Grid, Box, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";

export const PostEdit = () => {
  const { id } = useParams();
  const { products } = useAuth();
  const [productById, setProductById] = useState(null);
  const [productEdit, setProductEdit] = useState({
    name: "",
    description: "",
    price: "",
    imageSet: [],
  });
  console.log("🚀 ~ PostEdit ~ productEdit:", productEdit);

  useEffect(() => {
    if (products && id) {
      const foundProduct = products.find(
        (product) => product.id === Number(id)
      );
      console.log("🚀 ~ useEffect ~ foundProduct:", foundProduct);
      setProductById(foundProduct);
      if (foundProduct) {
        setProductEdit({
          name: foundProduct.name,
          description: foundProduct.description,
          price: foundProduct.price,
          imageSet: foundProduct.imageSet.map((image) => ({
            imageUrl: image.imageUrl,
          })),
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

  return (
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
        {productById && (
          <SimpleForm>
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
              <Grid item xs={12} sm={6}>
                <TextInput
                  name="price"
                  source="Precio"
                  label="Precio"
                  fullWidth
                  onChange={handleInputChange}
                />
                <Grid item xs={12}>
                  {productEdit.imageSet.map((image, index) => (
                    <div key={index} style={{ display: "flex" }}>
                      <ImageField
                        source="imageUrl"
                        record={image}
                        title="imageUrl"
                      />
                      <Button
                        onClick={() => handleRemoveImage(index)}
                        startIcon={<DeleteIcon />}
                      >
                        Eliminar
                      </Button>
                    </div>
                  ))}
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
              </Grid>
            </Grid>
          </SimpleForm>
        )}
      </Container>
    </Edit>
  );
};
