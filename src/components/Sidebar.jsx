import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const linkClasses = (path) =>
    `block px-4 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-blue-500 text-white"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <>
      {/* 🍔 MOBILE BUTTON */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-500 text-white px-3 py-2 rounded"
        onClick={() => setIsOpen(true)}
      >
        ☰
      </button>

      {/* OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* 🔥 SIDEBAR */}
      <div
        className={`
          bg-gray-900 text-white p-6 flex flex-col shadow-lg z-50
          
          /* MOBILE (drawer) */
          fixed top-0 left-0 h-full w-64 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}

          /* DESKTOP (normal layout) */
          md:static md:translate-x-0 md:h-auto md:min-h-screen
        `}
      >
        {/* CLOSE BUTTON */}
        <button
          className="md:hidden mb-4 text-right text-xl"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>

        {/* LOGO */}
        <h2 className="text-2xl font-bold text-blue-400 mb-8">
          🏥 Admin Panel
        </h2>

        {/* NAV */}
        <div className="flex flex-col gap-3">
          <Link to="/admin" className={linkClasses("/admin")}>
            📊 Dashboard
          </Link>

          <Link to="/admin/users" className={linkClasses("/admin/users")}>
            👥 Users
          </Link>

          <Link to="/admin/patients" className={linkClasses("/admin/patients")}>
            🧑 Patients
          </Link>

          <Link
            to="/admin/appointments"
            className={linkClasses("/admin/appointments")}
          >
            📅 Appointments
          </Link>
        </div>

        {/* FOOTER */}
        <div className="mt-auto text-sm text-gray-400 border-t border-gray-700 pt-4">
          © Hospital CRM
        </div>
      </div>
    </>
  );
}

export default Sidebar;