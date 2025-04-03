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
      flexDirection: "column",
      minWidth: "500px",
    }}>
      <TextInput 
        source={source} 
        label={label} 
        validate={required()} 
        onChange={handleImageUrlChange} 
      />

      {imageUrl && (
        <div style={{ marginTop: '20px' }}>
          <img
            src={imageUrl}
            alt="Vista previa"
            style={{ minWidth: 'auto', maxHeight: '250px' }}
          />
        </div>
      )}
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
    <SaveButton label="Guardar" />
  </Toolbar>
);

export const CategoryCreate = () => (
  <Create title="Añadir categoría" sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "15vh",
  }}>
    <SimpleForm toolbar={<MyToolbar />} sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "30px",
      minWidth: "500px",
      margin: "20px 20px 0px 20px",
    }} >
      <Box sx={{
      minWidth: "500px",
    }}>
      <TextInput source="title" label="Título" validate={required()} />
      <TextInput source="description" label="Descripción" validate={required()} multiline rows={2} />
      <ImageFieldWithPreview source="imageUrl" label="URL de imagen" />
      </Box>
    </SimpleForm>
  </Create>
);
