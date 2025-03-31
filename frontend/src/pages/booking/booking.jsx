import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Avatar, CircularProgress } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import { getBookings } from "../../services/bookingService";

const Booking = () => {
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchBookings = async () => {
    setIsLoading(true)
    const data = await getBookings();
    if (data) {
      setBookings(data);
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchBookings()
  }, []);

  return (
    <Box sx={{ width: "87%", minHeight: "500px", margin: 'auto', display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Reservas
      </Typography>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <CircularProgress />
        </Box>
      ): (
        bookings.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 5, bgcolor: "#f5f5f5", borderRadius: 2, mt: 2 }}>
            <Typography variant="h5" color="textSecondary">
              Aún no tienes reservas
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
              Explora nuestras experiencias y reserva tu próxima aventura.
            </Typography>
          </Box>
        ) : (
          bookings.map((reservation) => (
          //   <Box key={reservation.id} sx={{ mb: 2 }}>
          //     <Typography variant="subtitle2" color="textSecondary" sx={{pb: 2}}>
          //       {reservation.reservationDate}
          //     </Typography>
          //     <Card sx={{ 
          //       display: "flex",
          //       flexDirection: "row",
          //       alignItems: "center",
          //       boxShadow: 3,
          //       borderRadius: 2,
          //       overflow: "hidden",
          //       height: 170, 
          //       width: '80%', 
          //       margin: 'auto',
          //       mb: '15px'
          //     }}
          //     >
          //       <Avatar
          //         variant="square"
          //         src={reservation.image}
          //         sx={{ width: "25%", height: "auto" }}
          //       />
          //       <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          //         <Typography variant="h6" fontWeight="bold">
          //           {reservation.productName}
          //         </Typography>
    
          //         <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
          //           <CalendarMonthIcon fontSize="small" color="#00CED1" sx={{color: "#00CED1"}}/>
          //           <Typography variant="body2" color="textSecondary">
          //             {reservation.reservationDate}
          //           </Typography>
          //         </Box>
    
          //         <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
          //           <LocationOnIcon fontSize="small" color="#00CED1" sx={{color: "#00CED1"}}/>
          //           <Typography variant="body2" color="textSecondary">
          //             {reservation.location}
          //           </Typography>
          //         </Box>
    
          //         <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
          //           <PeopleIcon fontSize="small" color="#00CED1" sx={{color: "#00CED1"}}/>
          //           <Typography variant="body2" color="textSecondary">
          //             {reservation.guests} personas
          //           </Typography>
          //         </Box>
    
          //         <Typography variant="body2" mt={2} sx={{color: "#98D685"}}>
          //           Cancelación gratuita hasta 24 horas antes
          //         </Typography>
          //       </CardContent>
    
          //       {/* Precio */}
          //       <Box sx={{ alignSelf: "flex-end", p: 1 }}>
          //         <Typography variant="h6" fontWeight="bold" sx={{color: "#FD346E"}}>
          //           {reservation.price}
          //         </Typography>
          //       </Box>
          //     </Card>
          //   </Box>
          // ))
          <Box key={reservation.id} sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="textSecondary" sx={{pb: 2}}>
              {reservation.availability.date}
            </Typography>
            <Card sx={{ 
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              boxShadow: 3,
              borderRadius: 2,
              overflow: "hidden",
              height: 170, 
              width: '80%', 
              margin: 'auto',
              mb: '15px'
            }}
            >
              <Avatar
                variant="square"
                src={reservation.product.imageSet?.[0]?.imageUrl || "https://via.placeholder.com/100"}
                sx={{ width: "25%", height: "100%", objectFit: "cover" }}
              />
              <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Typography variant="h6" fontWeight="bold">
                  {reservation.product.name}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                  <CalendarMonthIcon fontSize="small" sx={{color: "#00CED1"}}/>
                  <Typography variant="body2" color="textSecondary">
                    {reservation.availability.date}
                  </Typography>
                </Box>

                {/* Ubicación */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                  <LocationOnIcon fontSize="small" sx={{color: "#00CED1"}}/>
                  <Typography variant="body2" color="textSecondary">
                    {reservation.product.city.name}, {reservation.product.city.country}
                  </Typography>
                </Box>

                {/* Número de personas */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                  <PeopleIcon fontSize="small" sx={{color: "#00CED1"}}/>
                  <Typography variant="body2" color="textSecondary">
                    {reservation.quantity} personas
                  </Typography>
                </Box>

                <Typography variant="body2" mt={2} sx={{color: "#98D685"}}>
                  Cancelación gratuita hasta 24 horas antes
                </Typography>
              </CardContent>

              {/* Precio */}
              <Box sx={{ alignSelf: "flex-end", p: 1 }}>
                <Typography variant="h6" fontWeight="bold" sx={{color: "#FD346E"}}>
                  ${reservation.product.price}
                </Typography>
              </Box>
            </Card>
          </Box>
        ))
        )
      )}
    </Box>
  );
};

export default Booking;
