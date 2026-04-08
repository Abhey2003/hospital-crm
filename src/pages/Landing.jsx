import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const slides = [
  "https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118",
  "https://images.unsplash.com/photo-1538108149393-fbbd81895907"
];

function Landing() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-100 via-white to-blue-50">

      {/* 🔥 NAVBAR */}
      <div className="fixed w-full z-50 flex justify-between items-center px-4 sm:px-6 md:px-10 py-3 sm:py-4 bg-white/30 backdrop-blur-lg shadow">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-700">
          🏥 Hospital CRM
        </h1>

        <Link
          to="/login"
          className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base hover:bg-blue-700 transition"
        >
          Login
        </Link>
      </div>

      {/* 🔥 HERO */}
      <div className="h-screen relative">
        <img
          src={`${slides[index]}?auto=compress&w=1600`}
          className="w-full h-full object-cover transition duration-700"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">

          <div className="bg-white/20 backdrop-blur-xl p-5 sm:p-8 md:p-10 rounded-2xl shadow-xl max-w-xl">

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              Smart Healthcare System
            </h1>

            <p className="mb-4 sm:mb-6 text-sm sm:text-lg">
              Advanced hospital management with modern technology
            </p>

            <Link
              to="/login"
              className="bg-blue-600 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base hover:bg-blue-700"
            >
              Get Started →
            </Link>

          </div>
        </div>
      </div>

      {/* 🔥 STATS */}
      <div className="py-12 sm:py-20 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 sm:mb-10">
          Our Achievements
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-10">
          {[
            ["10K+", "Patients"],
            ["150+", "Doctors"],
            ["98%", "Success"],
            ["24/7", "Support"]
          ].map(([num, label], i) => (
            <div key={i} className="bg-white p-5 sm:p-6 rounded-xl shadow hover:scale-105 transition">
              <h3 className="text-xl sm:text-2xl font-bold text-blue-600">{num}</h3>
              <p className="text-sm sm:text-base">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 DOCTORS */}
      <div className="py-12 sm:py-20 bg-gray-100 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 sm:mb-10">
          Our Doctors
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-10">
          {[
            ["men/32", "Dr. Sharma", "Cardiologist"],
            ["women/44", "Dr. Priya", "Neurologist"],
            ["men/45", "Dr. Amit", "General Physician"]
          ].map(([img, name, role], i) => (
            <div key={i} className="bg-white p-5 sm:p-6 rounded-xl shadow hover:scale-105 transition">
              <img
                src={`https://randomuser.me/api/portraits/${img}.jpg`}
                className="w-20 sm:w-24 h-20 sm:h-24 mx-auto rounded-full mb-3 sm:mb-4"
              />
              <h3 className="font-bold text-sm sm:text-base">{name}</h3>
              <p className="text-sm">{role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 TREATMENTS */}
      <div className="py-12 sm:py-20 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 sm:mb-10">
          Treatments
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-10">
          <div className="bg-white p-6 rounded-xl shadow">❤️ Heart Care</div>
          <div className="bg-white p-6 rounded-xl shadow">🧠 Neurology</div>
          <div className="bg-white p-6 rounded-xl shadow">🦴 Orthopedic</div>
        </div>
      </div>

      {/* 🔥 TESTIMONIALS */}
      <div className="py-12 sm:py-20 bg-gray-50 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 sm:mb-10">
          Testimonials
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-10">
          {["Rahul", "Priya", "Amit"].map((name, i) => (
            <div key={i} className="bg-white p-5 sm:p-6 rounded-xl shadow">
              <p className="text-sm sm:text-base">"Excellent hospital service!"</p>
              <h4 className="mt-3 font-bold text-sm sm:text-base">– {name}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 CERTIFICATION */}
      <div className="py-12 sm:py-16 text-center">
        <h2 className="text-lg sm:text-2xl font-bold mb-6">
          Government Approved
        </h2>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" className="w-16 sm:w-20" />
          <img src="https://cdn-icons-png.flaticon.com/512/3062/3062634.png" className="w-16 sm:w-20" />
        </div>
      </div>

      {/* 🔥 CONTACT */}
      <div className="bg-blue-600 text-white py-12 sm:py-16 text-center">
        <h2 className="text-xl sm:text-3xl font-bold mb-4">
          24x7 Patient Care
        </h2>

        <p className="text-xl sm:text-3xl font-bold animate-pulse">
          📞 +91 9876543210
        </p>

        <p className="mt-2 text-sm sm:text-base">
          support@hospitalcrm.com
        </p>
      </div>

      {/* 🔥 FOOTER */}
      <div className="bg-gray-900 text-white text-center py-5 sm:py-6 text-sm">
        © 2026 Hospital CRM
      </div>
    </div>
  );
}

export default Landing;