import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Card, CardContent, Rating } from "@mui/material";
import Swal from "sweetalert2";
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

  // Filtrar las reservas que tienen una reseña
  const bookingsWithReview = bookings.filter((b) => b.review);

  if (bookingsWithReview.length === 0) {
    return (
      <Box sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h6">No has dejado ninguna reseña aún.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "90%", margin: "0 auto", mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
        Mis Reseñas
      </Typography>

      {bookingsWithReview.map((booking) => {
        const { review, product } = booking;
        // Por si quieres la fecha de la reseña
        const createdAtDate = new Date(review.createdAt).toLocaleDateString();

        return (
          <Card key={review.id} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>
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
          </Card>
        );
      })}
    </Box>
  );
};

export default MyReviews;
