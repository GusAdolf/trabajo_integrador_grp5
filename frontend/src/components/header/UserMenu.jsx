import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useContext, useState } from "react";
import {
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { green } from "@mui/material/colors";
import { EventAvailable } from "@mui/icons-material";
import RateReviewIcon from "@mui/icons-material/RateReview"; // Nuevo icono para reseñas

export default function UserMenu() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Navegaciones existentes
  const navigateToProfile = () => {
    navigate("/profile");
    handleClose();
  };
  const navigateToAdmin = () => {
    navigate("/admin");
    handleClose();
  };
  const navigateToFavorites = () => {
    navigate("/favorites");
    handleClose();
  };
  const navigateToBooking = () => {
    navigate("/booking");
    handleClose();
  };

  // Nueva navegación: Mis Reseñas
  const navigateToMyReviews = () => {
    navigate("/my-reviews");
    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          p: "0px",
          mr: "25px",
        }}
      >
        <ExpandMoreIcon
          sx={{
            color: "#B7B7B7",
          }}
          fontSize="medium"
        />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{
          mt: "15px",
        }}
      >
        <MenuItem onClick={navigateToProfile}>
          <ListItemIcon>
            <PersonIcon
              sx={{
                color: "#FD346E",
              }}
            />
          </ListItemIcon>
          Perfil
        </MenuItem>

        <MenuItem onClick={navigateToFavorites}>
          <ListItemIcon>
            <FavoriteIcon
              sx={{
                color: "#FD346E",
              }}
            />
          </ListItemIcon>
          Favoritos
        </MenuItem>

        <MenuItem onClick={navigateToBooking}>
          <ListItemIcon>
            <EventAvailable
              sx={{
                color: "#FD346E",
              }}
            />
          </ListItemIcon>
          Reservas
        </MenuItem>

        {/* NUEVO: acceso a “Mis Reseñas” */}
        <MenuItem onClick={navigateToMyReviews}>
          <ListItemIcon>
            <RateReviewIcon
              sx={{
                color: "#FD346E",
              }}
            />
          </ListItemIcon>
          Mis Reseñas
        </MenuItem>

        {/* Si es Admin, mostrar Admin Panel */}
        {user.isAdmin && (
          <>
            <Divider />
            <MenuItem onClick={navigateToAdmin}>
              <ListItemIcon>
                <AdminPanelSettingsIcon
                  sx={{
                    color: green[500],
                  }}
                />
              </ListItemIcon>
              Administración
            </MenuItem>
          </>
        )}
      </Menu>
    </div>
  );
}
