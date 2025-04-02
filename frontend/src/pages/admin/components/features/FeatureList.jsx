import { 
  List, 
  DatagridConfigurable, 
  TextField, 
  ImageField, 
  EditButton, 
  DeleteWithConfirmButton, 
  TopToolbar, 
  SelectColumnsButton, 
  CreateButton,
} from 'react-admin';
import { Box } from "@mui/material";

const IconFeatureField = ({source, label}) => {
  return (
    <ImageField source={source} label={label} 
      sx={{ 
        '& img': { 
          maxWidth: 30, 
          maxHeight: 30, 
          objectFit: 'contain' 
        } 
      }}
    />
  )
}

const Actions = ({ label }) => {
  return (
    <Box display="flex" gap={2} label={label} alignItems={"center"}>
      <EditButton 
        label={false}
        sx={{
            color: "white",
            backgroundColor: "#00CED1",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            padding: "10px 10px 10px 20px",
            fontWeight: "bold",
            textTransform: "none",
            width: "25%",
            "&:hover": {
              backgroundColor: "#00B3B3",
            },
        }}
      />
      <DeleteWithConfirmButton 
        label={false} 
        confirmContent="¿Estás seguro?" 
        sx={{
          backgroundColor: "#d33",
          color: "white",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          padding: "10px 10px 10px 20px",
          fontWeight: "bold",
          textTransform: "none",
          width: "25%",
          "&:hover": {
            backgroundColor: "#a00",
          },
        }}
      />
    </Box>
  )
}

const CustomListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    {/* <FilterButton /> */}
    <CreateButton label="Añadir característica" />
  </TopToolbar>
);

export const FeatureList = () => (
  <List title="Características" actions={<CustomListActions />}
    sx={{
      height: "80vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0px 50px"
    }}
  >
    <DatagridConfigurable rowClick={false} bulkActionButtons={false} >
      <TextField source="id" label="Id" />
      <IconFeatureField source="iconUrl" label="Ícono" />
      <TextField source="name" label="Nombre" />
      {/* <ReferenceManyCount label="Productos" reference="products" target="feature_id" /> */}
      <Actions label="Acciones" />
    </DatagridConfigurable>
  </List>
);
