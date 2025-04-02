import {
  Admin,
  Resource,
  Menu,
  Layout,
  houseLightTheme, 
  houseDarkTheme 
} from "react-admin";
import { useState, useEffect } from "react";
/* import fakeDataProvider from "ra-data-fakerest"; */
import {
  ProductList,
  ProductCreate, 
  ProductEdit, 
  UserList, 
  CategoryList, 
  CategoryCreate, 
  CategoryEdit, 
  FeatureList, 
  FeatureCreate, 
  FeatureEdit, 
} from "./components/index";
/* import LabelIcon from "@mui/icons-material/Label";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded"; */
import AutoAwesomeMotionRoundedIcon from "@mui/icons-material/AutoAwesomeMotionRounded";
import { createProduct, getProduct, getProducts, updateProduct, deleteProduct } from "../../services/productService";
import { getCities } from "../../services/citiesService";
/* import jsonServerProvider from "ra-data-json-server"; */
import GroupIcon from "@mui/icons-material/Group";
/* import CategoryIcon from "@mui/icons-material/Category"; */
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
/* import AddHomeIcon from "@mui/icons-material/AddHome"; */
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home"; // <--- 1) Importar HomeIcon
import ListAltIcon from "@mui/icons-material/ListAlt";
/* import PostAddIcon from "@mui/icons-material/PostAdd"; */
import "./styles.css";
import { useAuth } from "../../context/AuthContext";
import { getCategories, getProductsByCategory, createCategory, deleteCategory } from "../../services/categoryService";
import { getFeatures, createFeature, updateFeature, deleteFeature } from "../../services/featuresService";
import { getUsers } from "../../services/productService";
/* import {
  Header,
} from "../../components/header/Header"; */
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getReviewsByProduct } from "../../services/reviewService";

const FRONT_URL = import.meta.env.VITE_FRONT_DOMAIN || "http://localhost:5173";

const dataProvider = {
  getList: async (resource, params) => {
    if (resource === "products") {
      console.log("getList products")
      const response = await getProducts();
      const products = response.map(product => ({ 
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        capacity: product.capacity,
        averageScore: product.averageScore,
        countScores: product.countScores,
        address: product.address,
        city_id: product.city.id,
        category_id: product.category.id,
        availabilitySet: product.availabilitySet.map((availability) => ({
          date: availability.date, 
          remainingCapacity: availability.remainingCapacity, 
        })),
        imageSet: product.imageSet.map((image) => ({
          imageUrl: image.imageUrl,
        })),
        features_ids: product.features.map((feature) => (feature.id)),
      }));
      return {
        data: products,
        total: products.length,
      }
    } else if (resource === "cities") {
      console.log("getList cities")
      const response = await getCities();
      return {
        data: response,
        total: response.length,
      }
    } else if (resource === "users") {
      console.log("getList users")
      const response = await getUsers();
      return {
        data: response,
        total: response.length,
      }
    } else if (resource === "categories") {
      console.log("getList categories")
      const response = await getCategories();
      return {
        data: response,
        total: response.length,
      }
    } else if (resource === "features") {
      console.log("getList features")
      const response = await getFeatures();
      return {
        data: response,
        total: response.length,
      }
    } else {
      console.log("getList")
      return { data: [], total: 1 }
    }
  },

  getOne: async (resource, params) => {
    if (resource === "products") {
      console.log("getOne product")
      const response = await getProduct(params.id);
      const product = {
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
        id: response.id,
        name: response.name,
        description: response.description,
        price: response.price,
        capacity: response.capacity,
        averageScore: response.averageScore,
        countScores: response.countScores,
        address: response.address,
        city_id: response.city.id,
        category_id: response.category.id,
        availabilitySet: response.availabilitySet.map((availability) => ({
          date: availability.date,
          remainingCapacity: availability.remainingCapacity, 
        })),
        imageSet: response.imageSet.map((image) => ({
          imageUrl: image.imageUrl,
        })),
        features_ids: response.features.map((feature) => (feature.id)),
      }
      return {
        data: product,
      }
    } else if (resource === "cities") {
      console.log("getOne cities")
      const cities = await getCities();
      const city = cities.find((c) => c.id == params.id);
      if (city) {
        return { 
          data: city 
        };
      }
      throw new Error("Category not found");
    } else if (resource === "categories") {
      console.log("getOne categories")
      const categories = await getCategories();
      const category = categories.find((c) => c.id == params.id);
      if (category) {
        return { 
          data: category 
        };
      }
      throw new Error("Category not found");
    } else if (resource === "features") {
      console.log("getOne feature")
      const features = await getFeatures();
      const feature = features.find((f) => f.id == params.id);
      if (feature) {
        return { 
          data: feature 
        };
      }
      throw new Error("Feature not found");
    } else {
      console.log("getOne")
    }
  },

  update: async (resource, params) => {
    if (resource === "products") {
      console.log("update product")
      const response = await updateProduct(params.data, params.id); // poner params.data para forzar error
      return {
        data: response,
      }
    } else if (resource === "categories") {
      console.log("update category")
      /*const response = await updateCategory(params.id, params.data)
      return {
        data: response,
        }*/
     return Promise.reject(); // falta endpoint
    } else if (resource === "features") {
      console.log("update feature")
      const response = await updateFeature(params.id, params.data);
      return {
        data: response,
      }
    } else {
      console.log("update")
    }
  },

  create: async (resource, params) => {
    if (resource == "products") {
      console.log("create product")
      const response = await createProduct(params.data);
      return {
        data: response,
      }
    } else if (resource == "categories") {
      console.log("create category")
      const response = await createCategory(params.data);
      return {
        data: response,
      }
    } else if (resource === "features") {
      console.log("create feature")
      const response = await createFeature(params.data);
      return {
        data: response,
      }
    } else {
      console.log("create")
    }
  },

  delete: async(resource, params) => {
    if (resource === "products") {
      console.log("delete product")
      const response = await deleteProduct(params.id);
      console.log(response)
      return {
        data: response,
      }
    } else if (resource == "categories") {
      console.log("delete category")
      const response = await deleteCategory(params.id);
      //console.log(response) // true
      return {
        data: response,
      }
    } else if (resource === "features") {
      console.log("delete feature")
      const response = await deleteFeature(params.id);
      console.log(response)
      return {
        data: response,
      }
    } else {
      console.log("delete")
    }
  },

  getMany: async(resource, params) => {
    if (resource === "cities") {
      console.log("getMany cities")
      const response = await getCities();
      return {
        data: response,
        total: response.length
      }
    } else if (resource === "categories") { 
      console.log("getMany categories")
      const response = await getCategories();
      return {
        data: response,
        total: response.length
      }
    } else if (resource === "features") {
      console.log("getMany features")
      const response = await getFeatures();
      return {
        data: response,
        total: response.length
      }
    } else {
      //return Promise.reject();
      console.log("getMany")
    }
  },

  getManyReference: async(resource, params) => {
    if (resource == "products" && params.target === "category_id") {
      console.log("getManyReference getProductsByCategory")
      const response = await getProductsByCategory(params.id);
      return {
        data: response,
        total: response.length
      }
    } else if (resource == "products" && params.target === "feature_id") {
      console.log("getManyReference getProductsByFeature")
      /* const response = await getProductsByFeature(params.id);
      return {
        data: response,
        total: response.length
      } */
      return Promise.reject(); // falta endpoint
    } else if (resource === "reviews") {
      console.log("getManyReference getReviewsByProduct")
      const response = await getReviewsByProduct(params.id);
      return {
        data: response,
        total: response.length
      }
    } else {
      console.log("getManyReference")
    }
  }
}

const emptyDataProvider = {
  getList: () => Promise.resolve({ data: [], total: 1 }),
  getOne: async (resource, params) => {
    if (resource === "products") {
      const products = await getProducts();
      const product = products.find((c) => c.id == params.id);
      console.log("🚀 ~ getOne: ~ product:", product);
      if (product) {
        return { data: product };
      }
      throw new Error("Product not found");
    }
  },
  getMany: () => Promise.reject(),
  getManyReference: () => Promise.reject(),
  create: () => Promise.reject(),
  update: () => Promise.resolve(),
  updateMany: () => Promise.reject(),
  delete: () => Promise.resolve({}),
  deleteMany: () => Promise.reject(),
};

// Detecta si el usuario está en móvil
const isMobileDevice = () => window.innerWidth <= 768;

export const MyMenu = () => {
  const { logout } = useAuth();
  return (
    <Menu
      sx={{
        backgroundColor: "#D9D9D9",
        color: "white",
        height: "100vh",
        overflowY: "auto",
        paddingTop: "30px",
      }}
    >
      {/* 2) Añadimos el botón de Home */}
      <Menu.Item
        to={FRONT_URL}
        primaryText="Ir a Home"
        leftIcon={<HomeIcon />} // Icono de Home
      />

      {/*<Menu.Item
        to="/admin/products/create"
        primaryText="Crear Producto"
        leftIcon={<AddBoxRoundedIcon />}
      />*/}
      
      <Menu.Item
        to="/admin/products"
        primaryText="Productos"
        leftIcon={<AutoAwesomeMotionRoundedIcon />}
      />

      <Menu.Item
        to="/admin/users"
        primaryText="Usuarios"
        leftIcon={<GroupIcon />}
      />

      {/*<Menu.Item
        to="/admin/categories/create"
        primaryText="Agregar categoria"
        leftIcon={<CategoryIcon />}
      />*/}

      <Menu.Item
        to="/admin/categories"
        primaryText="Categorías"
        leftIcon={<FormatListNumberedIcon />}
      />

      <Menu.Item
        to="/admin/features"
        primaryText="Características"
        leftIcon={<ListAltIcon />}
      />

      {/*<Menu.Item
        to="/admin/features/create"
        primaryText="Crear característica"
        leftIcon={<PostAddIcon />}
      />*/}

      <Menu.Item
        to="/"
        primaryText="Cerrar sesión"
        leftIcon={<LogoutIcon />}
        onClick={logout}
      />
    </Menu>
  );
};

export const MyLayout = ({ children }) => (
  <Layout /* appBar={Header} */ menu={MyMenu}>{children}</Layout>
);

const theme = createTheme({
  ...houseLightTheme,
  palette: {
    ...houseLightTheme.palette, // Conserva los colores originales del tema base
   /*  primary: {
      light: '#4caf50',
      main: '#4caf50', // Cambia el color principal (verde en este caso)
    }, */
    secondary: {
      light: '#f44336',
      main: '#000000', // Cambia el color secundario (rojo en este caso)
    },
  },
  /* typography: {
    ...houseLightTheme.typography,
    h6: {
      fontSize: '1.2rem', // Aumentar tamaño de h6
    },
  }, */
  components: {
    ...houseLightTheme.components,
    RaAppBar: {
      styleOverrides: {
        backgroundImage: "linear-gradient(310deg,rgb(21, 7, 34),rgb(2, 249, 84))"
      }
    }
  }
});


export const AdminPage = () => {
  const [isMobile, setIsMobile] = useState(isMobileDevice());

  useEffect(() => {
    const handleResize = () => setIsMobile(isMobileDevice());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          color: "red",
          fontSize: "18px",
        }}
      >
        ❌ No puedes acceder al panel de administración desde un dispositivo
        móvil. Usa un ordenador.
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme} >
    <Admin
      basename="/admin"
      dataProvider={dataProvider}
      theme={theme}
      darkTheme={null}
      layout={MyLayout}
    >

    {/* {console.log(houseLightTheme.components.RaAppBar.styleOverrides.root.color)} */}
      {/* <Resource
        name="products"
        list={PostList}
        edit={PostEdit}
        create={PostCreate}
        icon={PostIcon}
        sx={{ border: "2px solid red" }}
      /> */}
      
      <Resource 
        name="products"
        list={ProductList}
        edit={ProductEdit}
        create={ProductCreate}
      />

      <Resource 
        name="users" 
        list={UserList} 
      />
      
      {/*<Resource
        name="categories"
        list={CategoriesList}
        create={CreateCategory}
      />*/}
      
      <Resource
        name="categories"
        create={CategoryCreate}
        list={CategoryList}
        edit={CategoryEdit}
      />
      
      <Resource 
        name="features"
        list={FeatureList} 
        create={FeatureCreate} 
        edit={FeatureEdit}
      />

      {/* <Resource
        name="cities"
        create={CityCreate}
      /> */}
    </Admin>
    </ThemeProvider>
  );
};
