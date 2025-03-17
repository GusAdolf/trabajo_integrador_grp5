import { Box, Grid, Typography, IconButton } from "@mui/material";
import { Facebook, Instagram, LinkedIn, Twitter, Phone, Email } from "@mui/icons-material";

export const Footer = () => {
    return (
        <Box 
            sx={{ 
                bgcolor: "#00CED1", 
                color: "white", 
                py: 6, 
                px: 2, 
                textAlign: "center",
                mt: 6
            }}
        >
            <Grid 
                container 
                spacing={4} 
                justifyContent="center"
                alignItems="center"
            >
                {/*Logo */}
                <Grid item xs={12} md={4} display="flex" justifyContent="center">
                    <img
                        src="src/assets/logowhite.svg"
                        alt="logo xplora+"
                        style={{ width: "350px", height: "auto" }}
                    />
                </Grid>

                {/* Redes sociales */}
                <Grid item xs={12} md={4} textAlign="center">
                    <Typography variant="subtitle1" fontWeight="bold" mb={4}>
                        SIGUENOS
                    </Typography>
                    <Box>
                        <IconButton sx={{ color: "white", mx: 1 }} href="https://facebook.com" target="_blank">
                            <Facebook fontSize="large" />
                        </IconButton>
                        <IconButton sx={{ color: "white", mx: 1 }} href="https://instagram.com" target="_blank">
                            <Instagram fontSize="large" />
                        </IconButton>
                        <IconButton sx={{ color: "white", mx: 1 }} href="https://linkedin.com" target="_blank">
                            <LinkedIn fontSize="large" />
                        </IconButton>
                        <IconButton sx={{ color: "white", mx: 1 }} href="https://twitter.com" target="_blank">
                            <Twitter fontSize="large" />
                        </IconButton>
                    </Box>
                </Grid>

                {/*Contacto */}
                <Grid item xs={12} md={4} textAlign="center">
                    <Typography variant="subtitle1" fontWeight="bold" mb={3}>
                        CONTACTANOS
                    </Typography>
                    <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                        <Phone sx={{ mr: 2, fontSize: 30 }} />
                        <Typography variant="body1">+123 456 7890</Typography>
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Email sx={{ mr: 2, fontSize: 30 }} />
                        <Typography variant="body1">contacto@empresa.com</Typography>
                    </Box>
                </Grid>
            </Grid>

            {/* Texto de derechos reservados */}
            <Typography variant="subtitle1" sx={{ mt: 4 }}>
                © {new Date().getFullYear()} Empresa. Todos los derechos reservados.
            </Typography>
        </Box>
    );
};
