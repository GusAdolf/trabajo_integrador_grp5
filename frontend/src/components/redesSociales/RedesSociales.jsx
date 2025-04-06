// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LinkIcon from "@mui/icons-material/Link";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import {
  copyLink,
  shareOnFacebook,
  shareOnTwitter,
  shareOnWhatsapp,
} from "../funcionalidadRedesSociales/FuncionalidadRedesSociales";
import { useAuth } from "../../context/AuthContext";
import useFavorites from "../../hooks/useFavorites";

const RedesSociales = ({ productId }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleCopiarVinculo = () => {
    copyLink();
    handleCloseMenu();
  };

  const handleFacebook = () => {
    shareOnFacebook();
    handleCloseMenu();
  };

  const handleTwitter = () => {
    shareOnTwitter();
    handleCloseMenu();
  };

  const handleWhatsApp = () => {
    shareOnWhatsapp();
    handleCloseMenu();
  };

  const isProductFavorite = isFavorite(productId);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      {/* Botón para redes sociales con menú desplegable */}
      <Box>
        <Button
          variant="outlined"
          onClick={handleOpenMenu}
          endIcon={<ShareIcon />}
        >
          Compartir
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={handleCopiarVinculo}>
            <ListItemIcon>
              <LinkIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Copiar vínculo" />
          </MenuItem>

          <MenuItem onClick={handleFacebook}>
            <ListItemIcon>
              <FacebookIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Facebook" />
          </MenuItem>

          <MenuItem onClick={handleTwitter}>
            <ListItemIcon>
              <TwitterIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Twitter" />
          </MenuItem>

          <MenuItem onClick={handleWhatsApp}>
            <ListItemIcon>
              <WhatsAppIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="WhatsApp" />
          </MenuItem>
        </Menu>
      </Box>

      <Tooltip
        title={
          !user
            ? "Primero inicia sesión"
            : isProductFavorite
            ? "Quitar de favoritos"
            : "Agregar a favoritos"
        }
        arrow
        placement="top"
      >
        <Box
          onClick={(e) => {
            e.stopPropagation();
            if (user) toggleFavorite(productId);
          }}
        >
          {user && isProductFavorite ? (
            <Button  sx={{ background: "#1976d2", color: "white" }} endIcon={<FavoriteIcon />}>
              Guardar
            </Button>
          ) : (
            <Button variant="outlined"  endIcon={<FavoriteIcon />}>
              Guardar
            </Button>
          )}
        </Box>
      </Tooltip>
    </Box>
  );
};

export default RedesSociales;
