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
    <Box gap={2} label={label} sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {/* <EditButton label={false} 
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
  <List title="CATEGORÍAS" actions={<ListActions />}
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
          Aún no se ha registrado ninguna categoría.
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
          minWidth: '100px' 
        },
        '& .column-description': { 
          minWidth: '400px'
        },
        "& .RaDatagrid-rowCell": {
          textAlign: "center"
        }
      }}>
      <TextField source="id" label="ID" sortable={false} />
      <TitleField source="title" label="TÍTULO" sortable={false} />
      <ImageCategoryField source="imageUrl" label="IMAGEN" sortable={false} />
      <DescriptionField source="description" label="DESCRIPCIÓN" sortable={false} />
      <ReferenceManyCount label="CANT. PRODUCTOS ASIGNADOS" reference="products" target="category_id" sortable={false} />
      <Actions label="ACCIONES" />
    </DatagridConfigurable>
  </List>
);
