import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Pagination,
  Rating,
  InputAdornment,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:8080"; 
const PLACEHOLDER_IMAGE = "https://picsum.photos/200/300"; // Imagen de respaldo estática

export const Explore = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products`);
        const data = await response.json();

        const processedProducts = data.map((product) => ({
          ...product,
          imageUrl: product.imageSet?.[0]?.imageUrl || PLACEHOLDER_IMAGE,
        }));

        setProducts(processedProducts);
        setFilteredProducts(processedProducts);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let results = products.filter(
      (product) =>
        (selectedCategory === "Todos" || product.category === selectedCategory) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(results);
    setPage(1);
  }, [searchTerm, selectedCategory, products]);

  const categories = ["Todos", ...new Set(products.map((product) => product.category))];

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <Box sx={{ width: "100%", margin: "0 auto", mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: "wrap", gap: 2 }}>
        <Typography sx={{ fontFamily: "Outfit", fontWeight: 700, fontSize: "40px", lineHeight: "50.4px", color: "#0E2880" }}>
          Explora más
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <TextField
            variant="outlined"
            size="small"
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "#00CED1" }} />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" sx={{ bgcolor: "#00CED1", color: "white" }}>
            Buscar
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 1, overflowX: "auto", mb: 3, flexWrap: "wrap" }}>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "contained" : "outlined"}
            onClick={() => setSelectedCategory(category)}
            sx={{
              borderColor: "#00CED1",
              backgroundColor: selectedCategory === category ? "#00CED1" : "#ffffff",
              color: selectedCategory === category ? "#ffffff" : "#00CED1",
            }}
          >
            {category}
          </Button>
        ))}
      </Box>

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
        {paginatedProducts.map((product) => (
          <Box
            key={product.id}
            onClick={() => handleCardClick(product.id)}
            sx={{
              borderRadius: "16px",
              boxShadow: 3,
              overflow: "hidden",
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{ width: "100%", height: 220, objectFit: "cover" }}
              onError={(e) => { e.target.src = PLACEHOLDER_IMAGE; }}
            />
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CalendarMonthIcon sx={{ fontSize: 16, color: "gray" }} />
                  <Typography variant="body2" color="textSecondary">{product.date || "Fecha no disponible"}</Typography>
                </Box>
                <Rating value={parseFloat(product.rating) || 3.5} precision={0.1} readOnly size="small" />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>{product.name}</Typography>

              {/* ✅ Nueva línea: Muestra la categoría del producto */}
              <Typography variant="body2" color="textSecondary" sx={{ fontStyle: "italic", mt: 1 }}>
                Categoría: {product.category || "No especificada"}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                <LocationOnIcon sx={{ fontSize: 16, color: "gray" }} />
                <Typography variant="body2" color="textSecondary">{product.location}</Typography>
              </Box>
              <Typography variant="h6" fontWeight="bold" sx={{ mt: 1 }}>
                {product.price}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination count={totalPages} page={page} onChange={(_, value) => setPage(value)} />
      </Box>
    </Box>
  );
};
