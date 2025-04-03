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
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite, favorites } = useFavorites();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4, height: "auto", display: "flex", flexDirection: "column" }}>
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
            height: "100%",
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
              flexWrap: "wrap",
            }}
          >
            {favorites.map((product) => {
              const productDetail = product.product;

              return (
                <Card
                  key={productDetail.id}
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
                      src={
                        productDetail.imageSet?.[0]?.imageUrl ||
                        "https://via.placeholder.com/300"
                      }
                      alt={productDetail.name}
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
                          : isFavorite(productDetail.id)
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
                          if (user) toggleFavorite(productDetail.id);
                        }}
                      >
                        {user && isFavorite(productDetail.id) ? (
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
                        {productDetail.name}
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
                        {productDetail.description.length > 30
                          ? `${productDetail.description.slice(0, 30)}...`
                          : productDetail.description}
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
                        📍 {productDetail.city.name || "No encontrada"}
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {productDetail.price}
                      </Typography>
                    </Box>

                    {/* Botón de reserva */}
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ mt: 2, backgroundColor: "#00CED1" }}
                      onClick={() => navigate(`/product/${productDetail.id}`)}
                    >
                      Reservar
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Favorites;
