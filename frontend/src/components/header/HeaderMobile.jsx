import React, { useState, useContext, useCallback } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Container,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Close as CloseIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Grade as GradeIcon,
  Home as HomeIcon,
  AppRegistration as AppRegistrationIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";

import LoginResponsivo from "../loginResponsivo/LoginResponsivo.jsx";
import RegistrationResponsivo from "../registrationResponsivo/RegistrationResponsivo.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import UserMenu from "../header/UserMenu";

const menuItems = [
  { name: "Inicio", id: "home", icon: HomeIcon },
  { name: "Explora", id: "explora", icon: SearchIcon },
  { name: "Recomendaciones", id: "recomendaciones", icon: GradeIcon },
  { name: "Inicio de sesión", id: "inicio", icon: LoginIcon },
  { name: "Registro", id: "registro", icon: AppRegistrationIcon },
  { name: "Cerrar sesión", id: "logout", icon: LogoutIcon },
];

export const HeaderMobile = () => {
  const { user, logout } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null); // menú hamburguesa
  const [anchorElUser, setAnchorElUser] = useState(null); // menú usuario
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleMenuItemClick = useCallback(
    (id) => {
      handleCloseMenu();
      if (id === "inicio") return setOpenLogin(true);
      if (id === "registro") return setOpenRegister(true);
      if (id === "logout") return logout();
      window.location.href = `/${id}`;
    },
    [logout]
  );

  const filteredItems = menuItems.filter(({ id }) => {
    if (!user) return id !== "logout";
    return id !== "inicio" && id !== "registro";
  });

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "#F3F4F6",
          display: { xs: "block", sm: "block", md: "none" },
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo */}
            <Box sx={{ flexGrow: 1 }}>
              <a href="/">
                <img
                  src="assets/logo-xplora.png"
                  alt="logo xplora+"
                  style={{ width: "150px", height: "auto" }}
                />
              </a>
            </Box>

            {/* Menú usuario si está logueado */}
            {user && (
              <>
                <IconButton
                  onClick={(e) => setAnchorElUser(e.currentTarget)}
                  sx={{ p: 1 }}
                  aria-label="Opciones de usuario"
                >
                  <AccountCircleIcon sx={{ color: "black" }} />
                </IconButton>
                <UserMenu anchorEl={anchorElUser} onClose={() => setAnchorElUser(null)} />
              </>
            )}

            {/* Ícono hamburguesa */}
            <IconButton
              size="large"
              onClick={handleOpenMenu}
              sx={{ color: "black", display: { xs: "flex", md: "none" } }}
              aria-label="Abrir menú"
            >
              <MenuIcon />
            </IconButton>

            {/* Menú lateral */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              anchorOrigin={{ vertical: "top", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              sx={{
                "& .MuiPaper-root": {
                  backgroundColor: "#FD346E",
                  height: "100%",
                  width: "265px",
                  right: 0,
                  top: 0,
                  borderRadius: 0,
                  position: "fixed",
                },
              }}
            >
              <Box
                onClick={handleCloseMenu}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  p: 1,
                }}
              >
                <CloseIcon sx={{ color: "white" }} />
              </Box>

              {filteredItems.map(({ name, id, icon: Icon }) => (
                <MenuItem
                  key={id}
                  onClick={() => handleMenuItemClick(id)}
                  sx={{ backgroundColor: "#FD346E" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      color: "white",
                      width: "100%",
                    }}
                  >
                    <Icon />
                    <Typography textAlign="center">{name}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Modales de login y registro */}
      <LoginResponsivo open={openLogin} handleClose={() => setOpenLogin(false)} />
      <RegistrationResponsivo open={openRegister} setOpen={setOpenRegister} />
    </>
  );
};

export default HeaderMobile;
