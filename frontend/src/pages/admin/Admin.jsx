import {
  Admin,
  Resource,
  nanoLightTheme,
  nanoDarkTheme,
  Menu,
  Layout,
} from "react-admin";
import { useState, useEffect } from "react";
import fakeDataProvider from "ra-data-fakerest";
import {
  PostList,
  PostEdit,
  PostCreate,
  PostIcon,
  UsersLists,
  CreateCategory,
  CategoriesList,
  CreateFeature,
  FeatureEdit,
  FeaturesList,
} from "./components/index";
import LabelIcon from "@mui/icons-material/Label";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import AutoAwesomeMotionRoundedIcon from "@mui/icons-material/AutoAwesomeMotionRounded";
import { getProducts } from "../../services/productService";
import jsonServerProvider from "ra-data-json-server";
import GroupIcon from "@mui/icons-material/Group";
import CategoryIcon from "@mui/icons-material/Category";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import AddHomeIcon from "@mui/icons-material/AddHome";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home"; // <--- 1) Importar HomeIcon
import ListAltIcon from "@mui/icons-material/ListAlt";
import PostAddIcon from "@mui/icons-material/PostAdd";
import "./styles.css";
import { useAuth } from "../../context/AuthContext";
import { getCategories } from "../../services/categoryService";

const FRONT_URL = import.meta.env.VITE_FRONT_DOMAIN || "http://localhost:5173";

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
        to= {FRONT_URL}
        primaryText="Ir a Home"
        leftIcon={<HomeIcon />} // Icono de Home
      />

      <Menu.Item
        to="/admin/products/create"
        primaryText="Crear Producto"
        leftIcon={<AddBoxRoundedIcon />}
      />
      <Menu.Item
        to="/admin/products"
        primaryText="Lista de productos"
        leftIcon={<AutoAwesomeMotionRoundedIcon />}
      />
      <Menu.Item
        to="/admin/users"
        primaryText="Lista de usuarios"
        leftIcon={<GroupIcon />}
      />
      <Menu.Item
        to="/admin/categories/create"
        primaryText="Agregar categoria"
        leftIcon={<CategoryIcon />}
      />
      <Menu.Item
        to="/admin/categories/list"
        primaryText="Lista de categorías"
        leftIcon={<FormatListNumberedIcon />}
      />

      <Menu.Item
        to="/admin/features/list"
        primaryText="Lista de características"
        leftIcon={<ListAltIcon />}
      />
      <Menu.Item
        to="/admin/features/create"
        primaryText="Crear característica"
        leftIcon={<PostAddIcon />}
      />
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
  <Layout menu={MyMenu}>{children}</Layout>
);

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
    <Admin
      basename="/admin"
      dataProvider={emptyDataProvider}
      theme={nanoLightTheme}
      darkTheme={nanoLightTheme}
      layout={MyLayout}
    >
      <Resource
        name="products"
        list={PostList}
        edit={PostEdit}
        create={PostCreate}
        icon={PostIcon}
        sx={{ border: "2px solid red" }}
      />
      <Resource name="users" list={UsersLists} />
      <Resource
        name="categories"
        list={CategoriesList}
        create={CreateCategory}
      />
      <Resource name="features" list={FeaturesList} create={CreateFeature} />
      {/* - */}
    </Admin>
  );
};
