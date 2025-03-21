import { Edit, SimpleForm, TextInput } from 'react-admin';

export const FeatureEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" label="Nombre de la característica" />
    </SimpleForm>
  </Edit>
);
