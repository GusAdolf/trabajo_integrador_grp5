import { 
  DatagridConfigurable, 
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
  <List title="USUARIOS" actions={<ListActions />} 
    sx={{
      margin: "20px"
    }}
  >
    <DatagridConfigurable rowClick={false} bulkActionButtons={false} 
      empty={
        <div style={{ 
            textAlign: "center", 
            padding: "20px" 
          }}
        >
          No se encontraron usuarios.
        </div>
      }
      sx={{
        "& .RaDatagrid-headerCell": {
          fontWeight: "bold",
          backgroundColor: "#000000",
          color: "white",
          textAlign: "center",
          minWidth: "200px"
        },
        '& .column-id': { 
          minWidth: '100px' 
        },
        "& .RaDatagrid-rowCell": {
          textAlign: "center"
        }
      }}
    >
      
      <TextField source="id" label="ID" sortable={false} />
      <DateField source="createdAt" label="FECHA CREACIÓN" showTime sortable={false} />
      <DateField source="updatedAt" label="FECHA EDICIÓN" showTime sortable={false} />

      <TextField source="firstname" label="NOMBRE" />
      <TextField source="lastname" label="APELLIDO" />
      <EmailField source="email" label="CORREO ELECTRÓNICO" />

      <EditableRoleField label="ROL" />
    </DatagridConfigurable>
  </List>
);
