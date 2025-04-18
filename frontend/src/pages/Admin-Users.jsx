import React, { useEffect } from "react";
import { BASE_URL, token } from "../config.js";
import useFetchData from "../hooks/useFetchData.jsx";
import defaultImg from "../assets/images/default.avif";
import { BiEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { MdOutlinePersonPin } from "react-icons/md";
import { PiGenderFemaleBold } from "react-icons/pi";
import { FaUser } from "react-icons/fa6";
import { MdMarkEmailUnread } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loader/Loading.jsx";
import Error from "../components/Error/Error.jsx";
import { toast } from "react-toastify";

const AdminUsers = () => {
  const navigate = useNavigate();
  const {
    data: users,
    loading,
    error,
    refetch
  } = useFetchData(`${BASE_URL}/admin/users`);

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete user");
      }

      toast.success("User deleted successfully");
      refetch(); // Refresh the users list
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {loading && <Loading />}
      {error && <Error />}
      {!loading && !error && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl"
            >
              <div className="flex justify-between mb-3">
                <button onClick={() => navigate(`/admin/users/${user._id}/edit`)}>
                  <BiEditAlt className="text-blue-500 cursor-pointer" />
                </button>
                <button onClick={() => handleDelete(user._id)}>
                  <MdDelete className="cursor-pointer text-red-500" />
                </button>
              </div>
              <div className="top-1 w-full">
                <img
                  className="w-full h-[250px] object-fill rounded-lg"
                  src={user.photo || `${defaultImg}`}
                  alt={user._id}
                />
              </div>
              <div className="flex justify-start items-center gap-x-2">
                <FaUser className="text-2xl" />
                <h2 className="my-1">{user.name}</h2>
              </div>
              <div className="flex justify-start items-center gap-x-2">
                <MdMarkEmailUnread className="text-2xl" />
                <h2 className="my-1">{user.email}</h2>
              </div>
              <div className="flex justify-start items-center gap-x-2">
                <MdOutlinePersonPin className="text-2xl" />
                <h2 className="my-1">Role: {user.role || "Unknown Author"}</h2>
              </div>
              <div className="flex justify-start items-center gap-x-2">
                <PiGenderFemaleBold className="text-2xl" />
                <h2 className="my-1">{user.gender}</h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AdminUsers;
