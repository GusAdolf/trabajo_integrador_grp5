import { 
  Create, 
  SimpleForm, 
  TextInput, 
  required, 
  Toolbar, 
  SaveButton, 
} from 'react-admin';
import { useState } from "react";

const ImageFieldWithPreview = ({ source, label }) => {
  const [imageUrl, setImageUrl] = useState('');
  console.log("ImageFieldWithPreview")

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  return (
    <>
      <TextInput 
        source={source} 
        label={label} 
        validate={required()} 
        onChange={handleImageUrlChange} 
      />

      {imageUrl && (
        <div style={{ marginTop: '20px' }}>
          <h4>Vista previa:</h4>
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

const MyToolbar = () => (
  <Toolbar>
    <SaveButton label="Guardar" />
  </Toolbar>
);

export const FeatureCreate = () => (
  <Create title="Añadir característica" >
    <SimpleForm toolbar={<MyToolbar />} >
      <TextInput source="name" label="Nombre" />
      <ImageFieldWithPreview source="iconUrl" label="URL de ícono" />
    </SimpleForm>
  </Create>
);
