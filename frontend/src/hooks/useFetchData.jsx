// import { useEffect, useState } from "react";
// import { token } from "../config.js";

// const useFetchData = (url) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(url, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const result = await res.json();

//         if (!res.ok) {
//           throw new Error(result.message + "🤢");
//         }
//         setData(result.data);
//         setLoading(false);
//       } catch (err) {
//         setLoading(false);
//         setError(err.message);
//       }
//     };
//     fetchData();
//   }, [url]);
//   return { data, loading, error };
// };

// export default useFetchData;

import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAuthError = () => {
    // Clear all auth data
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    
    // Redirect to login
    navigate("/login");
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        handleAuthError();
        throw new Error("No authentication token found");
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      const result = await response.json();

      // Handle 401 Unauthorized
      if (response.status === 401) {
        handleAuthError();
        throw new Error("Session expired. Please login again.");
      }

      // Handle other errors
      if (!response.ok) {
        throw new Error(result.message || `HTTP error! status: ${response.status}`);
      }

      if (!result.success) {
        throw new Error(result.message || "Failed to fetch data");
      }

      setData(result.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [url, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetchData;
