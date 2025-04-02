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
} from '@mui/material'
import { createCity } from "../../../../services/citiesService";

const ImageFieldWithPreview = ({ source }) => {
  const [imageUrl, setImageUrl] = useState('');

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  return (
    <>
      <TextInput source={source} label="URL de imagen" validate={required()} onChange={handleImageUrlChange} />

      {imageUrl && (
        <div style={{ marginTop: '20px' }}>
          <h3>Vista previa:</h3>
          <img
            src={imageUrl}
            alt="Vista previa"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      )}
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
      {!openModal ?
      (<ReferenceInput source={source} reference={reference} >
        <SelectInput label="Ciudad" 
          optionText={(record) => `${record.name}, ${record.country}`} 
        />
        {/* <AutocompleteInput label="Ciudad" optionText={(record) => `${record.name} - ${record.country}`} /> */}
      </ReferenceInput>
      ): (
        console.log("no render")  
      )}
      <Button label="Añadir Ciudad" onClick={handleOpenModal} 
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
    <Create title="Crear producto" >
      <SimpleForm toolbar={<MyToolbar />}
        defaultValues={{
          imageSet: ["", "", "", "", ""],
          availabilitySet: [""],
        }}
      >
        <TextInput source="name" label="Nombre" fullWidth />
        <TextInput source="description" label="Descripción"
          multiline
          rows={3}
          fullWidth
        />

        <TextInput source="price" label="Precio" fullWidth />
        <NumberInput source="capacity" label="Capacidad Máxima (global)"
          fullWidth
          min={1}
        />

        <TextInput source="address" label="Dirección"
          multiline
          rows={2}
          fullWidth
        />
        {/* <ReferenceInput source="city_id" reference="cities" >
          <SelectInput label="Ciudad" 
            optionText={(record) => `${record.name}, ${record.country}`} 
          />
        </ReferenceInput> */}
        <CityInput source="city_id" reference="cities" />
        
        <ReferenceInput source="category_id" reference="categories" >
          <SelectInput label="Categoría" />
        </ReferenceInput>
              
        {/* Imágenes */}
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{ mb: 1 }}
        >
          Ingrese al menos 5 imágenes
        </Typography>
        <ArrayInput source="imageSet" label="" >
          {/* initialCount={5} para 5 campos por defecto, 
              aunque ya creamos 5 con defaultValues */}
          <SimpleFormIterator initialCount={5}>
            <ImageFieldWithPreview source="imageUrl" />
          </SimpleFormIterator>
        </ArrayInput>

        <Typography variant="h6" sx={{ mt: 2 }} fontWeight="bold">
          Disponibilidad
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Seleccione las fechas en las que estará disponible el
          producto. Puede agregar más con el botón “Agregar”.
        </Typography>
        <ArrayInput source="availabilitySet" label="" >
          <SimpleFormIterator>
            <DateInput label="Fecha" source="date" />
          </SimpleFormIterator>
        </ArrayInput>

        <ReferenceArrayInput source="features_ids" reference="features" label="Características" >
          <SelectArrayInput label="Características"/>
          {/* <AutocompleteArrayInput label="code" /> */}
        </ReferenceArrayInput>
        {/* <SaveButton label="Guardar" /> */}
      </SimpleForm>
    </Create>
  );
};
