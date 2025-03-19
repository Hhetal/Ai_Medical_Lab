import { useContext } from "react";
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";
import { FaUsers, FaUserMd, FaInbox } from "react-icons/fa";

const AdminSidebar = () => {
  const { dispatch } = useContext(authContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4">
      <button className="lg:hidden">
        <BiMenu className="w-6 h-6" />
      </button>
      <div className="hidden lg:flex flex-col justify-between">
        <div className="flex flex-col gap-6">
          <NavLink
            to="/dashboard/users"
            className={({ isActive }) =>
              isActive
                ? "text-primaryColor font-medium flex items-center gap-2"
                : "text-textColor font-medium flex items-center gap-2"
            }
          >
            <FaUsers className="w-5 h-5" /> Users
          </NavLink>
          <NavLink
            to="/dashboard/doctors"
            className={({ isActive }) =>
              isActive
                ? "text-primaryColor font-medium flex items-center gap-2"
                : "text-textColor font-medium flex items-center gap-2"
            }
          >
            <FaUserMd className="w-5 h-5" /> Doctors
          </NavLink>
          <NavLink
            to="/dashboard/queries"
            className={({ isActive }) =>
              isActive
                ? "text-primaryColor font-medium flex items-center gap-2"
                : "text-textColor font-medium flex items-center gap-2"
            }
          >
            <FaInbox className="w-5 h-5" /> User Queries
          </NavLink>
        </div>
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar; 