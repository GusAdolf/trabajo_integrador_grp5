import { Routes, Route, useLocation } from "react-router-dom";

import { Home, AdminPage } from "./pages/index";
import { Header } from "./components/index";
import "./App.css";

function App() {
  return (
    <>
      {!location.pathname.startsWith("/admin") && <Header />}

      <Routes>
        <Route path="/admin*" element={<AdminPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
