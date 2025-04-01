import { 
  Datagrid, 
  DateField, 
  EmailField, 
  List, 
  TextField, 
  useRecordContext, 
  TopToolbar, 
  SelectColumnsButton, 
} from 'react-admin';
import { Select, MenuItem } from "@mui/material";
import { useState } from "react";
import { updateUserRole } from "../../../../services/productService";

const EditableRoleField = () => {
  const record = useRecordContext();
  const [role, setRole] = useState(record.role);
  if (!record) return null; 
  
  const handleChange = async (event) => {
    const newRole = event.target.value;
    setRole(newRole);

    const ok = await updateUserRole(record.id, newRole);
    if (!ok) {
      setRole(record.role);
    }
    // renderizar updatedAt
  };

  return (
    <Select value={role} onChange={handleChange} >
      <MenuItem value="USER" >
        Usuario
      </MenuItem>
      <MenuItem value="ADMIN" >
        Administrador
      </MenuItem>
      <MenuItem value="SUPERADMIN" >
        Super Administrador
      </MenuItem>
    </Select>
  );
};

const ListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    {/* <FilterButton /> */}
  </TopToolbar>
);

export const UserList = () => (
  <List title="Usuarios" actions={<ListActions />} 
    sx={{
      height: "80vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0px 50px"
    }}
  >
    <Datagrid rowClick={false} bulkActionButtons={false} >
      
      <TextField source="id" label="Id" />
      <DateField source="createdAt" label="Fecha creación" showTime />
      <DateField source="updatedAt" label="Fecha edición" showTime />

      <TextField source="firstname" label="Nombre" />
      <TextField source="lastname" label="Apellido" />
      <EmailField source="email" label="Correo electrónico" />

      <EditableRoleField label="Rol" />
    </Datagrid>
  </List>
);
