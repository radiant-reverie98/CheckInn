import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CheckInnLoader } from "./CheckInnLoader";

function OwnerProtectedRoute() {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return <div><CheckInnLoader/></div>;
//   }

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (user.role !== "OWNER") {
//     return <Navigate to="/admin" replace />;
//   }

//   return <Outlet />;
}

export default OwnerProtectedRoute;