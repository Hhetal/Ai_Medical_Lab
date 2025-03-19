import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import patientAvatar from "../../assets/images/patient-avatar.png";
import { HiStar } from "react-icons/hi";
import useFetchReviews from "../../hooks/useFetchReviews";
import { formateDate } from "../../utils/formatDate";
import Loading from "../Loader/Loading";

const Testimonial = () => {
  const { reviews, loading, error } = useFetchReviews();

  if (loading) return <Loading />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="mt-30px lg:mt-55px">
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {reviews?.map((review, index) => (
          <SwiperSlide key={review._id || index}>
            <div className="py-[30px] px-5 rounded-3">
              <div className="flex items-center gap-[13px]">
                <img 
                  src={review.user?.photo || patientAvatar} 
                  alt="" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                    {review.user?.name || "Anonymous User"}
                  </h4>
                  <div className="flex items-center gap-[2px]">
                    {[...Array(review.rating)].map((_, i) => (
                      <HiStar key={i} className="text-yellowColor w-[10px] h-5" />
                    ))}
                  </div>
                  <p className="text-[14px] text-textColor">
                    {formateDate(review.createdAt)}
                  </p>
                </div>
              </div>
              <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
                {review.reviewText}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;
