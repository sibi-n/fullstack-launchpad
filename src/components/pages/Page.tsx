import { Route, Routes } from "react-router-dom";
import SearchPage from "./SearchPage";
import LoginPage from "./LoginPage";
import AuthLayout from "../layouts/AuthLayout";
import RegisterPage from "./RegisterPage";
import TrainsPage from "./TrainsPage";
import AppLayout from "../layouts/AppLayout";

function Pages() {
  return (
    <div>
      <Routes>
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route path="app" element={<AppLayout />}>
          <Route path="search" element={<SearchPage />} />
          <Route path="trains" element={<TrainsPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default Pages;
