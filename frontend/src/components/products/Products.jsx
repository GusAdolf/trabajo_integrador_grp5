import { useState, useEffect } from "react";
import { Box, Button, Typography, Rating, Pagination, Tooltip } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";
import { getFavorites, addFavorite, removeFavorite } from "../../services/favoriteService";
import { useAuth } from "../../context/AuthContext";

const Products = ({ categories, products, itemsPerPage = 6 }) => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    let filtered = products.filter(
      (product) =>
        selectedCategory === "Todos" ||
        (product.category && product.category.title === selectedCategory)
    );
    setFilteredProducts(filtered);
    setPage(1);
  }, [selectedCategory, products]);

  const fetchFavorites = async () => {
    if (!user) return;
    
    try {
      const favorites = await getFavorites();
      setFavorites(favorites);
    } catch (error) {
      console.error("Error al obtener favoritos:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);


  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  const toggleFavorite = async (productId) => {
    if (!user) return;

    try {
      const favorite = favorites.find((fav) => fav.product.id === productId);
      if (favorite) {
        await removeFavorite(favorite.id);
      } else {
        await addFavorite(productId);
      }
      fetchFavorites()
    } catch (error) {
      console.error("Error al modificar favorito:", error);
    }
  };
  
  const isFavorite = (productId) => favorites.some(fav => fav.product.id === productId);
  
  const getImageUrl = (product) => {
    if (product.imageSet && product.imageSet.length > 0) {
      return product.imageSet[0].imageUrl;
    }
    return "https://picsum.photos/300/200";
  };

  const formatDate = (product) => {
    if (product.availabilitySet && product.availabilitySet.length > 0) {
      const date = new Date(product.availabilitySet[0].date);
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    return "Disponible";
  };

  const formatLocation = (product) => {
    if (product.city) {
      return `${product.city.name}, ${product.city.country}`;
    }
    return "Ubicación no especificada";
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          overflowX: "auto",
          mb: 3,
          flexWrap: "wrap",
        }}
      >
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "contained" : "outlined"}
            onClick={() => setSelectedCategory(category)}
            sx={{
              borderColor: "#00CED1",
              backgroundColor:
                selectedCategory === category ? "#00CED1" : "#ffffff",
              color: selectedCategory === category ? "#ffffff" : "#00CED1",
            }}
          >
            {category}
          </Button>
        ))}
      </Box>

      {filteredProducts.length === 0 ? (
        <Box 
          sx={{ 
            textAlign: "center", 
            py: 5, 
            bgcolor: "#f5f5f5", 
            borderRadius: 2,
            mt: 2
          }}
        >
          <Typography variant="h5" color="textSecondary">
            No se encontraron resultados
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
            Intenta cambiar los filtros o revisa más tarde
          </Typography>
        </Box>
      ) : (
        <>
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
            {filteredProducts
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((product) => (
                <Box
                  key={product.id}
                  onClick={() => handleCardClick(product.id)}
                  sx={{
                    position: "relative",
                    borderRadius: "16px",
                    boxShadow: 3,
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "transform 0.2s",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                >
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
                  <img
                    src={getImageUrl(product)}
                    alt={product.name}
                    style={{ width: "100%", height: 220, objectFit: "cover" }}
                  />
                  <Box sx={{ p: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CalendarMonthIcon sx={{ fontSize: 16, color: "gray" }} />
                        <Typography variant="body2" color="textSecondary">
                          {formatDate(product)}
                        </Typography>
                      </Box>
                      <Rating
                        value={product.averageScore || 0}
                        precision={0.1}
                        readOnly
                        size="small"
                      />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {product.name}
                    </Typography>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
                    >
                      <LocationOnIcon sx={{ fontSize: 16, color: "gray" }} />
                      <Typography variant="body2" color="textSecondary">
                        {formatLocation(product)}
                      </Typography>
                    </Box>
                    <Typography variant="h6" fontWeight="bold" sx={{ mt: 1 }}>
                      ${product.price}
                    </Typography>
                  </Box>
                </Box>
              ))}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Pagination
              count={Math.ceil(filteredProducts.length / itemsPerPage)}
              page={page}
              onChange={(_, value) => setPage(value)}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Products;
