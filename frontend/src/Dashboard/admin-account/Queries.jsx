import { useState, useEffect } from "react";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import Loading from "../../components/Loader/Loading";
import { formateDate } from "../../utils/formatDate";

const Queries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [response, setResponse] = useState("");

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/contact`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setQueries(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResponse = async (queryId) => {
    try {
      const res = await fetch(`${BASE_URL}/contact/${queryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "responded",
          adminResponse: response,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setQueries(queries.map(q => q._id === queryId ? data : q));
      setSelectedQuery(null);
      setResponse("");
      toast.success("Response sent successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleMarkResolved = async (queryId) => {
    try {
      const res = await fetch(`${BASE_URL}/contact/${queryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "resolved",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setQueries(queries.map(q => q._id === queryId ? data : q));
      toast.success("Query marked as resolved!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">User Queries</h2>
      
      <div className="grid gap-6">
        {queries.map((query) => (
          <div
            key={query._id}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{query.subject}</h3>
                <p className="text-gray-600 text-sm">
                  From: {query.name} ({query.email})
                </p>
                <p className="text-gray-600 text-sm">
                  Phone: {query.phone}
                </p>
                <p className="text-gray-600 text-sm">
                  Received: {formateDate(query.createdAt)}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  query.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : query.status === "responded"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {query.status}
              </span>
            </div>

            <p className="text-gray-700 mb-4">{query.message}</p>

            {query.adminResponse && (
              <div className="bg-gray-50 p-4 rounded mb-4">
                <h4 className="font-semibold mb-2">Admin Response:</h4>
                <p className="text-gray-700">{query.adminResponse}</p>
                <p className="text-gray-500 text-sm mt-2">
                  Responded on: {formateDate(query.respondedAt)}
                </p>
              </div>
            )}

            {query.status === "pending" && (
              <div className="space-y-4">
                {selectedQuery === query._id ? (
                  <>
                    <textarea
                      rows="3"
                      className="w-full p-2 border rounded"
                      placeholder="Type your response..."
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                    ></textarea>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleResponse(query._id)}
                        className="bg-primaryColor text-white px-4 py-2 rounded hover:bg-primaryDark"
                      >
                        Send Response
                      </button>
                      <button
                        onClick={() => {
                          setSelectedQuery(null);
                          setResponse("");
                        }}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => setSelectedQuery(query._id)}
                    className="text-primaryColor hover:text-primaryDark"
                  >
                    Respond to Query
                  </button>
                )}
              </div>
            )}

            {query.status === "responded" && (
              <button
                onClick={() => handleMarkResolved(query._id)}
                className="text-green-600 hover:text-green-700"
              >
                Mark as Resolved
              </button>
            )}
          </div>
        ))}

        {queries.length === 0 && (
          <p className="text-center text-gray-500">No queries found.</p>
        )}
      </div>
    </div>
  );
};

export default Queries; 