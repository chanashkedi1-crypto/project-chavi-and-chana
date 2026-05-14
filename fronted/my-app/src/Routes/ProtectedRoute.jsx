import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Hooks/UserContext";

export default function ProtectedRoute() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  if (!user.id) {
    return <Navigate to="/login" replace />;
  }
  if (
    location.pathname.includes(":id") ||
    location.pathname === "/" ||
    location.pathname === "/login"|| location.pathname === "/register"
  ) {
    return (
      <Navigate
        to={`/users/${user.id}/home`}
        replace
      />
    );
  }
  return <Outlet />;
}
