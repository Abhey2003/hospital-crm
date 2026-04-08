import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

function AdminAppointments() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    patientId: "",
    doctorId: "",
    disease: ""
  });

  const fetchUsers = async () => {
    try {
      const snapshot = await getDocs(collection(db, "users"));

      const allUsers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      const patientList = allUsers.filter((u) => u.role === "patient");
      const doctorList = allUsers.filter((u) => u.role === "doctor");

      setPatients(patientList);
      setDoctors(doctorList);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Error loading users ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAssign = async () => {
    if (!form.patientId || !form.doctorId || !form.disease) {
      alert("Fill all fields");
      return;
    }

    const selectedPatient = patients.find(
      (p) => p.id === form.patientId
    );
    const selectedDoctor = doctors.find(
      (d) => d.id === form.doctorId
    );

    if (!selectedPatient || !selectedDoctor) {
      alert("Invalid selection ❌");
      return;
    }

    try {
      await addDoc(collection(db, "appointments"), {
        patientId: selectedPatient.id,
        patientEmail: selectedPatient.email,
        doctorId: selectedDoctor.id,
        doctorEmail: selectedDoctor.email,
        disease: form.disease,
        prescription: "",
        progress: "",
        status: "assigned"
      });

      alert("Appointment Assigned ✅");

      setForm({
        patientId: "",
        doctorId: "",
        disease: ""
      });
    } catch (error) {
      console.error("Error assigning:", error);
      alert("Failed to assign ❌");
    }
  };

  // 🔥 RESPONSIVE LOADING
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-sm sm:text-base">
        Loading users...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-6 sm:p-6">
      
      {/* CARD */}
      <div className="bg-white p-5 sm:p-8 rounded-xl shadow-md w-full max-w-md sm:max-w-lg">
        
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 mb-5 sm:mb-6 text-center">
          OPD - Assign Doctor
        </h2>

        {/* PATIENT */}
        <label className="block mb-1 sm:mb-2 text-sm sm:text-base font-medium text-gray-700">
          Select Patient
        </label>
        <select
          value={form.patientId}
          onChange={(e) =>
            setForm({ ...form, patientId: e.target.value })
          }
          className="w-full border p-2.5 sm:p-3 rounded mb-3 sm:mb-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Patient</option>

          {patients.length === 0 ? (
            <option disabled>No patients found</option>
          ) : (
            patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.email}
              </option>
            ))
          )}
        </select>

        {/* DOCTOR */}
        <label className="block mb-1 sm:mb-2 text-sm sm:text-base font-medium text-gray-700">
          Select Doctor
        </label>
        <select
          value={form.doctorId}
          onChange={(e) =>
            setForm({ ...form, doctorId: e.target.value })
          }
          className="w-full border p-2.5 sm:p-3 rounded mb-3 sm:mb-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Doctor</option>

          {doctors.length === 0 ? (
            <option disabled>No doctors found</option>
          ) : (
            doctors.map((d) => (
              <option key={d.id} value={d.id}>
                {d.email}
              </option>
            ))
          )}
        </select>

        {/* DISEASE */}
        <label className="block mb-1 sm:mb-2 text-sm sm:text-base font-medium text-gray-700">
          Disease
        </label>
        <input
          placeholder="Enter disease"
          value={form.disease}
          onChange={(e) =>
            setForm({ ...form, disease: e.target.value })
          }
          className="w-full border p-2.5 sm:p-3 rounded mb-5 sm:mb-6 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* BUTTON */}
        <button
          onClick={handleAssign}
          className="w-full bg-blue-500 text-white py-2.5 sm:py-3 rounded text-sm sm:text-base hover:bg-blue-600 transition"
        >
          Assign Doctor
        </button>

      </div>
    </div>
  );
}

export default AdminAppointments;