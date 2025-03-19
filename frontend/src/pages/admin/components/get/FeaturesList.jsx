import { Box } from "@mui/material";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  useRecordContext,
  TopToolbar,
  CreateButton,
  FunctionField,
  DeleteButton,
  ImageField
} from "react-admin";

import { getCategories } from "../../../../services/categoryService";
import "./categoryStyles.css";
import { useAuth } from "../../../../context/AuthContext";

const namespace = "list-features";

const CustomListActions = () => (
  <TopToolbar>
    <CreateButton
      label="Crear nueva característica"
      sx={{
        backgroundColor: "#00CED1",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        padding: "5px 20px",
        fontWeight: "bold",
        textTransform: "none",
        width: "100%",
        "&:hover": {
          backgroundColor: "#00B3B3",
        },
      }}
    />
  </TopToolbar>
);

export const FeaturesList = () => {
  const { features } = useAuth();

  return (
    <div className={namespace}>
      <List
        sx={{
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        title="Lista de categorías"
        actions={<CustomListActions />}
        bulkActionButtons={false}
        className={`${namespace}-container`}
      >
        <Box className={`${namespace}-box`}>
          <Datagrid
            className={`${namespace}-data`}
            rowClick={null}
            bulkActionButtons={false}
            data={features}
            sx={{
              "& .RaDatagrid-headerCell": {
                fontWeight: "bold",
                backgroundColor: "#00B3B3",
                color: "white",
              },
            }}
            empty={
              <div style={{ textAlign: "center", padding: "20px" }}>
                Aún no se ha registrado ninguna categoría.
              </div>
            }
          >
            <TextField source="id" sx={{ width: "50px" }} />
            <TextField
              source="title"
              label="Nombre de la categoría"
              sx={{ width: "200px" }}
            />
            <TextField
              source="description"
              label="Descripción"
              sx={{
                maxWidth: "300px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            />
            <ImageField source="imageUrl" label="Imagen" />
            <Box display="flex" gap={1} label="Acciones">
              <EditButton
                label="Editar"
                sx={{
                  backgroundColor: "#00B3B3",
                  color: "white",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                  padding: "5px 20px",
                  fontWeight: "bold",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "black",
                  },
                }}
              />
              <DeleteButton
                label="Eliminar"
                sx={{
                  backgroundColor: "#d33",
                  color: "white",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                  padding: "5px 20px",
                  fontWeight: "bold",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "black",
                  },
                }}
              />
            </Box>
          </Datagrid>
        </Box>
      </List>
    </div>
  );
};
