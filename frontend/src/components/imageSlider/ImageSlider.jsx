import { Box, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const images = [
  "https://cdn.sanity.io/images/esqfj3od/production/7a7aa6676241761c308dde292b09825be25e6328-2132x1200.webp",
  "https://www.peru.travel/Contenido/Noticia/Imagen/es/1973/1.0/Principal/gastronomia-desktop.jpg",
  "https://www.discoverhongkong.com/content/dam/dhk/intl/explore/attractions/the-ultimate-guide-to-hong-kong-disneyland/momentous-nighttime-spectacular-at-hong-kong-disneyland-1920x1080.jpg",
  "https://checkyeti.imgix.net/images/prod/products/14209/off-piste-skiing-tour-mont-blanc-discovery-esf-chamonix-hero.jpg",
  "https://as2.ftcdn.net/v2/jpg/08/12/17/47/1000_F_812174715_3ivZyMrO2GDV6OCPyZc0wqMTKEP4mDG5.jpg",
  "https://www.discoverhongkong.com/content/dam/dhk/intl/explore/attractions/the-ultimate-guide-to-hong-kong-disneyland/celebrate-sparkling-spectaculars-1920x1080.jpg",
];

export const ImageSlider = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    appendDots: dots => (
      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ul style={{ margin: "0px", padding: "0px", display: "flex" }}> {dots} </ul>
      </Box>
    ),
    customPaging: i => (
      <Box
        sx={{
          width: 12,
          height: 12,
          backgroundColor: "white",
          borderRadius: "50%",
          opacity: 0.7,
          transition: "opacity 0.3s",
          "&:hover": { opacity: 1 }
        }}
      />
    )
  };

  return (
    <Box sx={{ 
      position: "relative", 
      width: "90%", 
      margin: "auto", 
      overflow: "hidden",
      mt: 2, 
      mb: 4
    }}>
      <Slider {...settings}>
        {images.map((src, index) => (
          <Box key={index} sx={{ position: "relative" }}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              style={{ 
                width: "100%", 
                height: "520px",
                borderRadius: 10, 
                objectFit: "cover" 
              }}
            />
            <Typography
              variant="h5"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                padding: "10px 20px",
                borderRadius: "8px",
                width: "80%"
              }}
            >
              Más aventura, más sabor, más momentos inolvidables
            </Typography>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};
