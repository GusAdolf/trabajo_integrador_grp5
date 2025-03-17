import { Box } from "@mui/material";
import { useSearchParams } from "react-router";
import Search from "../../components/search/Search";
import { Explore } from "../../components/explore/Explore";
import Products from "../../components/products/Products";

const categories = ["Todos", "Aventura", "Gastronomía", "Bienestar", "Cultura"];

const dummyProducts = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Experiencia ${i + 1}`,
  description: "Una aventura única e inolvidable.",
  price: `$${(Math.random() * 100 + 50).toFixed(2)}`,
  category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1],
  image: `https://picsum.photos/300/200?random=${i + 1}`,
  date: "12 de Marzo, 2025",
  rating: (Math.random() * 2 + 3).toFixed(1),
  location: "Bogotá, Colombia",
}));

const dateStringToLocalDate = (dateString)=>{
  const [ yearStr, monthStr, dayStr] = dateString.split("-");
  const year = +yearStr;
  const month = +monthStr - 1;
  const day = +dayStr;

  return new Date(year,month,day)
}

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = {
    location: searchParams.get("location"),
    from: searchParams.get("from"),
    to: searchParams.get("to"),
    people: searchParams.get("people"),
  };  

  const defaultValues = {
    location: params.location || " ",
    dateRange: {
      startDate: dateStringToLocalDate(params.from) || new Date(),
      endDate:
      dateStringToLocalDate(params.to)  ||
        new Date(new Date().setDate(new Date().getDate() + 7)),
      key: "selection",
    },
    people: +params.people || 1,
  };
  
  return (
    <Box sx={{ width: "80%", mx: "auto", pb:"3rem" }}>
      <Search defaultValues={defaultValues} />

      <Products
        categories={categories}
        products={dummyProducts}
        itemsPerPage={6}
      />
    </Box>
  );
};
