import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Rating,
  IconButton
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { getBookings } from "../../services/bookingService";

const MyReviews = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const data = await getBookings(); // GET /bookings/user
        setBookings(data || []);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar las reseñas del usuario.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserBookings();
  }, []);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  const bookingsWithReview = bookings.filter((b) => b.review);

  if (bookingsWithReview.length === 0) {
    return (
      <Box sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          No has dejado ninguna reseña aún.
        </Typography>
        <IconButton
          color="primary"
          onClick={() => navigate("/")}
          sx={{
            border: "1px",
            padding: 2,
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "#003366"
            }
          }}
        >
          <HomeIcon fontSize="large" />
        </IconButton>
      </Box>
    );
  }

  const handleGoToProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <Box sx={{ width: "90%", margin: "0 auto", mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
        Mis Reseñas
      </Typography>

      {bookingsWithReview.map((booking) => {
        const { review, product } = booking;
        const createdAtDate = new Date(review.createdAt).toLocaleDateString();

        const productImage = product?.imageSet?.[0]?.imageUrl;

        return (
          <Card key={review.id} sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
              <CardMedia
                component="img"
                image={productImage}
                alt={product?.name}
                sx={{
                  width: "40%",
                  height: "50%",
                  maxWidth: "100%",
                  objectFit: "cover",
                  borderRadius: 2,
                  mr: 2,
                  cursor: "pointer",
                  flexShrink: 0,
                  "&:hover": {
                    opacity: 0.8
                  }
                }}
                onClick={() => handleGoToProduct(product.id)}
              />

              <CardContent sx={{ flex: 1, paddingBottom: "16px !important" }}>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 1,
                    fontWeight: "bold",
                    cursor: "pointer",
                    "&:hover": {
                      color: "#00CED1"
                    }
                  }}
                  onClick={() => handleGoToProduct(product.id)}
                >
                  {product?.name}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Rating
                    value={review.score || 0}
                    precision={1}
                    readOnly
                  />
                  <Typography variant="body2">
                    {review.score} estrellas
                  </Typography>
                </Box>

                <Typography variant="body2" sx={{ mt: 1, fontStyle: "italic" }}>
                  Fecha de la reseña: {createdAtDate}
                </Typography>

                {review.comment && (
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    {review.comment}
                  </Typography>
                )}
              </CardContent>
            </Box>
          </Card>
        );
      })}
    </Box>
  );
};

export default MyReviews;
