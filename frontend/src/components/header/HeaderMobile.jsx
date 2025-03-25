// eslint-disable-next-line no-unused-vars
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import GradeIcon from "@mui/icons-material/Grade";
import HomeIcon from "@mui/icons-material/Home";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";
import LoginResponsivo from "../loginResponsivo/LoginResponsivo.jsx"; // Modal de login responsivo
import RegistrationResponsivo from "../registrationResponsivo/RegistrationResponsivo"; // Modal de registro responsivo
import "./styles.css";

const namespace = "header-mobile";

const pages = [
  { name: "Inicio", id: "home", icon: HomeIcon },
  { name: "Explora", id: "explora", icon: SearchIcon },
  { name: "Recomendaciones", id: "recomendaciones", icon: GradeIcon },
  { name: "Inicio de sesión", id: "inicio", icon: LoginIcon },
  { name: "Registro", id: "registro", icon: AppRegistrationIcon },
];

export const HeaderMobile = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegistration, setOpenRegistration] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    setIsOpenMenu(true);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    setIsOpenMenu(false);
  };

  // Funciones de ejemplo para login (puedes reemplazar con la lógica real)
  const handleLogin = (email, password) => {
    console.log("Login:", email, password);
  };

  return (
      <>
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
              backgroundColor: "#F3F4F6",
              display: { xs: "block", sm: "block", md: "none", lg: "none", xl: "none" },
            }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box sx={{ flexGrow: 1, display: "flex" }}>
                <a href="/">
                  <img src="src/assets/logo.svg" alt="logo xplora+" style={{ width: "150px", height: "auto" }} />
                </a>
              </Box>

              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton size="large" aria-label="menu" onClick={handleOpenNavMenu} color="inherit">
                  <MenuIcon sx={{ color: "black" }} />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{ vertical: "top", horizontal: "left" }}
                    keepMounted
                    transformOrigin={{ vertical: "top", horizontal: "left" }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: {
                        xs: "block",
                        md: "none",
                        "& .MuiPaper-root": {
                          backgroundColor: "#FD346E",
                          height: "100%",
                          width: "265px",
                          left: "auto !important",
                          top: "0 !important",
                          right: "0 !important",
                          borderRadius: 0,
                        },
                      },
                    }}
                >
                  <div className={`${namespace}__close-icon`} onClick={handleCloseNavMenu}>
                    <CloseIcon sx={{ color: "white" }} />
                  </div>
                  {pages.map(({ name, id, icon: Icon }) => (
                      <MenuItem
                          key={id}
                          onClick={() => {
                            handleCloseNavMenu();
                            if (id === "inicio") {
                              setOpenLogin(true);
                            } else if (id === "registro") {
                              setOpenRegistration(true);
                            }
                          }}
                          sx={{ backgroundColor: "#FD346E" }}
                      >
                        <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                          <Icon sx={{ color: "white" }} />
                          <Typography textAlign="center" sx={{ color: "white" }}>
                            {name}
                          </Typography>
                        </div>
                        <hr style={{ display: "flex", gap: "10px" }} />
                      </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        {/* Modal responsivo de inicio de sesión */}
        <LoginResponsivo open={openLogin} handleClose={() => setOpenLogin(false)} handleLogin={handleLogin} />

        {/* Modal responsivo de registro */}
        <RegistrationResponsivo open={openRegistration} setOpen={setOpenRegistration} />
      </>
  );
};