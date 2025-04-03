import { 
  Create, 
  SimpleForm, 
  TextInput, 
  required, 
  Toolbar, 
  SaveButton, 
} from 'react-admin';
import { useState } from "react";
import {
  Box, 
} from '@mui/material'

const ImageFieldWithPreview = ({ source, label }) => {
  const [imageUrl, setImageUrl] = useState('');
  console.log("ImageFieldWithPreview")

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  return (
    <>
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "30px",
      minWidth: "500px",
    }}>
      {imageUrl && (
        <div>
          <img
            src={imageUrl}
            alt="Vista previa"
            style={{ maxHeight: '35px', maWidth: '35px', margin: "0px 0px 10px 10px"}}
          />
        </div>
      )}

      <TextInput source={source} label={label} 
        validate={required()} 
        onChange={handleImageUrlChange} 
      />
      </Box>
    </>
  );
};

const MyToolbar = () => (
  <Toolbar sx={{
    margin: "5px",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  }}>
    <SaveButton label="GUARDAR" />
  </Toolbar>
);

export const FeatureCreate = () => (
  <Create title="Añadir característica" sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "30vh",
  }}>
    <SimpleForm toolbar={<MyToolbar />} sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "30px",
      minWidth: "500px",
      margin: "20px 20px 0px 20px",
    }}>
      <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "30px",
      minWidth: "500px",
    }}>
      <TextInput source="name" label="Nombre" />
      </Box>
      <ImageFieldWithPreview source="iconUrl" label="URL de ícono" />
    </SimpleForm>
  </Create>
);
