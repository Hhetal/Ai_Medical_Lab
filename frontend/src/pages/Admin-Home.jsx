import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import useFetchData from "../hooks/useFetchData";
import Loading from "../components/Loader/Loading";
import Error from "../components/Error/Error";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";

const AdminHome = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    totalBookings: 0,
    totalRevenue: 0
  });

  const { data: users, loading: usersLoading, error: usersError } = useFetchData(`${BASE_URL}/admin/users`);
  const { data: doctors, loading: doctorsLoading, error: doctorsError } = useFetchData(`${BASE_URL}/admin/doctors`);
  const { data: bookings, loading: bookingsLoading, error: bookingsError } = useFetchData(`${BASE_URL}/admin/bookings`);

  useEffect(() => {
    if (users && doctors && bookings) {
      const totalRevenue = bookings.reduce((sum, booking) => 
        sum + parseFloat(booking.ticketPrice || 0), 0
      );

      setStats({
        totalUsers: users.length,
        totalDoctors: doctors.length,
        totalBookings: bookings.length,
        totalRevenue: totalRevenue.toFixed(2)
      });
    }
  }, [users, doctors, bookings]);

  if (usersLoading || doctorsLoading || bookingsLoading) {
    return <Loading />;
  }

  if (usersError || doctorsError || bookingsError) {
    return <Error errorMessage={usersError || doctorsError || bookingsError} />;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Users Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
        </div>

        {/* Doctors Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Total Doctors</h3>
          <p className="text-3xl font-bold text-green-600">{stats.totalDoctors}</p>
        </div>

        {/* Bookings Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Total Bookings</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.totalBookings}</p>
        </div>

        {/* Revenue Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
          <p className="text-3xl font-bold text-orange-600">${stats.totalRevenue}</p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings?.slice(0, 5).map((booking, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Booking
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.user?.name} booked appointment with {booking.doctor?.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
