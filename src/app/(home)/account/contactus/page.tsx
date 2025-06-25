"use client";
import toast from "react-hot-toast";
import {
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function ContactUS() {
  const phoneNumber = "9841733588";
  const whatsappLink = `https://wa.me/${phoneNumber}`;
  const emailAddress = "adyarbakeryjmj@gmail.com";
  const location = "Adyar Bakery & Sweet Shop, Gandhi Nagar, Adyar, Chennai";

  const handleCopy = (text: any) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9F7] to-[#FFEBE6] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#FF6B4A] mb-4">Visit Us</h1>
          <p className="text-lg text-gray-600">
            Come taste our delicious treats or reach out through any of these
            channels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Phone Card */}
          <div
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#FFD1C2] hover:border-[#FF6B4A] cursor-pointer"
            onClick={() => handleCopy(phoneNumber)}
          >
            <div className="flex items-center gap-4">
              <div className="bg-[#FFEBE6] p-4 rounded-full">
                <FaPhone className="text-2xl text-[#FF6B4A]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Call Us</h3>
                <p className="text-gray-600 mt-1">{phoneNumber}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <a
                href={`tel:${phoneNumber}`}
                className="bg-[#FF6B4A] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#E55A3A] transition-colors"
              >
                <FaPhone /> Call Now
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors"
              >
                <FaWhatsapp /> WhatsApp
              </a>
            </div>
          </div>

          {/* Email Card - Fixed */}
          <div
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#FFD1C2] hover:border-[#FF6B4A] cursor-pointer"
            onClick={() => handleCopy(emailAddress)}
          >
            <div className="flex items-center gap-4">
              <div className="bg-[#FFEBE6] p-4 rounded-full">
                <FaEnvelope className="text-2xl text-[#FF6B4A]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Email Us
                </h3>
                <p className="text-gray-600 mt-1">{emailAddress}</p>
              </div>
            </div>
            <div className="mt-4">
              <a
                href={`mailto:${emailAddress}?subject=Inquiry%20About%20Adyar%20Bakery`}
                className="bg-[#FF6B4A] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#E55A3A] transition-colors"
              >
                <FaEnvelope /> Email Us
              </a>
            </div>
          </div>

          {/* Location Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#FFD1C2] hover:border-[#FF6B4A] col-span-1 md:col-span-2">
            <div className="flex items-center gap-4">
              <div className="bg-[#FFEBE6] p-4 rounded-full">
                <FaMapMarkerAlt className="text-2xl text-[#FF6B4A]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Our Bakery
                </h3>
                <p className="text-gray-600 mt-1">{location}</p>
              </div>
            </div>
            <div className="mt-6 h-64 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.722853981507!2d80.1360095!3d12.9731492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525fcdc303dcaf%3A0xf909a317885e3a96!2sAdyar%20Bakery%20%26%20Sweet%20Shop!5e0!3m2!1sen!2sin!4v1719393851230!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="rounded-lg"
                title="Adyar Bakery Location"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500">
            We're open daily from 7:00 AM to 10:00 PM
          </p>
          <p className="text-gray-500 mt-2">Email responses within 24 hours</p>
        </div>
      </div>
    </div>
  );
}
