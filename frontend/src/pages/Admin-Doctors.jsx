import React from "react";
import { BASE_URL } from "../config.js";
import useFetchData from "../hooks/useFetchData.jsx";
import defaultImg from "../assets/images/default.avif";
import { BiEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { MdOutlinePersonPin } from "react-icons/md";
import { PiGenderFemaleBold } from "react-icons/pi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdMarkEmailUnread } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loader/Loading.jsx";
import Error from "../components/Error/Error.jsx";
import { toast } from "react-toastify";

const AdminDoctors = () => {
  const navigate = useNavigate();
  const {
    data: doctors,
    loading,
    error,
    refetch
  } = useFetchData(`${BASE_URL}/admin/doctors`);

  const handleAuthError = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleDelete = async (doctorId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        handleAuthError();
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${BASE_URL}/admin/doctors/${doctorId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      const data = await response.json();

      if (response.status === 401) {
        handleAuthError();
        throw new Error("Session expired. Please login again.");
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete doctor");
      }

      toast.success("Doctor deleted successfully");
      refetch(); // Refresh the doctors list
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateApprovalStatus = async (doctorId, status) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        handleAuthError();
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${BASE_URL}/admin/doctors/${doctorId}/approval`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isApproved: status }),
      });

      const data = await response.json();

      if (response.status === 401) {
        handleAuthError();
        throw new Error("Session expired. Please login again.");
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to update approval status");
      }

      toast.success(`Doctor ${status === "approved" ? "approved" : "rejected"} successfully`);
      refetch(); // Refresh the doctors list
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error errMessage={error} />;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Doctors List</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors?.map((doctor) => (
          <div key={doctor._id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img
                  src={doctor.photo || defaultImg}
                  alt={doctor.name}
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div>
                  <h3 className="font-semibold text-lg">{doctor.name}</h3>
                  <p className="text-gray-600">{doctor.specialization}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-sm ${
                doctor.isApproved === "approved" 
                  ? "bg-green-100 text-green-800"
                  : doctor.isApproved === "rejected"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}>
                {doctor.isApproved || "pending"}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-gray-600">
                <MdMarkEmailUnread className="mr-2" />
                <span>{doctor.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FaUserDoctor className="mr-2" />
                <span>{doctor.specialization}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <PiGenderFemaleBold className="mr-2" />
                <span>{doctor.gender}</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => navigate(`/admin/doctors/edit/${doctor._id}`)}
                className="text-blue-600 hover:text-blue-800"
              >
                <BiEditAlt size={20} />
              </button>
              <button
                onClick={() => handleDelete(doctor._id)}
                className="text-red-600 hover:text-red-800"
              >
                <MdDelete size={20} />
              </button>
              {doctor.isApproved !== "approved" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => updateApprovalStatus(doctor._id, "approved")}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateApprovalStatus(doctor._id, "rejected")}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDoctors;
