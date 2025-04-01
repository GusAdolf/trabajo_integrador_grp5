import { 
  Edit, 
  SimpleForm, 
  TextInput, 
  required, 
  useRecordContext, 
  Toolbar, 
  SaveButton, 
  DeleteButton
} from 'react-admin';
import { useState } from "react";

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
      <TextInput source={source} label={label} 
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
    <DeleteButton label="Eliminar" />
  </Toolbar>
);

export const FeatureEdit = () => {
  return (
    <Edit title="Editar característica" mutationMode='pessimistic'>
      <SimpleForm toolbar={<MyToolbar />} >
        <TextInput source="id" label="Id" readOnly />
        <TextInput source="name" label="Nombre" validate={required()} />
        <ImageFieldWithPreview source="iconUrl" label="URL de ícono" />
      </SimpleForm>
    </Edit>
  )
};
