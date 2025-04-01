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
  useRefresh, 
} from 'react-admin';
import { useState } from "react";
import { 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
} from '@mui/material'
import { createCity } from "../../../../services/citiesService";

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
      <TextInput source={source} label={label} validate={required()} 
        onChange={handleImageUrlChange} 
      />

      {imageUrl && (
        <div style={{ 
          margin: '0px 0px 20px 0px' 
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

export const ProductEdit = () => {
  return (
    <Edit title="Editar producto" mutationMode='pessimistic'>
      <TabbedForm>
        <TabbedForm.Tab label="Información">
          {/* <SimpleForm> */}

          <DateInput source="createdAt" label="Fecha creación" readOnly />
          <DateInput source="updatedAt" label="Fecha edición" readOnly />
          <TextInput source="id" readOnly />

          <TextInput source="name" label="Nombre" />
          <TextInput source="description" label="Descripción" />
          
          <NumberInput source="price" label="Precio (USD)" />
          <NumberInput source="capacity" label="Capacidad" />
          
          <TextInput source="address" label="Dirección" />
          <CityInput source="city_id" reference="cities" />

          <ReferenceInput source="category_id" reference="categories" >
            <SelectInput label="Categoría" />
          </ReferenceInput>
          
          <ArrayInput source="availabilitySet" label="Disponibilidad" >
            <SimpleFormIterator>
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

          <ReferenceArrayInput source="features_ids" reference="features" label="Características" >
            <SelectArrayInput label="Características"/>
            {/* <AutocompleteArrayInput label="code" /> */}
          </ReferenceArrayInput>
          {/* </SimpleForm> */}
        </TabbedForm.Tab>

        <TabbedForm.Tab label="Imágenes">
        {/* <SimpleForm > */}
          <ArrayInput source="imageSet" label="Imágenes" >
            <SimpleFormIterator>
              <ImageFieldWithPreview source="imageUrl" label="URL" />
              {/* <TextInput source="id" /> */}
              {/* <TextInput source="imageUrl" label="URL" />
              <ImageField 
                source="imageUrl"
              /> */}
              {/* <TextInput source="displayOrder" /> */}
            </SimpleFormIterator>
          </ArrayInput>
        {/* </SimpleForm> */}
        </TabbedForm.Tab>
      </TabbedForm>
    </Edit>
  )
};
