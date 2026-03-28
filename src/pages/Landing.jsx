import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const slides = [
  "https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118",
  "https://images.unsplash.com/photo-1538108149393-fbbd81895907"
];

function Landing() {
  const [index, setIndex] = useState(0);

  // 🔥 Auto Slider (no external lib = no error)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-100 via-white to-blue-50">

      {/* 🔥 NAVBAR */}
      <div className="fixed w-full z-50 flex justify-between items-center px-10 py-4 bg-white/30 backdrop-blur-lg shadow">
        <h1 className="text-2xl font-bold text-blue-700">🏥 Hospital CRM</h1>

        <Link
          to="/login"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </Link>
      </div>

      {/* 🔥 HERO SECTION */}
      <div className="h-screen relative">
        <img
          src={`${slides[index]}?auto=compress&w=1600`}
          className="w-full h-full object-cover transition duration-700"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">

          <div className="bg-white/20 backdrop-blur-xl p-10 rounded-2xl shadow-xl">

            <h1 className="text-5xl font-bold mb-4">
              Smart Healthcare System
            </h1>

            <p className="mb-6 text-lg">
              Advanced hospital management with modern technology
            </p>

            <Link
              to="/login"
              className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Get Started →
            </Link>

          </div>

        </div>
      </div>

      {/* 🔥 STATS */}
      <div className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-10">Our Achievements</h2>

        <div className="grid md:grid-cols-4 gap-6 px-10">
          <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
            <h3 className="text-2xl font-bold text-blue-600">10K+</h3>
            <p>Patients</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
            <h3 className="text-2xl font-bold text-blue-600">150+</h3>
            <p>Doctors</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
            <h3 className="text-2xl font-bold text-blue-600">98%</h3>
            <p>Success</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
            <h3 className="text-2xl font-bold text-blue-600">24/7</h3>
            <p>Support</p>
          </div>
        </div>
      </div>

      {/* 🔥 DOCTORS */}
      <div className="py-20 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-10">Our Doctors</h2>

        <div className="grid md:grid-cols-3 gap-6 px-10">

          <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h3 className="font-bold">Dr. Sharma</h3>
            <p>Cardiologist</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h3 className="font-bold">Dr. Priya</h3>
            <p>Neurologist</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
            <img
              src="https://randomuser.me/api/portraits/men/45.jpg"
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h3 className="font-bold">Dr. Amit</h3>
            <p>General Physician</p>
          </div>

        </div>
      </div>

      {/* 🔥 TREATMENTS */}
      <div className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-10">Treatments</h2>

        <div className="grid md:grid-cols-3 gap-6 px-10">

          <div className="bg-white p-6 rounded-xl shadow">
            ❤️ Heart Care
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            🧠 Neurology
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            🦴 Orthopedic
          </div>

        </div>
      </div>

      {/* 🔥 TESTIMONIALS */}
      <div className="py-20 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-10">Testimonials</h2>

        <div className="grid md:grid-cols-3 gap-6 px-10">

          <div className="bg-white p-6 rounded-xl shadow">
            "Excellent hospital service!"
            <h4 className="mt-3 font-bold">– Rahul</h4>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            "Doctors are very kind"
            <h4 className="mt-3 font-bold">– Priya</h4>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            "Highly recommended"
            <h4 className="mt-3 font-bold">– Amit</h4>
          </div>

        </div>
      </div>

      {/* 🔥 CERTIFICATION */}
      <div className="py-16 text-center">
        <h2 className="text-2xl font-bold mb-6">
          Government Approved
        </h2>

        <div className="flex justify-center gap-10">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" className="w-20" />
          <img src="https://cdn-icons-png.flaticon.com/512/3062/3062634.png" className="w-20" />
        </div>
      </div>

      {/* 🔥 CONTACT */}
      <div className="bg-blue-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          24x7 Patient Care
        </h2>

        <p className="text-3xl font-bold animate-pulse">
          📞 +91 9876543210
        </p>

        <p className="mt-2">support@hospitalcrm.com</p>
      </div>

      {/* 🔥 FOOTER */}
      <div className="bg-gray-900 text-white text-center py-6">
        © 2026 Hospital CRM
      </div>
    </div>
  );
}

export default Landing;