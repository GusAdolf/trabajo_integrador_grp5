import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  TopToolbar,
  CreateButton,
  ImageField
} from "react-admin";

import { getFeatures } from "../../../../services/featuresService";
import "./categoryStyles.css";
import { useAuth } from "../../../../context/AuthContext";
import { CustomDeleteFeature } from "../deleteButton/DeleteFeature";

const namespace = "list-features";

const CustomListActions = () => (
  <TopToolbar>
    <CreateButton
      label="Crear nueva característica"
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
  </TopToolbar>
);

export const FeaturesList = () => {
  const { features } = useAuth();
  const [ listFeatures, setListFeatures ] = useState(features)
  const [isDelete, setIsDelete] = useState(false);
  console.log("features", features)
  
  useEffect(() => {
    getFeatures().then((data) => {
      setListFeatures(data);
    });
  }, [isDelete]);

  return (
    <div className={namespace}>
      <List
        sx={{
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        title="Lista de características"
        actions={<CustomListActions />}
        bulkActionButtons={false}
        className={`${namespace}-container`}
      >
        <Box className={`${namespace}-box`}>
          <Datagrid
            className={`${namespace}-data`}
            rowClick={null}
            bulkActionButtons={false}
            data={listFeatures}
            sx={{
              "& .RaDatagrid-headerCell": {
                fontWeight: "bold",
                backgroundColor: "#00B3B3",
                color: "white",
              },
            }}
            empty={
              <div style={{ textAlign: "center", padding: "20px" }}>
                Aún no se ha registrado ninguna característica.
              </div>
            }
          >
            <TextField source="id" sx={{ width: "50px" }} />
            <TextField
              source="name"
              label="Nombre de la características"
              sx={{ width: "200px" }}
            />
            <ImageField source="iconUrl" label="Icono" />
            <Box display="flex" gap={1} label="Acciones">
              <EditButton
                label="Editar"
                sx={{
                  backgroundColor: "#00B3B3",
                  color: "white",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                  padding: "5px 20px",
                  fontWeight: "bold",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "black",
                  },
                }}
              />
              <CustomDeleteFeature setIsDelete={setIsDelete} />
            </Box>
          </Datagrid>
        </Box>
      </List>
    </div>
  );
};