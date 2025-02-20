import { Box, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const images = [
  "https://picsum.photos/1200/500?random=1",
  "https://picsum.photos/1200/500?random=2",
  "https://picsum.photos/1200/500?random=3"
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
    <Box sx={{ position: "relative", width: "100%", overflow: "hidden" }}>
      <Slider {...settings}>
        {images.map((src, index) => (
          <Box key={index} sx={{ position: "relative" }}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              style={{ width: "100%", height: "500px", objectFit: "cover" }}
            />
            <Typography
              variant="h4"
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
                borderRadius: "8px"
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
