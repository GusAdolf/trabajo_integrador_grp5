import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:8080"; // Reemplazar con la URL real del backend

export const Recommendations = () => {
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products`);
        const data = await response.json();

        const processedProducts = data.map((product) => ({
          ...product,
          imageUrl: product.imageSet?.[0]?.imageUrl || "https://via.placeholder.com/300",
        }));

        setProducts(processedProducts.sort(() => 0.5 - Math.random()).slice(0, 10));
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProducts();
    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const updateVisibleCards = () => {
    setVisibleCards(window.innerWidth < 600 ? 1 : window.innerWidth < 900 ? 2 : 3);
  };

  const nextSlide = () => {
    if (index < products.length - visibleCards) setIndex(index + 1);
  };

  const prevSlide = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <Box sx={{ mt: 4, width: "100%", margin: "0 auto", padding: "20px" }}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: "Outfit",
          fontWeight: 700,
          fontSize: { xs: "24px", sm: "30px", md: "40px" },
          textAlign: "left",
          color: "#00CED1",
          mb: 3,
        }}
      >
        Las experiencias más recomendadas
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <IconButton onClick={prevSlide} disabled={index === 0}>
          <ArrowBackIos />
        </IconButton>

        <Box sx={{ display: "flex", overflow: "hidden", gap: 2, width: "100%", justifyContent: "center", padding: "10px" }}>
          {products.slice(index, index + visibleCards).map((product) => (
            <Card
              key={product.id}
              sx={{
                flex: "1 0 auto",
                maxWidth: "100%",
                minWidth: { xs: "100%", sm: "48%", md: "30%" },
                borderRadius: "16px",
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
                minHeight: "350px",
              }}
            >
              <CardMedia
                component="img"
                sx={{ height: 220, width: "100%", objectFit: "cover" }}
                image={product.imageUrl}
                alt={product.name}
              />

              <CardContent
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "20px",
                }}
              >
                <Box>
                  <Typography variant="h6" align="center">{product.name}</Typography>
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
                    {product.description.length > 30
                      ? `${product.description.slice(0, 30)}...`
                      : product.description}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                  <Typography variant="body2">⏳ {product.available_date || "Fecha no disponible"}</Typography>
                  <Typography variant="body2">⭐ {product.rating || "N/A"}</Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                  <Typography variant="body2">📍 {product.location}</Typography>
                  <Typography variant="h6" fontWeight="bold">{product.price}</Typography>
                </Box>

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

        <IconButton onClick={nextSlide} disabled={index >= products.length - visibleCards}>
          <ArrowForwardIos />
        </IconButton>
      </Box>
    </Box>
  );
};
