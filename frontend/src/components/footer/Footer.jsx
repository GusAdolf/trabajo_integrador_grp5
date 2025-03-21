import React, { useState } from "react";
import { Box, Grid, Typography, IconButton, Dialog } from "@mui/material";
import {
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  Phone,
  Email,
  Android,
  Start,
} from "@mui/icons-material";
import RecursosPoliticas from "../recursosPoliticas/RecursosPoliticas";
import AppleIcon from "@mui/icons-material/Apple";
import AndroidIcon from "@mui/icons-material/Android";

export const Footer = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        bgcolor: "#1C274C",
        color: "white",
      }}
    >
      <Grid
        container
        spacing={4}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/*logo*/}
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <box xs={{ with: "250px" }}>
            <img
              src="/assets/logowhite.svg"
              alt="logo xplora+"
              style={{ width: "100%" }}
            />
          </box>

          <Typography
            variant="subtitle1"
            fontWeight="regular"
            mb={2}
            sx={{
              cursor: "pointer",
              "&:hover": {
                fontWeight: "bold",
                color:"#6FFDFF"
              },
            }}
          >
            Quiénes somos
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight="regular"
            mb={2}
            sx={{ cursor: "pointer", color: "white",
                "&:hover": {
                fontWeight: "bold",
                color:"#6FFDFF"
              }
             }}
            onClick={handleOpen}
          >
            Políticas generales
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight="regular"
            mb={2}
            sx={{ cursor: "pointer","&:hover": {
                fontWeight: "bold",
                color:"#6FFDFF"
              } }}
          >
            confianza y seguridad
          </Typography>
        </Grid>

        {/*trabaja con nosotros */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            mt: "30px",
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            mb={1}
            sx={{
              fontSize: "22px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Trabaja con nosotros
          </Typography>

          <box>
            <Typography
              variant="subtitle1"
              fontWeight="regular"
              mb={1}
              sx={{ cursor: "pointer","&:hover": {
                fontWeight: "bold",
                color:"#6FFDFF"
              } }}
            >
              Proveedores
            </Typography>
            <Typography
              variant="subtitle1"
              fontWeight="regular"
              mb={1}
              sx={{ cursor: "pointer", "&:hover": {
                fontWeight: "bold",
                color:"#6FFDFF"
              }}}
            >
              Afiliados
            </Typography>
            <Typography
              variant="subtitle1"
              fontWeight="regular"
              mb={1}
              sx={{ cursor: "pointer","&:hover": {
                fontWeight: "bold",
                color:"#6FFDFF"
              } }}
            >
              Agencia de tours
            </Typography>
            <Typography
              variant="subtitle1"
              fontWeight="regular"
              mb={4}
              sx={{ cursor: "pointer","&:hover": {
                fontWeight: "bold",
                color:"#6FFDFF"
              }}}
            >
              Alojamientos
            </Typography>
          </box>

          <Typography
            variant="subtitle1"
            fontWeight="bold"
            mb={1}
            sx={{
              fontSize: "22px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Síguenos
          </Typography>

          <box>
            <IconButton
              sx={{ color: "white", mx: 1,"&:hover": {
                fontWeight: "bold",
                color:"#6FFDFF"
              }}}
              href="https://facebook.com"
              target="_blank"
            >
              <Facebook fontSize="large" />
            </IconButton>
            <IconButton
              sx={{ color: "white", mx: 1, "&:hover": {
                fontWeight: "bold",
                color:"#6FFDFF"
              } }}
              href="https://instagram.com"
              target="_blank"
            >
              <Instagram fontSize="large" />
            </IconButton>
            <IconButton
              sx={{ color: "white", mx: 1,"&:hover": {
                fontWeight: "bold",
                color:"#6FFDFF"
              } }}
              href="https://linkedin.com"
              target="_blank"
            >
              <LinkedIn fontSize="large" />
            </IconButton>
            <IconButton
              sx={{ color: "white", mx: 1,"&:hover": {
                fontWeight: "bold",
                color:"#6FFDFF"
              } }}
              href="https://twitter.com"
              target="_blank"
            >
              <Twitter fontSize="large" />
            </IconButton>
          </box>
        </Grid>

        {/* contactanos */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            mb={1}
            sx={{
              fontSize: "22px",
            }}
          >
            Contáctanos
          </Typography>
          <box>
            <Box
              display="flex"
              justifyContent="start"
              alignItems="center"
              mb={1}
            >
              <Phone sx={{ mr: 2, fontSize: 30 }} />
              <Typography variant="body1">+123 456 7890</Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="start"
              alignItems="center"
              mb={2}
            >
              <Email sx={{ mr: 2, fontSize: 30 }} />
              <Typography variant="body1">contacto@empresa.com</Typography>
            </Box>
          </box>

          <Typography
            variant="subtitle1"
            fontWeight="bold"
            mb={1}
            mt={4}
            sx={{
              fontSize: "22px",
            }}
          >
            Descarga nuestra APP
          </Typography>
          <box>
            <Box
              display="flex"
              justifyContent="start"
              alignItems="center"
              mb={1}
            >
              <AppleIcon sx={{ mr: 2, fontSize: 30, }} />
              <Typography variant="body1">IOS App</Typography>
            </Box>
            <Box display="flex" justifyContent="start" alignItems="center">
              <AndroidIcon sx={{ mr: 2, fontSize: 30 }} />
              <Typography variant="body1">Android App</Typography>
            </Box>
          </box>
        </Grid>
      </Grid>

      <Box
        sx={{
          color: "white",
          textAlign: "center",
        }}
      >
        {/* Texto de derechos reservados */}
        <Typography
          variant="subtitle1"
          sx={{ mt: 4, width: "100%", backgroundColor: "#383636", py: 2 }}
        >
          © {new Date().getFullYear()} Empresa. Todos los derechos reservados.
        </Typography>
      </Box>

      {/* Modal de Recursos y Políticas */}
      <Dialog open={open} onClose={handleClose}>
        <RecursosPoliticas onClose={handleClose} />
      </Dialog>
    </Box>
  );
};
