import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

const pages = ["Home", "Recomendaciones", "Explora"];

export const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#F3F4F6" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src="src/assets/logo.svg"
            alt="logo xplora+"
            style={{ width: "150px", height: "auto" }}
          />

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "center" },
            }}
          >
            {pages.map((page) => (
              <Box
                key={page}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  "&:hover .line": {
                    opacity: 1,
                  },
                }}
              >
                <Button
                  onClick={handleCloseNavMenu}
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
                  {page}
                </Button>

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
            <Button
              sx={{
                color: "#A39A9A",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
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
            >
              Registrarse
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
