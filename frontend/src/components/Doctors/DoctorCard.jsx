import React from "react";
import starIcon from "../../assets/images/Star.png";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { FaHospital, FaGraduationCap } from "react-icons/fa";

const DoctorCard = ({ doctor }) => {
  const {
    name,
    avgRating,
    totalRating,
    photo,
    specialization,
    experiences,
    qualifications,
    ticketPrice,
  } = doctor;

  return (
    <div className="p-3 lg:p-5 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="relative">
        <img 
          src={photo} 
          className="w-full h-[200px] object-cover rounded-lg" 
          alt={name} 
        />
        <div className="absolute top-2 right-2 bg-primaryColor text-white px-2 py-1 rounded-full text-sm">
          ₹{ticketPrice}
        </div>
      </div>

      <h2 className="text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor font-[700] mt-3">
        {name}
      </h2>

      <div className="mt-2 lg:mt-4 flex items-center justify-between">
        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
          {specialization}
        </span>
        <div className="flex items-center gap-[6px]">
          <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
            <img src={starIcon} alt="" /> {avgRating}
          </span>
          <span className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
            ({totalRating})
          </span>
        </div>
      </div>

      <div className="mt-[18px] lg:mt-5 space-y-3">
        {experiences && experiences[0]?.hospital && (
          <div className="flex items-center gap-2 text-textColor">
            <FaHospital className="text-primaryColor" />
            <p className="text-[14px] leading-6 font-[400]">
              {experiences[0].hospital}
            </p>
          </div>
        )}

        {qualifications && qualifications[0] && (
          <div className="flex items-center gap-2 text-textColor">
            <FaGraduationCap className="text-primaryColor" />
            <p className="text-[14px] leading-6 font-[400]">
              {qualifications[0]}
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <Link
          to={`/doctors/${doctor._id}`}
          className="w-full text-center bg-primaryColor text-white py-2 px-4 rounded-lg hover:bg-primaryDark transition-all duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;
