import { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function PatientDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const fetchAppointments = async () => {
    const snapshot = await getDocs(collection(db, "appointments"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    const filtered = data.filter(
      (a) => a.patientId === user?.uid
    );

    setAppointments(filtered);
  };

  useEffect(() => {
    if (user) fetchAppointments();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* HEADER */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Patient Dashboard
      </h1>

      {appointments.length === 0 && (
        <p className="text-gray-500">No records found</p>
      )}

      {/* CARDS */}
      <div className="grid gap-6">
        {appointments.map((a) => (
          <div
            key={a.id}
            className="bg-white p-6 rounded-xl shadow-md border"
          >
            {/* BASIC INFO */}
            <div className="mb-4">
              <p className="text-lg font-semibold text-blue-600">
                Doctor: {a.doctorEmail}
              </p>
              <p className="text-gray-700">Disease: {a.disease}</p>
              <p className="text-sm text-gray-500">
                Status: {a.status}
              </p>
            </div>

            {/* MEDICINES */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2 text-gray-800">
                Medicines
              </h3>

              {a.prescription?.medicines?.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Dose</th>
                        <th className="p-2 text-left">Duration</th>
                        <th className="p-2 text-left">Timing</th>
                      </tr>
                    </thead>
                    <tbody>
                      {a.prescription.medicines.map((m, i) => (
                        <tr key={i} className="border-t">
                          <td className="p-2">{m.name}</td>
                          <td className="p-2">{m.dose}</td>
                          <td className="p-2">{m.duration}</td>
                          <td className="p-2">{m.timing}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">No medicines yet</p>
              )}
            </div>

            {/* DIET + AVOID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="font-semibold text-green-700">Diet</p>
                <p className="text-gray-700">
                  {a.prescription?.diet || "Not provided"}
                </p>
              </div>

              <div className="bg-red-50 p-3 rounded-lg">
                <p className="font-semibold text-red-700">Avoid</p>
                <p className="text-gray-700">
                  {a.prescription?.avoid || "Not provided"}
                </p>
              </div>
            </div>

            {/* NOTES */}
            <div className="bg-yellow-50 p-3 rounded-lg mb-4">
              <p className="font-semibold text-yellow-700">Notes</p>
              <p className="text-gray-700">
                {a.prescription?.notes || "Not provided"}
              </p>
            </div>

            {/* PROGRESS */}
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="font-semibold text-blue-700">Progress</p>
              <p className="text-gray-700">
                {a.progress || "Not updated"}
              </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default PatientDashboard;