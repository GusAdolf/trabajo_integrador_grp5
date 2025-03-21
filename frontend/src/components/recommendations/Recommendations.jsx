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
import { useAuth } from "../../context/AuthContext";

export const Recommendations = () => {
  const { products: allProducts } = useAuth();
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    // Prepara los productos con la primera imagen o un placeholder
    const processedProducts = allProducts.map((product) => ({
      ...product,
      imageUrl:
        product.imageSet?.[0]?.imageUrl || "https://via.placeholder.com/300",
    }));

    // Mezcla al azar y toma los primeros 10
    setProducts(processedProducts.sort(() => 0.5 - Math.random()).slice(0, 10));

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, [allProducts]);

  // Ajusta cuántas tarjetas se muestran según el ancho de la pantalla
  const updateVisibleCards = () => {
    if (window.innerWidth < 600) {
      setVisibleCards(1);
    } else if (window.innerWidth < 900) {
      setVisibleCards(2);
    } else {
      setVisibleCards(3);
    }
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
          color: "#1C274C",
          mb: 3,
        }}
      >
        Las experiencias más recomendadas
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {/* Flecha anterior */}
        <IconButton onClick={prevSlide} disabled={index === 0}>
          <ArrowBackIos />
        </IconButton>

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
          {products.slice(index, index + visibleCards).map((product) => {
            // Tomamos la primera fecha de availabilitySet, si existe
            const availableDate =
              product.availabilitySet && product.availabilitySet.length > 0
                ? new Date(product.availabilitySet[0].date).toLocaleDateString(
                    "es-ES",
                    { timeZone: "UTC" }
                  )
                : "Fecha no disponible";

            // Obtenemos el objeto city
            const city = product.city;
            const cityName = city?.name || "Ubicación no especificada";
            const countryName = city?.country || "";

            return (
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
                <CardMedia
                  component="img"
                  sx={{
                    height: 220,
                    objectFit: "cover",
                    display: "block",
                  }}
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
                  {/* Título y descripción */}
                  <Box>
                    <Typography variant="h6" align="center">
                      {product.name}
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
                      {product.description.length > 30
                        ? `${product.description.slice(0, 30)}...`
                        : product.description}
                    </Typography>
                  </Box>

                  {/* Fecha disponible y rating */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 1,
                    }}
                  >
                    <Typography variant="body2">⏳ {availableDate}</Typography>
                    <Typography variant="body2">
                      ⭐ {product.rating || "N/A"}
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
                      📍 {cityName}
                      {countryName ? `, ${countryName}` : ""}
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
            );
          })}
        </Box>

        {/* Flecha siguiente */}
        <IconButton
          onClick={nextSlide}
          disabled={index >= products.length - visibleCards}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>
    </Box>
  );
};
