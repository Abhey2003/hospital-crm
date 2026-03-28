import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const linkClasses = (path) =>
    `block px-4 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-blue-500 text-white"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6 flex flex-col shadow-lg">
      
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

        <Link to="/admin/appointments" className={linkClasses("/admin/appointments")}>
          📅 Appointments
        </Link>

      </div>

      {/* FOOTER */}
      <div className="mt-auto text-sm text-gray-400 border-t border-gray-700 pt-4">
        © Hospital CRM
      </div>
    </div>
  );
}

export default Sidebar;