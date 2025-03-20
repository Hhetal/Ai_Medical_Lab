import React, { useEffect, useState } from "react";
import DoctorCard from "./../../components/Doctors/DoctorCard";
import Testimonial from "./../../components/Testimonial/Testimonial";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { FaSearch, FaFilter } from "react-icons/fa";

const Doctors = () => {
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const handleSearch = () => {
    setQuery(query.trim());
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebounceQuery(query);
    }, 700);

    return () => clearTimeout(timeOut);
  }, [query]);

  const {
    data: doctors,
    loading,
    error,
  } = useFetchData(
    `${BASE_URL}/doctors?query=${debounceQuery}&specialization=${specialization}&sort=${sortBy}`
  );

  const filteredDoctors = doctors?.filter((doctor) => {
    const matchesQuery = doctor.name.toLowerCase().includes(query.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(query.toLowerCase());
    const matchesSpecialization = !specialization || doctor.specialization === specialization;
    return matchesQuery && matchesSpecialization;
  });

  return (
    <>
      <section className="bg-[#fff9ea] py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-headingColor mb-8">
            Find a Doctor
          </h2>
          
          <div className="max-w-[570px] mx-auto bg-[#0066ff2c] rounded-md p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="search"
                    className="w-full pl-10 pr-4 py-3 bg-transparent focus:outline-none cursor-pointer placeholder:text-textColor"
                    placeholder="Search doctor by name or specialization"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex gap-4">
                <select
                  className="px-4 py-3 bg-transparent focus:outline-none cursor-pointer border rounded-md"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                >
                  <option value="">All Specializations</option>
                  <option value="Surgeon">Surgeon</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Cardiologist">Cardiologist</option>
                  <option value="Pediatrician">Pediatrician</option>
                </select>

                <select
                  className="px-4 py-3 bg-transparent focus:outline-none cursor-pointer border rounded-md"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="name">Sort by Name</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="experience">Sort by Experience</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading && <Loader />}
          {error && <Error />}
          
          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {filteredDoctors?.map((doctor) => (
                  <DoctorCard key={doctor._id} doctor={doctor} />
                ))}
              </div>
              
              {filteredDoctors?.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold text-gray-600">
                    No doctors found matching your search criteria
                  </h3>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="xl:w-[470px] mx-auto text-center">
            <h2 className="text-3xl font-bold text-headingColor mb-4">
              What our patients say
            </h2>
            <p className="text-gray-600">
              World-class care for everyone. Our health system offers
              unmatched, expert health care.
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Doctors;
