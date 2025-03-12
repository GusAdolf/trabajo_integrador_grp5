import { Create, SimpleForm, TextInput } from 'react-admin';

export const FeatureCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label="Nombre de la característica" />
    </SimpleForm>
  </Create>
);
