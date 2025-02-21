import * as React from "react";
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
} from "react-admin";
import BookIcon from "@mui/icons-material/Book";
export const PostIcon = BookIcon;
import { Grid, Box, Container } from "@mui/material";
import { validatePostCreation } from "../../../../helpers/index";

const PostTitle = () => {
  const record = useRecordContext();
  return <span>Post {record ? `"${record.title}"` : ""}</span>;
};

export const PostEdit = () => (
  <Edit title="Editar un producto">
    <Container sx={{ height: "55vh", display: "flex", alignItems: "center" }}>
      <Form validate={validatePostCreation}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextInput source="Imagen" label="Url de la imagen" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput source="Nombre" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput source="Descripción" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput source="Precio" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput source="Categoría" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectInput
              source="Status"
              choices={[
                { id: "disponible", name: "Disponible" },
                { id: "no_disponible", name: "No disponible" },
              ]}
              fullWidth
            />
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
      </Form>
    </Container>
  </Edit>
);
