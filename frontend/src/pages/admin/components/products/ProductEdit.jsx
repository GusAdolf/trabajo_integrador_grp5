import { 
  ArrayInput, 
  DateInput, 
  Edit, 
  NumberInput, 
  SimpleForm, 
  SimpleFormIterator, 
  TextInput,
  ReferenceInput,
  ReferenceArrayInput,
  SelectArrayInput,
  SelectInput, 
  TabbedForm, 
  required, 
  useRecordContext, 
  Button, 
  useNotify, 
  Toolbar, 
  SaveButton, 
  DeleteButton
} from 'react-admin';
import { useState } from "react";
import { 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  Grid, 
  Stack, 
} from '@mui/material'
import { createCity } from "../../../../services/citiesService";
import { ProductSidebar } from "../index";

const ImageFieldWithPreview = ({ source, label }) => {
  const record = useRecordContext();
  const [imageUrl, setImageUrl] = useState(record[source]);
  console.log("ImageFieldWithPreview")

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };
  
  if (!record) {
    return null;
  }

  return (
    <>
      {imageUrl && (
        <div style={{ 
          marginTop: '15px' 
          }}
        >
          <img src={imageUrl} alt="Vista previa"
            style={{ 
              maxWidth: '100%', 
              height: 'auto' 
            }}
          />
        </div>
      )}
      <TextInput source={source} label={label} validate={required()} 
        onChange={handleImageUrlChange} 
      />
    </>
  );
};

const CreateCityModal = ({ open, onClose }) => {
  const [city, setCity] = useState({
    cityName: "",
    cityCountry: "",
  });
  const notify = useNotify();
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleAddCity = async () => {
    if (!city.cityName || !city.cityCountry) {
      notify('Por favor, completa todos los campos', 'warning');
      return;
    }

    await createCity({
      name: city.cityName,
      country: city.cityCountry, 
    });

    setCity({
      cityName: "",
      cityCountry: "",
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Añadir Ciudad</DialogTitle>
      <DialogContent>
        <SimpleForm toolbar={false} >
          <TextInput source='nameCity' label="Ciudad"
            name="cityName"
            value={city.name}
            onChange={handleChange}
            fullWidth
          />
          <TextInput source='country' label="País"
            name="cityCountry"
            value={city.country}
            onChange={handleChange}
            fullWidth
          />
        </SimpleForm>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancelar</Button>
        <Button onClick={handleAddCity} color="primary">Guardar</Button>
      </DialogActions>
    </Dialog>
  )
}

const CityInput = ({ source, reference }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <Grid container sx={{
          display: "flex",
          justifyContent: "center",
        }}>
        <Grid sx={{ width: "20%" }}>
        <Button label="Añadir Ciudad" onClick={handleOpenModal} 
          /* sx={{
            backgroundColor: "#00CED1",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            padding: "10px 10px 10px 20px",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#00B3B3",
            },
          }} */
          sx={{
            backgroundColor: "#FD346E",
            color: "#ffffff",
            width: "160px",
            height: "44px", 
            borderRadius: "22px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            padding: "5px 5px",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#ED346E",
            },
            margin: "7px 0px 0px 0px",
          }}
        />
        </Grid>
        {!openModal ?
          (
            <Grid sx={{ width: "80%" }}>
          <ReferenceInput source={source} reference={reference}>
            <SelectInput label="Ciudad" 
              optionText={(record) => `${record.name}, ${record.country}`}
            />
            {/* <AutocompleteInput label="Ciudad" optionText={(record) => `${record.name} - ${record.country}`} /> */}
          </ReferenceInput>
        </Grid>
          ) : (
            console.log("no render")  
          )
        }
      </Grid>
      <CreateCityModal 
        open={openModal}
        onClose={handleCloseModal}
      />
    </>
  );
}

const MyToolbar = () => (
  <Toolbar sx={{
    margin: "5px",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  }}>
    <SaveButton label="GUARDAR" />
    <DeleteButton label="ELIMINAR" sx={{
            backgroundColor: "#d33",
            color: "#ffffff",
            width: "130px",
            height: "36px", 
            borderRadius: "18px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            padding: "5px 5px",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#a00",
            },
          }}/>
  </Toolbar>
);

/* const Aside = () => (
  <Box sx={{ width: '200px', margin: '1em' }}>
      <Typography variant="h6">Instructions</Typography>
      <Typography variant="body2">
          Posts will only be published once an editor approves them
      </Typography>
  </Box>
); */

export const ProductEdit = () => {
  return (
    <Edit title="Editar producto" mutationMode='pessimistic' 
      sx={{
        margin: "20px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    /* aside={<ProductSidebar />} */ >
      {/* <TabbedForm toolbar={<MyToolbar />} WarnWhenUnsavedChanges >
        <TabbedForm.Tab label="Información"> */}
        <SimpleForm toolbar={<MyToolbar />} direction="row" gap={2} sx={{/* 
        height: "83vh" */
      }}>

        <Grid sx={{
            minWidth: '55rem',
          }}>
          <TextInput source="name" label="Nombre" />
          <Stack direction="row" gap={2} >
            <TextInput source="id" readOnly />
            <DateInput source="createdAt" label="Fecha creación" readOnly />
            <DateInput source="updatedAt" label="Fecha edición" readOnly />
          </Stack>
          <TextInput source="description" label="Descripción" multiline rows={5} />
          
          <TextInput source="address" label="Dirección" multiline />
          <CityInput source="city_id" reference="cities" />

        <Grid sx={{
          display: "flex",
          alignItems: "initial",
          justifyContent: "center",
          gap: "20px",
        }} >
          <Grid sx={{ width: "50%" }}>
            <Stack direction="row" gap={2} >
              <NumberInput source="price" label="Precio (USD)" />
              <NumberInput source="capacity" label="Capacidad" />
            </Stack>
            
            <ReferenceInput source="category_id" reference="categories" >
              <SelectInput label="Categoría" />
            </ReferenceInput>

            <ReferenceArrayInput source="features_ids" reference="features" label="Características" >
              <SelectArrayInput label="Características"/>
              {/* <AutocompleteArrayInput label="code" /> */}
            </ReferenceArrayInput>
          </Grid>
          
          <Grid sx={{
            width: "50%",
            maxHeight: '30vh',
            overflowY: 'auto',
            padding: '5px 0px',
          }}
          >
            <ArrayInput source="availabilitySet" label="Disponibilidad" >
              <SimpleFormIterator disableReordering getItemLabel={index => `#${index + 1}`} >
                <DateInput source="date" label="Fecha" />
                {/* <NumberInput source="remainingCapacity" label="Capacidad restante" readOnly /> */}


                {/* {record.remainingCapacity? ( */}
                  {/* ) : (
                    <NumberInput source="capacity" label="Capacidad" readOnly />
                  ) */}
                {/* } */}
                {/* <NumberInput source="remainingCapacity" /> */}
              </SimpleFormIterator>
            </ArrayInput>
          </Grid>
          </Grid>
          </Grid>
        {/* </SimpleForm> */}

        {/* </TabbedForm.Tab>

        <TabbedForm.Tab label="Imágenes"> */}
        
        <Grid 
          sx={{
            maxHeight: '80vh',
            overflowY: 'auto',
            padding: '8px', 
            minWidth: '36rem'
          }}
        >
        {/* <SimpleForm > */}
          <ArrayInput source="imageSet" label="Imágenes" > {/* El producto debe terner 5 imgs, en error poner tbn, lo mismo con disponibilidad */}
            {/* los productos se quedan pegados en home */}
            <SimpleFormIterator disableReordering getItemLabel={index => `#${index + 1}`} >
              <ImageFieldWithPreview source="imageUrl" label="URL" />
              {/* <TextInput source="id" /> */}
              {/* <TextInput source="imageUrl" label="URL" />
              <ImageField 
                source="imageUrl"
              /> */}
              {/* <TextInput source="displayOrder" /> */}
            </SimpleFormIterator>
          </ArrayInput>
        </Grid>
        </SimpleForm>
        {/* </TabbedForm.Tab>
      </TabbedForm> */}
    </Edit>
  )
};
