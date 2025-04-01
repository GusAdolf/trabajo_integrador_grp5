import { 
  DatagridConfigurable, 
  List, 
  TextField, 
  ImageField, 
  DeleteWithConfirmButton, 
  ReferenceManyCount, 
  TopToolbar, 
  SelectColumnsButton, 
  CreateButton, 
} from 'react-admin';
import { Box } from "@mui/material";

const TitleField = ({source, label}) => {
  return (
    <TextField source={source} label={label}
      sx={{ 
        width: "200px" 
      }}
    />
  )
}

const DescriptionField = ({source, label}) => {
  return (
    <TextField source={source} label={label} 
      sx={{
        maxWidth: "300px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    />
  )
}

const ImageCategoryField = ({source, label}) => {
  return (
    <ImageField source={source} label={label}
      sx={{ 
        '& img': { 
          maxWidth: 140, 
          maxHeight: 100, 
          objectFit: 'contain' 
        } 
      }}
    />
  )
}

const Actions = ({ label }) => {
  return (
    <Box display="flex" gap={1} label={label} >
      {/* <EditButton label={false} 
        sx={{
            backgroundColor: "#00CED1",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            padding: "10px 10px 10px 20px",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#00B3B3",
            },
        }}
      /> */}
      <DeleteWithConfirmButton confirmContent="¿Estás seguro?" label={false} 
        sx={{
          backgroundColor: "#d33",
          color: "white",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          padding: "10px 10px 10px 20px",
          fontWeight: "bold",
          textTransform: "none",
          width: "100%",
          "&:hover": {
            backgroundColor: "#a00",
          },
        }}
      />
    </Box>
  )
};

const ListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    {/* <FilterButton /> */}
    <CreateButton label="Añadir categoría" />
  </TopToolbar>
);

export const CategoryList = () => (
  <List title="Categorías" actions={<ListActions />}
    sx={{
      height: "80vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0px 50px"
    }}
  >
    <DatagridConfigurable rowClick={false} bulkActionButtons={false} >
      <TextField source="id" />
      <TitleField source="title" label="Nombre" />
      <ImageCategoryField source="imageUrl" label="Imagen" />
      <DescriptionField source="description" label="Descripción" />
      <ReferenceManyCount label="Productos asignados" reference="products" target="category_id" />
      <Actions label="Acciones" />
    </DatagridConfigurable>
  </List>
);
