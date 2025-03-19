import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config.js";
import Loading from "../../components/Loader/Loading.jsx";
import Error from "../../components/Error/Error.jsx";

const MyBookings = () => {
  const {
    data: appointments,
    error,
    loading,
  } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);

  return (
    <div>
      {loading && !error && <Loading />}
      {error && !loading && <Error errMessage={error} />}
      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {appointments.map((appointment) => (
            <div key={appointment._id} className="p-3 lg:p-5 bg-white rounded-xl">
              <div className="flex items-center gap-2">
                <img
                  src={appointment.doctor.photo}
                  className="w-16 h-16 lg:w-32 lg:h-32 rounded-full"
                  alt=""
                />
                <div>
                  <h2 className="text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor font-[700]">
                    {appointment.doctor.name}
                  </h2>
                  <div className="mt-2 lg:mt-4 flex items-center gap-2">
                    <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 text-headingColor font-[400]">
                      {appointment.doctor.specialization}
                    </span>
                  </div>
                  <div className="mt-2 lg:mt-4 flex items-center gap-2">
                    <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 text-headingColor font-[400]">
                      Appointment Date: {new Date(appointment.appointmentDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mt-2 lg:mt-4 flex items-center gap-2">
                    <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 text-headingColor font-[400]">
                      Status: {appointment.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {!loading && !error && appointments.length === 0 && (
        <h2 className="mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor">
          You have no appointments yet!
        </h2>
      )}
    </div>
  );
};

export default MyBookings;
