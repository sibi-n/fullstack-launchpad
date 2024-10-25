import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "store";
import { AppLayout } from "components/layouts/app-layout";
import { AuthLayout } from "components/layouts/auth-layout";
import { LoginPage } from "./login";
import { RegisterPage } from "./register";
import { SearchPage } from "./search";
import { BookingHistoryPage } from "./booking-history";
import { TrainsPage } from "./trains";

const PrivateRoute = ({ children }: React.PropsWithChildren) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth/login" />;

  return <>{children}</>;
};

const AdminRoute = ({ children }: React.PropsWithChildren) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth/login" />;

  if (!user.isAdmin) return <Navigate to="/app/search" />;

  return <>{children}</>;
};

const UserRoute = ({ children }: React.PropsWithChildren) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth/login" />;

  if (user.isAdmin) return <Navigate to="/app/trains" />;

  return <>{children}</>;
};

export default function Pages() {
  return (
    <div>
      <Routes>
        {/* Authentication */}
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route index path="*" element={<Navigate to="login" />} />
        </Route>

        {/* Application */}
        <Route
          path="app"
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >
          {/* User */}
          <Route
            path="search"
            element={
              <UserRoute>
                <SearchPage />
              </UserRoute>
            }
          />
          <Route
            path="history"
            element={
              <UserRoute>
                <BookingHistoryPage />
              </UserRoute>
            }
          />

          {/* Admin */}
          <Route
            path="trains"
            element={
              <AdminRoute>
                <TrainsPage />
              </AdminRoute>
            }
          />

          <Route index path="*" element={<Navigate to="search" />} />
        </Route>

        <Route index path="*" element={<Navigate to="auth" />} />
      </Routes>
    </div>
  );
}
