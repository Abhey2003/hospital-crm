import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import Sidebar from "../../components/Sidebar";

function AdminDashboard() {
  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    appointments: 0
  });

  useEffect(() => {
    // 👥 USERS
    const unsubscribeUsers = onSnapshot(collection(db, "users"), (snapshot) => {
      const users = snapshot.docs.map((doc) => doc.data());

      const patients = users.filter((u) => u.role === "patient").length;
      const doctors = users.filter((u) => u.role === "doctor").length;

      setStats((prev) => ({
        ...prev,
        patients,
        doctors
      }));
    });

    // 📅 APPOINTMENTS
    const unsubscribeAppointments = onSnapshot(
      collection(db, "appointments"),
      (snapshot) => {
        setStats((prev) => ({
          ...prev,
          appointments: snapshot.size
        }));
      }
    );

    return () => {
      unsubscribeUsers();
      unsubscribeAppointments();
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      <Sidebar />

      <div className="flex-1 p-6">
        
        <h1 className="text-3xl font-bold mb-6">
          Admin Dashboard
        </h1>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-600">Patients</h2>
            <p className="text-2xl font-bold">{stats.patients}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-600">Doctors</h2>
            <p className="text-2xl font-bold">{stats.doctors}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-600">Appointments</h2>
            <p className="text-2xl font-bold">{stats.appointments}</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;