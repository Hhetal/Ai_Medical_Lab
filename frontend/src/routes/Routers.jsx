import React from "react";
import Home from "../pages/Home";
import Services from "../pages/Services";
import Signup from "../pages/Signup";
import Symptomchk from "../pages/Symptomchk";
import Login from "../pages/Login";
import Contact from "../pages/Contact";
import Doctors from "../pages/Doctors/Doctors";
import DoctorDetails from "../pages/Doctors/DoctorDetails";
import { Routes, Route } from "react-router-dom";
import MyAccount from "../Dashboard/user-account/MyAccount";
import Dashboard from "../Dashboard/doctor-account/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import CheckoutSuccess from "../pages/CheckoutSuccess";
import { services } from "../assets/data/services.js";
import DiseasePage from "../components/Services/Disease/DiseasePage.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import ResetPassword from "../pages/ResetPassword.jsx";
import AdminLayout from "../layout/Admin-Layout";

const Routers = () => {
  return (
    <Routes>
      {/* Public routes - always accessible */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:id/:token" element={<ResetPassword />} />

      {/* Protected routes - require authentication */}
      <Route
        path="/symptomchk"
        element={
          <ProtectedRoute allowedRoles={["patient", "doctor"]}>
            <Symptomchk />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctors"
        element={
          <ProtectedRoute allowedRoles={["patient", "doctor"]}>
            <Doctors />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctors/:id"
        element={
          <ProtectedRoute allowedRoles={["patient", "doctor"]}>
            <DoctorDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/services"
        element={
          <ProtectedRoute allowedRoles={["patient", "doctor", "admin"]}>
            <Services />
          </ProtectedRoute>
        }
      />

      {/* User-specific routes */}
      <Route
        path="/users/profile/me"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <MyAccount />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctors/profile/me"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      />

      {/* Disease routes */}
      {services.map((service) => (
        <Route
          key={service.id}
          path={`/disease/${service.id}`}
          element={
            <ProtectedRoute allowedRoles={["patient", "doctor"]}>
              <DiseasePage service={service} />
            </ProtectedRoute>
          }
        />
      ))}

      {/* Checkout route */}
      <Route
        path="/checkout-success"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <CheckoutSuccess />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Routers;
