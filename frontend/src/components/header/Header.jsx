import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link } from "react-scroll";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Login from "../login/Login";
import { Avatar } from "@mui/material";
import { Registration } from "../../components";
import { useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";

const pages = [
  { name: "Home", id: "home", link: "/" },
  { name: "Recomendaciones", id: "recomendaciones" },
  { name: "Explora", id: "explora" },
];

export const Header = () => {
  const { user, login, logout } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate();

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "#Ffffff",
          boxShadow:" 0px 8px 6px -4px rgba(230,225,230,1);",
          display: {
            xs: "none",
            sm: "none",
            md: "block",
            lg: "block",
            xl: "block",
          },

        }}
      >
        <Container maxWidth="xl" sx={{ width: "90%", padding: "0 !important" }}>
          <Toolbar disableGutters>
            <a href="/">
              <img
                src="/assets/logo.svg"
                alt="logo xplora+"
                style={{ width: "150px", height: "auto" }}
              />
            </a>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex", justifyContent: "center" },
              }}
            >
              {pages.map(({ name, id, link }) => (
                <Box
                  key={id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    "&:hover .line": {
                      opacity: 1,
                    },
                  }}
                >
                  {id === "home" ? (
                    <Button
                      sx={{
                        my: 2,
                        color: "#A39A9A",
                        display: "block",
                        textAlign: "center",
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                      onClick={() => navigate(link)}
                    >
                      {name}
                    </Button>
                  ) : (
                    <Link to={id} smooth={true} duration={500}>
                      <Button
                        sx={{
                          my: 2,
                          color: "#A39A9A",
                          display: "block",
                          textAlign: "center",
                          "&:hover": {
                            backgroundColor: "transparent",
                          },
                        }}
                      >
                        {name}
                      </Button>
                    </Link>
                  )}

                  <Box
                    className="line"
                    sx={{
                      width: "53px",
                      height: "2px",
                      backgroundColor: "#FF69B4",
                      marginTop: "-20px",
                      opacity: 0,
                      transition: "opacity 0.3s",
                    }}
                  />
                </Box>
              ))}
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {user ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ bgcolor: "#00CED1", color: "white" }}>
                    {user.avatar}
                  </Avatar>
                  <UserMenu/>
                  <Button onClick={logout} sx={{ color: "#A39A9A" }}>
                    Cerrar sesión
                  </Button>
                </Box>
              ) : (
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Button
                    onClick={() => setOpenModal(true)}
                    sx={{ color: "#A39A9A" }}
                  >
                    Iniciar sesión
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#00CED1",
                      borderRadius: "10px",
                      boxShadow: "none",
                    }}
                    onClick={handleOpen}
                  >
                    Registrarse
                  </Button>
                </Box>
              )}
              <Login
                open={openModal}
                handleClose={() => setOpenModal(false)}
                handleLogin={login}
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Remove this Box that's creating extra space */}
      {/* <Box sx={{ mt: 10 }} /> */}

      <Registration open={open} setOpen={setOpen} handleOpen={handleOpen} />
    </>
  );
};


