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
} from "react-admin";

import { getProducts } from "../../../../services/productService";
import { CustomDeleteButton } from "../deleteButton/DeleteButton";

export const PostIcon = BookIcon;

const MultipleImageField = ({ source }) => {
  const record = useRecordContext();
  if (!record || !record[source]) return null;

  return (
    <Box display="flex" gap={0.5} flexWrap="wrap">
      {record[source].map((img, index) => (
        <img
          key={img.id || index}
          src={img.imageUrl}
          alt={`Imagen ${index + 1}`}
          style={{
            width: "40px",
            height: "40px",
            objectFit: "cover",
            borderRadius: "5px",
            border: "1px solid #ddd",
          }}
        />
      ))}
    </Box>
  );
};

const AvailabilityField = ({ source }) => {
  const record = useRecordContext();
  if (!record || !record[source]) return null;

  return (
    <Box display="flex" flexWrap="wrap" gap={0.5}>
      {record[source].map((availability, index) => {
        const dateFormatted = new Date(availability.date).toLocaleDateString("es-ES", {
          timeZone: "UTC",
        });

        return (
          <Box
            key={index}
            component="span"
            sx={{
              backgroundColor: "#e0f7fa",
              padding: "2px 6px",
              borderRadius: "3px",
              fontSize: "0.75rem",
              whiteSpace: "nowrap",
            }}
          >
            {dateFormatted} ({availability.capacity})
          </Box>
        );
      })}
    </Box>
  );
};

const CustomListActions = () => (
  <TopToolbar>
    <CreateButton
      label="Registrar nuevo producto"
      sx={{
        backgroundColor: "#00CED1",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        padding: "5px 20px",
        fontWeight: "bold",
        textTransform: "none",
        "&:hover": {
          backgroundColor: "#00B3B3",
        },
      }}
    />
  </TopToolbar>
);

export const PostList = () => {
  const [products, setProducts] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    getProducts().then((data) => {
      console.log("🚀 ~ getProducts ~ data:", data);
      setProducts(data);
    });
  }, [isDelete]);

  return (
    <List
      title="Lista de productos"
      actions={<CustomListActions />}
      bulkActionButtons={false}
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        paddingTop: "40px", // Añadir padding en la parte superior
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
        }}
      >
        <Datagrid
          data={products}
          bulkActionButtons={false}
          rowClick={null}
          sx={{
            "& .RaDatagrid-headerCell": {
              fontWeight: "bold",
              backgroundColor: "#00B3B3",
              color: "white",
            },
            minWidth: 800,
          }}
          empty={
            <div style={{ textAlign: "center", padding: "20px" }}>
              Aún no se ha registrado ningún producto.
            </div>
          }
        >
          <TextField source="id" sx={{ width: "50px" }} />
          <MultipleImageField source="imageSet" label="Imágenes" />
          <TextField source="name" label="Nombre" sx={{ width: "200px" }} />
          <FunctionField
            label="Descripción"
            render={(record) => {
              const desc = record.description || "";
              return desc.length > 80 ? `${desc.slice(0, 80)}...` : desc;
            }}
            sx={{
              maxWidth: "300px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          />
          <TextField source="price" label="Precio" />
          <TextField source="category.title" label="Categoría" />
          <AvailabilityField source="availabilitySet" label="Disponibilidad (Cupo)" />

          <Box display="flex" gap={1} label="Acciones">
            <EditButton
              label="Editar"
              sx={{
                backgroundColor: "#00CED1",
                borderRadius: "10px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                padding: "10px 20px",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#00B3B3",
                },
              }}
            />
            <CustomDeleteButton setIsDelete={setIsDelete} />
          </Box>
        </Datagrid>
      </Box>
    </List>
  );
};
