import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  DateField,
  TextField,
  EditButton,
  TextInput,
  DateInput,
  useRecordContext,
  ImageInput,
  ImageField,
} from "react-admin";
import BookIcon from "@mui/icons-material/Book";
import { Box } from "@mui/material";

export const PostIcon = BookIcon;

export const PostList = () => (
  <List
    sx={{ height: "80vh", display: "flex", alignItems: "center", width: "90%" }}
  >
    <Box>
      <Datagrid
        sx={{
          "& .RaDatagrid-headerCell": {
            fontWeight: "bold",
            backgroundColor: "#00B3B3",
            color: "white",
            padding: "12px 30px",
          },
          "& .RaDatagrid-rowCell": {
            padding: "12px",
          },
          "& .css-efpi9o-MuiTableCell-root.MuiTableCell-sizeSmall": {
            padding: "30px",
          },
        }}
      >
        <TextField source="id"sx={{ width: "50px" }}/>
        <ImageField
          source="Imagen"
          title="Imagen del Tour"
          sx={{
            "& img": {
              width: "100%",
              borderRadius: "8px",
              objectFit: "cover",
              display: "block",
              margin: "auto",
              border: "2px solid #ddd",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            },
          }}
        />
        <TextField source="Nombre" sx={{ width: "200px" }}/>
        <TextField
          source="Descripción"
          sx={{
            maxWidth: "300px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        />
        <TextField source="Precio" />
        <TextField source="Categoría" />
        <TextField source="Status" />

        <EditButton
          sx={{
            backgroundColor: "#00CED1",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            padding: "5px 20px",
            fontWeight: "bold",
            textTransform: "none",
            width: "100%",
            "&:hover": {
              backgroundColor: "#00B3B3",
            },
          }}
        />
      </Datagrid>
    </Box>
  </List>
);
