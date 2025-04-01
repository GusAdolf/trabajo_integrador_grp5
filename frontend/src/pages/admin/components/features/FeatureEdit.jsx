import { 
  Edit, 
  SimpleForm, 
  TextInput, 
  required, 
  useRecordContext,
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

export const FeatureEdit = () => {

  const handleFieldChange = (value, name) => {
    console.log(`Campo ${name} cambiado a:`, value);
  };

  return (
    <Edit title="Editar característica" mutationMode='pessimistic'>
      <SimpleForm onChange={(e) => handleFieldChange(e.target.form, 'edit')}>
        <TextInput source="id" label="Id" readOnly />
        <TextInput source="name" label="Nombre" validate={required()} />
        <ImageFieldWithPreview source="iconUrl" label="URL de ícono" />
      </SimpleForm>
    </Edit>
  )
};
