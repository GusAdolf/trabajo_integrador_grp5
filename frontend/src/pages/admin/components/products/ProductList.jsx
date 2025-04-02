import { 
  DateField, 
  List, 
  NumberField, 
  TextField,
  EditButton,
  DeleteWithConfirmButton, 
  useRecordContext, 
  Button, 
  WithRecord,
  ReferenceInput, 
  SelectInput, 
  DatagridConfigurable, 
  TopToolbar, 
  SelectColumnsButton, 
  CreateButton,
  SimpleForm, 
  ReferenceArrayField, 
  ReferenceField, 
} from 'react-admin';
import { 
  Box, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  Grid,
} from '@mui/material';
import { assignCategory } from '../../../../services/productService';
import { useState } from 'react';

const AvailabilityField = ({ source }) => {
  const record = useRecordContext();
  if (!record || !record[source]) return null;

  return (
    <Box display="flex" flexWrap="wrap" gap={0.5} >
      {record[source].map((availability, index) => {
        const dateFormatted = new Date(availability.date).toLocaleDateString("es-ES", {
          timeZone: "UTC",
        });

        return (
          <Box key={index} component="span"
            sx={{
              backgroundColor: "#e0f7fa",
              padding: "2px 6px",
              borderRadius: "3px",
              fontSize: "0.75rem",
              whiteSpace: "nowrap",
            }}
          >
            {dateFormatted} ({availability.remainingCapacity})
          </Box>
        );
      })}
    </Box>
  );
};

const EditableCategoryField = ({ source, reference }) => {
  const record = useRecordContext();
  if (!record) return null; 
  
  const handleChange = async (event) => {
    const newCategoryId = event.target.value;
    
    const ok = await assignCategory(record.id, newCategoryId);
    if (!ok) {
      console.error("Error al actualizar la categoría");
    }
    // renderizar updatedAt
  };

  return (
    <SimpleForm toolbar={false} >
      <ReferenceInput source={source} reference={reference} record={record} >
        <SelectInput optionText="title" label={false} onChange={handleChange} />
      </ReferenceInput>
    </SimpleForm>
  );
};

const Actions = ({ label }) => {
  return (
    <Box display="flex" gap={1} label={label} >
      <EditButton label={false}
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
      />
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
  );
};

const ListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    {/* <FilterButton /> */}
    <CreateButton label="Añadir producto"/>
  </TopToolbar>
);

const ImageModal = ({ open, onClose, selectProduct, images, selectedImage, handleThumbnailClick }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth={true} >
      <DialogTitle sx={{ textAlign: 'center' }} >{selectProduct}</DialogTitle>
      <DialogContent >
        <Grid container spacing={2} >
          <Grid item xs={10} 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              maxHeight: '80vh' 
              }}
            >
            <img
              src={selectedImage}
              alt="Imagen Grande"
              style={{ 
                maxWidth: '100%', 
                maxHeight: '100%', 
                borderRadius: '8px', 
                objectFit: 'contain', 
              }}
            />
          </Grid>

          <Grid item xs={2} 
            sx={{
              maxHeight: '80vh',
              overflowY: 'auto',
            }}
          >
            <Grid container direction="column" spacing={0}>
              {images.map((image, index) => (
                <Grid item key={index}>
                  <Box
                    sx={{
                      width: '100%',
                      cursor: 'pointer',
                      borderRadius: '8px',
                      overflow: 'hidden',
                    }}
                    onClick={() => handleThumbnailClick(image)}
                  >
                    <img
                      src={image}
                      alt={`Miniatura ${index + 1}`}
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'contain',
                        borderRadius: '8px',
                        filter: selectedImage === image ? 'brightness(50%)' : 'none',
                        transition: 'border 0.3s ease',
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

/* const productFilters = [
  <SearchInput source="q" alwaysOn />,
  <TextInput label="Name" source="name" />,
]; */

export const ProductList = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectProduct, setSelectedProduct] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');

  const handleOpenModal = (name, images) => {
    const imagesUrls = images.map(image => image.imageUrl)
    setSelectedProduct(name)
    setSelectedImages(imagesUrls);
    setSelectedImage(imagesUrls[0]);
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <>
      <List title="Productos" actions={<ListActions />} /* filters={productFilters} */
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          paddingTop: "40px",
        }}
      >
        <DatagridConfigurable rowClick={false} bulkActionButtons={false} 
          empty={
            <div style={{ 
                textAlign: "center", 
                padding: "20px" 
              }}
            >
              Aún no se ha registrado ningún producto.
            </div>
          }
        >
          <TextField source="id" label="Id" />
          <DateField source="createdAt" label="Fecha creación" showTime />
          <DateField source="updatedAt" label="Fecha edición" showTime />

          <TextField source="name" label="Nombre" />
          <TextField source="description" label="Descripción" />

          <WithRecord label="Imágenes" 
            render={record => {
              return (
                <>
                  <Box 
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      key={record.imageSet[0].id|| 0}
                      src={record.imageSet[0].imageUrl}
                      alt={`Imagen 1`}
                      style={{
                        width: "200px",
                        height: "130px",
                        objectFit: "cover",
                        borderRadius: "7px 7px 0px 0px",
                      }}
                    />
                    <Button label="Ver más"
                      onClick={() => handleOpenModal(record.name, record.imageSet)}
                      sx={{
                        backgroundColor: "#000000",
                        color: "#ffffff",
                        width: "200px",
                        borderRadius: "0px 0px 7px 7px",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                        padding: "5px 20px",
                        fontWeight: "bold",
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "#444444",
                        },
                      }}
                    />
                  </Box>
                </>
              )
            }}
          />

          <NumberField source="price" label="Precio" 
            options={{ 
              style: "currency", 
              currency: "USD" 
            }}
          />

          <TextField source="address" label="Dirección" />
          <ReferenceField source="city_id" reference="cities" label="Ciudad" >
            <TextField source="name" />
          </ReferenceField>
          <ReferenceField source="city_id" reference="cities" label="País" >
            <TextField source="country" />
          </ReferenceField>

          <NumberField source="capacity" label="Capacidad" />
          <AvailabilityField source="availabilitySet" label="Disponibilidad (Cupo)" />
          
          <EditableCategoryField source="category_id" reference="categories" label="Categoría" />
          <ReferenceArrayField source="features_ids" reference="features" label="Características" />
            
          <NumberField source="countScores" label="Cantidad de puntuaciones" />
          <NumberField source="averageScore" label="Puntuación promedio" />

          <Actions label="Acciones" />
        </DatagridConfigurable>

        <ImageModal 
          open={openModal} 
          onClose={handleCloseModal} 
          selectProduct={selectProduct}
          images={selectedImages} 
          selectedImage={selectedImage} 
          handleThumbnailClick={handleThumbnailClick} 
        />
      </List>
    </>
  )
};
