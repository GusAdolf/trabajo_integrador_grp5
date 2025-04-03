// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import { Checkbox, FormControlLabel } from "@mui/material";
import Swal from "sweetalert2";
import { registerUser } from "../../services/productService";
import { EmailConfirmTimer } from "../emailConfirmTimer/EmailConfirmTimer";
import { ReenvioEmailRegistroExitoso } from "../ReenvioEmailRegistroExitoso/ReenvioEmailRegistroExitoso";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./styles.css";
import useRegister from "../../hooks/useRegister";

const namespace = "registration";

// Estilo responsivo: en móviles usa el 90% del ancho, y en pantallas mayores 600px
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  width: { xs: "95%", sm: "600px" },
  borderRadius: "10px",
};

export const RegistrationResponsivo = ({ open, setOpen }) => {
  const {
    handleClose,
    handleInputChange,
    registrationData,
    errors,
    showPassword,
    togglePasswordVisibility,
    checked,
    handleSubmit,
    showEmailConfirmModal,
    handleTimerEnd,
    showReenvioModal,
    setChecked,
    setShowEmailConfirmModal,
  } = useRegister(setOpen);
  return (
    <>
      {/* Modal de Registro responsivo */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="registration-mobile"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              m: 1,
            }}
          >
            <img
              src="/assets/logo-xplora.png"
              alt="logo xplora+"
              style={{ width: "150px", height: "auto" }}
            />
            <CancelIcon
              sx={{ color: "#00CED1" }}
              fontSize="large"
              onClick={handleClose}
            />
          </Box>
          <Box
            sx={{
              backgroundColor: "#00CED1",
              borderRadius: "80px 0 10px 10px",
              height: "auto",
              padding: "20px 40px",
              display: "flex",
              flexDirection: "column",
              gap: 1,
              alignItems: "center",
            }}
          >
            <div className={`${namespace}-title`}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: { xs: "25px" },
                }}
              >
                Hola, crea tu cuenta de Xplora+
              </Typography>
            </div>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 1, color: "white", fontSize: "14px" }}
            >
              Regístrate para acceder a las mejores experiencias
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                width: "100%",
              }}
            >
              <TextField
                className="textfield"
                sx={{ backgroundColor: "white", width: "100%" }}
                placeholder="Nombre"
                onChange={handleInputChange}
                name="firstname"
                autoComplete="off"
                value={registrationData.firstname}
                error={!!errors.firstname}
              />
              {errors.firstname && (
                <Typography
                  sx={{
                    color: "red",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {errors.firstname}
                </Typography>
              )}
              <TextField
                className="textfield"
                sx={{ backgroundColor: "white", width: "100%" }}
                placeholder="Apellido"
                onChange={handleInputChange}
                name="lastname"
                autoComplete="off"
                value={registrationData.lastname}
                error={!!errors.lastname}
              />
              {errors.lastname && (
                <Typography
                  sx={{
                    color: "red",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {errors.lastname}
                </Typography>
              )}
              <TextField
                className="textfield"
                sx={{ backgroundColor: "white", width: "100%" }}
                placeholder="Email"
                onChange={handleInputChange}
                name="email"
                autoComplete="off"
                value={registrationData.email}
                error={!!errors.email}
              />
              {errors.email && (
                <Typography
                  sx={{
                    color: "red",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {errors.email}
                </Typography>
              )}
              <TextField
                className="textfield"
                sx={{ backgroundColor: "white", width: "100%" }}
                placeholder="Contraseña"
                onChange={handleInputChange}
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="off"
                value={registrationData.password}
                error={!!errors.password}
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
            </Box>
            {errors.password && (
              <Typography
                sx={{
                  color: "red",
                  fontSize: "16px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {errors.password}
              </Typography>
            )}
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: "white",
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ fontSize: "12px", color: "white" }}>
                  Estoy de acuerdo con la privacidad y la política
                </Typography>
              }
              sx={{ color: "white" }}
            />
            {errors.checkbox && (
              <Typography sx={{ color: "red", fontSize: "12px" }}>
                {errors.checkbox}
              </Typography>
            )}
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#1C274C",
                borderRadius: "10px",
              }}
              onClick={handleSubmit}
            >
              Regístrate
            </Button>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography sx={{ mt: 1, color: "white", fontSize: "12px" }}>
                ¿Ya tienes una cuenta?
              </Typography>
              <Typography sx={{ mt: 1, fontSize: "12px" }}>
                Inicia Sesión
              </Typography>
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* Modal de EmailConfirmTimer */}
      <EmailConfirmTimer
        open={showEmailConfirmModal}
        onClose={() => setShowEmailConfirmModal(false)}
        onTimerEnd={handleTimerEnd}
      />

      {/* Modal de Reenvío de Email, se dispara cuando el timer llega a 0 */}
      <ReenvioEmailRegistroExitoso
        open={showReenvioModal}
        onClose={() => setShowReenvioModal(false)}
      />
    </>
  );
};

RegistrationResponsivo.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default RegistrationResponsivo;
