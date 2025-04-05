import { Typography } from "@mui/material";
import {
  Create,
  SimpleForm,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
  NumberInput,
  DateInput,
  ReferenceInput, 
  SelectInput,
  required,
  ReferenceArrayInput, 
  SelectArrayInput, 
  Button, 
  useNotify, 
  Toolbar, 
  SaveButton, 
} from "react-admin";
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

const ImageFieldWithPreview = ({ source }) => {
  const [imageUrl, setImageUrl] = useState('');

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  return (
    <>
      {imageUrl && (
        <div style={{ marginTop: '15px' }}>
          <img
            src={imageUrl}
            alt="Vista previa"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      )}
      <TextInput source={source} label="URL de imagen" validate={required()} onChange={handleImageUrlChange} />
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
                  validate={required()}
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
  <Toolbar>
    <SaveButton label="Guardar" />
  </Toolbar>
);

export const ProductCreate = () => {

  return (
    <Create title="Crear producto" 
    sx={{
      margin: "20px 20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <SimpleForm toolbar={<MyToolbar />} direction="row" gap={2}
        defaultValues={{
          imageSet: ["", "", "", "", ""],
          availabilitySet: [""],
        }}
      >

      <Grid sx={{
            minWidth: '55rem',
          }}>
        <TextInput source="name" label="Nombre" validate={required()} />
        <TextInput source="description" label="Descripción"
          multiline
          rows={5}
        />

        <TextInput source="address" label="Dirección"
          multiline
          rows={2}
          validate={required()}
        />
        {/* <ReferenceInput source="city_id" reference="cities" >
          <SelectInput label="Ciudad" 
            optionText={(record) => `${record.name}, ${record.country}`} 
          />
        </ReferenceInput> */}
        <CityInput source="city_id" reference="cities" />

        <Grid sx={{
          display: "flex",
          alignItems: "initial",
          justifyContent: "center",
          gap: "50px",
        }} >
          <Grid sx={{ width: "50%" }}>
        <Stack direction="row" gap={2} >
          <TextInput source="price" label="Precio (USD)" validate={required()} />
          <NumberInput source="capacity" label="Capacidad (global)"
            validate={required()}
            min={1}
          />
        </Stack>
        
        <ReferenceInput source="category_id" reference="categories" >
          <SelectInput label="Categoría" validate={required()} />
        </ReferenceInput>

        <ReferenceArrayInput source="features_ids" reference="features" label="Características" >
          <SelectArrayInput label="Características" validate={required()} />
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
        <Typography variant="subtitle1"  fontWeight="bold">
          Disponibilidad (mínimo 1)
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Fechas en las que estará disponible el
          producto.
        </Typography>
        <ArrayInput source="availabilitySet" label="" >
          <SimpleFormIterator disableReordering getItemLabel={index => `#${index + 1}`} initialCount={1} >
            <DateInput label="Fecha" source="date" validate={required()} />
          </SimpleFormIterator>
        </ArrayInput>
        </Grid>
        </Grid>
        </Grid>

        <Grid 
          sx={{
            maxHeight: '80vh',
            overflowY: 'auto',
            padding: '8px', 
            minWidth: '36rem'
          }}
        >
        <Typography variant="subtitle1"  fontWeight="bold">
          Imágenes (mínimo 5)
        </Typography>
        <ArrayInput source="imageSet" label="" >
          {/* initialCount={5} para 5 campos por defecto, 
              aunque ya creamos 5 con defaultValues */}
          <SimpleFormIterator initialCount={5} disableReordering getItemLabel={index => `#${index + 1}`} >
            <ImageFieldWithPreview source="imageUrl" />
          </SimpleFormIterator>
        </ArrayInput>
        </Grid>
      </SimpleForm>
    </Create>
  );
};
