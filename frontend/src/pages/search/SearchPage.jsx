import { Box } from "@mui/material";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import Search from "../../components/search/Search";
import { Explore } from "../../components/explore/Explore";
import Products from "../../components/products/Products";
import { getCities } from "../../services/citiesService";

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
  if (!dateString) return new Date();
  const [ yearStr, monthStr, dayStr] = dateString.split("-");
  const year = +yearStr;
  const month = +monthStr - 1;
  const day = +dayStr;

  return new Date(year,month,day)
}

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCity, setSelectedCity] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = {
    cityId: searchParams.get("cityId"),
    from: searchParams.get("from"),
    to: searchParams.get("to"),
    people: searchParams.get("people"),
  };

  // Fetch the city details if cityId is provided
  useEffect(() => {
    const fetchCityDetails = async () => {
      if (params.cityId) {
        setLoading(true);
        try {
          const citiesData = await getCities();
          const city = citiesData.find(c => c.id === Number(params.cityId));
          if (city) {
            setSelectedCity(city);
          }
        } catch (error) {
          console.error("Error fetching city details:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchCityDetails();
  }, [params.cityId]);

  const defaultValues = {
    cityId: params.cityId ? Number(params.cityId) : null,
    selectedCity: selectedCity,
    dateRange: {
      startDate: dateStringToLocalDate(params.from),
      endDate: dateStringToLocalDate(params.to) || 
        new Date(new Date().setDate(new Date().getDate() + 7)),
      key: "selection",
    },
    people: params.people ? Number(params.people) : 1,
  };
  
  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>Cargando...</Box>;
  }

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
