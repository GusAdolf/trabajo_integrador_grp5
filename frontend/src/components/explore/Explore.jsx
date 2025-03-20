import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Pagination,
  InputAdornment,
  Chip,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const Explore = () => {
  const { products, categories: allCategories } = useAuth();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    let results = products.filter(
      (product) =>
        (selectedCategory === "Todos" ||
          product.category?.title === selectedCategory) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(results);
    setPage(1);
  }, [searchTerm, selectedCategory, products]);

  const categories = [
    "Todos",
    ...new Set(allCategories.map((category) => category?.title)),
  ];

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <Box sx={{ width: "100%", margin: "0 auto", mt: 4, px: 2 }}>
      {/* Barra de búsqueda y título */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography
          sx={{
            fontFamily: "Outfit",
            fontWeight: 700,
            fontSize: "40px",
            lineHeight: "50.4px",
            color: "#0E2880",
          }}
        >
          Explora más
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Buscar producto..."
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "#00CED1" }} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            sx={{
              bgcolor: "#00CED1",
              color: "white",
              ":hover": { bgcolor: "#00b3b3" },
            }}
          >
            Buscar
          </Button>
        </Box>
      </Box>

      {/* Categorías */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          overflowX: "auto",
          mb: 3,
          flexWrap: "wrap",
        }}
      >
        {categories?.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "contained" : "outlined"}
            onClick={() => setSelectedCategory(category)}
            sx={{
              borderColor: "#00CED1",
              backgroundColor:
                selectedCategory === category ? "#00CED1" : "#ffffff",
              color: selectedCategory === category ? "#ffffff" : "#00CED1",
              ":hover": {
                backgroundColor:
                  selectedCategory === category ? "#00B3B3" : "#f0f0f0",
                borderColor: "#00CED1",
              },
            }}
          >
            {category}
          </Button>
        ))}
      </Box>

      {/* Lista de productos paginados */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
        }}
      >
        {paginatedProducts?.map((product) => {
          const formattedDate =
            product.availabilitySet?.length > 0
              ? new Date(product.availabilitySet[0].date).toLocaleDateString(
                  "es-ES",
                  {
                    timeZone: "UTC",
                  }
                )
              : "No disponible";

          return (
            <Box
              key={product.id}
              onClick={() => handleCardClick(product.id)}
              sx={{
                backgroundColor: "white",
                borderRadius: "16px",
                boxShadow: 3,
                overflow: "hidden",
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.02)" },
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Imagen con Overlay de Categoría */}
              <Box sx={{ position: "relative" }}>
                <img
                  src={product.imageSet?.[0]?.imageUrl}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: 220,
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                {product.category?.title && (
                  <Chip
                    label={product.category.title}
                    sx={{
                      position: "absolute",
                      top: 8,
                      left: 8,
                      backgroundColor: "rgba(0,0,0,0.6)",
                      color: "#ffffff",
                      fontWeight: "bold",
                    }}
                  />
                )}
              </Box>

              {/* Contenido de la tarjeta */}
              <Box sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {product.name}
                </Typography>

                {/* Disponibilidad */}
                <Box sx={{ display: "flex", alignItems: "center", mt: 1, gap: 1 }}>
                  <CalendarMonthIcon sx={{ fontSize: "18px", color: "#00CED1" }} />
                  <Typography variant="body2">
                    {formattedDate || "No disponible"}
                  </Typography>
                </Box>

                {/* Ubicación */}
                <Box sx={{ display: "flex", alignItems: "center", mt: 1, gap: 1 }}>
                  <LocationOnIcon sx={{ fontSize: "18px", color: "#00CED1" }} />
                  <Typography variant="body2">
                    {product.city?.name || "Ubicación no especificada"},{" "}
                    {product.city?.country || ""}
                  </Typography>
                </Box>

                {/* Precio */}
                <Typography
                  variant="h6"
                  sx={{
                    mt: "auto", // empuja el precio a la parte de abajo del contenedor
                    fontWeight: "bold",
                    color: "#00CED1",
                  }}
                >
                  ${product.price}
                </Typography>

                <Button
                                variant="contained"
                                fullWidth
                                sx={{ mt: 2, backgroundColor: "#00CED1" }}
                                onClick={() => navigate(`/product/${product.id}`)}
                              >
                                Reservar
                              </Button>
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Paginación */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
        />
      </Box>
    </Box>
  );
};
