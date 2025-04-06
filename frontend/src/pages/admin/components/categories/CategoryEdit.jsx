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
    <DeleteButton label="Eliminar" />
  </Toolbar>
);

export const CategoryEdit = () => (
  <Edit title="Editar categoría" mutationMode='pessimistic'>
    <SimpleForm toolbar={<MyToolbar />} >
      <TextInput source="id" disabled />
      <TextInput source="title" label="Título" validate={required()} />
      <TextInput source="description" label="Descripción" validate={required()} />
      <ImageFieldWithPreview source="imageUrl" label="URL de imagen" />
    </SimpleForm>
  </Edit>
);
