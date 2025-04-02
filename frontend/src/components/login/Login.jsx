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

// eslint-disable-next-line react/prop-types
const Login = ({ open, handleClose }) => {
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
          width: 430,
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        {}
        <Box sx={{ height: "90px" }}>
          <img
            src="assets/logo.svg"
            alt="logo xplora+"
            style={{
              width: "150px",
              height: "auto",
              position: "absolute",
              top: 10,
              left: 10,
            }}
          />
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "#00CED1",
              color: "white",
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {}
        <Typography
          variant="h5"
          textAlign="center"
          fontWeight="bold"
          gutterBottom
          sx={{ mt: 2, color: "#1C274C", fontFamily: "Outfit", fontSize: "28px", mb: 5 }}
        >
          Inicia sesión para acceder a lo mejor de Xplora+
        </Typography>

        {}
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
            sx={{ color: "#00CED1", cursor: "pointer", mt: 3,  }}
          >
            ¿Has olvidado tu contraseña?
          </Typography>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, backgroundColor: "#00CED1", color: "white", fontWeight: "bold", padding: "10px 0", "&:hover": { backgroundColor: "#45D0D2" } }}
            type="submit"
          >
            Iniciar sesión
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default Login;
