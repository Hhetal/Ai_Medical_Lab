import React, { useEffect } from "react";
import heroImage01 from "../assets/images/hero-img01.png";
import heroImage02 from "../assets/images/hero-img02.png";
import heroImage03 from "../assets/images/hero-img03.png";
import icon01 from "../assets/images/icon01.png";
import icon02 from "../assets/images/icon02.png";
import icon03 from "../assets/images/icon03.png";
import featureimg from "../assets/images/feature-img.png";
import faqImg from "../assets/images/faq-img.png";
import videoIcon from "../assets/images/video-icon.png";
import avatarIcon from "../assets/images/avatar-icon.png";
import priyaImage from "../assets/images/priya.jpeg";
import amitImage from "../assets/images/amit.jpg";
import meeraImage from "../assets/images/meera.jpg";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { FaStethoscope, FaHospital, FaCalendarCheck } from "react-icons/fa";
import About from "../components/About/About";
import ServiceList from "../components/Services/ServiceList";
import DoctorList from "../components/Doctors/DoctorList";
import FaqList from "../components/Faq/FaqList";
import Testimonial from "../components/Testimonial/Testimonial";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/home.css';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, []);

  const bookAppointment = async () => {
    toast.success("Find your Doctor");
    navigate("/doctors");
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero__section pt-[40px] 2xl:h-[700px] bg-gradient-to-b from-[#f0f7ff] to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-[60px] items-center justify-between">
            {/* Hero Content */}
            <div data-aos="fade-up" data-aos-delay="100">
              <div className="lg:w-[500px]">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-headingColor leading-tight mb-4">
                  A Smart Solution for{" "}
                  <span className="text-primaryColor">Better Healthcare</span>
                </h1>
                <p className="text-base text-gray-600 mb-6" data-aos="fade-up" data-aos-delay="200">
                  We have developed a healthcare platform that supports the
                  diagnosis, treatment, and management of seven major diseases,
                  aiming to improve patient quality of life with accurate
                  information, customized treatment plans, and ongoing support.
                </p>
                <button
                  onClick={bookAppointment}
                  className="btn bg-primaryColor hover:bg-primaryDark text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  Request an Appointment
                  <BsArrowRight className="text-xl" />
                </button>
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div 
                  className="stat-card bg-white p-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <h2 className="text-3xl font-bold text-primaryColor mb-2">30+</h2>
                  <span className="w-20 h-1 bg-yellowColor rounded-full block"></span>
                  <p className="text-gray-600 mt-2">Years of Experience</p>
                </div>

                <div 
                  className="stat-card bg-white p-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                  data-aos="fade-up"
                  data-aos-delay="500"
                >
                  <h2 className="text-3xl font-bold text-primaryColor mb-2">₹499</h2>
                  <span className="w-20 h-1 bg-purpleColor rounded-full block"></span>
                  <p className="text-gray-600 mt-2">Starting from</p>
                </div>

                <div 
                  className="stat-card bg-white p-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                  data-aos="fade-up"
                  data-aos-delay="600"
                >
                  <h2 className="text-3xl font-bold text-primaryColor mb-2">100%</h2>
                  <span className="w-20 h-1 bg-irisBlueColor rounded-full block"></span>
                  <p className="text-gray-600 mt-2">Patient Satisfaction</p>
                </div>
              </div>
            </div>

            {/* Hero Images */}
            <div className="flex gap-[20px] justify-end" data-aos="fade-left" data-aos-delay="200">
              <div className="relative">
                <img
                  src={heroImage01}
                  className="w-[90%] rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
                  alt="Doctor caring for patient"
                />
                <div 
                  className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-xl"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <h3 className="text-primaryColor font-semibold">Expert Care</h3>
                  <p className="text-sm text-gray-600">24/7 Support</p>
                </div>
              </div>
              <div className="mt-[30px]">
                <img
                  src={heroImage02}
                  className="w-full mb-[30px] rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
                  alt="Medical consultation"
                  data-aos="fade-down"
                  data-aos-delay="400"
                />
                <img
                  src={heroImage03}
                  className="w-full rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
                  alt="Medical facility"
                  data-aos="fade-up"
                  data-aos-delay="500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="lg:w-[500px] mx-auto text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-headingColor mb-3">
              Our Medical Services
            </h2>
            <p className="text-base text-gray-600">
              World-class care for everyone. Our health System offers unmatched
              expert health care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div 
              className="service-card bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="flex items-center justify-center mb-6">
                <FaStethoscope className="text-5xl text-primaryColor" />
              </div>
              <h3 className="text-xl font-bold text-headingColor mb-4 text-center">
                Find a Doctor
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Connect with the best healthcare professionals in your area.
                Expert care at your fingertips.
              </p>
              <Link
                to="/doctors"
                className="flex items-center justify-center gap-2 text-primaryColor hover:text-primaryDark transition-colors duration-300"
              >
                Learn More <BsArrowRight />
              </Link>
            </div>

            {/* Service Card 2 */}
            <div 
              className="service-card bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="flex items-center justify-center mb-6">
                <FaHospital className="text-5xl text-primaryColor" />
              </div>
              <h3 className="text-xl font-bold text-headingColor mb-4 text-center">
                Find a Location
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Locate our state-of-the-art facilities and clinics near you.
                Quality care, convenient locations.
              </p>
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 text-primaryColor hover:text-primaryDark transition-colors duration-300"
              >
                Learn More <BsArrowRight />
              </Link>
            </div>

            {/* Service Card 3 */}
            <div 
              className="service-card bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="flex items-center justify-center mb-6">
                <FaCalendarCheck className="text-5xl text-primaryColor" />
              </div>
              <h3 className="text-xl font-bold text-headingColor mb-4 text-center">
                Book Appointment
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Schedule your visit online in minutes. Fast, easy, and secure
                appointment booking.
              </p>
              <Link
                to="/doctors"
                className="flex items-center justify-center gap-2 text-primaryColor hover:text-primaryDark transition-colors duration-300"
              >
                Learn More <BsArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <About />

      {/* Services List Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="xl:w-[570px] mx-auto text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-headingColor mb-4">
              Our Medical Services
            </h2>
            <p className="text-gray-600">
              World-class care for everyone. Our health system offers
              unmatched, expert health care.
            </p>
          </div>
          <ServiceList />
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2" data-aos="fade-right">
              <h2 className="text-4xl font-bold text-headingColor mb-6">
                Get Virtual Treatment <br />
                <span className="text-primaryColor">Anytime</span>
              </h2>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-600">
                  <span className="text-primaryColor">1.</span>
                  Schedule the appointment directly starting at ₹499
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <span className="text-primaryColor">2.</span>
                  Search for your physician here and contact their office
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <span className="text-primaryColor">3.</span>
                  View our physicians who are accepting new patients
                </li>
              </ul>
              <Link to="/doctors">
                <button className="btn bg-primaryColor hover:bg-primaryDark text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
                  Learn More
                </button>
              </Link>
            </div>

            <div className="lg:w-1/2 relative" data-aos="fade-left">
              <img
                src={featureimg}
                className="w-full rounded-2xl shadow-lg"
                alt="Virtual consultation"
              />
              <div 
                className="absolute bottom-4 left-4 bg-white p-4 rounded-xl shadow-xl"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Next Available</p>
                    <p className="text-xs text-gray-600">Today, 3:00 PM</p>
                  </div>
                  <span className="w-10 h-10 flex items-center justify-center bg-primaryColor rounded-full">
                    <img src={videoIcon} alt="Video call" className="w-5 h-5" />
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <img src={avatarIcon} alt="Doctor" className="w-10 h-10 rounded-full" />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800">Dr. Rajesh Kumar</h4>
                    <p className="text-xs text-gray-600">Senior Physician</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-[#fcfcfc]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-headingColor mb-3">
              What Our Patients Say
            </h2>
            <p className="text-base text-gray-600">
              Real testimonials from our valued patients
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md" data-aos="fade-up" data-aos-delay="200">
              <div className="flex items-center gap-3 mb-4">
                <img src={priyaImage} alt="Patient" className="w-12 h-12 rounded-full" />
                <div>
                  <h4 className="text-sm font-semibold text-gray-800">Priya Sharma</h4>
                  <div className="flex items-center">
                    <span className="text-yellow-500">★★★★★</span>
                    <span className="text-sm text-gray-600 ml-1">(5.0)</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                "Dr. Rajesh Kumar is an excellent physician. His diagnosis was spot-on, and the treatment was very effective. Highly recommended!"
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md" data-aos="fade-up" data-aos-delay="300">
              <div className="flex items-center gap-3 mb-4">
                <img src={amitImage} alt="Patient" className="w-12 h-12 rounded-full" />
                <div>
                  <h4 className="text-sm font-semibold text-gray-800">Amit Patel</h4>
                  <div className="flex items-center">
                    <span className="text-yellow-500">★★★★</span>
                    <span className="text-gray-300">★</span>
                    <span className="text-sm text-gray-600 ml-1">(4.0)</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                "Great experience overall. The staff was friendly and the wait time was minimal. Would recommend to others."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-xl shadow-md" data-aos="fade-up" data-aos-delay="400">
              <div className="flex items-center gap-3 mb-4">
                <img src={meeraImage} alt="Patient" className="w-12 h-12 rounded-full" />
                <div>
                  <h4 className="text-sm font-semibold text-gray-800">Meera Reddy</h4>
                  <div className="flex items-center">
                    <span className="text-yellow-500">★★★★</span>
                    <span className="text-yellow-500">½</span>
                    <span className="text-gray-300">★</span>
                    <span className="text-sm text-gray-600 ml-1">(4.5)</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                "Very knowledgeable doctor with a caring attitude. The clinic is well-maintained and modern."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqList />
    </>
  );
};

export default Home;
