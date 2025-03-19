import React, { useState } from "react";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
    name: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({
          email: "",
          subject: "",
          message: "",
          name: "",
          phone: "",
        });
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Error sending message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-screen-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="bg-primaryColor rounded-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-gray-100 mb-8">
              Have questions about our services? We're here to help and answer any questions you might have.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <BsTelephone className="text-2xl" />
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p>+91 123 456 7890</p>
                  <p>+91 098 765 4321</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <AiOutlineMail className="text-2xl" />
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p>info@medlab.com</p>
                  <p>support@medlab.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <HiLocationMarker className="text-2xl" />
                <div>
                  <h4 className="font-semibold">Location</h4>
                  <p>123 Healthcare Avenue</p>
                  <p>Mumbai, Maharashtra, India</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold mb-4">Working Hours</h4>
              <div className="space-y-2">
                <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                <p>Saturday: 9:00 AM - 6:00 PM</p>
                <p>Sunday: 10:00 AM - 4:00 PM</p>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="hover:text-gray-200 transition-colors">
                  <FaFacebookF className="text-xl" />
                </a>
                <a href="#" className="hover:text-gray-200 transition-colors">
                  <FaTwitter className="text-xl" />
                </a>
                <a href="#" className="hover:text-gray-200 transition-colors">
                  <FaLinkedinIn className="text-xl" />
                </a>
                <a href="#" className="hover:text-gray-200 transition-colors">
                  <FaInstagram className="text-xl" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-headingColor">Send Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="form__label block mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="form__input w-full"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="form__label block mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 123 456 7890"
                    className="form__input w-full"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="form__label block mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  className="form__input w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="form__label block mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="form__input w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="form__label block mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="form__input w-full"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`btn rounded w-full md:w-fit ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

        {/* Google Map */}
        <div className="mt-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995!3d19.08219865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1652789563579!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
