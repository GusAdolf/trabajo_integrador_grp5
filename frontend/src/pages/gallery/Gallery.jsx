import { useState } from "react";
import { Box, Typography, IconButton, Grid, Dialog } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const dummyImages = [
    "https://picsum.photos/800/500?random=1",
    "https://picsum.photos/800/500?random=2",
    "https://picsum.photos/800/500?random=3", 
    "https://picsum.photos/800/500?random=4",
    "https://picsum.photos/800/500?random=5",
    "https://picsum.photos/800/500?random=6"
];

export const Gallery = () => {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null); // Estado para la imagen ampliada

    return (
        <Box 
            sx={{ 
                width: "100%", 
                minHeight: "100vh", 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                overflowY: "auto", 
                p: 2,
                scrollBehavior: "smooth",
                overscrollBehavior: "contain"
            }}
        >
            {/* Primera imagen con botón de cerrar en la esquina superior derecha */}
            <Box sx={{ position: "relative", width: "100%", maxWidth: 900 }}>
                <IconButton 
                    onClick={() => navigate(-1)}
                    sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        color: "white",
                        zIndex: 10,
                        "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" }
                    }}
                >
                    <CloseIcon sx={{ fontSize: 30 }} />
                </IconButton>

                <Box onClick={() => setSelectedImage(dummyImages[0])} sx={{ cursor: "pointer" }}>
                    <img 
                        src={dummyImages[0]} 
                        alt="Imagen 1" 
                        style={{ width: "100%", height: 400, objectFit: "cover", borderRadius: "12px" }} 
                    />
                </Box>
            </Box>

            {/* Scroll Vertical con Formato 1-2-1-2 */}
            <Box sx={{ width: "100%", maxWidth: 900, display: "flex", flexDirection: "column", gap: 3, mt: 2 }}>
                
                {/* Dos imágenes pequeñas en fila */}
                <Grid container spacing={2}>
                    <Grid item xs={6} onClick={() => setSelectedImage(dummyImages[1])} sx={{ cursor: "pointer" }}>
                        <img 
                            src={dummyImages[1]} 
                            alt="Imagen 2" 
                            style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: "12px" }} 
                        />
                    </Grid>
                    <Grid item xs={6} onClick={() => setSelectedImage(dummyImages[2])} sx={{ cursor: "pointer" }}>
                        <img 
                            src={dummyImages[2]} 
                            alt="Imagen 3" 
                            style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: "12px" }} 
                        />
                    </Grid>
                </Grid>

                {/* Otra imagen grande */}
                <Box onClick={() => setSelectedImage(dummyImages[3])} sx={{ cursor: "pointer" }}>
                    <img 
                        src={dummyImages[3]} 
                        alt="Imagen 4" 
                        style={{ width: "100%", height: 400, objectFit: "cover", borderRadius: "12px" }} 
                    />
                </Box>

                {/* Otra fila de dos imágenes pequeñas */}
                <Grid container spacing={2}>
                    <Grid item xs={6} onClick={() => setSelectedImage(dummyImages[4])} sx={{ cursor: "pointer" }}>
                        <img 
                            src={dummyImages[4]} 
                            alt="Imagen 5" 
                            style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: "12px" }} 
                        />
                    </Grid>
                    <Grid item xs={6} onClick={() => setSelectedImage(dummyImages[5])} sx={{ cursor: "pointer" }}>
                        <img 
                            src={dummyImages[5]} 
                            alt="Imagen 6" 
                            style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: "12px" }} 
                        />
                    </Grid>
                </Grid>
            </Box>

            {/* Modal para vista ampliada */}
            <Dialog open={!!selectedImage} onClose={() => setSelectedImage(null)} maxWidth="md">
                <Box sx={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {/* Botón de cerrar modal */}
                    <IconButton 
                        onClick={() => setSelectedImage(null)}
                        sx={{ 
                            position: "absolute", 
                            top: 10, 
                            right: 10, 
                            backgroundColor: "rgba(0,0,0,0.5)", 
                            color: "white",
                            "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" }
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    {/* Imagen ampliada */}
                    <img 
                        src={selectedImage} 
                        alt="Vista ampliada" 
                        style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain", borderRadius: "12px" }} 
                    />
                </Box>
            </Dialog>
        </Box>
    );
};

