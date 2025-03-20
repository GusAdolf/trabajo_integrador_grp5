import { useState, useEffect } from "react";
import { Box, Typography, IconButton, Grid, Dialog, CircularProgress } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const PLACEHOLDER_IMAGE = "https://picsum.photos/800/500?random=1";

export const Gallery = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const product = location.state?.product || null; // Obtener el producto desde `location.state`

    const [selectedImage, setSelectedImage] = useState(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (product?.imageSet?.length > 0) {
            setImages(product.imageSet.map(img => img.imageUrl));
        } else {
            setImages([PLACEHOLDER_IMAGE]); // Imagen de respaldo si no hay imágenes
        }
        setLoading(false);
    }, [product]);

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
            {/* Primera imagen con botón de cerrar */}
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

                {loading ? (
                    <Box sx={{ textAlign: "center", mt: 5 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    images.length > 0 ? (
                        <Box onClick={() => setSelectedImage(images[0])} sx={{ cursor: "pointer" }}>
                            <img 
                                src={images[0]} 
                                alt="Imagen Principal" 
                                style={{ width: "100%", height: 400, objectFit: "cover", borderRadius: "12px" }} 
                            />
                        </Box>
                    ) : (
                        <Typography variant="h6" sx={{ mt: 4 }}>No hay imágenes disponibles.</Typography>
                    )
                )}
            </Box>

            {/* Scroll Vertical con Formato 1-2-1-2 */}
            <Box sx={{ width: "100%", maxWidth: 900, display: "flex", flexDirection: "column", gap: 3, mt: 2 }}>
                {images.length > 1 && (
                    <>
                        {/* Dos imágenes pequeñas en fila */}
                        <Grid container spacing={2}>
                            {images.slice(1, 3).map((img, index) => (
                                <Grid item xs={6} key={index} onClick={() => setSelectedImage(img)} sx={{ cursor: "pointer" }}>
                                    <img 
                                        src={img} 
                                        alt={`Imagen ${index + 2}`} 
                                        style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: "12px" }} 
                                    />
                                </Grid>
                            ))}
                        </Grid>

                        {/* Imagen grande central */}
                        {images[3] && (
                            <Box onClick={() => setSelectedImage(images[3])} sx={{ cursor: "pointer" }}>
                                <img 
                                    src={images[3]} 
                                    alt="Imagen Destacada" 
                                    style={{ width: "100%", height: 400, objectFit: "cover", borderRadius: "12px" }} 
                                />
                            </Box>
                        )}

                        {/* Otra fila de dos imágenes pequeñas */}
                        <Grid container spacing={2}>
                            {images.slice(4, 6).map((img, index) => (
                                <Grid item xs={6} key={index} onClick={() => setSelectedImage(img)} sx={{ cursor: "pointer" }}>
                                    <img 
                                        src={img} 
                                        alt={`Imagen ${index + 5}`} 
                                        style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: "12px" }} 
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}
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
