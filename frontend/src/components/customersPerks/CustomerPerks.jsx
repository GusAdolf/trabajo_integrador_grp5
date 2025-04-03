import { Box, Grid, Typography } from "@mui/material";
import { EmojiEvents, SupportAgent, Star, AttachMoney } from "@mui/icons-material";

export const CustomerPerks = () => {
  return (
    <Box sx={{ backgroundColor: "#fff", color: "#1C274C", paddingY: "4rem", borderRadius: 2,  mb: 3}}>
      <Typography variant="h4" align="center" gutterBottom sx={{fontFamily: "Outfit", fontWeight: "bold", paddingBottom: 4, fontSize: "40px",color: "#1C274C"}}>
         Razones para confiar en nosotros 
      </Typography>
      <Grid container spacing={4} justifyContent="center" sx={{ paddingX: 3
        
       }}>
        <Grid item xs={12} sm={6} md={3} textAlign="center">
          <Box sx={{ display: "inline-flex", justifyContent: "center", alignItems: "center", width: 80, height: 80, borderRadius: "50%", backgroundColor: "rgba(124, 232, 240, 0.1)", marginBottom:2 }}>
            <EmojiEvents fontSize="large" sx={{color:"#00ffff", fontSize:"50px"}} />
          </Box>
          <Typography variant="h6" sx={{fontWeight:"bold"}}>Las mejores actividades</Typography>
          <Typography variant="body2" sx={{color:"	#808080"}}>
            Descubre actividades únicas y emocionantes seleccionadas para ti.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3} textAlign="center">
          <Box sx={{ display: "inline-flex", justifyContent: "center", alignItems: "center", width: 80, height: 80, borderRadius: "50%", backgroundColor: "rgba(124, 232, 240, 0.1)", marginBottom:2 }}>
            <SupportAgent fontSize="large" sx={{color:"#00ffff", fontSize:"50px"}}/>
          </Box>
          <Typography variant="h6" sx={{fontWeight:"bold"}}>Atención al cliente</Typography>
          <Typography variant="body2" sx={{color:"#808080"}}>
            Nuestro equipo está disponible para ayudarte en todo momento.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3} textAlign="center">
          <Box sx={{ display: "inline-flex", justifyContent: "center", alignItems: "center", width: 80, height: 80, borderRadius: "50%", backgroundColor: "rgba(124, 232, 240, 0.1)", marginBottom:2 }}>
            <Star fontSize="large" sx={{color:"#00ffff", fontSize:"50px"}}/>
          </Box>
          <Typography variant="h6"sx={{fontWeight:"bold"}}>Millones de opiniones</Typography>
          <Typography variant="body2" sx={{color:"#808080"}}>
            Confía en las experiencias de millones de usuarios satisfechos.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3} textAlign="center">
          <Box sx={{ display: "inline-flex", justifyContent: "center", alignItems: "center", width: 80, height: 80, borderRadius: "50%", backgroundColor: "rgba(124, 232, 240, 0.1)",marginBottom:2 }}>
            <AttachMoney fontSize="large" sx={{color:"#00ffff", fontSize:"50px"}}/>
          </Box>
          <Typography variant="h6" sx={{fontWeight:"bold"}}>Precios finales</Typography>
          <Typography variant="body2"sx={{color:"#808080"}}>
            Sin costos ocultos, siempre sabrás lo que estás pagando.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};