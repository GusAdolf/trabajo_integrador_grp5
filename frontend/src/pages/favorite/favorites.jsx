import React, { useEffect, useState } from "react";
import { getFavorites, removeFavorite } from "../../services/favoriteService";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Tooltip,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import useFavorites from "../../hooks/useFavorites";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const Favorites = () => {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFavorites = async () => {
      const data = await getFavorites(token);
      setFavorites(data);
    };
    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (favoriteId) => {
    const response = await removeFavorite(favoriteId);

    if (response) {
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav.id !== favoriteId)
      );
    }
  };

  return (
    <Box sx={{ p: 4, height: "44%" }}>
      <Typography variant="h4" gutterBottom>
        Mis Favoritos
      </Typography>

      {favorites.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          Aún no tienes productos en tu lista de favoritos 💔
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {/* Contenedor de tarjetas */}
          <Box
            sx={{
              display: "flex",
              overflow: "hidden",
              gap: 2,
              width: "100%",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            {favorites.map((product) => (
              <Card
                key={product.id}
                sx={{
                  width: { xs: "100%", sm: "48%", md: "30%" },
                  borderRadius: "16px",
                  boxShadow: 3,
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "350px",
                  flex: "0 0 auto",
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: 220,
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <Tooltip
                    title={
                      !user
                        ? "Primero inicia sesión"
                        : isFavorite(product.id)
                        ? "Quitar de favoritos"
                        : "Agregar a favoritos"
                    }
                    arrow
                    placement="top"
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        zIndex: 2,
                        backgroundColor: "white",
                        borderRadius: "50%",
                        padding: "6px",
                        boxShadow: 2,
                        opacity: user ? 1 : 0.6,
                        cursor: user ? "pointer" : "not-allowed",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (user) toggleFavorite(product.id);
                      }}
                    >
                      {user && isFavorite(product.id) ? (
                        <Favorite sx={{ color: "red" }} />
                      ) : (
                        <FavoriteBorder sx={{ color: "gray" }} />
                      )}
                    </Box>
                  </Tooltip>
                </Box>

                <CardContent
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "20px",
                  }}
                >
                  {/* Título y descripción */}
                  <Box>
                    <Typography variant="h6" align="center">
                      {product.product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      align="center"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "100%",
                      }}
                    >
                      {product.product.description.length > 30
                        ? `${product.product.description.slice(0, 30)}...`
                        : product.product.description}
                    </Typography>
                  </Box>

                  {/* Ciudad + País y precio */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 1,
                    }}
                  >
                    <Typography variant="body2">
                      📍 {product.product.city.name || "No encontrada"}
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {product.price}
                    </Typography>
                  </Box>

                  {/* Botón de reserva */}
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2, backgroundColor: "#00CED1" }}
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    Reservar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Favorites;
