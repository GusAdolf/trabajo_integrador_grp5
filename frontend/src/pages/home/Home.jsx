import { Box, Typography } from "@mui/material";
import { ImageSlider } from "../../components/imageSlider/ImageSlider";
import { Recommendations } from "../../components/recommendations/Recommendations";
import { Explore } from "../../components/explore/Explore";
import Search from "../../components/search/Search";
import { CustomerPerks } from "../../components/customersPerks/CustomerPerks";

export const Home = () => {
  return (
    <Box id="home"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mb: 5,
      }}
    >
      <ImageSlider />
      
      <Search/>
      
      <Box id="recomendaciones" sx={{ width: '90%' }}>
        <Recommendations />
      </Box>
      <Box>
        <CustomerPerks />
      </Box>
      <Box id="explora" sx={{ width: '90%' }}>
        <Explore />
      </Box>
      
    </Box>
  );
};
