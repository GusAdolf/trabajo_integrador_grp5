import { List, Datagrid, TextField, EditButton, DeleteButton } from 'react-admin';

export const FeatureList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" label="Nombre" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
