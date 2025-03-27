import { Box } from "@mui/material";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { Explore } from "../../components/explore/Explore";
import Products from "../../components/products/Products";
import { getCities } from "../../services/citiesService";
import { getCategories } from "../../services/categoryService";
import { getProducts } from "../../services/productService";
import Search from "../../components/search/Search";

const dateStringToLocalDate = (dateString) => {
  if (!dateString) return new Date();
  const [yearStr, monthStr, dayStr] = dateString.split("-");
  const year = +yearStr;
  const month = +monthStr - 1;
  const day = +dayStr;

  return new Date(year, month, day);
};

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCity, setSelectedCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(["Todos"]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  const params = {
    cityId: searchParams.get("cityId"),
    from: searchParams.get("from"),
    to: searchParams.get("to"),
    people: searchParams.get("people"),
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setProductsLoading(true);
      try {
        const productsData = await getProducts();
        if (productsData && Array.isArray(productsData)) {
          setProducts(productsData);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      setCategoriesLoading(true);
      try {
        const categoriesData = await getCategories();
        if (categoriesData && Array.isArray(categoriesData)) {
          setCategories([
            "Todos",
            ...categoriesData.map((category) => category.title),
          ]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCityDetails = async () => {
      if (params.cityId) {
        setLoading(true);
        try {
          const citiesData = await getCities();
          const city = citiesData.find((c) => c.id === Number(params.cityId));
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
      endDate:
        dateStringToLocalDate(params.to) ||
        new Date(new Date().setDate(new Date().getDate() + 7)),
      key: "selection",
    },
    people: params.people ? Number(params.people) : 1,
  };

  if (loading || categoriesLoading || productsLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        Cargando...
      </Box>
    );
  }

  const filteredProducts = products
    .filter((p)=> p.city?.id === selectedCity?.id)
    .filter((p)=> p.availabilitySet?.some((ad)=> new Date(ad.date).getTime() >= new Date(params.from).getTime() && new Date(ad.date).getTime() <= new Date(params.to).getTime() && ad.remainingCapacity >= +params.people ))


  return (
    <Box sx={{ width: "80%", mx: "auto", pb: "3rem" }}>
      <Search defaultValues={defaultValues} />
      
      <Products categories={categories} products={filteredProducts} itemsPerPage={6} />
    </Box>
  );
};
