import { useState } from "react";
import { Box, Typography, Grid, Dialog, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <ArrowForwardIosIcon sx={{ fontSize: 40, color: "#8B1E3F" }} />, 
        prevArrow: <ArrowBackIosNewIcon sx={{ fontSize: 40, color: "#8B1E3F" }} />
    };

    return (
        <Box sx={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <Box sx={{ width: "100%", py: 2, px: 3, bgcolor: "white", position: "fixed", top: 0, left: 0, zIndex: 10, boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                <Typography variant="h6" fontWeight="bold" textAlign="center">Galería de imágenes</Typography>
                <Typography variant="body2" onClick={() => navigate(-1)} sx={{ cursor: "pointer", color: "blue", textAlign: "center" }}>← Volver</Typography>
            </Box>
            <Box sx={{ width: "80%", pt: 10 }}>
                <Slider {...settings}>
                    {dummyImages.map((image, index) => (
                        <Box key={index} sx={{ display: "flex", justifyContent: "center" }}>
                            <img src={image} alt={`Imagen ${index + 1}`} style={{ width: "100%", height: 500, objectFit: "cover", borderRadius: "8px" }} />
                        </Box>
                    ))}
                </Slider>
            </Box>
        </Box>
    );
};
