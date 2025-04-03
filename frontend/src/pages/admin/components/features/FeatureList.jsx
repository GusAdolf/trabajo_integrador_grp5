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
    <Box gap={2} label={label} sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <EditButton 
        label={false}
        sx={{
            backgroundColor: "#00CED1",
            color: "white",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            padding: "10px 10px 10px 20px",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#00B3B3",
            },
        }}
      />
      <DeleteWithConfirmButton label={false} 
        confirmContent="¿Estás seguro?" 
        sx={{
          backgroundColor: "#d33",
          color: "white",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          padding: "10px 10px 10px 20px",
          fontWeight: "bold",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#a00",
          },
        }}
      />
    </Box>
  )
}

const ListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    {/* <FilterButton /> */}
    <CreateButton label="Añadir característica" />
  </TopToolbar>
);

export const FeatureList = () => (
  <List title="CARACTERÍSTICAS" actions={<ListActions />}
    sx={{
      margin: "20px"
    }}
  >
    <DatagridConfigurable rowClick={false} bulkActionButtons={false} 
      empty={
        <div style={{ 
            textAlign: "center", 
            padding: "20px" 
          }}
        >
          Aún no se ha registrado ninguna característica.
        </div>
      }
      sx={{
        "& .RaDatagrid-headerCell": {
          fontWeight: "bold",
          backgroundColor: "#000000",
          color: "white",
          textAlign: "center",
          minWidth: "200px"
        },
        '& .column-id': { 
          minWidth: '50px' 
        },
        "& .RaDatagrid-rowCell": {
          textAlign: "center"
        }
      }}
    >
      <TextField source="id" label="ID" sortable={false} />
      <IconFeatureField source="iconUrl" label="ÍCONO" sortable={false} />
      <TextField source="name" label="NOMBRE" sortable={false} />
      {/* <ReferenceManyCount label="Productos" reference="products" target="feature_id" /> */}
      <Actions label="ACCIONES" />
    </DatagridConfigurable>
  </List>
);
