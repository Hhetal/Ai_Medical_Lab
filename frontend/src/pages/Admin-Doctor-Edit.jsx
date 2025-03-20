import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import Loading from "../components/Loader/Loading";

const AdminDoctorEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [doctorData, setDoctorData] = useState({
    name: "",
    email: "",
    gender: "",
    specialization: "",
    qualifications: [],
    experiences: [],
    bio: "",
    about: "",
    timeSlots: [],
    isApproved: "",
  });

  const handleAuthError = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          handleAuthError();
          throw new Error("No authentication token found");
        }

        const response = await fetch(`${BASE_URL}/admin/doctors/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 401) {
          handleAuthError();
          throw new Error("Session expired. Please login again.");
        }

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch doctor data");
        }

        const data = await response.json();
        setDoctorData(data.data);
      } catch (error) {
        console.error("Error fetching doctor:", error);
        toast.error(error.message || "Failed to fetch doctor data");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctorData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayInputChange = (e, field) => {
    const { value } = e.target;
    setDoctorData((prev) => ({
      ...prev,
      [field]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        handleAuthError();
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${BASE_URL}/admin/doctors/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(doctorData),
      });

      if (response.status === 401) {
        handleAuthError();
        throw new Error("Session expired. Please login again.");
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update doctor");
      }

      const data = await response.json();
      toast.success(data.message || "Doctor updated successfully");
      navigate("/admin/doctors");
    } catch (error) {
      console.error("Error updating doctor:", error);
      toast.error(error.message || "Failed to update doctor");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Update Doctor</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={doctorData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={doctorData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={doctorData.gender}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Specialization</label>
          <input
            type="text"
            name="specialization"
            value={doctorData.specialization}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Qualifications (comma-separated)</label>
          <input
            type="text"
            value={doctorData.qualifications.join(", ")}
            onChange={(e) => handleArrayInputChange(e, "qualifications")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Experiences (comma-separated)</label>
          <input
            type="text"
            value={doctorData.experiences.join(", ")}
            onChange={(e) => handleArrayInputChange(e, "experiences")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            name="bio"
            value={doctorData.bio}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows="3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">About</label>
          <textarea
            name="about"
            value={doctorData.about}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows="5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Time Slots (comma-separated)</label>
          <input
            type="text"
            value={doctorData.timeSlots.join(", ")}
            onChange={(e) => handleArrayInputChange(e, "timeSlots")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Approval Status</label>
          <select
            name="isApproved"
            value={doctorData.isApproved}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Doctor"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/doctors")}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminDoctorEdit; 