import React, { useEffect, useState } from "react";
import { getFavorites, removeFavorite } from "../../services/favoriteService";
import { Box, Typography, Button } from "@mui/material";


const Favorites = () => {
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
    const response = await removeFavorite( favoriteId);

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
        favorites.map((fav) => (
          <Box
            key={fav.id}
            sx={{
              border: "1px solid #ccc",
              borderRadius: 2,
              p: 2,
              mb: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>{fav.product?.name || "Producto"}</Typography>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleRemoveFavorite(fav.id)}
            >
              Eliminar
            </Button>
          </Box>
        ))
      )}
    </Box>
  );
};

export default Favorites;
