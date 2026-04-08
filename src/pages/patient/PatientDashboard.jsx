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
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      
      {/* HEADER */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-5 sm:mb-6">
        Patient Dashboard
      </h1>

      {appointments.length === 0 && (
        <p className="text-gray-500 text-sm sm:text-base">
          No records found
        </p>
      )}

      {/* CARDS */}
      <div className="grid gap-4 sm:gap-6">
        {appointments.map((a) => (
          <div
            key={a.id}
            className="bg-white p-4 sm:p-6 rounded-xl shadow-md border"
          >
            {/* BASIC INFO */}
            <div className="mb-4">
              <p className="text-base sm:text-lg font-semibold text-blue-600 break-all">
                Doctor: {a.doctorEmail}
              </p>
              <p className="text-gray-700 text-sm sm:text-base">
                Disease: {a.disease}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                Status: {a.status}
              </p>
            </div>

            {/* MEDICINES */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2 text-sm sm:text-base text-gray-800">
                Medicines
              </h3>

              {a.prescription?.medicines?.length > 0 ? (
                <>
                  {/* DESKTOP TABLE */}
                  <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full border rounded-lg overflow-hidden text-sm">
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

                  {/* 📱 MOBILE CARDS */}
                  <div className="sm:hidden flex flex-col gap-2">
                    {a.prescription.medicines.map((m, i) => (
                      <div key={i} className="bg-gray-50 p-3 rounded-lg">
                        <p><strong>Name:</strong> {m.name}</p>
                        <p><strong>Dose:</strong> {m.dose}</p>
                        <p><strong>Duration:</strong> {m.duration}</p>
                        <p><strong>Timing:</strong> {m.timing}</p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-gray-500 text-sm">No medicines yet</p>
              )}
            </div>

            {/* DIET + AVOID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="font-semibold text-green-700 text-sm">
                  Diet
                </p>
                <p className="text-gray-700 text-sm sm:text-base">
                  {a.prescription?.diet || "Not provided"}
                </p>
              </div>

              <div className="bg-red-50 p-3 rounded-lg">
                <p className="font-semibold text-red-700 text-sm">
                  Avoid
                </p>
                <p className="text-gray-700 text-sm sm:text-base">
                  {a.prescription?.avoid || "Not provided"}
                </p>
              </div>
            </div>

            {/* NOTES */}
            <div className="bg-yellow-50 p-3 rounded-lg mb-4">
              <p className="font-semibold text-yellow-700 text-sm">
                Notes
              </p>
              <p className="text-gray-700 text-sm sm:text-base">
                {a.prescription?.notes || "Not provided"}
              </p>
            </div>

            {/* PROGRESS */}
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="font-semibold text-blue-700 text-sm">
                Progress
              </p>
              <p className="text-gray-700 text-sm sm:text-base">
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