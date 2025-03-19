import React, { useContext } from "react";
import Layout from "./layout/Layout";
import { authContext } from "./context/AuthContext";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/Admin-Layout";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const { role, token } = useContext(authContext);

  // If user is not logged in, show Layout with header/footer for public routes
  if (!token) {
    return <Layout />;
  }

  // If user is admin, show AdminLayout without header/footer
  if (role === "admin") {
    return (
      <Routes>
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Layout />} />
      </Routes>
    );
  }

  // For doctor and patient, show Layout with header/footer
  return <Layout />;
}

export default App;





