import React, { useContext } from "react";
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import { FaUser, FaHome } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { BsFillTicketDetailedFill } from "react-icons/bs";
import AdminUsers from "../pages/Admin-Users";
import AdminDoctors from "../pages/Admin-Doctors";
import AdminBookings from "../pages/Admin-Bookings";
import AdminUpdate from "../pages/Admin-Update";
import { authContext } from "../context/AuthContext";
import AdminHome from "../pages/Admin-Home";
import DeleteUser from "../pages/DeleteUser";
import DeleteDoctor from "../pages/DeleteDoctor";

const AdminLayout = () => {
  const { user, dispatch } = useContext(authContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        {/* Sidebar */}
        <div className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-5">Admin Panel</h1>
            <nav className="space-y-2">
              <NavLink
                to="/admin/home"
                className={({ isActive }) =>
                  `flex items-center p-3 text-gray-700 rounded-lg hover:bg-gray-100 ${
                    isActive ? "bg-blue-50 text-blue-600" : ""
                  }`
                }
              >
                <FaHome className="mr-3" />
                Dashboard
              </NavLink>
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `flex items-center p-3 text-gray-700 rounded-lg hover:bg-gray-100 ${
                    isActive ? "bg-blue-50 text-blue-600" : ""
                  }`
                }
              >
                <FaUser className="mr-3" />
                Users
              </NavLink>
              <NavLink
                to="/admin/doctors"
                className={({ isActive }) =>
                  `flex items-center p-3 text-gray-700 rounded-lg hover:bg-gray-100 ${
                    isActive ? "bg-blue-50 text-blue-600" : ""
                  }`
                }
              >
                <FaUserDoctor className="mr-3" />
                Doctors
              </NavLink>
              <NavLink
                to="/admin/bookings"
                className={({ isActive }) =>
                  `flex items-center p-3 text-gray-700 rounded-lg hover:bg-gray-100 ${
                    isActive ? "bg-blue-50 text-blue-600" : ""
                  }`
                }
              >
                <BsFillTicketDetailedFill className="mr-3" />
                Bookings
              </NavLink>
              <button
                onClick={handleLogout}
                className="flex items-center p-3 text-red-600 rounded-lg hover:bg-red-50 w-full"
              >
                Logout
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-64 p-8">
          <Routes>
            <Route index element={<AdminHome />} />
            <Route path="home" element={<AdminHome />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="doctors" element={<AdminDoctors />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="users/:id/edit" element={<AdminUpdate />} />
            <Route path="delete/user/:id" element={<DeleteUser />} />
            <Route path="delete/doctor/:id" element={<DeleteDoctor />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
