import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
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
  ImageField,
  useRefresh,
} from "react-admin";
import Button from "@mui/material/Button";

import {
  deleteCategory,
  getCategories,
} from "../../../../services/categoryService";
import "./categoryStyles.css";
import { useAuth } from "../../../../context/AuthContext";
import Swal from "sweetalert2";

const namespace = "list-categories";

const CustomListActions = () => (
  <TopToolbar>
    <CreateButton
      label="Crear nueva categoría"
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

const DeleteCategoryButton = ({ setIsDelete }) => {
  const record = useRecordContext();

  if (!record) return null;

  const handleDeleteCategory = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Deseas eliminar la categoría "${record.title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const response = await deleteCategory(record.id);
        console.log("🚀 ~ handleDeleteCategory ~ response:", response)
        if (!response) {
          return;
        }

        Swal.fire(
          "Eliminado",
          "La categoría ha sido eliminada.",
          "success"
        ).then(() => {
          setIsDelete(true);
        });
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar la categoría.", "error");
      }
    }
  };

  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#d33",
        color: "white",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        padding: "5px 20px",
        fontWeight: "bold",
        textTransform: "none",
        width: "100%",
        "&:hover": {
          backgroundColor: "#a00",
        },
      }}
      onClick={handleDeleteCategory}
    >
      Eliminar
    </Button>
  );
};

export const CategoriesList = () => {
  const { categories: categoriesContext } = useAuth();
  const [categories, setCategories] = useState(categoriesContext);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, [isDelete]);
  return (
    <div className={namespace}>
      <List
        sx={{
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "140px",
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
            data={categories}
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
              <DeleteCategoryButton setIsDelete={setIsDelete} />
            </Box>
          </Datagrid>
        </Box>
      </List>
    </div>
  );
};
