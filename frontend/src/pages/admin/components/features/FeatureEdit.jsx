import { 
  Edit, 
  SimpleForm, 
  TextInput, 
  required, 
  useRecordContext, 
  Toolbar, 
  SaveButton, 
  DeleteButton, 
} from 'react-admin';
import { useState } from "react";
import {
  Box, 
} from '@mui/material'

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
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "30px",
      minWidth: "500px",
    }}>

{imageUrl && (
        <div >
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
          }} />
  </Toolbar>
);

export const FeatureEdit = () => {
  return (
    <Edit title="Editar característica" mutationMode='pessimistic' sx={{
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
    }} >
        
        
        <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "30px",
      minWidth: "500px",
    }}>
          <TextInput source="id" label="Id" readOnly sx={{
      width: "60px",
    }}/>
          <TextInput source="name" label="Nombre" validate={required()} />
        </Box>
        <ImageFieldWithPreview source="iconUrl" label="URL de ícono" />
      </SimpleForm>
    </Edit>
  )
};
