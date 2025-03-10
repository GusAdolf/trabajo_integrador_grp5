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
import { PostList, PostEdit, PostCreate, PostIcon,UsersLists } from "./components/index";
import LabelIcon from "@mui/icons-material/Label";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import AutoAwesomeMotionRoundedIcon from "@mui/icons-material/AutoAwesomeMotionRounded";
import { getProducts } from "../../services/productService";
import jsonServerProvider from "ra-data-json-server";
import GroupIcon from '@mui/icons-material/Group';

const dataProvider = jsonServerProvider("http://localhost:8080");

// Detecta si el usuario está en móvil
const isMobileDevice = () => window.innerWidth <= 768;

export const MyMenu = () => {
  return (
    <Menu
      sx={{
        backgroundColor: "#D9D9D9",
        color: "white",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <Menu.Item
        to="/admin/posts/create"
        primaryText="Crear Producto"
        leftIcon={<AddBoxRoundedIcon />}
      />
      <Menu.Item
        to="/admin/posts"
        primaryText="Lista de productos"
        leftIcon={<AutoAwesomeMotionRoundedIcon />}
      />
            <Menu.Item
        to="/admin/users"
        primaryText="Lista de usuarios"
        leftIcon={<GroupIcon />}
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
      dataProvider={dataProvider}
      theme={nanoLightTheme}
      darkTheme={nanoLightTheme}
      layout={MyLayout}
    >
      <Resource
        name="posts"
        list={PostList}
        edit={PostEdit}
        create={PostCreate}
        icon={PostIcon}
        sx={{ border: "2px solid red" }}
      />
            <Resource
        name="users"
        list={UsersLists}
      />
    </Admin>
  );
};
