// src/components/LoginResponsivo.jsx
import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useLogin from "../../hooks/useLogin";
import CancelIcon from "@mui/icons-material/Cancel";

const LoginResponsivo = ({ open, handleClose }) => {
  const {
    handleSubmit,
    email,
    handleInputChange,
    setEmail,
    password,
    setPassword,
    showPassword,
    togglePasswordVisibility,
    error,
  } = useLogin();

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "80%", sm: 400 },
          bgcolor: "white",
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "auto auto 30px"
          }}
        >
          <img
            src="assets/logo.svg"
            alt="logo xplora+"
            style={{ width: "150px", height: "auto" }}
          />
          <CancelIcon
            sx={{ color: "#00CED1" }}
            fontSize="large"
            onClick={handleClose}
          />
        </Box>

        <Typography
          variant="h6"
          textAlign="center"
          fontWeight="bold"
          gutterBottom
        >
          Inicia sesión para acceder a lo mejor de Xplora+
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Correo electrónico"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={handleInputChange(setEmail)}
          />

          <TextField
            fullWidth
            label="Contraseña"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={handleInputChange(setPassword)}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {error && (
            <Typography color="error" textAlign="center">
              {error}
            </Typography>
          )}

          <Typography
            variant="body2"
            textAlign="right"
            sx={{ color: "#00CED1", cursor: "pointer", mt: 1 }}
          >
            ¿Has olvidado tu contraseña?
          </Typography>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, backgroundColor: "#00CED1", color: "white" }}
            type="submit"
          >
            Iniciar sesión
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default LoginResponsivo;
